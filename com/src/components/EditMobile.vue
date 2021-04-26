<template>
  <div>
    <div class="edit-mobile_dialog">
      <el-dialog
        title="更换手机号"
        :visible.sync="editMobileDialog"
        width="400"
        class="edit-mobile_dialog_con"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        @close="$reset('userMobile')"
      >
        <el-row class="edit_mobile_dialog" justify="center">
          <el-col :span="24" class="dialog_title">当前绑定手机号</el-col>
          <el-col :span="24" class="user_mobile_title">
            <span>{{ userInfos.Mobile }}</span>
          </el-col>
        </el-row>
        <el-form
          ref="userMobile"
          label-position="top"
          :rules="ruleValidate"
          label-width="80px"
          :model="userMobile"
        >
          <el-form-item label="手机号" prop="mobile">
            <el-input
              v-model="userMobile.mobile"
              @blur="mobileBlur"
              placeholder="请输入需绑定的手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="userMobile.code" @blur="codeBlur"></el-input>
            <el-button class="get_code" >
              <span v-if="show" @click.stop="onGetCode">获取验证码</span>
              <span v-if="!show" class="count">重新发送({{ count }})</span>
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              class="affirm_edit"
              @click="onConfirmEditMobile('userMobile')"
              >确认更换</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { deepCopyTwo } from "@/utils/index";
import { isWscnEmail, isMobile } from "@/utils/validate";
import { Login, SendMessage } from "@/api/api";
export default {
  name: "EditMobile",
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error("请输入正确格式的手机号"));
      }
      if (this.mobileMsg) {
        callback(new Error(this.mobileMsg));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (this.mobileCodeMsg) {
        callback(new Error(this.mobileCodeMsg));
      } else {
        callback();
      }
    };
    return {
      mobileMsg: "",
      mobileCodeMsg: "",
      ruleValidate: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateMobile }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { required: false, trigger: "blur", validator: validateCode }
        ]
      },
      editStatus: true,
      editMobileDialog: false,
      userInfos: { Name: "", Gender: "", Email: "", Mobile: "" },
      userMobile: {
        mobile: "",
        code: ""
      },
      timer: null,
      show: true,
      count: 0
    };
  },
  created() {},
  methods: {
    onEditMobile(mobile) {
      this.editMobileDialog = true;
      this.userInfos.Mobile = mobile;
    },
    onGetCode() {
      if (this.show) {
        SendMessage({
          Mobile: this.userMobile.mobile
        }).then(res => {
          if (res.data.Success) {
            this.countDown();
          } else {
            this.mobileMsg = res.data.Message;
            this.onConfirmEditMobile("userMobile");
          }
        });
      }
    },
    countDown() {
      // 验证码倒计时
      if (!this.timer) {
        this.count = 60;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= 60) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },

    onConfirmEditMobile(userMobile) {
      let that = this;
      this.$nextTick(() => {
        that.$refs[userMobile].validate(valid => {
          if (valid) {
            Login({
              Mobile: that.userMobile.mobile,
              code: that.userMobile.code
            }).then(res => {
              if (res.data.Success) {
                if (res.data.Data == "该手机号已被注册！") {
                  that.mobileMsg = res.data.Data;
                  that.onConfirmEditMobile(userMobile);
                } else {
                  that.editMobileDialog = false;
                  this.$store.dispatch("MyInformation",true);
                }
              } else {
                that.mobileCodeMsg = res.data.Message;
                that.onConfirmEditMobile(userMobile);
              }
            });
          } else {
            return false;
          }
        });
      });
    },
    mobileBlur() {
      this.mobileMsg = "";
    },
    codeBlur() {
      this.mobileCodeMsg = "";
    }
  }
};
</script>
<style lang="scss">
.edit-mobile_dialog {
  .el-dialog__body {
    width: 80%;
    margin-left: 10%;
  }
  .edit_mobile_dialog .el-col {
    text-align: center;
  }
  button.el-button.get_code.el-button--default {
    position: absolute;
    margin-left: -78px;
    margin-top: 2px;
    font-size: 14px;
    width: 70px;
    color: #44a9e1;
    padding: 0;
    height: 36px;
    background: #fff;
    border: 0;
    border-radius: 4px;
    top: 0;
    right: 10px;
  }
  .affirm_edit {
    width: 100%;
    // margin-left: 10%;
    background: #44a8e1;
    margin-top: 30px;
  }

  span.el-dialog__title {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
  i.el-dialog__close.el-icon.el-icon-close {
    color: #44a8e1;
    font-size: 20px;
    font-weight: bold;
  }
}

.edit-mobile_dialog_con {
  .el-dialog {
    width: 400px;
    height: 500px;
  }
}
</style>
<style lang="scss" scoped>
.edit-mobile_dialog {
  span {
    width: 100%;
    text-align: center;
  }
}
.dialog_title {
  color: #888888;
  font-size: 14px;
}
.user_mobile_title {
  margin-top: 10px;
  span {
    font-weight: bold;
    color: #000;
    font-size: 18px;
  }
}
</style>
