<template>
  <div class="company-register">
    <!-- 公司注册 !InfoPerfectStatus && !restsInfoStatus-->
    <el-form
      ref="companyRegister"
      :model="companyRegisterData"
      :rules="formDataRules"
      class="company_register submit_form"
      :key="'companyRegister'"
      v-show="
        !InfoPerfectStatus &&
          !restsInfoStatus &&
          !IsShowRegisterSuccess &&
          !isShowResumeImport
      "
    >
      <span class="form_title">企业注册</span>
      <el-form-item label="手机号" prop="Mobile">
        <el-input
          v-model="companyRegisterData.Mobile"
          @blur="closeMobileMsg"
          placeholder="请输入手机号"
        ></el-input
      ></el-form-item>
      <el-form-item label="管理员用户名" prop="Username">
        <el-input
          @blur="closeUserNameMsg"
          v-model="companyRegisterData.Username"
          placeholder="请输入管理员用户名"
        ></el-input
      ></el-form-item>
      <el-form-item label="管理员账号密码" prop="Password">
        <el-input
          v-model="companyRegisterData.Password"
          type="password"
          placeholder="请输入管理员账号密码"
        ></el-input
      ></el-form-item>

      <el-form-item label="确认密码" prop="affirmPassword">
        <el-input
          v-model="companyRegisterData.affirmPassword"
          type="password"
          placeholder="请输入确认密码"
        ></el-input
      ></el-form-item>
      <el-form-item label="验证码" prop="Code"
        ><captcha
          :captchaVal.sync="companyRegisterData.Code"
          @resterfun="closeCodeMsg"
          ref="captCha"
        ></captcha
      ></el-form-item>

      <el-form-item label="手机验证码" prop="MobileCode">
        <mobile-code
          :codeVal.sync="companyRegisterData.MobileCode"
          ref="mobileCode"
          :codeMessage.sync="codeMessage"
          :mobileMsg.sync="mobileMsg"
          @mobileNull="validatorMobile"
          @codeNull="valiDatorCode"
          @mobileCodeMsg="closeMobileCodeMsg"
          :userNameMsg.sync="userNameMsg"
        ></mobile-code>
      </el-form-item>
      <el-form-item class="login_footer">
        <el-checkbox v-model="userAgreement"></el-checkbox>
        注册即表示您同意了我们的

        <a href="#/ServiceAgreement" target="_blank">用户协议</a>
        <a href="#/PrivacyClause" target="_blank">隐私协议</a>
      </el-form-item>
      <el-form-item label="">
        <button
          class="w-btn btn-fluid mt0"
          :class="{ no: !userAgreement }"
          @click="onSubmit" type='button'
          :disabled="!userAgreement"
        >
          下一步
        </button>
      </el-form-item>
      <span class="a_but"> 已有账号？ <a @click="onLogin">立即登录</a> </span>
    </el-form>

    <!-- 完善信息 -->
    <el-form
      ref="companyInfoPerfect"
      :model="companyRegisterDto"
      :rules="formDataRules"
      :key="'companyInfoPerfect'"
      class="company_register submit_form"
      v-show="InfoPerfectStatus"
    >
      <span class="form_title">完善信息</span>
      <el-form-item label="管理员姓名" prop="Contract">
        <el-input
          v-model="companyRegisterDto.Contract"
          placeholder="请输入管理员姓名"
        ></el-input
      ></el-form-item>
      <el-form-item label="管理员邮箱" prop="Email">
        <el-input
          v-model="companyRegisterDto.Email"
          placeholder="请输入管理员邮箱"
        ></el-input
      ></el-form-item>
      <el-form-item label="公司名称" prop="CompanyName">
        <el-input
          @blur="closeCompanyNameMsg"
          v-model="companyRegisterDto.CompanyName"
          placeholder="请输入公司名称"
        ></el-input
      ></el-form-item>

      <el-form-item label="公司行业" prop="Industry">
        <el-cascader
          :options="$store.getters.industry_item_list"
          :props="optionProps"
          v-model="companyRegisterDto.Industry"
          :show-all-levels="false"
          filterable
        >
        </el-cascader>
      </el-form-item>

      <el-form-item label="所在城市" prop="City">
        <!-- <el-cascader
          :options="$store.getters.city_item"
          :props="optionProps"
          placeholder="请选所在城市"
          v-model="companyRegisterDto.City"
          :show-all-levels="false"
          filterable
        >
        </el-cascader> -->

        <el-select
          placeholder="请选所在城市"
          filterable
          v-model="companyRegisterDto.City"
        >
          <el-option-group
            v-for="items in $store.getters.city_item"
            :key="items.ItemName"
            :label="items.ItemName"
          >
            <el-option
              v-for="item in items.Childs"
              :key="item.ItemCode"
              :label="item.ItemName"
              :value="item.ItemCode"
            ></el-option>
          </el-option-group>
        </el-select>
      </el-form-item>

      <el-form-item label="公司性质" prop="CompanyStockType">
        <el-select
          placeholder="企业性质"
          v-model="companyRegisterDto.CompanyStockType"
          size="mini"
        >
          <el-option
            v-for="items in dd_company_stock"
            :key="items.ItemName"
            :label="items.ItemName"
            :value="items.ItemCode"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="公司规模" prop="CompanyScale">
        <el-select
          placeholder="公司规模"
          v-model="companyRegisterDto.CompanyScale"
          size="mini"
        >
          <el-option
            v-for="items in dd_staff_size"
            :key="items.ItemName"
            :label="items.ItemName"
            :value="items.ItemCode"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="联系人" prop="ContactPerson">
        <el-input
          v-model="companyRegisterDto.ContactPerson"
          placeholder="请输入联系人"
        ></el-input></el-form-item
      ><el-form-item label="联系人电话" prop="Phone">
        <el-input
          v-model="companyRegisterDto.Phone"
          placeholder="请输入联系人电话"
        ></el-input
      ></el-form-item>

      <el-form-item label="">
        <button class="w-btn btn-fluid mt30" type='button' @click="onPerfectInfo">
          下一步
        </button>
      </el-form-item>
    </el-form>

    <!--其他待补充信息-->
    <el-form
      ref="companyRestsInfo"
      :model="companySupply"
      :rules="formDataRules"
      :key="'companyRestsInfo'"
      class="company_register rests_info submit_form"
      v-show="restsInfoStatus"
    >
      <div class="form-content">
        <span class="form_title">其他待补充信息</span>
        <a class="right-tip" @click="onSkipSave"
          >暂先跳过<span class="iconfont icon-arrow-right"></span
        ></a>

        <el-form-item label="招聘负责人" prop="RecruitPerson">
          <el-input
            v-model="companySupply.RecruitPerson"
            placeholder="请输入联系人"
          ></el-input></el-form-item
        ><el-form-item label="招聘负责人电话" prop="RecruitPersonTel">
          <el-input
            v-model="companySupply.RecruitPersonTel"
            placeholder="请输入联系人电话"
          ></el-input
        ></el-form-item>
        <el-form-item label="企业成立时间" prop="FoundedTime">
          <el-date-picker
            v-model="companySupply.FoundedTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker> </el-form-item
        ><el-form-item label="公司网址" prop="WebUrl">
          <el-input
            v-model="companySupply.WebUrl"
            placeholder="请输入公司网址"
            maxlength="50"
            show-word-limit
          ></el-input
        ></el-form-item>

        <el-form-item label="公司简介" prop="Description">
          <el-input
            v-model="companySupply.Description"
            type="textarea"
            maxlength="500"
            show-word-limit
            placeholder="请输入公司简介"
          ></el-input
        ></el-form-item>

        <el-form-item label="">
          <button class="w-btn btn-fluid mt30" @click="onSave">保存</button>
        </el-form-item>
      </div>
    </el-form>

    <!-- 注册成功 -->
    <el-form class="submit_form  register_success" v-if="IsShowRegisterSuccess">
      <div class="form-content">
        <span class="iconfont icon-check"></span>
        <span class="title_font_mix16"
          >您已成功注册人才拼图，<br />您可在
          "企业信息维护“模块继续进行相关信息的填写！</span
        >
        <button class="w-btn btn-fluid" type='button' @click="goCompanyHome">
          知道了
        </button>
      </div>
    </el-form>

    <!-- 我知道了  -> 是否简历导入-->
    <el-form class="submit_form  register_success" v-if="isShowResumeImport">
      <div class="form-content">
        <span class="iconfont icon-cloud"></span>
        <span class="title_font_mix16 import_title"
          >人才拼图平台支持简历云端管理，<br />
          现在就开始导入简历，解放您的招聘工作流</span
        >
        <button class="w-btn btn-fluid" type='button' @click="onResumeImport">
          简历导入
        </button>
        <button class="w-btn btn-fluid btn-cancel" type='button' @click="goCompanyHome">
          取消
        </button>
      </div>
    </el-form>
  </div>
