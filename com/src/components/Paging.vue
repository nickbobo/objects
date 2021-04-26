
<template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="pager,slot, jumper"
      :total="total"
    ></el-pagination>
</template>
<script>
import util from "@/utils/util";
export default {
  name: "Paging", //职位页
  props:['pageSize','total'],
  data() {
    return {
      currentPage: 1, //高亮第几页
    //   pageSize:50,//每页显示个数
    //   total:1000 //一共多少条数据

    };
  },

  inject: {
    userss: {
      default: () => {}
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.$emit("getList",val);
    }
  },
  created: function() {},
  mounted() {}
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
}
</style>
<style  lang="scss" scoped>

</style>