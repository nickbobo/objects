<template>
  <div class="account_info edit_pwd">
    <el-dialog
      :visible.sync="isShowDialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      custom-class="modal-box edit_pwd"
      @close="$reset('editPassword')"
      :show-close="false"
    >
      <h4 class="modal-title">修改密码</h4>
      <el-form
        :model="formData"
        ref="editPassword"
        :rules="rulesEditPwd"
        :key="'editPassword'"
      >
        <el-form-item label="原密码" prop="OldPassword">
          <el-input
            type="password"
            v-model="formData.OldPassword"
            placeholder=""
          ></el-input>
        </el-form-item>

        <el-form-item label="修改密码" prop="NewPassword">
          <el-input
            type="password"
            v-model="formData.NewPassword"
            placeholder=""
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="RePassword">
          <el-input
            type="password"
            v-model="formData.RePassword"
            placeholder=""
          ></el-input>
        </el-form-item>
        <div class="but_list">
          <button class="w-btn btn-cancel" type="button" @click="isShowDialog = false">
            取消
          </button>
          <button  class="w-btn " type="button" @click="onSave">
            保存
          </button>
        </div>
      </el-form>
      <button class="close" type="button" @click="isShowDialog = false">
        <span class="iconfont icon-close"></span>
      </button>
    </el-dialog>
  </div>
</template>
<script>
import { EdtPassword } from "api/companyApi";
export default {
  name: "EditPwd", //修改密码
  props: ["captchaVal"],
  data() {
    const rePassword = (rule, value, callback) => {
      if (this.formData.NewPassword !== value) {
        callback(new Error("两次密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isShowDialog: false,
      formData: {
        OldPassword: "",
        NewPassword: "",
        RePassword: ""
      },
      rulesEditPwd: {
        OldPassword: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this).Password
          }
        ],
        NewPassword: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this).Password
          }
        ],
        RePassword: [
          {
            trigger: "blur",
            required: true,
            validator: rePassword
          }
        ]
      }
    };
  },
  methods: {
    onSave() {
      this.$refs["editPassword"].validate(valid => {
        if (valid) {
          EdtPassword(this.formData).then(res => {
            if (res.data.Success) {
              this.$message({
                message: "密码修改成功",
                type: "success"
              });
              this.isShowDialog = false;
            } else {
              // this.closeMobileCodeMsg(res.data.Message);
            }
          });
        }
      });
    }
  },
  created() {}
};
</script>
<style lang="scss">
@import "~@/styles/mixin.scss";

.el-dialog {
  &.edit_pwd {
    width: 360px;
    .el-dialog__body {
      text-align: center;
      .el-form-item__label {
        width: 100%;
        float: inherit;
        line-height: inherit;
        margin-bottom: 4px;
        padding-left: 3px;
      }
      .el-form {
        text-align: left;
        .el-form-item__content {
          height: 38px;
          line-height: 38px;
        }
        .but_list {
          display: flex;
        }
        .w-btn {
          width: 50%;
        }
        .w-btn + .w-btn {
          margin-left: 10px;
        }
      }
      .el-input {
        // width: 240px;
        position: absolute;
        // right: 0;
        height: 38px;
      }
      // .el-form-item__error {
      //   left: 76px;
      // }
      .title_font_mix16 {
        // text-align: left;
        // margin-top: 35px;
        display: block;
        margin-bottom: 40px;
      }
      .el-input__inner {
        @include wh(100%, 38px);
      }
      .el-row {
        margin-top: 8px;
        margin-bottom: 18px;
      }
      .input_title {
        width: 98px;
        padding-right: 20px;
        text-align: right;
        height: 32px;
        line-height: 32px;
      }
      .el-button {
        &.cancel_but {
          margin-top: 0px;
        }
      }
    }
  }
}

// .captcha {
//   width: 400px;
//   @include df;
//   .el-input {
//     @include wh(228px, 40px);
//   }
//   .captcha_img {
//     cursor: pointer;
//     margin-left: 12px;
//     @include wh(120px, 40px);
//     border: 1px solid #dcdfe6;
//     border-radius: 5px;
//   }
// }
</style>
