<template>
  <div class="app">
    <AppHeader />
    <div class="app-body">
      <main class="main">
        <div class="container-fluid">
          <!-- <keep-alive> -->
          <router-view></router-view>
          <!-- </keep-alive> -->
        </div>
      </main>
    </div>

    <AppFooter />
    <bottom-transparent></bottom-transparent>
  </div>
</template>

<script>
import AppHeader from "components/Headers";
import AppFooter from "components/Footers";
import BottomTransparent from "components/BottomTransparent";

export default {
  name: "full",
  components: {
    AppHeader,
    AppFooter,
    BottomTransparent
  },

  computed: {
    name() {
      return this.$route.name;
    },

    list() {
      return this.$route.matched;
    }
  },
  methods: {},
  mounted() {
    this.$Bus.$emit("headerInit");

    let _this = this;

    // window.onbeforeunload = function(e) {
    //   // console.info(21212);

    //   return "hahaha"
    //   // if (_this.$route.name == "dyyPerformanceCenterSale") {
    //   //   e = e || window.event;
    //   //   // 兼容IE8和Firefox 4之前的版本
    //   //   if (e) {
    //   //     e.returnValue = "关闭提示1111";
    //   //   }
    //   //   // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    //   //   return "关闭提示222";
    //   // } else {
    //   //   window.onbeforeunload = null;
    //   // }
    // };
    window.addEventListener("scroll", this.showIcon);
  }
};
</script>
<style>
.aside-menu-fixed.aside-menu-hidden .app-footer,
.aside-menu-fixed.aside-menu-hidden .main {
  padding-bottom: 0px;
  background: #fff !important;
}
.main .container-fluid {
  /* min-height: 835px; */
  /* position: relative; */
  padding-top: 30px;
}
.app {
  /* width:100vw; */
  /* overflow: hidden; */
  min-width: 1200px;
  background: #f6f6f6;
}
.sidebar-minimized.sidebar-fixed .app-footer,
.sidebar-minimized.sidebar-fixed .main .sidebar-fixed .app-footer,
.sidebar-fixed .main {
  margin-left: 0px;
}
.app-body {
  /* width: 100vw; */
  min-height: calc(100vh - 70px - 136px);
  min-width: 1200px;
}
</style>