</template>
<script>
import Captcha from "components/Captcha";
import MobileCode from "components/MobileCode";
import { mapGetters } from "vuex";
import {
  CheckMobile,
  AddCompanyRegister,
  UpdateCompanySupply
} from "api/companyApi";
//
export default {
  name: "companyRegister", //公司注册
  components: {
    Captcha,
    MobileCode
  },
  computed: {
    ...mapGetters(["dd_staff_size", "dd_company_stock"])
  },
  data() {
    const rePassword = (rule, value, callback) => {
      if (this.companyRegisterData.Password !== value) {
        callback(new Error("两次密码不一致!"));
      } else {
        callback();
      }
    };

    // const isCityNull = (rule, value, callback) => {
    //   if (this.companyRegisterDto.City == "") {
    //     callback(new Error("请选择所在城市!"));
    //   } else {
    //     callback();
    //   }
    // };
    const isIndustryNull = (rule, value, callback) => {
      if (this.companyRegisterDto.Industry == "") {
        callback(new Error("请选择公司行业!"));
      } else {
        callback();
      }
    };

    const isExitsCompanyName = (rule, value, callback) => {
      if (this.CompanyNameMsg) {
        callback(new Error(this.CompanyNameMsg));
      } else {
        callback();
      }
    };

    /**
        data创建初期无法通过this.companyRegisterData获取到this里面的data数据  
        需要事先声明变量和data里面的数据绑定
     */
    let companyRegisterData = {
      Username: "",
      Code: "",
      MobileCode: "",
      Contract: "",
      Mobile: "",
      Email: "",
      Password: "",
      affirmPassword: "",
      GroupId: ""
    };
    return {
      registerGroupId: "",
      userAgreement: false,
      InfoPerfectStatus: false,
      restsInfoStatus: false,
      IsShowRegisterSuccess: false,
      isShowResumeImport: false,

      CompanyNameMsg: "",
      mobileCodeMsg: "",
      mobileMsg: "",
      userNameMsg: "",
      msg: "aaaa",
      codeMessage: "",
      formData: {
        Username: "",
        Password: "",
        Code: "",
        ReturnUrl: ""
      },
      optionProps: {
        value: "ItemCode",
        label: "ItemName",
        children: "Childs"
      },
      companyRegisterData: companyRegisterData,
      formDataRules: {
        Username: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this).Accounts
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
            required: true,
            trigger: "blur",
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
        affirmPassword: [
          {
            trigger: "blur",
            required: true,
            validator: rePassword
          }
        ],
        PicCode: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this).Captcha
          }
        ],

        TelUserName: [
          { required: true, message: "请输入管理员姓名", trigger: "blur" }
        ],
        Email: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this).Email
          }
        ],
        CompanyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { required: false, trigger: "blur", validator: isExitsCompanyName }
        ],
        Industry: [
          {
            required: true,
            message: "",
            trigger: "change",
            validator: isIndustryNull
          }
        ],
        City: [
          { required: true, message: "请选择所在城市", trigger: "change" }
          // {
          //   required: true,
          //   trigger: "change",
          //   validator: isCityNull
          // }
        ],
        CompanyStockType: [
          {
            required: true,
            message: "请选择公司性质",
            trigger: "change"
          }
        ],
        CompanyScale: [
          { required: true, message: "请选择公司规模", trigger: "change" }
        ],
        ContactPerson: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        Phone: [
          {
            required: true,
            trigger: "blur",
            validator: this.$formValidate(this).Mobile
          }
        ],
        MobileCode: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this, companyRegisterData).MobileCode
          }
        ],
        RecruitPersonTel: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this, companyRegisterData).Mobile
          }
        ],
        Description: [
          { required: true, message: "请输入公司简介", trigger: "blur" }
        ]
      },
      companySupply: {
        Id: "string", //公司id
        RecruitPerson: "",
        RecruitPersonTel: "",
        FoundedTime: "",
        WebUrl: "",
        Description: ""
      },
      companyRegisterDto: {
        CompanyType: 1,
        CompanyName: "",
        Industry: "",
        City: "",
        Contract: "",
        CompanyStockType: "",
        ContactPerson: "",
        TelUserName: "",
        Email: "",
        Phone: "",
        RecruitPerson: "",
        RecruitPersonTel: "",
        CompanyScale: "",
        SalesScale: "",
        FoundedTime: "",
        WebUrl: "",
        Description: "",
        GroupId: ""
      }
    };
  },
  methods: {
    /** 去企业首页 */
    goCompanyHome() {
      // this.$store
      //   .dispatch("GetCompany")
      //   .then(res => {
      //     if (res) {
      this.$router.push({ path: "/CompanyHome" });
      this.$router.go(0);
      //   } else {
      //     this.$router.push({ path: "/CompanyLogin" });
      //     // this.$router.go(0);
      //   }
      // })
      // .catch(err => {
      //   this.$message.error(err);
      // });
    },
    onResumeImport() {
      //简历导入
    },
    onSkipSave() {
      this.restsInfoStatus = false;
      this.IsShowRegisterSuccess = true;
    },
    onSave() {
      this.$refs["companyRestsInfo"].validate(valid => {
        if (valid) {
          this.companySupply.GroupId = this.registerGroupId;
          UpdateCompanySupply(this.companySupply).then(res => {
            if (res.data.Success) {
              this.onSkipSave();
              this.$message({
                message: "保存成功",
                type: "success"
              });
            } else {
              this.$message.error(res.data.Message);
            }
          });
        }
      });
    },

    //第一次提交
    onSubmit() {
      this.$refs["companyRegister"].validate(valid => {
        if (valid) {
          if (!this.userAgreement) {
            this.$message({
              message: "请勾选隐私条款和用户协议",
              type: "warning"
            });
            return;
          }
          this.CheckMobile();
          // this.InfoPerfectStatus = true;
        }
      });
    },

    //手机号验证是否已经注册
    CheckMobile() {
      CheckMobile({
        Mobile: this.companyRegisterData.Mobile,
        Code: this.companyRegisterData.MobileCode,
        UserName: this.companyRegisterData.Username
      }).then(res => {
        if (res.data.Success) {
          // this.countDown();
          this.InfoPerfectStatus = true;
          this.companyRegisterDto.ContactPerson = this.companyRegisterData.Username; //联系人姓名  <-  管理员账号
          this.companyRegisterDto.Phone = this.companyRegisterData.Mobile; //联系人手机号  <-  管理员手机号
        } else {
          this.closeMobileCodeMsg(res.data.Message);
        }
      });
    },

    closeMobileCodeMsg(msg) {
      this.mobileCodeMsg = msg ? msg : "";
      this.$refs["companyRegister"].validateField("MobileCode");
    },
    //完善信息提交
    onPerfectInfo() {
      this.$refs["companyInfoPerfect"].validate(valid => {
        if (valid) {
          this.companyRegisterData.GroupId = this.registerGroupId;

          this.companyRegisterDto.GroupId = this.registerGroupId;
          this.companyRegisterDto.TelUserName = this.companyRegisterData.Mobile; //
          this.companyRegisterDto.Industry = this.companyRegisterDto.Industry[1];
          // this.companyRegisterDto.City = this.companyRegisterDto.City[1];

          this.companyRegisterData.Contract = this.companyRegisterDto.Contract; //管理员
          this.companyRegisterData.Email = this.companyRegisterDto.Email;
          let data = {
            userAddDto: this.companyRegisterData,
            companyRegisterDto: this.companyRegisterDto
            // GroupId: this.registerGroupId
          };
          AddCompanyRegister(data).then(res => {
            let errors = res.data.Errors;
            if (res.data.Success) {
              this.InfoPerfectStatus = false;
              this.restsInfoStatus = true;
              this.companySupply.RecruitPerson = this.companyRegisterData.Username;
              this.companySupply.RecruitPersonTel = this.companyRegisterData.Mobile;
              this.companySupply.Id = res.data.Data.Id;
            } else {
              if (errors.length > 0) {
                if (errors[0].Member == "1300") {
                  //公司名被注册
                  this.CompanyNameMsg = errors[0].Message;
                  this.$refs["companyInfoPerfect"].validateField("CompanyName");
                }
                if (errors[0].Member == "1100") {
                  this.InfoPerfectStatus = false;
                  this.UserNameMsg = errors[0].Message;
                  this.$refs["companyRegister"].validateField("Username");
                }
                if (errors[0].Member == "1200") {
                  this.InfoPerfectStatus = false;
                  this.mobileMsg = errors[0].Message;
                  this.$refs["companyRegister"].validateField("Mobile");
                }
              }
            }
          });

          // this.$refs.captCha.getCaptcha();
        }
      });
    },

    //手机号验证-> 图形验证码验证 ->  接口验证 图形验证码是否正确
    validatorMobile() {
      this.$refs["companyRegister"].validateField("Mobile", valid => {
        if (!valid) {
          this.$refs["companyRegister"].validateField("Code", valid => {
            if (!valid) {
              this.$refs.mobileCode.getMobileCode(
                this.companyRegisterData.Mobile,
                this.companyRegisterData.Code,
                this.companyRegisterData.Username
              );
            }
          });
        }
      });
    },

    //清空手机号错误信息
    closeMobileMsg() {
      this.mobileMsg = "";
      this.$refs["companyRegister"].validateField("Mobile");
    },

    closeCompanyNameMsg() {
      this.CompanyNameMsg = "";
      this.$refs["companyInfoPerfect"].validateField("CompanyName");
    },
    closeUserNameMsg() {
      this.userNameMsg = "";
      this.$refs["companyRegister"].validateField("Username");
    },
    //重新判断图形验证码信息是否正确
    valiDatorCode() {
      this.$refs["companyRegister"].validateField("Mobile");
      this.$refs["companyRegister"].validateField("Username");
      this.$refs["companyRegister"].validateField("Code", valid => {
        if (valid) {
          this.$refs.captCha.getCaptcha();
        }
      });
    },

    //清楚图形验证码错误信息
    closeCodeMsg() {
      this.codeMessage = "";
      this.$refs["companyRegister"].validateField("Code");
    },

    onLogin() {
      this.$emit("goLogin");
    }
  },
  mounted() {},
  created() {
    // this.$store.dispatch("getCompanyLogin");
    this.$store.dispatch("getAllDD");
    this.$store.dispatch("getCityItem"); //地图
    this.$store.dispatch("getIndustryItemList"); // 行业
    this.$store.dispatch("GetCompanyStockList"); //"企业性质

    if (this.$route.query.groupid) {
      this.registerGroupId = this.$route.query.groupid;
    }

    console.info(this.registerGroupId)
  }
};
</script>
<style lang="scss">
@import "~@/styles/mixin.scss";

