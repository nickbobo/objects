<template>
  <div class="captcha">
    <!-- @keyup.enter.native="login" -->
    <el-input
      v-model="codeVal"
      placeholder="请输入验证码"
      v-on:keyup.13="onLogin"
      @blur="login"
    ></el-input>
    <img :src="imgSrc" class="captcha_img" @click="getCaptcha" />
  </div>
</template>
<script>
import { GetCaptcha } from "api/api";
export default {
  name: "Captcha", //获取验证码
  props: ["captchaVal"],
  data() {
    return {
      codeVal: "",
      imgSrc: ""
    };
    login;
  },
  methods: {
    onLogin(){
      console.info(11111)
      this.$emit("onLogin")
    },
    getCaptcha() {
      let timestamp = new Date().valueOf();
      this.imgSrc = `${process.env.BASE_COMPANY_API}/api/Captcha/GetCaptcha?t=${timestamp}`; //
    },
    login() {
            this.$emit("update:captchaVal", this.codeVal);
      this.$emit("resterfun");
      this.$emit("login");
    }
  },
  created() {
    this.getCaptcha();
    this.codeVal = this.captchaVal;
    this.$Bus.$on("refreshCaptcha", () => {
      this.getCaptcha();
    });
  },
  // watch: {
  //   codeVal: function(newVal) {
  //     this.$emit("update:captchaVal", newVal);
  //     this.$emit("resterfun");
  //   }
  // }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.captcha {
  display: inline-table;
  position: relative;
  padding-right: 100px;
  // width: 400px;
  // @include df;
  .el-input {
    @include wh(100%, 38px);
  }
  .captcha_img {
    position: absolute;
    right: 0;
    cursor: pointer;
    margin-left: 12px;
    @include wh(89px, 38px);
    border: 1px solid #dcdfe6;
    border-radius: 5px;
  }
  .el-form-item__content {
    line-height: 38px;
    .el-input__inner {
      height: 38px;
      line-height: 38px;
    }
  }
}
</style>
