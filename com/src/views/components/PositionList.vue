<template>
  <div class="position-list">
    <div class="resume_list_null" v-if="resumeList.length == 0">
      <null-resume-list
        :showTitle="'没有搜索到结果呢，换个搜索条件试试看～'"
      ></null-resume-list>
    </div>

    <resume-button-operation
      ref="resumeBO"
      @getList="getList"
    ></resume-button-operation>
    <div
      class="resume_list_item"
      v-for="(items, i) in resumeList"
      :key="i"
      @click.stop="goResumeDetail(items)"
    >
      <div class="user-info">
        <div class="photo">
          <!-- 没有上传图片时，显示默认的icon -->
          <!-- <img src="img/user-img.jpg" alt=""> -->
        </div>
        <div class="name">
          {{ items.Name }}
        </div>
      </div>
      <div class="user-details">
        <ul class="cv-key" v-if="applyResume">
          <li><span>投递职位： </span>{{ items.PositionName }}</li>
          <li>
            <span>投递日期： </span
            >{{ items.DeliveryTime | Format("yyyy-MM-dd") }}
          </li>
        </ul>
        <ul class="job-key split">
          <li>{{ items.CurPositionName ? items.CurPositionName : "N/A" }}</li>
          <li>
            {{ items.CurCompanyName ? items.CurCompanyName : "N/A" }}
          </li>
          <li>
            {{
              items.StartWorkYear ? `${items.StartWorkYear}年工作经验` : "N/A"
            }}
          </li>
        </ul>
        <ul class="info-key split">
          <li>{{ items.Gender }}</li>
          <li>{{ items.Age ? items.Age : "N/A" }}</li>
          <li>{{ items.Education ? items.Education : "N/A" }}</li>
          <li>{{ items.SchoolName ? items.SchoolName : "N/A" }}</li>
          <li>{{ items.City ? items.City : "N/A" }}</li>
          <li>
            {{
              items.StartWorkYear ? `${items.StartWorkYear}年工作经验` : "N/A"
            }}
          </li>
        </ul>
      </div>
      <div class="user-fn">
        <div class="fn-btn">
          <el-popover
            placement="right"
            popper-class="icon_arrow"
            width="100"
            trigger="click"
            @show="showPopover(items)"
            v-model="items.popoverOperation"
          >
            <el-row class="info_popover">
              <div v-if="myFavorite">
                <el-col
                  :span="24"
                  @click.native="$refs.resumeBO.onDelFavorite(items.ResumeId)"
                  >取消收藏</el-col
                >
              </div>
              <div></div>
              <el-col
                :span="24"
                @click.native="$refs.resumeBO.isShowFavorite(items.ResumeId)"
                v-if="!myFavorite"
                >收藏简历</el-col
              >
              <el-col
                :span="24"
                v-if="applyResume"
                @click.native="
                  $refs.resumeBO.editDeliveryStatusAction(items, 0)
                "
                >人选不合格</el-col
              >
              <el-col
                :span="24"
                v-if="!applyResume"
                @click.native="
                  $refs.resumeBO.isShowRelevancePosition(items.ResumeId)
                "
                >关联职位</el-col
              >
              <el-col
                :span="24"
                v-if="!applyResume && otherCompany"
                @click.native="$refs.resumeBO.onEditResume(items.ResumeId)"
                >编辑简历</el-col
              >
            </el-row>
            <div class="user-head-img" slot="reference">
              <span
                class="iconfont icon-down"
                @click.stop="onPopoverOperation(items)"
              ></span>
            </div>
          </el-popover>
        </div>
      </div>
    </div>

    <el-pagination
      v-if="resumeList.length > 0"
      popper-class="resume_list"
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
import { mapGetters } from "vuex";
import NullResumeList from "views/company/resumeManage/NullResumeList";
import ResumeButtonOperation from "views/components/ResumeButtonOperation";
export default {
  name: "PositionList", //简历列表
  computed: {
    ...mapGetters(["dictitem_job_category_list", "add_resume_id", "user_info"])
  },
  props: {
    importResume: {
      define: false
    },
    myFavorite: {
      define: false
    },
    applyResume: {
      define: false
    },
    addResume: {
      define: false
    },
    searchResume: {
      define: false
    },
    companyResumeLibrary: {
      define: false
    },
    platformResume: {
      define: false
    }
  },
  // [
  //   ("importResume",
  //   "myFavorite",
  //   "applyResume",
  //   "addResume",
  //   "searchResume",
  //   "companyResumeLibrary",
  //   "platformResume")
  // ]
  components: { NullResumeList, ResumeButtonOperation },
  data() {
    return {
      searchData: {
        KeyWord: "",
        CurCompany: "", //公司名称
        CurIndustry: "", //所在行业
        CurPosition: "", //职能类别
        City: "", //目前所在地
        ExpectCity: "", //期望工作地
        Education: "",
        UpdateTimeUpdateTime: "", //简历更新时间
        AgeFrom: "", //年龄
        AgeTo: "",
        //WorkYear: "", //工作年限
        StartWorkTime: "",
        EndWorkTime: "",
        Gender: "", //性别
        Origin: "" //来源:公司简历;平台简历
      },
      resumeList: [],
      favoriteList: [],
      currentPage: 1, //高亮第几页
      pageSize: 10, //每页显示个数
      total: 8, //一共多少条数据
      searchData: {},
      listType: "",
      otherCompany: false //是否是其他公司简历
    };
  },
  methods: {
    init(data) {
      if (data.Resume) {
        this.total = Number.parseInt(data.Count);
        this.resumeList = this.updateListData(data.Resume);
      } else {
        this.total = Number.parseInt(data.Total);
        this.resumeList = this.updateListData(data.Items);
      }
    },

    goResumeDetail(items) {
      this.$store.dispatch("updateAddResumeId", items.ResumeId);
      this.$store.dispatch("editResumeStatus", false);
      let data = {
        ResumeId: items.ResumeId,
        PositionId: ""
      };
      if (this.$route.path.split("/")[2] == "ApplyResume") {
        if (items.PositionId) {
          data.PositionId = items.PositionId;
        }
      }
      if (items.Id) {
        data.Id = items.Id;
      }
      this.$router.push({
        path: `/ResumeDetail`,
        query: data
      });
    },

    getList() {
      this.$emit("update:pageIndex", 0);
      this.$emit("getList");
    },
    showPopover(items) {
      this.otherCompany = false;
      if (items.CompanyId) {
        if (items.CompanyId == this.user_info.CompanyId) {
          this.otherCompany = true;
        }
      } else {
        this.otherCompany = true;
      }
    },
    onPopoverOperation(items) {
      for (let item of this.resumeList) {
        item.popoverOperation = false;
      }
      items.popoverOperation = true;
    },

    updateListData(data) {
      let datas = [];
      for (let items of data) {
        items.popoverOperation = false;
        items.popoverFavorite = false;
        if (!items.ResumeId) {
          items.ResumeId = items.Id;
        }
        if (items.CurPosition) {
          items.CurPositionName = items.CurPosition;
        }
        if (items.CurCompany) {
          items.CurCompanyName = items.CurCompany;
        }
        if (items.CurEndTime != null && items.CurStartTime != null) {
          items.CurDataTime = `${items.CurEndTime} - ${items.CurStartTime}`;
        }
        datas.push(items);
        // }
      }
      return datas;
    },

    handleSizeChange() {},
    handleCurrentChange(val) {
      let offset = (val - 1 != 0 ? val - 1 : 0) * this.pageSize;
      this.$emit("update:pageIndex", offset);
      this.$emit("getList");
    }
  },
  mounted() {},
  created() {
    this.$store.dispatch("GetDictItemJobCategoryList"); //职能
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
/**
  分页组件样式重写
 */
.position-list {
  @include shadow();
  background: #fff;
  padding: 25px 45px 45px;
  >>> .el-pagination {
    background: #fff0;
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
        padding: 0 5px;
        line-height: 24px;
        height: 24px;
        width: 40px;
        padding: 0px;
        margin-right: 15px;
        color: #9b9b9b;
        border: 1px solid #dedede;
        background: #ffffff;
        min-width: 32px;
        cursor: pointer;
        &.active {
          background: #80b4ee;
          border-color: #80b4ee;
          color: #fff;
        }
      }
    }
    .el-pagination__jump {
      .el-pagination__editor {
        background: #eee;
        border-radius: 5px;
        min-width: 60px;
        margin-left: 5px;
        margin-right: 5px;
        line-height: 26px;
        height: 26px;
        .el-input__inner {
          line-height: 26px;
          height: 26px;
          border-radius: 0;
          width: 100%;
          background: #eee;
          border: 0;
        }
      }
    }
  }
}


