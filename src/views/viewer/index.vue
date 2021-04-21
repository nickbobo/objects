<template>
  <div class="viewer">
    <h3 class="title">阀门展观众登记</h3>
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">

      <el-radio-button label="c">中文</el-radio-button>
      <el-radio-button label="e">English</el-radio-button>
    </el-radio-group>
    <el-form ref="formData" v-if="isFormShow" :rules="rulesUserInfo" :model="formData" label-width="100px">
      <el-form-item :label="lang.name" prop="Name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item :label="lang.IDNO">
        <el-input v-model="formData.IDNO"></el-input>
      </el-form-item>
      <el-form-item :label="lang.comName"> 
      </el-form-item>
      <el-form-item :label="lang.mobile" prop="Mobile">
        <el-input v-model="formData.mobile"></el-input>
      </el-form-item>
      <el-form-item :label="lang.email" prop="Email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="" class="identify_code">
        <el-input v-model="formData.verificationCode"></el-input>
        <div @click="updateCode">
          <s-identify @click="updateCode" v-if="isShowCode" :identifyCode="identifyCode"></s-identify>
        </div>
      </el-form-item>

      <el-button type="primary" @click="submitForm">{{lang.but1}}</el-button>
      <el-button type="primary" @click="onReturn">{{lang.but2}}</el-button>
    </el-form>
  </div>
</template>

<script>
  // import SIdentify from "@/components/SIdentify";
  import { isWscnEmail, isMobile, isIdNo, isCMobile } from "@/utils/validate";
  import SIdentify from "@/components/SIdentify.vue";
  export default {
    name: "viewer", //观众登记
    components: {
      SIdentify,
    },
    data() {
      return {
        tabPosition: "c",
        isShowCode: true,
        isFormShow: true,
        identifyCode: "1234",
        identifyCodes: "1234",
        sidentify: "",
        formData: {
          name: "",
          comName: "",
          email: "",
          mobile: "",
          IDNO: "",

          verificationCode: "",
        },
        lang: {
          name: "姓名",
          comName: "公司名",
          email: "邮箱",
          mobile: "手机号",
          IDNO: "身份证号",
          but1: "提交",
          but2: "返回",
        },
        langs: {
          English: {
            name: "Name",
            comName: "CompanyName",
            email: "Email",
            mobile: "Mobile",
            IDNO: "IDNumber",
            but1: "Submit",
            but2: "Return",
          },
          Chinese: {
            name: "姓名",
            comName: "公司名",
            email: "邮箱",
            mobile: "手机号",
            IDNO: "身份证号",
            but1: "提交",
            but2: "返回",
          },
        },
        rulesUserInfo: {
          Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
          Mobile: [
            { required: true, message: "请输入手机号", trigger: "blur" },
            { required: true, trigger: "blur", validator: isMobile },
          ],
          Email: [
            { required: true, message: "请输入邮箱", trigger: "blur" },
            { required: true, trigger: "blur", validator: isWscnEmail },
          ],
        },
        fileUrl: "",
        showPdf: false,
        contractVisable: false,
      };
    },
    watch: {
      tabPosition: function (val) {
        this.isFormShow = false;
        console.info(val);
        if (val == "c") {
          this.lang = this.langs.Chinese;
        }
        if (val == "e") {
          this.lang = this.langs.English;
        }
        this.isFormShow = true;
      },
    },
    mounted() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 1);
      console.info(this.lang);
    },

    methods: {
      onReturn() {
        this.$router.go(-1);
      },
      /**
       * 提交
       */
      submitForm() {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            if (this.identifyCode == this.formData.verificationCode) {
              console.info(this.formData);
            } else {
              this.$message({
                showClose: true,
                message: "验证码错误",
                type: "error",
              });
              this.updateCode();
            }
          }
        });
      },
      updateCode() {
        console.info(112);
        this.isShowCode = false;
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 1);
        this.isShowCode = true;
      },
      //验证码
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },

      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 1);
      },
      makeCode(o, l) {
        for (let i = 0; i < 4; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
          ];
        }
        console.log(this.identifyCode);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .viewer {
    padding-top: 20px;
    width: 100%;

    .title {
      width: 100%;
      font-size: 23px;
      margin-bottom: 20px;
    }

    /deep/ .el-form {
      width: 90%;
      margin-left: 5%;

      .el-form-item {
        &.identify_code {
          .el-form-item__content {
            display: flex;
          }

          .el-input {
            width: 120px;
            text-align: left;
          }

          .el-input__inner {
            width: 100px;
          }

          .el-button {
            width: 50px;
            padding: 0;
            margin-left: 18px;
          }
        }
      }

      .s-canvas {
        width: 120px;
      }
    }
  }
</style>