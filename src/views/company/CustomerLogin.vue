<template>
  <div class="customer_login">
    <!-- <img class="top_bg" src="~static/img/company_login_topbg.png" /> -->

    <el-row class="customer_login_center">
      <!-- 企业用户登录   v-if="showStatus && pwdStatus"   同一个页面两个form 通过v-if隐藏切换时  必须要通过key 来区分  不然第二个form不会表单验证-->
      <el-form
        ref="customerLogin"
        :model="formData"
        :rules="rulesCompanyLogin"
        :key="'customerLogin'"
        class="submit_form"
      >
        <span class="form_title">客服人员登录</span>

        <el-form-item label="客户公司" prop="CompanyId">
          <el-select
            filterable
            remote
            reserve-keyword
            placeholder="请选择公司"
            :remote-method="getCompanyByName"
            :loading="companyLoading"
            v-model="formData.CompanyId"
          >
            <el-option
              v-for="items in companyList"
              :key="items.text"
              :label="items.text"
              :value="items.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名/手机号" prop="Username">
          <el-input
            v-model="formData.Username"
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
            @resterfun="closeLoginCodeMsg"
          ></captcha
        ></el-form-item>

        <el-form-item label="">
          <div class="w-btn btn-fluid mt30" @click="onLogin">登录</div>
          <!-- <el-button @click="onLogin" type="primary" class="info_mix_but"
            >登录</el-button
          > -->
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import Captcha from "components/Captcha";
import MobileCode from "components/MobileCode";
import CompanyRegister from "./CompanyRegister";

import { Login, FindPassword, GetCompanyByName } from "api/companyApi";
export default {
  name: "CustomerLogin", //公司登陆
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
      companyLoading: false,
      companyList: [
        // {
        //   groupId: "fb9fd860-859e-47c2-9968-bc02ba3d237b",
        //   id: "96ed65a4-4331-4e8b-9d3c-26e2a048ab11",
        //   text: "上海中智"
        // },
        // {
        //   groupId: "fb9fd860-859e-47c2-9968-bc02ba3d237b",
        //   id: "cce0bc55-06e4-4867-b676-679b933c3757",
        //   text: "上海锦江"
        // },
        // {
        //   groupId: "fb9fd860-859e-47c2-9968-bc02ba3d237b",
        //   id: "f47abca6-c101-4907-b5a3-4f15dc15f8bf",
        //   text: "上海中智外包"
        // }
      ],
      codeMessage: "",
      mobileMsg: "",
      mobileCodeMsg: "",
      loginMessage: "",
      showStatus: false,
      pwdStatus: false,
      formData: {
        CompanyId: "",
        Username: "",
        Password: "",
        Code: "",
        ReturnUrl: ""
      },
      rulesCompanyLogin: {
        CompanyId: [{ required: true, message: "请选择公司", trigger: "blur" }],
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
    /**
     * key 获取公司列表
     */
    getCompanyByName(keyVal) {
      this.companyLoading = true;
      GetCompanyByName({ Keyword: keyVal }).then(res => {
        if (res.data.Success) {
          this.companyLoading = false;
          this.companyList = res.data.Data;
        } else {
          this.closeMobileCodeMsg(res.data.Message);
        }
      });
    },
    // onEditPwd() {
    //   this.$refs["companyLogin"].resetFields();
    //   this.pwdStatus = true;
    // },
    goLoginPage() {
      this.pwdStatus = false;
    },

    onLogin() {
      this.$refs["customerLogin"].validate(valid => {
        if (valid) {
          this.$store.dispatch("CustomerLogin", this.formData).then(res => {
            if (res.data.Success) {
              this.goCompanyHomePage();
            } else {
              this.codeMessage = res.data.Errors[0].Message;
              this.$refs["customerLogin"].validateField("Code");
            }
            this.$refs.captCha.getCaptcha(); //验证码重置
          });
        }
      });
    },
    goCompanyHomePage() {
      // this.$store
      //   .dispatch("GetCompany")
      //   .then(() => {
        this.$router.push({ path: "/CompanyHome" });
      // this.$router.go(0);
      // })
      // .catch(err => {
      //   this.$message.error(err);
      // });
    },

    closeMobileCodeMsg(msg) {
      this.mobileCodeMsg = msg ? msg : "";
      this.$refs["editPassword"].validateField("MobileCode");
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
      this.$refs["customerLogin"].validateField("Code");
    },
    closeCodeMsg() {
      this.codeMessage = "";
      this.$refs["editPassword"].validateField("PicCode");
    }
  },
  mounted() {},
  created() {

  },
  watch: {
    editPwdData: function(newVue) {
      if (newVue.PicCode) {
        this.codeMessage = "";
      }
    }
  }
};
</script>
<style lang="scss">
// @import "~@/styles/mixin.scss";
// .company_login {
// }
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.el-col {
  margin: 10px 0;

  &.file_format {
    color: rgba(136, 136, 136, 1);
  }
}
.customer_login {
  width: 100%;
  font-weight: 400;
  margin-top: -30px;
  @include logBgImg();
  height: 100%;
  >>> .submit_form {
    background: #fff;
    text-align: center;
    &.el-form {
      width: 410px;
      background-color: #fff;
      margin: 150px auto 120px;
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
      .el-select {
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
  .customer_login {
    width: 100%;
  }
  .customer_login_center {
    width: 100%;
    min-height: calc(100vh - 70px - 136px);
  }
}
</style>