.company_register {
  .el-textarea {
    height: 120px;
    textarea {
      height: 120px;
      resize: none;
    }
    .el-input__count {
      bottom: 0px;
      right: -45px;
    }
  }
  .el-cascader {
    width: 100%;
  }
  .el-select {
    width: 100%;
    height: 40px;
  }
  .el-input--mini {
    .el-input__inner {
      height: 40px;
    }
  }
}
.register_success {
  // @include df;
  // width: 800px;
  // text-align: center;
  // // margin-top: 136px;
  position: relative;
  width: 410px;
  background-color: #fff;
  margin: 120px auto 120px;
  padding: 35px 65px 30px;
  .form-content {
    margin-left: -50px;
    margin-right: -50px;
    .btn-fluid {
      margin-top: 44px;
      margin-bottom: 15px;
    }
    .iconfont {
      &.icon-check,
      &.icon-cloud {
        font-size: 70px;
        color: #99c3f1;
        margin-top: 20px;
        margin-bottom: 15px;
      }
    }
    .ok_icon {
      width: 100%;
      margin-bottom: 56px;
      > img {
        @include wh(80px, 80px);
      }

      // margin-top: 136px;
    }
    > span {
      width: 100%;
      display: block;
    }
    .import_title {
      line-height: 28px;
    }
    .but_save {
      @include wh(172px, 42px);
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      margin-left: 0 !important;
    }

    .import_icon {
      margin-bottom: 56px;
      img {
        width: 52px;
        height: 52px;
      }
    }
    button {
      width: 270px;
    }
    .btn-cancel {
      margin-top: 0;
    }
  }
}
.company-register {
  padding-bottom: 20px;
  position: relative;
  overflow: auto;
  min-height: 835px;
}
</style>
<style lang="scss" scoped>
.login_footer {
  font-size: 13px;
  color: #999;
  text-align: left;
  letter-spacing: 1px;
  font-weight: bold;
  a {
    cursor: pointer;
    text-decoration: underline;
    color: #428dde;
  }
}

