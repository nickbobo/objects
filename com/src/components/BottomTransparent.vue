<template>
  <div class="bottom-transparent" v-if="roles.includes('caller') && isOpen">
    <div class="btn-area flex">
      <el-button
        type
        class="search_but"
        @click="ClickHandler('enterpriseNeedboard')"
        >企业招聘需求快速登记</el-button
      >
      <div class="msg">已有帐号快速，立即登录？</div>
      <svg-icon
        icon-class="cancel"
        class="icon-svg-cancel icon icon-svg-but"
        @click="CloseHandler()"
      />
    </div>
    <win-enterprise-need ref="enterpriseNeedboard"></win-enterprise-need>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import WinEnterpriseNeed from "components/PopUP/EnterpriseNeedBoard";
export default {
  name: "BottomTransparent",
  computed: {
    ...mapGetters(["token", "roles"])
  },
  components: {
    WinEnterpriseNeed
  },
  data() {
    return {
      msg: "",
      isOpen: true
    };
  },
  methods: {
    ClickHandler(tag) {
      let that = this;
      switch (tag) {
        case "enterpriseNeedboard":
          this.$refs.enterpriseNeedboard.isShow();
          break;
      }
    },
    CloseHandler: function() {
      let that = this;
      that.isOpen = false;
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
// 底部透明条
.bottom-transparent {
  height: 180px;
  width: 100vw;
  background: url("~static/img/icon_flat-big.png");
  background-repeat: no-repeat;
  background-position: 5% 50%;
  bottom: 0;
  margin-top: -180px;
  // margin-bottom: 2px;
  // position: fixed;
  .btn-area::before {
    content: "";
    background: rgba(0, 0, 0, 1);
    opacity: 0.6; /* 透明度设置 */
    z-index: -1;
    background-size: 500px 300px;
    width: 100%;
    height: 180px;
    position: absolute;
    top: 0px;
    left: 0px;
  }
  .btn-area {
    height: 180px;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 99;
    width: 100%;
    min-width: 1200px;
    .msg {
      opacity: 1;
      font-size: 16px;
      color: #fff;
      margin-right: 20px;
    }
    .icon-svg-cancel {
      font-size: 36px;
    }
  }
  .el-button {
    &.search_but {
      color: #fff;
      background: #44a8e1;
      @include wh(200px, 50px);
      border: 0;
      &:hover {
        background: #1c8dcb;
      }
      margin-right: 82px;
    }
  }
}
</style>
