<template>
  <div class="mobile_code">
    <el-input
      v-model="code"
      @blur="codeBlur"
      placeholder="请输入手机验证码"
    ></el-input>
    <el-button class="get_code">
      <span v-if="show" @click.stop="onGetCode">获取验证码</span>
      <span v-if="!show" class="count">重新发送({{ count }})</span>
    </el-button>
  </div>
</template>
<script>
// import { SendMessage } from "@/api/api";
import {
  SendMessageForLogin,
  SendCompanyMessage,
  SendMessage
} from "api/companyApi";
export default {
  name: "MobileCode", // 获取验证码
  props: ["codeVal"],
  data() {
    return {
      mobileMsg: "",
      mobileCodeMsg: "",
      code: "",
      timer: null,
      show: true,
      count: 0
    };
  },
  created() {},
  methods: {
    onGetCode() {
      this.$emit("update:codeMessage", "");
      this.$emit("mobileNull");
    },

    /**
      修改密码图片验证码判断
     */
    getEditPwdCode(mobile, code) {
      SendMessage({
        Mobile: mobile,
        Code: code
      }).then(res => {
        if (res.data.Success) {
          this.countDown();
        } else {
          this.$Bus.$emit("refreshCaptcha")
          let errors = res.data.Errors;
          if (errors.length > 0) {
            if (errors[0].Member == "1000") {
              this.$emit("update:codeMessage", errors[0].Message);
              this.$emit("codeNull");
            }
            if (errors[0].Member == "1200") {
              this.$emit("update:mobileMsg", errors[0].Message);
              this.$emit("codeNull");
            }
          }
        }
      });
    },

    /**
      企业信息注册图片验证码判断
    */
    getMobileCode(mobile, code, userName) {
      SendCompanyMessage({
        Mobile: mobile,
        Code: code,
        Username: userName
      }).then(res => {
        if (res.data.Success) {
          this.countDown();
        } else {
          this.$Bus.$emit("refreshCaptcha"); //刷新图形验证码
          let errors = res.data.Errors;

          if (errors.length > 0) {
            //图形验证码错误
            if (errors[0].Member == "1000") {
              this.$emit("update:codeMessage", errors[0].Message);
              this.$emit("codeNull");
            }
            //手机号已存在
            if (errors[0].Member == "1200") {
              this.$emit("update:mobileMsg", errors[0].Message);
              this.$emit("codeNull");
            }
            //用户名已存在
            if (errors[0].Member == "1100") {
              this.$emit("update:userNameMsg", errors[0].Message);
              this.$emit("codeNull");
            }
          }
        }
      });
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
    mobileBlur() {
      this.mobileMsg = "";
    },
    codeBlur() {
      this.$emit("mobileCodeMsg");
    }
  },
  watch: {
    code: function(newVal) {
      this.$emit("update:codeVal", newVal);
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
    top: 22px;
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

.mobile_code {
  button {
    &.el-button {
      &.get_code {
        &.el-button--default {
          position: absolute;
          top: 22px;
          height: 38px;
          right: 15px;
          border: 0;
          background: #ff000000;
        }
      }
    }
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
