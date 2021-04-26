<template>
  <div class="account_info">
    <el-dialog
      custom-class="account_info modal-box"
      :visible.sync="isShowAccountInfo"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title text-center">账户信息</h4>
        </div>
        <div class="modal-body">
          <div class="u-modal">
            <div class="user-info">
              <div class="photo">
                <img src="~static/img/def_head_img.png" />
              </div>
              <div class="level">{{ user_info.UserTitle }}</div>
              <ul class="user-spec">
                <li><span>姓名</span>{{user_info.Contract}}</li>
                <li><span>用户名</span>{{user_info.Username}}</li>
                <li><span>手机</span>{{user_info.Mobile}}</li>
                <li><span>邮箱</span>{{user_info.Email}}</li>
              </ul>
            </div>
          </div>
        </div>
        <button class="close" type="button"  @click="isShowAccountInfo = false">
          <span class="iconfont icon-close"></span>
        </button>
      </div>

      <!-- <div class="account_info_content" v-if="false">
        <img src="~static/img/def_head_img.png" />
        <span>{{ user_info.UserTitle }}</span>
        <span class="title_font_mix16">账户信息</span>
        <el-row>
          <el-col :span="4" class="input_title">姓名</el-col>
          <el-col :span="8"
            ><el-input
              v-model="user_info.Contract"
              readonly="readonly"
              placeholder=""
            ></el-input
          ></el-col>
          <el-col :span="4" class="input_title">邮箱</el-col>
          <el-col :span="8"
            ><el-input
              v-model="user_info.Email"
              readonly="readonly"
              placeholder=""
            ></el-input
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="input_title">用户名</el-col>
          <el-col :span="8"
            ><el-input
              v-model="user_info.Username"
              readonly="readonly"
              placeholder=""
            ></el-input
          ></el-col>
          <el-col :span="4" class="input_title">手机号</el-col>
          <el-col :span="8"
            ><el-input
              v-model="user_info.Mobile"
              readonly="readonly"
              placeholder=""
            ></el-input
          ></el-col>
        </el-row>
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
import { GetCaptcha } from "api/api";
import { mapGetters } from "vuex";
export default {
  name: "AccountInfo", //账号信息
  props: ["captchaVal"],
  computed: {
    ...mapGetters(["user_info"])
  },
  data() {
    return {
      isShowAccountInfo: false,
      accountInfoData: {
        Username: "",
        Contract: "",
        Mobile: "",
        Email: ""
      },
      codeVal: "",
      imgSrc: ""
    };
  },
  methods: {
    getCaptcha() {
      let timestamp = new Date().valueOf();
      this.imgSrc = `${process.env.BASE_COMPANY_API}/api/Captcha/GetCaptcha?t=${timestamp}`;
    }
  },
  created() {
    this.getCaptcha();
    this.codeVal = this.captchaVal;
    this.$store.dispatch("getAllDD");
    this.$Bus.$on("refreshCaptcha", () => {
      this.getCaptcha();
    });
  },
  watch: {
    codeVal: function(newVal) {
      this.$emit("update:captchaVal", newVal);
      this.$emit("resterfun");
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/mixin.scss";


.account_info {
  &.el-dialog {
    width: 360px;
    .close {
      position: absolute;
      top: 15px;
      right: 15px;
      background-color: transparent;
      cursor: pointer;
      .iconfont {
        font-size: 22px;
        line-height: 1;
        font-weight: bold;
        color: #ccc;
        &:hover {
          color: $blue;
        }
      }
    }
  }
}
.modal-header {
  position: relative;
  .modal-title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .close {
    top: -10px;
    right: -20px;
  }
}

.modal-body {
  .u-modal {
    .user-info {
      border-bottom: none;
      margin-bottom: 0;
      margin-top: 22px;
      .level {
        margin-bottom: 20px;
        color: #999;
        text-align: center;
      }
    }
    .user-spec {
      border-top: 1px solid #e5e5e5;
      text-align: left;
      li {
        margin: 20px 0;
        font-weight: bold;
        span {
          display: inline-block;
          width: 65px;
          color: #999;
          font-weight: normal;
        }
        &:last-child {
          margin-bottom: 0;
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
