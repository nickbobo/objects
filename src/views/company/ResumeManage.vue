<template>
  <div class="resume_manage">
    <div class="resume_manage_content">
      <div class="resume_manage_tabs">
        <button
          type=""
          v-for="(item, index) in currentPageRouter"
          :key="index" type='button'
          class="def_simple_but w-btn"
          :class="{ active: isShowActive(item), one: index == 0 }"
          @click="onPageJumps(item)"
        >
          {{ item.name }}
        </button>
      </div>
      <div class="tabs_content">
        <router-view v-if="isRouterAlive"></router-view>
      </div>
    </div>

    <div class="resume_null "></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ResumeManage", //简历管理
  computed: {
    ...mapGetters(["siderbar_routers"])
  },
  data() {
    return {
      isRouterAlive: true,
      resumeStatus: "",
      currentPageRouter: [],
      status: []
    };
  },
  methods: {
    onPageJumps(item) {
      if (this.$route.path != item.path)
        this.$router.push({
          path: `${item.path}?t=${new Date().valueOf()}`
        });
      this.reload();
      this.status = item;
    },
    isShowActive(item) {
      let path = this.$route.path.split("/")[2];
      if (item.path == path) {
        return true;
      }
      return false;
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  },
  mounted() {},
  created() {
    this.siderbar_routers.children;
    let route = this.$route.matched;
    let list = [];
    if (this.siderbar_routers.children.length > 0) {
      for (let items of this.siderbar_routers.children) {
        //  console.info(items.route[1])

        if (items.name == route[1].name) {
          if (items.children.length > 0) {
            for (let item of items.children) {
              if (!item.hidden) list.push(item);
            }
          }
          this.currentPageRouter = list;
        }
      }
    }
  },
  watch: {
    status: function(newVal) {
      this.isShowActive(newVal);
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/mixin.scss";
$FormItemHeight: 38px;
$FormItemWidthLong: 100%;
$FormItemWidth: 100%;
.resume_search {
  width: 900px;
  padding: 22px 30px 41px 25px;
  background: #fff;
  @include shadow();
  $ItemH: 38px;
  $ItemW: 100%;
  $TxTH: 260px;
  .resume_search_items {
    overflow: auto;
    .el-form-item {
      position: relative;
      padding-left: 10px;
      padding-right: 10px;
      padding-left: 6em;
      float: left;

      width: calc(100% / 3);
      label {
        &.el-form-item__label {
          line-height: $ItemH;
          color: #999;
          width: 6em;
          position: absolute;
          text-align: left;
          left: 15px;
          padding: 0;
        }
      }
      .el-form-item__content {
        text-align: left;
        line-height: $ItemH;
        .el-textarea {
          width: $ItemW;
          height: $TxTH;
          .el-textarea__inner {
            height: $TxTH;
            width: $ItemW;
          }
        }
        .position_input {
          width: $ItemW;
        }
        .el-select {
          width: $ItemW;
          height: $ItemH;
        }
        .el-input__icon {
          line-height: $ItemH;
        }
        .el-input__inner {
          height: $ItemH;
          width: $ItemW;
          border: 1px solid #eeeeee;
        }
        .el-date-editor {
          &.el-input__inner {
            width: $ItemW;
          }
          &.el-input {
            width: $ItemW;
          }
        }
        .el-cascader {
          line-height: $ItemH;
          width: $ItemW;
        }
      }
      &.num_select {
        position: relative;
        .el-form-item__content {
          margin-left: 0 !important;
          text-align: center;
          @include df;
          width: $ItemW;
          &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 12px;
            height: 1px;
            background-color: #ccc;
            margin-left: -6px;
            margin-top: 0;
          }
          .el-input {
            padding-right: 15px;

            position: relative;
            width: 50%;
            float: left;
          }
          .el-input + .el-input {
            float: right;
            padding-left: 15px;
            padding-right: 0px;
          }
          .el-input__inner {
            width: $ItemW;
            padding-right: 0;
          }
        }
      }
    }
  }
}
.resume_lists {
  margin-top: 20px;
}

</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
$FormItemHeight: 30px;
$FormItemWidthLong: 220px;
$FormItemWidth: 180px;
.resume_manage {
  width: 100%;
  .resume_manage_content {
    width: 1200px;
    overflow: auto;
    margin: 0 auto;
    .resume_manage_tabs {
      position: relative;
      float: left;
      padding: 24px 24px;
      width: 280px;
      background: #fff;
      display: inline-table;
      @include shadow();
      button + button {
        margin-left: 0;
        margin-top: 10px;
      }
      button {
        width: 100%;
        height: 36px;
        padding: 0;

        display: block;
        border: 1px solid $blue;
        color: $blue;
        line-height: 36px;
        height: 36px;
        font-size: 14px;
        background-color: #fff;
        &:hover {
          box-shadow: none;
          border: 1px solid $blue-hover;
          background-color: $blue-hover;
          color: #fff;
        }
        &.active {
          box-shadow: none;
          border: 1px solid $blue-hover;
          background-color: $blue-hover;
          color: #fff;
        }
      }
    }
    .tabs_content {
      width: 900px;
      float: right;
      margin-left: 20px;
      margin-bottom: 35px;
      // @include shadow();
    }
  }
}
</style>
