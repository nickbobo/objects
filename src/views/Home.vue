<template>
  <section class="aui-flexView">
    <login></login>
    <!-- 搜索条 -->
    <div class="aui-navBar">
      <div class="content">
        <el-row>
          <el-col :span="18">
            <info-search
              :info-search-size="'small'"
              @searchData="getInfoSearch(arguments)"
            ></info-search>
          </el-col>
          <el-col :span="6">
            <div class="gary-tip">
              本周新增职位
              <span>{{ weekAddCount }}</span> 个
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <suspend-search></suspend-search>
    <div class="aui-scrollView">
      <div class="home_content">
        <div class="home_content_left content-left">
          <div class="title-line flex">
            <div class="title">最新职位</div>
            <div class="more">
              更多职位
              <svg-icon icon-class="arrow1" class="icon icon-svg-but" />
            </div>
          </div>

          <position ref="position"></position>
        </div>
        <div class="home_content_right">
          <enterprise-pager></enterprise-pager>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import util from "utils/util";
import Login from "views/login/Login";
import position from "views/PositionComponent.vue";
import InfoSearch from "components/InfoSearch"; //搜索栏
import SuspendSearch from "components/SuspendSearch"; //吸顶搜索栏
import { GetCurrentWeekPositionCount } from "api/position.js";
export default {
  name: "home",
  components: {
    Login,
    position,
    SuspendSearch,
    InfoSearch
  },
  data() {
    return {
      weekAddCount: 0
    };
  },
  methods: {
    GetCurrentWeekPositionCount() {
      GetCurrentWeekPositionCount({}).then(res => {
        if (res.data.Success) {
          this.weekAddCount = res.data.Data;
        } else {
        }
      });
    }
  },
  created() {
    // this.$store.dispatch("getCityItem");
    // this.$store.dispatch("getHoTSearch");
    // this.$store.dispatch("getAllDD").then(res => {});
    // this.$store.dispatch("getIndustryItemList");
    // this.$store.dispatch("GetDictItemJobCategoryList");
    this.GetCurrentWeekPositionCount();
    // this.$nextCtitl
  },
  mounted() {
    this.$refs.position.init();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.home_content {
  margin: 0 auto;
  width: 60vw;
  min-width: 1200px;
  font-size: 14px;

  margin-top: 20px;
  display: -webkit-flex;
  .home_content_left {
    padding: 28px 30px;
    min-width: 900px;
    background: #fff;
    .title-line {
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      padding-bottom: 18px;
      border-bottom: 1px solid #ddd;
      display:-webkit-flex;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .more {
        color: #666;
        font-size: 14px;
        display: -webkit-flex;
        align-items: center;
        .svg-icon {
          margin-left: 14px;
        }
      }
    }
  }
  .home_content_right {
    margin-left: 20px;
    min-width: 280px;
  }
}

.aui-scrollView {
  width: 100%;
  flex: 1;
  // overflow-y: auto;
  // overflow-x: hidden;
  // -webkit-overflow-scrolling: touch;
  position: relative;
  margin-top: 0;
  padding-bottom: 55px;
}

.content {
  margin: 0 auto;
  width: 60vw;
  min-width: 1200px;
  // display: -webkit-flex;
  font-size: 14px;
  background: #fff;
  // .left-content {
  //   width: 70%;
  //   margin-top: 20px;
  //   min-width: 860px;
  // }

  // .right-content {
  //   width: 25%;
  //   height: 30vh;
  //   background: #fff;
  //   margin-top: 20px;
  //   padding: 10px 20px;
  //   min-width: 320px;
  //   min-height: 300px;
  //   margin-left: 20px;
  // }
}
// .content-left {
//   margin: 0 30px 0 30px;
// }

/* 窄版header 仅仅显示input */

// .aui-navBar-fixed {
//   background: #fff;
//   position: fixed;
//   top: 0;
//   z-index: 999;
// }

.aui-job-search {
  .aui-job-search-item:first-child {
    -webkit-order: 0;
    -ms-flex-order: 0;
    order: 0;
    flex-grow: 1;
    background-image: url("~static/img/home_logo.png");
    background-size: 30% auto;
    background-repeat: no-repeat;
    background-position: 0% 50%;
  }

  .aui-job-search-item:nth-child(2) {
    align-items: center;
    flex-grow: 3;
  }
  /* 登录/注册 */
  .aui-job-search-item:last-child {
    align-items: center;
    flex-grow: 1;
    flex-direction: row-reverse;
  }
}

.aui-job-search-box {
  align-items: center;
  .el-form-item {
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }
  //地区select
  .el-select {
    width: 80px;
  }
}

.aui-navBar {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  z-index: 1002;
  background: #fff;
  align-items: center;
}
.gary-tip {
  font-size: 16px;
  background: rgba(253, 253, 253, 1);
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 4px;
  span {
    color: #44a8e1;
  }
}
// 新增职位提示
.aui-navBar {
  .gary-tip {
    margin-top: 24px;
    width: 280px;
    height: 44px;
    display: flex;
    margin-left: 20px;
    color: #888;
    justify-content: center;
    align-items: center;
    text-align: center;
    span {
      margin: 0 5px;
      font-weight: bold;
    }
  }
}
</style>
