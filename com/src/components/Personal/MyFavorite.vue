<template>
  <section>
    <div class="my-favorite_content">
      <el-row v-if="favorite_total==0" > 
        <el-col :span="24">
          <span class="svg-folder">
            <svg-icon icon-class="icon-blank">item</svg-icon>
          </span>
        </el-col>
        <el-col :span="24">您还没有收藏任何职位哦~</el-col>
      </el-row>
      <el-row v-show="favorite_total>0">
        <el-col :span="24">
          <position ref="position" :isShowPositionFavouritBut="true" :isShowPositionApplyBut="true" ></position>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import { MyPosition } from "../../api/candidate";

import position from "views/PositionComponent";
import { mapGetters } from "vuex";
// import { updatePassword } from "../api/api";
export default {
  name: "myFavorite", //个人中心---我的收藏
  components: {
    position
  },
    computed: {
    ...mapGetters(["favorite_total"])
  },
  data() {
    return {
      total: 0,
      isNull:false,
      Items: [
        {
          Id: "57a103f0-555b-4997-139e-08d7da9b04f6",
          CompanyId: null,
          Position: "电机工程师",
          Salary: "8K-10K",
          Companyname: "中智电机工程部",
          Scope: null,
          Industry: "工艺品/珠宝/玩具",
          JobCategory: null,
          CompanyStockType: null,
          Education: "博士",
          Skill: null,
          WorkExp: "1-3年",
          Number: "20",
          City: "重庆",
          UpdateTime: "2020-04-07",
          PublicState: "4",
          IsDelete: "False",
          PublicTime: "2020-04-07",
          ExpirationTime: "0001-01-01",
          IsPublic: null,
          PublishStartTime: null,
          PublishEndTime: null,
          Keywords: null
        }
      ]
    };
  },
  methods: {
    getList() {
      // MyPosition({
      //   Offset: 0,
      //   Limit: 10
      // }).then(res => {
      //   if (res.data.Success) {
      //     this.total = res.data.Data.Total;
      //   } else {
      //   }
      // });
    },
    onCreationResume() {
      this.$router.push({ path: "/resume" }).catch(err => {});
    }
  },
  created() {
  },
  mounted() {
    this.$refs.position.getMyPosition();
  }
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.my-favorite_content {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  .svg-folder {
    color: #ddd;
    font-size: 42px;
    margin: 90px auto 30px auto;
    display: block;
  }
  .null_resume {
    margin-top: 72px;
  }
}
</style>
