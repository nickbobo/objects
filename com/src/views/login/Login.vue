<template>
  <el-row class="home_login">
    <el-col :span="24" class="home_login_content">
      <el-col :span="12" class="login_info">
        <el-form
          ref="userLogin"
          label-position="top"
          :rules="rulesLoginInfo"
          label-width="80px"
          :model="loginInfo"
        >
          <el-col :span="24" class="login_title">用户登录／注册</el-col>
          <el-form-item prop="mobile">
            <el-input
              v-model="loginInfo.mobile"
              placeholder="手机号"
              @blur="mobileBlur"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item prop="status">
           <jc-range   :successFun="onMpanelSuccess" :errorFun="onMpanelError"></jc-range >
          </el-form-item> -->
          <el-form-item prop="code">
            <el-input
              v-model="loginInfo.code"
              placeholder="验证码"
              @blur="codeBlur"
            ></el-input>
            <el-button
              class="get_mobile_code"
              type="primary"
              v-if="!editStatus"
            >
              <span v-if="show" @click.stop="onGetCode">获取验证码</span>
              <span v-if="!show" class="count">重新发送({{ count }})</span>
            </el-button>
          </el-form-item>
          <el-form-item v-if="!editStatus">
            <el-button
              type="primary"
              size="medium"
              class="login_register_but"
              @click="onSubmit('userLogin')"
              >验证码登录/注册</el-button
            >
          </el-form-item>
          <el-col :span="24" class="login_footer">
            注册即表示您同意了我们的
            <a href="#/ServiceAgreement" target="_blank">用户协议</a>
            <a href="#/PrivacyClause" target="_blank">隐私协议</a>
          </el-col>
        </el-form>
      </el-col>
    </el-col>
    <win-service-agreement ref="serviceAgreement"></win-service-agreement>
  </el-row>
</template>
<script>
import { deepCopyTwo } from "utils/index";
import { isWscnEmail, isMobile } from "utils/validate";
import { UpdateMyInformation } from "api/candidate";

import { Login, SendMessage } from "api/api";
// import JcRange from "components/JcRange";
import WinServiceAgreement from "components/PopUP/ServiceAgreement";
export default {
  name: "login",
  components: {
    WinServiceAgreement
    // JcRange
  },
  data() {
    // const validateMobile = (rule, value, callback) => {
    //   if (!isMobile(value)) {
    //     callback(new Error("请输入正确格式的手机号"));
    //   }
    //   if (this.mobileMsg) {
    //     callback(new Error(this.mobileMsg));
    //   } else {
    //     callback();
    //   }
    // };

    const validateCode = (rule, value, callback) => {
      if (this.mobileCodeMsg) {
        callback(new Error(this.mobileCodeMsg));
      } else {
        callback();
      }
    };
    const checkStatus = (rule, value, callback) => {
      if (!this.status) {
        callback(new Error("请拖动滑块完成验证"));
      } else {
        callback();
      }
    };
    return {
      mobileMsg: "",
      mobileCodeMsg: "",
      flag: true,
      status: false,
      // onMpanelSuccess:(()=>{
      //   this.flag=true;
      //   this.status = true;
      //    this.$refs["userLogin"].validateField('status')
      //   // this.$refs["userLogin"].resetFields();
      // }),
      // onMpanelError:(()=>{
      //  this.flag=false;
      // }),
      rulesLoginInfo: {
        mobile: [
          { trigger: "blur", validator: this.$formValidate(this).Mobile }
        ],
        // status: [
        //          { validator: checkStatus, trigger: "change" }
        //   ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { required: false, trigger: "blur", validator: validateCode }
        ]
      },
      editStatus: false,
      loginInfo: {
        status: "",
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
    onIsShow() {
      this.$refs.serviceAgreement.isShow();
    },
    init(userinfo) {
      this.userInfos = userinfo;
      this.userInfo = deepCopyTwo(userinfo);
      this.$forceUpdate();
    },



    onGetCode() {
      this.$refs["userLogin"].validateField("mobile", valid => {
        if (valid != "请输入手机号") {
          SendMessage({
            Mobile: this.loginInfo.mobile
          }).then(res => {
            if (res.data.Success) {
              this.countDown();
            } else {
              this.mobileMsg = res.data.Message;
              this.onSubmit("userLogin");
            }
          });
        }
      });
    },
    // onGetCode() {
    //  this.$refs["userLogin"].validateField('mobile',valid => {
    //    if (valid=='请输入手机号') {
    //         this.flag=false ;
    //     }
    //  })
    // this.$refs["userLogin"].validateField('status',valid => {
    //    if (valid=='请拖动滑块完成验证') {
    //       this.flag=false ;
    //     }
    //  })
    //  if( this.flag)
    //  {
    //     SendMessage({
    //             Mobile: this.loginInfo.mobile
    //           }).then(res => {
    //             if (res.data.Success) {
    //               this.countDown();
    //             } else {
    //               this.mobileMsg = res.data.Message;
    //               this.onSubmit("userLogin");
    //             }
    //           });
    //      }
    // },
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
    onSubmit(loginInfo) {
      let that = this;
      this.$refs[loginInfo].validate(valid => {
        if (valid) {
          let data = {
            Mobile: that.loginInfo.mobile,
            code: that.loginInfo.code
          };
          this.$store
            .dispatch("LoginByPhone", data)
            .then(res => {
              if (res.data.Success) {
                if (res.data.Data == "该手机号已被注册！") {
                  that.mobileMsg = res.data.Data;
                  that.onSubmit(loginInfo);
                } else {
                  this.$store.dispatch("getBaseInfo").then(res => {});
                  this.$store.dispatch("GetMyResumeScore");
                  this.$store.dispatch("MyInformation").then(res => {});
                  this.$router
                    .push({ path: "/CandidateHome" })
                    .catch(err => {});
                  this.$router.go(0);
                }
              } else {
                that.mobileCodeMsg = res.data.Message;
                that.onSubmit(loginInfo);
              }
            })
            .catch(error => {});
        } else {
          return false;
        }
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
.login_info {
  .el-input__inner {
    width: 280px;
  }

  button {
    &.get_mobile_code {
      position: absolute;
      margin-left: -31px;
      margin-top: 2px;
      top: 0px;
      right: 10px;
      font-size: 14px;
      width: auto;
      padding: 0 5px;
      color: #44a9e1;
      height: 36px;
      background: #fff;
      border: 0;
      border-radius: 4px;
    }
    &.login_register_but {
      width: 100%;
      height: 48px;
      background: #44a8e1;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.home_login {
  width: 100vw;
  min-width: 1200px;
  height: 448px;
  @include wh(100vw, 448px);
  @include bgImg1("banner.png");
  background-size: 1920px 448px;
  display: -webkit-flex;
  justify-content: center;
  .home_login_content {
    width: 60vw;
    min-width: 1200px;
    position: inherit;
    .login_info {
      @include wh(336px, 366px);
      background: #fff;
      position: absolute;
      right: 0;
      margin-top: 41px;
      display: -webkit-flex;
      justify-content: center;
      > form {
        width: 280px;
        .login_title {
          margin: 40px 0 30px 0;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          color: rgba(136, 136, 136, 1);
        }
        .el-form-item {
          margin-bottom: 26px;
        }
        .login_footer {
          font-size: 14px;
          text-align: center;
          color: #666666;
          a {
            text-decoration: underline;
            color: #44a8e1;
          }
        }
      }
    }
  }
}
// @media (max-width: 1200px) {
//     .home_login {
//         background-size: 1200px 448px; /* Force the image to its minimum width */
//     }
// }
</style>
