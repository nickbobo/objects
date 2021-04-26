<template>
  <section>
    <div class="position_info_search">
      <info-search></info-search>
    </div>

    <suspend-search></suspend-search>
    <div class="position_list">
      <div class="position_list_left">
        <position ref="position"></position>
      </div>
      <div class="position_list_right">
        <enterprise-pager></enterprise-pager>
      </div>
    </div>
    <!-- <paging :pageSize="pageSize" :total="total" @getList="getList($event)"></paging> -->
  </section>
</template>

<script>
import util from "utils/util";
import Paging from "components/Paging";
import InfoSearch from "components/InfoSearch";
//import NProgress from 'nprogress'
// import { } from "../api/api";
import position from "./PositionComponent.vue";
import SuspendSearch from "components/SuspendSearch";
export default {
  name: "positions", //职位页    position,

  components: { 
    Paging,
    InfoSearch,
    SuspendSearch,
    position
  },
  data() {
    return {
      pageSize: 50,
      total: 1000,
      msg: "hello home",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },

  inject: {
    userss: {
      default: () => {}
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    getList(even) {
    }
  },
  created: function() {},
  mounted() {
    this.$refs.position.init();
  }
};
</script>

<style lang="scss">
.el-pagination {
  background: #fff;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  .btn-prev {
    display: none;
  }
  .btn-next {
    display: none;
  }
  .el-pager {
    li {
      height: 32px;
      width: 32px;
      line-height: 32px;
      border-radius: 16px;
      padding: 0px;
      margin-right: 15px;
      color: #9b9b9b;
      background: #f2f2f2;
      min-width: 32px;
      cursor: pointer;
      &.active {
        background: #409eff;
        color: #fff;
      }
    }
  }
  .skip_title {
    margin-right: -20px;
    position: absolute;
    background: #fff;
    z-index: 777;
  }
  .el-input {
    width: auto;
  }
  .el-pagination__editor.el-input .el-input__inner {
    height: 26px;
    background: #e6e7e8;
    width: 55px;
    border-radius: 13px;
  }
}

.position_info_search {
  margin-top: 10px;
  padding-bottom: 20px;
  background: #fff;
}
.position_list {
  display: -webkit-flex;
  margin-top: 20px;
  margin-bottom: 20px;
  .position_list_left {
    min-width: 900px;
    background: #fff;
    padding: 0 30px;
  }
  .position_list_right {
    width: 280px;
    margin-left: 20px;
  }
}
</style>
<style lang="scss" scoped>
.content {
  width: 80vw;
  margin-left: 10vw;
  display: -webkit-flex;
  justify-content: space-evenly;
  .left-content {
    width: 65%;
    // border:1px solid #555;
    height: 40vh;
    .position-progress {
      border: 1px solid #888;
    }
  }

  .right-content {
    width: 30%;
    height: 30vh;
    border: 1px solid #333;
  }
}
.position-progress {
  padding: 10px;
}
</style>