.resume_list {
  .resume_list_item + .resume_list_item {
    border-top: 1px dotted #ccc;
  }

  .resume_list_item {
    // background: #fff;
    // margin-top: 8px;
    // cursor: pointer;
    // &:hover {
    //   @include boxSd(0px 0px 8px 0px rgba(127, 165, 195, 0.3));
    // }

    position: relative;
    padding: 20px 0;
    // & + &{
    // 	border-top:1px dotted #ccc;
    // }
    .user-info {
      float: left;
      border-bottom: none;
      margin: 0 30px 0 0;
      .photo {
        width: 44px;
        height: 44px;
        border-width: 2px;
        margin: 0;
        &:after {
          font-size: 30px;
        }
      }
      .name {
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        font-weight: normal;
      }
    }
    .user-details {
      margin-left: 80px;
      > ul {
        overflow: hidden;
        & + ul {
          margin-top: 10px;
        }
        li {
          float: left;
          text-align: left;
        }
      }
    }
    .cv-key {
      @include clearfix();
      li {
        width: 50%;
        font-size: 13px;
        span {
          color: #999;
        }
        &:last-child {
          text-align: right;
        }
      }
      &.my_favorite_header {
        li {
          width: calc(100% / 3);
        }
      }
    }
    .job-key {
      font-size: 15px;
      font-weight: bold;
    }
    .split {
      li + li {
        padding-left: 10px;
        margin-left: 10px;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          height: 12px;
          margin-top: -6px;
          width: 1px;
          background-color: #ccc;
        }
      }
      li {
        position: relative;
      }
    }
    .user-fn {
      position: absolute;
      right: 15px;
      top: 60%;
      transform: translateY(-50%);
      z-index: 9;
    }
    .fn-btn {
      position: relative;
      .iconfont {
        cursor: pointer;
        font-size: 28px;
        line-height: 1;
        display: block;
        color: #ddd;
      }
      &:hover {
        .iconfont {
          color: $blue;
        }
        .submenu {
          display: block;
          left: auto;
          right: 28px;
          li {
            padding-left: 25px;
            padding-right: 25px;
          }
          a {
            font-weight: normal;
          }
        }
      }
    }

    .list_item_header {
      position: relative;
      height: 32px;
      line-height: 32px;
      padding: 0 14px;
      font-size: 12px;
      color: #aaaaaa;
      @include df;
      .deliver_date_time {
        position: absolute;
        right: 10px;
      }
      > div {
        width: 100%;
        @include df;
        @include df-jcs(space-between);
        span {
          display: block;
        }
      }
    }
    .list_item_cont {
      padding: 10px 19px 17px 19px;
      @include df;
      @include df-ai;
      position: relative;
      .cont_left {
        text-align: center;
        margin-right: 20px;
        font-size: 14px;
        .resume_header_img {
          @include whf(32px);
          background: #777;
          border-radius: 25px;
          display: inline-table;
        }
      }
      .icon_arrow {
        position: absolute;
        right: 18px;
        .info_popover {
          .el-col {
            cursor: pointer;
          }
        }
      }
      .item_cont {
        @include df;
        margin-bottom: 10px;
        font-size: 12px;
        color: #aaaaaa;
        &.name_time {
          font-size: 14px;
          color: #121212;
        }
      }
    }
  }
}
.el-popover {
  &.icon_arrow {
    .info_popover {
      .el-col {
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        &:hover {
          color: $blue-hover;
        }
      }
    }
  }
}
</style>
