<template>
  <div class="resume_list">
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
      :class="{ hasCheckbox: isShowCheckbox }"
    >
      <!-- <div class="detail_content_checkbox" v-if="positionManager">
        <el-checkbox
          v-model="defaultSeleted"
          disabled
          name="checkbox"
          style="margin-right: 20px;"
        ></el-checkbox>
      </div> -->

      <div class="checkbox-item" v-if="isShowCheckbox">
        <label class="checkbox-inline">
          <input type="checkbox" v-model="items.active" class="checkbox" />
        </label>
      </div>

      <div class="user-info" v-if="!importResume">
        <div class="photo">
          <!-- 没有上传图片时，显示默认的icon -->
          <!-- <img src="img/user-img.jpg" alt=""> -->
        </div>
        <div class="name">
          {{ items.Name }}
        </div>
      </div>
      <div class="user-details" v-if="!importResume">
        <ul class="cv-key" v-if="applyResume">
          <li><span>投递职位： </span>{{ items.PositionName }}</li>
          <li>
            <span>投递日期： </span
            >{{ items.DeliveryTime | Format("yyyy-MM-dd") }}
          </li>
        </ul>
        <ul class="cv-key my_favorite_header" v-else-if="myFavorite">
          <li><span>收藏类别： </span>{{ items.FavoritesName }}</li>
          <li>
            <span>简历来源： </span
            >{{
              items.ResumeSourceTxt
                ? items.ResumeSourceTxt
                : items.ResumeSource
                ? items.ResumeSource
                : "未知"
            }}
          </li>
          <li>
            <span>收藏日期： </span
            >{{ items.UpdateTime | Format("yyyy-MM-dd") }}
          </li>
        </ul>

        <!-- <ul class="cv-key" v-else-if="importResume">
          <li><span>导入操作人： </span>{{ items.OperateUser }}</li>
          <li>
            <span>导入日期： </span
            >{{ items.OperateTime | Format("yyyy-MM-dd") }}
          </li>
        </ul> -->

        <ul class="cv-key" v-else-if="addResume">
          <li><span>新增操作人： </span>{{ items.OperateUser }}</li>
          <li>
            <span>新增日期： </span
            >{{ items.OperateTime | Format("yyyy-MM-dd") }}
          </li>
        </ul>

        <!-- 职位管理 -->
        <ul class="cv-key" v-else-if="positionManager">
          <li>
            <span>简历来源： </span
            >{{
              items.ResumeSourceTxt
                ? items.ResumeSourceTxt
                : items.ResumeSource
                ? items.ResumeSource
                : "未知"
            }}
          </li>
          <li>
            <span>加入候选时间： </span
            >{{ items.DeliveryTime | Format("yyyy-MM-dd") }}
          </li>
        </ul>
        <ul class="cv-key" v-else-if="companyResumeLibrary">
          <li>
            <span>简历来源： </span>
            {{items.ResumeSource}}
            <img
              class="com_icon" :title="items.SourceChannel"
              v-if="items.SourceChannel"
              :src="getChannelIcon(items.SourceChannel)"
            />
            <!-- {{
              items.ResumeSourceTxt
                ? items.ResumeSourceTxt
                : items.ResumeSource
                ? items.ResumeSource
                : "未知"
            }} -->
          </li>
          <li>
            <span>入库日期： </span
            >{{ items.ResumeUpdateTime | Format("yyyy-MM-dd") }}
          </li>
        </ul>
        <ul class="cv-key" v-else>
          <li>
            <span>简历来源： </span
            >{{
              items.ResumeSourceTxt
                ? items.ResumeSourceTxt
                : items.ResumeSource
                ? items.ResumeSource
                : "未知"
            }}
          </li>
          <li>
            <span>更新时间： </span
            >{{ items.ResumeUpdateTime | Format("yyyy-MM-dd") }}
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
      <div class="user-fn" v-if="!importResume">
        <div class="fn-btn">
          <el-popover
            placement="left-start"
            popper-class="icon_arrow"
            width="100"
            trigger="hover"
            :offset="-55"
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

      <div class=" import_resume" v-if="importResume">
        <el-row>
          <el-col :span="3">
            <div>{{ items.CreateUser }}</div>
          </el-col>
          <el-col :span="15">
            <div>{{ items.FileName }}</div>
          </el-col>
          <el-col :span="2">
            <div>{{ items.ImportStatusText }}</div>
          </el-col>
          <el-col :span="4">
            <div>{{ items.UpdateTime | formatDateTime }}</div>
          </el-col>
        </el-row>
        <el-row
          class="import_resume_error"
          v-if="items.ImportStatusText == '失败'"
        >
          <el-col :span="24">
            <div>{{ items.Remark }}</div>
          </el-col>
        </el-row>
      </div>
      <div class="list_item_cont" v-if="false && !importResume">
        <div class="cont_left">
          <div class="resume_header_img"></div>
          <div class="">{{ items.Name }}</div>
        </div>
        <div>
          <el-row class="item_cont name_time"
            >{{ items.CurPositionName ? items.CurPositionName : "--" }}
            {{ items.CurCompanyName | IsNullItem(items.CurPositionName) }}
          </el-row>
          <el-row class="item_cont">
            {{ items.Gender }}
            {{ items.Age | IsNullItem(items.Gender) }}
            {{ items.Education | IsNullItem(items.Age) }}
            {{ items.SchoolName | IsNullItem(items.Education) }}|
            {{ items.City ? items.City : "--" }}
            {{ items.StartWorkYear ? `|${items.StartWorkYear}年工作经验` : "" }}
          </el-row>
        </div>
        <div class="icon_arrow">
          <el-popover
            placement="right"
            popper-class="icon_arrow"
            width="100"
            :offset="55"
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
              <svg-icon
                icon-class="arrow3"
                @click.stop="onPopoverOperation(items)"
                class="icon-svg-but icon-add"
              />
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
  name: "ResumeList", //简历列表
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
    },
    positionManager: {
      define: false
    },
    isShowCheckbox: {
      deefine: false
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
    getChannelIcon(type) {
      let icon = "51";
      if (type == "智联招聘") {
        icon = "zl";
      }
      return `/static/img/${icon}.jpg`;
    },
    init(data) {
      // if (this.applyResume) console.info(this.applyResume, this.platformResume);
      if (data.Resume) {
        this.total = Number.parseInt(data.Count);
        if (this.total > 10000) {
          this.total = 10000;
        }
        this.resumeList = this.updateListData(data.Resume);
      } else {
        this.total = Number.parseInt(data.Total);
        if (this.total > 10000) {
          this.total = 10000;
        }
        this.resumeList = this.updateListData(data.Items);
      }
      // console.info(  window.getComputedStyle(this.$parent.$refs.resumeSearch));
    },

    goResumeDetail(items) {
      let is = ["成功", "重复", "失败", "错误"];
      if (this.importResume) {
        let ist = items.ImportStatusText;
        if (ist == is[1] || ist == is[2] || ist == is[3]) {
          this.$emit("isLookAddress", items);
          return;
        }
      }

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
      // this.$router.push({
      //   path: `/ResumeDetail`,
      //   query: data
      // });
      let routeData = this.$router.resolve({
        path: "/ResumeDetail",
        query: data
      });
      window.open(routeData.href, "_blank");
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
        // if (items.DeliveryStatus != "0") {
        // if (items.CurPositionName)
        //   items.CurPositionName = this.common.getItemNameByItemCode(
        //     this.dictitem_job_category_list,
        //     items.CurPositionName
        //   );
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
        // console.info(items.CurCompanyName)
        // items.CurDataTime = "";
        // items.CurEndTime = "2012-12-12";
        // items.CurStartTime = "2013-12-12";
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

.com_icon {
  @include wh(18px, 18px);
  margin-top: -2px;
}
/**
  分页组件样式重写
 */
.resume_list {
  @include shadow();
  background: #fff;
  padding: 25px 45px 45px;
  >>> .el-pagination {
    background: #fff0;
    display: -webkit-flex;
    justify-content: left;
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
        border-radius: 0;
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

// .resume_list_null {
//   height: 300px !important;
//   margin-top: 10px;
//   overflow: hidden;
//   text-align: center;
// }
.checkbox {
  height: 16px;
  display: block;
  line-height: 16px;
  appearance: none;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none;
  //visibility: hidden;
  cursor: pointer;
  margin: 0;
}
.checkbox:before {
  display: inline-block;
  font-family: "iconfont" !important;
  content: "\e630";
  color: #ccc;
  font-size: 14px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  vertical-align: middle;
}
// 选中时
.checkbox:checked:before {
  display: inline-block;
  font-family: "iconfont" !important;
  content: "\e630";
  color: $blue-hover;
  font-size: 14px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  vertical-align: middle;
}
.resume_list {
  // background: #fff;
  .resume_list_item + .resume_list_item {
    border-top: 1px dotted #ccc;
  }

  .resume_list_item {
    cursor: pointer;
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
    &.hasCheckbox {
      padding-left: 25px;
      .user-info {
        left: 25px;
      }
    }
    .checkbox-item {
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -8px;
      .checkbox-inline {
        display: block;
        margin-right: 0;
      }
    }
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
    // .info-key {
    //   //  li + li:after {
    //   //   content: "";
    //   //   position: absolute;
    //   //   left: 0;
    //   //   top: 50%;
    //   //   height: 12px;
    //   //   margin-top: -6px;
    //   //   width: 1px;
    //   //   background-color: #ccc;
    //   // }
    // }
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
    .import_resume {
      // @include df;
      // justify-content: space-around;
      text-align: center;
      .import_resume_error {
        margin-top: 5px;
        text-align: left;
        padding-left: 15px;
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
        top: 10px;
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
  margin-top: 300px;
  &.icon_arrow {
    top: 100px;
    margin-top: 300px;
    .info_popover {
      .el-col {
        cursor: pointer;
        text-align: center;
        height: 32px;
        line-height: 32px;
        &:hover {
          color: $blue-hover;
        }
      }
    }
  }
}

// .el-dialog {
//   &.position_list {
//     width: 380px;
//     text-align: left;
//     .el-dialog__header {
//       border-bottom: 1px solid #eeeeee;
//       margin: 17px 30px;
//       padding-top: 17px;
//       padding-bottom: 15px;
//     }
//     .el-dialog__body {
//       padding: 0 30px 55px 30px;
//       .list_items {
//         width: 320px;
//         font-size: 14px;
//         height: 32px;
//         line-height: 32px;
//         padding-left: 20px;
//         &:hover {
//           background: #ecf3f6;
//           cursor: pointer;
//         }
//         &.active {
//           background: #ecf3f6;
//         }
//       }
//       .but_list {
//         text-align: center;
//         margin-top: 30px;
//         .el-button {
//           @include wh(72px, 24px);
//           padding: 0;
//           font-size: 12px;
//           border-radius: 3px;
//         }
//       }
//     }
//   }
// }
</style>
