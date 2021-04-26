<template>
  <section>
    <div id="boxFixed"></div>
    <transition
      name="fade"
      enter-active-class="animate__animated animate__fadeInDownBig"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <div class="suspend_search" :class="animated_css" v-show="isFixed">
        <div class="suspend_search_content">
          <div class="logo-icon"></div>
          <div class="search_input">
            <el-input
              v-model="searchVal"
              placeholder="搜索公司/职位"
            ></el-input>
            <svg-icon
              icon-class="magnifier"
              class="icon-svg-but svg-search"
              @click="onSearch()"
            />
          </div>
          <el-button @click="onSearch" class="search_but">搜索</el-button>
          <div
            class="login_register_but"
            @click="onLoginRegister"
            v-if="!token"
          >
            登录/注册
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>
<script>
import animate from "animate.css";
import { mapGetters } from "vuex";
export default {
  name: "SuspendSearch",
  computed: {
    ...mapGetters(["token"])
  },
  data() {
    return {
      isFixed: false,
      searchVal: "",
      offsetTop: 0,
      animated_css: "",
      show: true
    };
  },
  created() {
    this._navbar = true;
  },
  methods: {
    onSearch() {
      let data = {
        // Position: this.positionVal, //职能
        // Companyname: "", //公司名称
        // Industry: this.industryVal, //行业
        // City: this.cityVal, //城市
        // Salary: this.salaryVal, //薪资
        // UpdateTime: '', //发布时间
        // Keywords: this.searchVal, //关键词
        // CompanyId: "",searchVal
        // JobCategory: "", //工作类型
        // Education: this.degreeVal, //学历
        // Scope: this.staffSizeVal, //企业规模
        // CompanyStockType: this.companyStockVal, //公司性质
        // OpenId: "",
        // Offset: 0,
        // Limit: 10

        Keywords: this.searchVal,
        City: "",
        Position: "",
        CompanyId: "",
        Companyname: "",
        Industry: "",
        JobCategory: "",
        Education: "",
        Salary: "",
        UpdateTime: "",
        Scope: "",
        CompanyStockType: "",
        Offset: 0,
        Limit: 10
      };
      this.$Bus.$emit("searchData", data);
      // this.$store.dispatch("setSearchData", data);
      //   this.$emit("searchData", this.searchVal);
    },
    onLoginRegister() {
      this.backTop();
    },
    handleClick: function() {
      this.show = !this.show;
    },
    scrollToTop() {
      var that = this;
      // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 如果被卷曲的高度大于吸顶元素到顶端位置 的距离
      this.isFixed = scrollTop > this.offsetTop - 10 ? true : false;
    },
    backTop() {
      const that = this;
      let ispeed = Math.floor(-that.scrollTop / 5);
      document.documentElement.scrollTop = document.body.scrollTop =
        that.scrollTop + ispeed;
    }
  },
  mounted() {
    this.$Bus.$on("searchVal", data => {
      this.searchVal = data;
    });
    let that = this;
    window.addEventListener("scroll", this.scrollToTop);
    that.$nextTick(() => {
      //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置
      that.offsetTop = document.querySelector("#boxFixed").offsetTop;
    });
  },
  watch: {
    isFixed: function(newVal) {
      if (newVal) {
        this.animated_css = "animated fadeInDown";
      } else {
        this.animated_css = "animated fadeOutUp";
      }
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  }
};
</script>
<style lang="scss">
@import "~@/styles/mixin.scss";
$pageInputHeight: 40px;
.suspend_search {
  width: 100vw;
  min-width: 1200px;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 999;
  width: 100vw;
  height: 72px;
  top: 0;
  left: 0;
  background: #ffffff;
  .suspend_search_content {
    width: 60vw;
    min-width: 1200px;
    display: -webkit-flex;
    position: relative;
    height: 72px;
    align-items: center;
    .logo-icon {
      @include wh(99px, 48px);
      @include bgImg("home_logo.png");
      background-size: 99px 48px;
    }

    .search_input {
      position: inherit;
      width: 600px;
      margin-left: 141px;

      .el-input__inner {
        font-size: 16px;
        padding-left: 56px;
        height: $pageInputHeight;
        line-height: $pageInputHeight;
        width: 600px;
      }
      .svg-search {
        position: absolute;
        font-size: 20px;
        left: 18px;
        height: $pageInputHeight;
        line-height: $pageInputHeight;
        fill: #dddddd;
        &:hover {
          fill: #bbbbbb;
        }
      }
    }

    .login_register_but {
      position: absolute;
      right: 0;
      color: #44a8e1;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
<style scoped></style>
