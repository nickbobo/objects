<template>
  <div class="company_login" :class="{ one: !showStatus }">
    <!-- <img class="top_bg" src="~static/img/company_login_topbg.png" /> -->

    <el-row class="company_login_center">
      <!-- 企业用户登录   v-if="showStatus && pwdStatus"   同一个页面两个form 通过v-if隐藏切换时  必须要通过key 来区分  不然第二个form不会表单验证-->
      <el-form
        ref="companyLogin"
        :model="formData"
        :rules="rulesCompanyLogin"
        :key="'companyLogin'"
        class="submit_form"
        v-if="!showStatus && !pwdStatus"
      >
        <span class="form_title">企业用户登录</span>

        <el-form-item label="用户名/手机号" prop="Username">
          <el-input
            v-model="formData.Username"
            v-focus
            placeholder="用户名/手机号"
          ></el-input
        ></el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input
            v-model="formData.Password"
            type="password"
            placeholder="请输入密码"
          ></el-input
        ></el-form-item>
        <el-form-item label="图形验证码" prop="Code"
          ><captcha
            :captchaVal.sync="formData.Code"
            ref="captCha"
            @onLogin="onLogin"
            @resterfun="closeLoginCodeMsg"
            @login="onLogin"
          ></captcha
        ></el-form-item>

        <el-form-item label="">
          <div class="w-btn btn-fluid mt30" @click="onLogin">登录</div>
          <!-- <el-button @click="onLogin" type="primary" class="info_mix_but"
            >登录</el-button
          > -->
        </el-form-item>
        <span class="a_but">
          还没有账号？ <a @click="showStatus = true">立即注册</a>
          <a @click="onEditPwd">忘记密码</a>
        </span>
      </el-form>

      <!-- 密码修改  v-if="!pwdStatus"-->
      <el-form
        ref="editPassword"
        :model="editPwdData"
        :rules="rulesEditPwd"
        class="submit_form"
        :key="'editPassword'"
        v-if="pwdStatus"
      >
        <span class="form_title">找回密码</span>
        <el-form-item label="手机号" prop="Mobile">
          <el-input
            v-model="editPwdData.Mobile"
            @blur="closeMobileMsg"
            placeholder="请输入手机号"
          ></el-input
        ></el-form-item>
        <el-form-item label="新密码" prop="NewPassword">
          <el-input
            v-model="editPwdData.NewPassword"
            type="password"
            placeholder="请输入新密码"
          ></el-input
        ></el-form-item>

        <el-form-item label="确认密码" prop="RePassword">
          <el-input
            v-model="editPwdData.RePassword"
            type="password"
            placeholder="请输入确认密码"
          ></el-input
        ></el-form-item>
        <el-form-item label="图形验证码" prop="PicCode"
          ><captcha
            :captchaVal.sync="editPwdData.PicCode"
            ref="captCha"
            @resterfun="closeCodeMsg"
          ></captcha
        ></el-form-item>

        <el-form-item label="手机验证码" prop="MobileCode">
          <mobile-code
            :codeVal.sync="editPwdData.MobileCode"
            ref="mobileCode"
            :codeMessage.sync="codeMessage"
            :mobileMsg.sync="mobileMsg"
            @mobileNull="getEditPwdMobileCode"
            @codeNull="valiDatorCode"
            @mobileCodeMsg="closeMobileCodeMsg"
          ></mobile-code>
        </el-form-item>

        <el-form-item label="">
          <el-button class="w-btn btn-fluid mt30" type='button' @click="onSavePwd">
            保存新密码
          </el-button>
          <!-- <el-button @click="onSavePwd" type="primary" class="info_mix_but"
            >保存新密码</el-button
          > -->
        </el-form-item>
        <span class="a_but">
          <a @click="goLoginPage">返回登录</a>
        </span>
        <!-- <span class="a_but"><p @click="goLoginPage">返回登录</p></span> -->
      </el-form>
      <company-register
        @goLogin="showStatus = false"
        v-if="showStatus"
      ></company-register>
    </el-row>
  </div>
</template>
<script>
import Captcha from "components/Captcha";
import MobileCode from "components/MobileCode";
import CompanyRegister from "./CompanyRegister";