.w-btn {
  &.no {
    background: #909399;
  }
}
@import "~@/styles/mixin.scss";
.el-col {
  margin: 10px 0;

  &.file_format {
    color: rgba(136, 136, 136, 1);
  }
}
.el-form {
  position: relative;
}
.skip_but {
  position: absolute;
  top: 18px;
  right: 18px;
}
.right-tip {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  line-height: 32px;
  background-color: #f5f5f5;
  padding-left: 10px;
  padding-right: 10px;
  color: $blue;
  .iconfont {
    font-size: 12px;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -20px;
    width: 0;
    height: 0;
    border-color: transparent #f5f5f5;
    border-width: 0 20px 32px 0;
    border-style: solid;
  }

  &:hover {
    color: $blue-hover;
  }
}
// .el-form {
//   width: 480px;
//   padding: 48px 60px 41px 60px;
//   @include boxSd(0px 0px 12px 0px rgba(162, 190, 196, 0.3));
//   .el-form-item__label {
//     line-height: auto;
//     margin-top: 13px;
//     margin-bottom: 18px;
//   }
//   .form_title {
//     margin-bottom: 27px;
//     display: block;
//   }
//   .info_mix_but {
//     margin-top: 14px;
//     margin-bottom: 14px;
//   }
// }
.company_register {
  background: #fff;
  // width: 500px;
  // padding: 20px 20px;
  text-align: center;
}
</style>
