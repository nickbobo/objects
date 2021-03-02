<template>
  <div class="viewer">
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
    <el-radio-button label="c">中文</el-radio-button>
    <el-radio-button label="e">English</el-radio-button>
  </el-radio-group>
    <el-form ref="formData" :rules="rulesUserInfo" :model="formData" label-width="85px">
      <el-form-item label="姓名">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="formData.IDNO"></el-input>
      </el-form-item>
      <el-form-item label="公司名">
        <el-input v-model="formData.comName"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formData.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="图形验证码" class="identify_code">
        <el-input v-model="formData.verificationCode"></el-input>
        <div @click="updateCode"><s-identify @click="updateCode" v-if="isShowCode" :identifyCode="identifyCode"></s-identify></div>
      </el-form-item>

    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button type="primary" @click="onReturn">返回</el-button>
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
        English: {},
        Chinese: {},
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
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 1);
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
