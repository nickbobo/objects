<template>
  <div class="position-component">
    <position-apply ref="positionApply"></position-apply>
    <div
      class="position-box"
      v-for="(item, index) in list"
      :key="index"
      @click="onPositionItem(item)"
    >
      <div class="position-line list_item_top flex">
        <div class=" text_wrap title_font_mix18">{{ item.Position }}</div>
        <div class="p-price text_wrap">{{ item.Salary }}</div>
      </div>
      <div class="position-line list_item_center flex">
        <div class="left flex">
          <div class="text_wrap">{{ item.Companyname }}</div>
          <div class="text_wrap">{{ item.Scope }}</div>
          <div class="text_wrap">{{ item.Industry }}</div>
        </div>
        <div class="right">
          <el-button
            v-if="!isShowPositionApplyBut" class="plain_but"
            @click.stop="onPositionApply(item.Id)"
            >申请</el-button
          >
          <el-button
            v-if="isShowPositionFavouritBut" class="plain_but"
            @click.stop="onPositionDelCollection(item.Id)"
            >取消收藏</el-button
          >
        </div>
      </div>
      <div class="position-line list_item_bottom flex">
        <div class="line-item number flex">
          <svg-icon icon-class="user" class="icon-arrow1" />
          <p>招聘人数 {{ item.Number }}</p>
        </div>
        <div class="line-item city flex" v-if="item.City">
          <svg-icon icon-class="location" class="icon-location" />
          <p>{{ item.City }}</p>
        </div>
        <div class="line-item updateTime flex">
          <svg-icon icon-class="date" class="icon-date" />
          <p>{{ item.UpdateTime }}</p>
        </div>
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="pager, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { PositionSearch } from "api/position";
import { MyPosition, GetMyDeliveryList, DelCollection } from "api/candidate";
import PositionApply from "components/PositionApply";
import Bus from "utils/bus";
import { mapGetters } from "vuex";
export default {
  name: "PositionComponent",
  components: { PositionApply },
  computed: {
    ...mapGetters(["search_data"])
  },
  props: {
    param: {},
    position: {},
    isShowPositionApplyBut: false,
    isShowPositionFavouritBut: true //取消收藏按钮
  },
  data() {
    return {
      list: "",
      searchData: {
        Keywords: "",
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
        Limit: 3
      },
      currentPage: 1, //高亮第几页
      pageSize: 10, //每页显示个数
      total: 8, //一共多少条数据
      pageOption: ""
    };
  },
  methods: {
    init() {
      this.getList(this.searchData);
    },
    //获取我的收藏下的职位  个人中心我的收藏
    getMyPosition(data) {
      this.pageOption = "myMosition";
      if (!data) {
        data = {
          Offset: 0,
          Limit: 10
        };
      }
      MyPosition(data).then(res => {
        if (res.data.Success) {
          this.list = res.data.Data.Items;
          this.total = Number.parseInt(res.data.Data.Total);
          this.$store.dispatch("updateFavoriteTotal", this.total);
        } else {
        }
      });
    },

    //获取我的申请下的职位  个人中心投递记录
    GetMyDeliveryList(data) {
      this.pageOption = "MyDelivery";
      if (!data) {
        data = {
          Offset: 0,
          Limit: 10
        };
      }
      GetMyDeliveryList(data).then(res => {
        if (res.data.Success) {
          this.list = res.data.Data.Items;
          this.total = Number.parseInt(res.data.Data.Total);
          this.$store.dispatch("updateDeliveredRecordTotal", this.total);
        } else {
        }
      });
    },

    //获取公司下的职位   职位详情>企业发布的职位

    //获取所有职位 home /个人首页  /职位   /职位详情>感兴趣职位 JobCategory
    /**
     * {data} 查询信息
     */
    getList(data) {
      this.searchData = data;
      data.Limit = this.pageSize;
      PositionSearch(data).then(res => {
        if (res.data.Data) {
          this.list = res.data.Data.Items;
          this.total = Number.parseInt(res.data.Data.Total);
          // Limit: 10
          // Offset: 0
          // PageIndex: 1
          // PageSize: 10
          // Total: 8
        } else {
        }
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.searchData.Offset = (val - 1 != 0 ? val - 1 : 0) * this.pageSize;
      let data = {
        Offset: this.searchData.Offset,
        Limit: 10
      };
      if (this.pageOption == "MyDelivery") {
        this.GetMyDeliveryList(data);
      }
      if (this.pageOption == "myMosition") {
        this.getMyPosition(data);
      }
      if (this.pageOption == "") {
        this.getList(this.searchData);
      }
    },
    backTop() {
      const that = this;
      let ispeed = Math.floor(-that.scrollTop / 5);
      document.documentElement.scrollTop = document.body.scrollTop =
        that.scrollTop + ispeed;
    },
    onPositionItem(item) {
      if (this.$route.path == "/PositionDetail") {
        //如果当前页面就刷新当前页面数据
        this.$route.query.positionId = item.Id;
        this.$parent.GetPositionDetail();
        this.backTop();
      } else {
        this.$router
          .push({ path: "/PositionDetail", query: { positionId: item.Id } })
          .catch(err => {});
      }
    },
    onPositionApply(id) {
      this.$refs.positionApply.setPositionApply(id);
    },
    //取消我的收藏
    onPositionDelCollection(id) {
      let that = this;
      DelCollection({ PositionId: id }).then(res => {
        if (res.data.Success) {
          this.getMyPosition();
        } else {
          this.$message.error({ message: res.data.Message, duration: 2000 });
        }
      });
    }
  },
  created() {},
  mounted() {
    let that = this;
    // that.getList(this.search_data);
  },
  watch: {
    search_data: function(newVal) {
      this.getList(this.search_data);
    }
  }
};
</script>
<style lang="scss">
/**
  分页组件样式重写
 */
.el-pagination {
  background: #fff;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  margin-top: 51px;
  margin-bottom: 25px;
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

.position-box {
  padding-bottom: 20px;
  border-bottom: 1px dashed rgba(204, 204, 204, 1);
  cursor: pointer;

  .position-line {
    margin-top: 24px;
    &.list_item_top {
      justify-content: space-between;
      .p-price {
        font-size: 22px;
        color: #44a8e1;
      }
    }
    &.list_item_center {
      justify-content: space-between;
      .left {
        div {
          margin-right: 56px;
        }
        font-size: 14px;
        color: #333;
      }

      // .a-gray-btn {
      //   display: flex;
      //   justify-content: center;
      //   align-items: center;
      //   color: #666;
      //   border: 1px solid #ddd;
      //   border-radius: 4px;
      //   width: 80px;
      //   height: 30px;
      // }
    }
    &.list_item_bottom {
      margin-top: 7px;
      font-size: 14px;
      color: #888;
      .line-item {
        margin-right: 80px;
        display: -webkit-flex;
        align-items: center;
      }
      .svg-icon {
        font-size: 14px;
        color: #ccc;
        margin-right: 10px;
      }
    }
  }
}
</style>