import { Login, FindPassword } from "api/companyApi";
export default {
  name: "CompanyLogin", //公司登陆
  components: {
    Captcha,
    MobileCode,
    CompanyRegister
  },
  data() {
    const rePassword = (rule, value, callback) => {
      if (this.editPwdData.NewPassword !== value) {
        callback(new Error("两次密码不一致!"));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (this.editPwdData.MobileCode == "") {
        callback(new Error("请输入手机验证码！"));
      } else {
        callback();
      }
    };
    let editPwdData = {
      Mobile: "",
      NewPassword: "",
      RePassword: "",
      PicCode: "",
      MobileCode: ""
    };
    return {
      codeMessage: "",
      mobileMsg: "",
      mobileCodeMsg: "",
      loginMessage: "",
      showStatus: false,
      pwdStatus: false,
      formData: {
        Username: "",
        Password: "",
        Code: "",
        ReturnUrl: ""
      },
      rulesCompanyLogin: {
        Username: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this).Account
          }
        ],
        Password: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this).Password
          }
        ],
        Code: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this).Captcha
          }
        ]
      },
      editPwdData: editPwdData,
      rulesEditPwd: {
        PicCode: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this).Captcha
          }
        ],
        Mobile: [
          {
            required: true,
            trigger: "blur",
            validator: this.$formValidate(this).Mobile
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
        ],
        MobileCode: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this, editPwdData).MobileCode
          }
        ]
      },

      companyRegisterData: {
        CompanyId: "",
        UserType: 1,
        Username: "",
        Contract: "",
        Mobile: "",
        Email: "",
        Password: "",
        affirmPassword: "",
        Enable: true,
        CreateTime: "2020-06-09T08:57:43.141Z",
        UserState: 1,
        GroupId: ""
      }
    };
  },
  methods: {
    enterToLogin(ev) {
      ev.keyCode === 13 && this.onLogin();
    },
    onEditPwd() {
      this.$refs["companyLogin"].resetFields();
      this.pwdStatus = true;
    },
    goLoginPage() {
      this.pwdStatus = false;
    },
    onLogin() {
      this.$refs["companyLogin"].validate(valid => {
        if (valid) {
          this.$store.dispatch("companyLogin", this.formData).then(res => {
            if (res.data.Success) {
              this.goCompanyHomePage();
            } else {
              this.codeMessage = res.data.Errors[0].Message;
              this.$refs["companyLogin"].validateField("Code");
            }
            this.$refs.captCha.getCaptcha(); //验证码重置
          });
        }
      });
    },
    goCompanyHomePage() {
      // this.$store
      //   .dispatch("GetCompany")
      //   .then(() => {\
      // setTimeout(() => {
        this.$router.push({ path: "/CompanyHome" });
      // }, 800);

      // this.$router.go(0);
      // })
      // .catch(err => {
      //   this.$message.error(err);
      // });
    },

    onSavePwd() {
      this.$refs["editPassword"].validate(valid => {
        if (valid) {
          FindPassword(this.editPwdData).then(res => {
            if (res.data.Success) {
              this.$message({
                message: "密码修改成功",
                type: "success"
              });
              this.pwdStatus = false;
            } else {
              this.closeMobileCodeMsg(res.data.Message);
            }
          });
        }
      });
    },
    closeMobileCodeMsg(msg) {
      this.mobileCodeMsg = msg ? msg : "";
      this.$refs["editPassword"].validateField("MobileCode");
    },
    getEditPwdMobileCode() {
      this.$refs["editPassword"].validateField("Mobile", valid => {
        if (!valid) {
        }
      });

      this.$refs["editPassword"].validateField("PicCode", valid => {
        if (!valid) {
          this.$refs.mobileCode.getEditPwdCode(
            this.editPwdData.Mobile,
            this.editPwdData.PicCode
          );
        }
      });
    },

    valiDatorCode() {
      this.$refs["editPassword"].validateField("Mobile", valid => {
        if (!valid) {
        }
      });
      this.$refs["editPassword"].validateField("PicCode", valid => {
        if (valid) {
          // this.$refs.captCha.getCaptcha();
        }
      });
    },
    closeMobileMsg() {
      this.mobileMsg = "";
      this.$refs["editPassword"].validateField("Mobile");
    },
    closeLoginCodeMsg() {
      this.codeMessage = "";
      this.$refs["companyLogin"].validateField("Code");
    },
    closeCodeMsg() {
      this.codeMessage = "";
      this.$refs["editPassword"].validateField("PicCode");
    }
  },
  mounted() {},
  created() {
    // this.$store.dispatch("getCompanyLogin").then(res => {
    //   if (res) {
    //     this.$router.push({ path: "/CompanyHome" });
    //   }
    // });
  },
  watch: {
    editPwdData: function(newVue) {
      if (newVue.PicCode) {
        this.codeMessage = "";
      }
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.children[0].focus();
      }
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/mixin.scss";
.company_login {
  @include logBgImg();
  //
      background-size: 100% 100%;
  // .el-form {
  //   .el-form-item__label {
  //     line-height: inherit;
  //     // margin-top: 13px;
  //     // margin-bottom: 18px;
  //   }
  // }
  // &.one {
  //   position: absolute;
  // }

  .submit_form {
    background: #fff;
    text-align: center;
    &.el-form {
      width: 410px;
      background-color: #fff;
      margin: 37px auto 120px;
      padding: 35px 65px 30px;

      @include shadow;
      .el-form-item__label {
        margin-bottom: 4px;
        margin-left: 3px;
        // height: 19px;
        font-weight: 400;
        display: block;
        color: #999;
        padding: 0;
        line-height: inherit;
      }
      .form_title {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
        display: block;
        color: #333;
      }
      .info_mix_but {
        margin-top: 14px;
        margin-bottom: 14px;
      }
      .el-date-editor {
        width: 100%;
      }
      // &.register_success {
      //   width: 800px;
      //   height: 620px;
      //   padding-top: 136px;
      // }
      .el-form-item__content {
        line-height: 38px;
        .el-input__inner {
          height: 38px;
          line-height: 38px;
          border: 1px solid #eee;
        }
      }
      .el-form-item__label {
        &::before {
          display: none;
        }
      }
    }
  }

  .a_but {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 0;
    a {
      color: #428dde;
      border-bottom: 1px solid #428dde;
      padding-bottom: 1px;
      margin-right: 5px;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.el-col {
  margin: 10px 0;

  &.file_format {
    color: rgba(136, 136, 136, 1);
  }
}
.company_login {
  width: 100%;
  font-weight: 400;
  margin-top: -30px;
  .company_login {
    width: 100%;
  }
  .company_login_center {
    width: 100%;
    min-height: calc(100vh - 70px - 136px);
  }
}
</style>
