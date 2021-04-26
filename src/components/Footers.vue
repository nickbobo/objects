<template>

<!--v-if="!roles.includes('company') && !roles.includes('companyLogin')"-->
  <footer
    class="app-footer"
  >
    <div class="footer-center container">
      <!-- <div>
        <div class="footer-left">
          <ul>
            <li
              v-for="(item, index) in buttonNavList"
              :key="index"
              :class="{ one_active: index == 0 }"
              @click="ClickHandler(item.page)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="footer_bottom">
          沪ICP备08111593号-47| Copyright@2017 CIIC
        </div>
      </div>
      <div>
        <img class="company_code" src="static\img\company_code.jpg" />
      </div> -->




      <div class="ft-body">
        <div class="footer-left">
          <ul>
            <li
              v-for="(item, index) in buttonNavList"
              :key="index"
              :class="{ one_active: index == 0 }"
              @click="ClickHandler(item.page)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="copyright">
          <a  target="_banlk">沪ICP备08111593号-47</a>
          <span class="split">|</span>
          <a  target="_banlk">沪公网安备31010402007135号</a>
          <span class="split">|</span><a href="/static/img/0001.jpg" target="_banlk">营业执照信息&nbsp;&nbsp;&nbsp;&nbsp;人才服务许可证：3100000100032号</a>
          <span class="split">|</span>
          Copyright@2017 CIIC
        </div>
        <!-- <div class="footer_bottom">
          沪ICP备08111593号-47|沪公网安备31010402007135号| Copyright@2017 CIIC
        </div> -->
      </div>
      <div>
        <img class="company_code" src="~static/img/qr-code.jpg" />
      </div>




    </div>
    <win-about-us ref="aboutUS"></win-about-us>
    <win-privacy-clause ref="privacyClause"></win-privacy-clause>
    <win-service-agreement ref="serviceAgreement"></win-service-agreement>
    <win-experience-feedback ref="experienceFeedback"></win-experience-feedback>
    <win-join-us ref="joinUs"></win-join-us>
  </footer>
</template>
<script>
import WinAboutUs from "components/PopUP/AboutUs";
import WinPrivacyClause from "components/PopUP/PrivacyClause";
import WinServiceAgreement from "components/PopUP/ServiceAgreement";
import WinExperienceFeedback from "components/PopUP/ExperienceFeedback";
import WinJoinUs from "components/PopUP/JoinUs";
import { mapGetters } from "vuex";
export default {
  name: "footers",
  components: {
    WinAboutUs,
    WinPrivacyClause,
    WinServiceAgreement,
    WinExperienceFeedback,
    WinJoinUs
  },
  computed: {
    ...mapGetters(["roles"])
  },
  data() {
    return {
      msg: "",
      buttonNavList: [
        {
          url: "",
          name: "关于我们",
          page: "aboutUS"
        },
        {
          url: "",
          name: "隐私条款",
          page: "privacyClause"
        },
        {
          url: "",
          name: "服务协议",
          page: "serviceAgreement"
        },
        {
          url: "",
          name: "体验反馈",
          page: "experienceFeedback"
        },
        {
          url: "",
          name: "加入我们",
          page: "joinUs"
        }
      ]
    };
  },
  methods: {
    ClickHandler(tag) {
      let that = this;
      switch (tag) {
        case "aboutUS"://关于我们
          // this.$refs.aboutUS.isShow();
          this.$router.push({ path: "/AboutUS" }).catch(err => {});
          break;
        case "privacyClause"://隐私条款
          // this.$refs.privacyClause.isShow();
          this.$router.push({ path: "/PrivacyClause" }).catch(err => {});
          break;
        case "serviceAgreement"://服务协议
          // this.$refs.serviceAgreement.isShow();
          this.$router.push({ path: "/ServiceAgreement" }).catch(err => {});
          break;
        case "experienceFeedback"://体验反馈
          //this.$refs.experienceFeedback.isShow();
          this.$router.push({ path: "/ExperienceFeedback" }).catch(err => {});
          break;
        case "joinUs":
          //this.$refs.joinUs.isShow();
          this.$router.push({ path: "/JoinUs" }).catch(err => {});
          break;
      }
    }
  },

  created() {}
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.container {
  padding: 15px;
  .ft-body {
    float: left;
    .footer-left {
      display: -webkit-flex;
      min-width: 600px;
      padding: 25px 0;
    }
  }
}

.app-footer {
  @include wh(100%, auto);
  min-width: $con-w;
  background: #fff;
}

.footer_bottom {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(136, 136, 136, 1);
}
.copyright {
  font-size: 14px;
  color: #999;
  > a {
    color: #999;
  }
}
ul {
  display: -webkit-flex;
  flex-wrap: nowrap;
  padding-inline-start: 0px;
  // justify-content: space-between;
  li {
    line-height: 20px;
    float: left;
    min-width: 56px;
    margin-left: 48px;
    font-size: 14px;
    box-sizing: border-box;
    list-style: none;
    cursor: pointer;
    &.one_active {
      margin-left: 0px;
    }
  }
}

.company_code {
  @include wh(106px, 106px);
}
</style>
