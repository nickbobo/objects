<template>
  <el-row class="company_home">
    <div class="layout_left">
      <div class="issue_search_content">
        <a @click="onGoLeeuePosition"
          ><span class="iconfont icon-jia"></span>发布职位</a
        >
        <a @click="onGoSearchResume"
          ><span class="iconfont icon-search"></span>搜索简历</a
        >
        <!-- <div>
          <img src="~static/img/file.png" />
          <el-button
            type="primary"npm
            class="primary_but"
            @click="onGoLeeuePosition"
            >发布职位</el-button
          >
        </div>
        <div>

          
          <img class="magnifier_icon" src="~static/img/magnifier.png" />
          <el-button
            type="primary"
            class="primary_but"
            @click="onGoSearchResume"
            >搜索简历</el-button
          >
        </div> -->
      </div>
      <div class="position_list ">
        <div class="w-title">
          <h2>职位列表</h2>
        </div>

        <div
          class="not_perfect_info content_null"
          v-if="isShowNotPerfectInfo && positionList.length == 0"
        >
          <span>
            待完善企业信息通过企业资质审核后，<br />
            就可以开始我们的平台发布职位公开招聘了哟～</span
          >
          <button
            type="button"
            class="w-btn btn-fluid mt30"
            @click="gotoCompanyInformationOrUserManager(0)"
          >
            立即完善
          </button>
        </div>

        <div
          class="not_perfect_info content_null"
          v-if="isShowSubmitAudit && positionList.length == 0"
        >
          <span
            >贵司企业资质信息已提交，<br />
            请耐心等待审核结果～</span
          >
          <button
            class="w-btn btn-fluid mt30"
            @click="onGoLeeuePosition"
            type="button"
          >
            发布职位
          </button>
        </div>

        <div
          class="not_perfect_info content_null"
          v-if="isShowAuditPass && positionList.length == 0"
        >
          <span>企业资质审核已通过， <br />可以对外公开发布招聘信息咯！</span>
          <button
            class="w-btn btn-fluid mt30"
            @click="onGoLeeuePosition"
            type="button"
          >
            发布职位
          </button>
        </div>

        <div class="position_list_content job-box ">
          <ul
            class=" job-list"
            v-for="(item, index) in positionList"
            :key="index"
          >
            <li>
              <span>{{ item.PositionName }}</span>
            </li>
            <li>
              <span>{{ item.Salary ? item.Salary : "面议" }}</span>
            </li>
            <li>
              <span class="i-addr">{{
                item.CityTxt ? item.CityTxt : "未知"
              }}</span>
            </li>
            <li>
              <span class="i-date"
                >发布日期：{{ item.CreateTime | Format("yyyy-MM-dd") }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="layout_right">
      <img :src="logoUrl" />
      <span class="title">{{ user_info.CompanyName }}</span>
      <div>
        <button
          type="button"
          class="w-btn btn-fluid"
          v-if="user_info.UserType == 2"
          @click="gotoCompanyInformationOrUserManager(0)"
        >
          企业信息维护
        </button>
        <button
          type="button"
          class="w-btn btn-fluid"
          @click="gotoCompanyInformationOrUserManager(1)"
        >
          企业用户管理
        </button>
      </div>

      <div class="admin">
        <div class="user-info">
          <div class="photo">
            <img src="~static/img/def_head_img.png" />
            <!-- 没有上传图片时，显示默认的icon -->
            <!-- <img src="img/user-img.jpg" alt=""> -->
          </div>
          <div class="name">
            {{ user_info.Username }}
          </div>
          <div class="level">{{ user_info.UserTitle }}</div>
        </div>
      </div>
    </div>
  </el-row>
</template>
<script>
import { GetCompanyState, GetCompanyLogoState } from "api/companyApi";
import { GetPositionList } from "api/positionManager";
import { mapGetters } from "vuex";
export default {
  name: "CompanyHome", //企业首页
  data() {
    return {
      isShowNotPerfectInfo: false, //未完善信息
      isShowSubmitAudit: false, //提交审核
      isShowAuditPass: false, //审核通过
      companyLogo: "",
      resumeStatus: "",
      uploadLoadingDialog: false,
      uploadOkDialog: false,
      positionList: [],
      positionData: {
        PositionName: "",
        CreateUserId: "",
        PublicStartTime: "",
        PublicEndTime: "",
        PublicState: 0,
        State: 0,
        CompanyId: "",
        IsEntrust: false,
        Offset: 0,
        Limit: 10
      },
      logoUrl: "/static/img/company_icon.png"
    };
  },
  computed: {
    ...mapGetters(["user_info", "siderbar_routers"])
  },
  methods: {
    GetCompanyLogoState() {
      GetCompanyLogoState().then(res => {
        console.info(res);
        if (res.data) {
          if (res.data.Data) {
            if (res.data.Data == "审核成功") {
              this.logoUrl = this.$GetCompnyImgUrl(this.user_info.CompanyId);
            }
          }
        }
      });
    },

    onGoLeeuePosition() {
      this.$router.push({ path: "/IssuePosition" });
    },
    onGoSearchResume() {
      this.$router.push({ path: "/ResumeManage/CompanyResumeLibrary" });
    },
    // onUploadResume() {
    //   this.uploadLoadingDialog = true;
    //   setTimeout(() => {
    //     this.uploadLoadingDialog = false;
    //     this.uploadOkDialog = true;
    //   }, 1000);
    // },
    onRefreshResume() {},
    getCompanyState() {
      GetCompanyState({ CompangyId: this.user_info.CompanyId }).then(res => {
        if (res.data.Success) {
          let data = res.data.Data;
          if (data.IsPerfect) {
            if (data.AduitState) {
              this.isShowAuditPass = true;
            } else {
              this.uploadLoadingDialog = true;
            }
          } else {
            this.isShowNotPerfectInfo = true;
          }
        }
      });
    },
    getPositionList() {
      GetPositionList(this.positionData).then(res => {
        if (res.data.Success) {
          this.positionList = res.data.Data.Items;
        }
      });
    },
    gotoCompanyInformationOrUserManager(type) {
      this.$router.push({
        path: "/CompanyInformationsUserMan",
        query: { pType: type }
      });
    }
  },
  mounted() {},
  created() {
    this.$store.dispatch("getCityItem"); //地图
    this.getCompanyState();
    this.getPositionList();
    this.$store.dispatch("getIndustryItemList"); // 行业
    this.$store.dispatch("GetCompanyStockList"); //"企业性质
    this.GetCompanyLogoState();
    this.$nextTick(() => {
      this.$Bus.$emit("headerInit");
    });
    //  this.companyLogo =
  }
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.el-col {
  margin: 10px 0;

  &.file_format {
    color: rgba(136, 136, 136, 1);
  }
}

.company_home {
  // @include df;
  width: 1200px;
  margin: 0 auto;
  .job-list {
    li {
      span {
        display: inline-table;
      }
    }
  }
  .layout_left {
    width: 900px;
    float: left;
    .issue_search_content {
      background-color: #fff;
      margin-bottom: 15px;
      @include shadow();
      @include clearfix();
      > a {
        display: block;
        width: 50%;
        float: left;
        padding-top: 35px;
        padding-bottom: 25px;
        text-align: center;
        color: #333;
        box-sizing: border-box;
        .iconfont {
          display: block;
          font-size: 38px;
          line-height: 1;
          margin-bottom: 15px;
          color: #ccc;
        }
        &:hover {
          color: $blue-hover;
          .iconfont {
            color: $blue-hover;
          }
        }
        & + a {
          border-left: 1px solid #ebebeb;
        }
      }
      // height: 152px;
      // padding: 0 200px;
      // @include df;
      // @include df-jcs(space-between);
      // @include bgImg("com_bg.png");
      // > div {
      //   width: 100px;
      //   img {
      //     margin: 26px 0 20px 32px;
      //     display: block;
      //     @include wh(36px, 46px);
      //     &.magnifier_icon {
      //       margin-left: 26px;
      //       @include wh(48px, 43px);
      //     }
      //   }
      //   .el-button {
      //     width: 100px;
      //     display: block;
      //   }
      // }
    }
    .position_list {
      @include shadow();
      margin-top: 10px;
      background: #fff;
      padding: 22px 30px;
      margin-bottom: 10px;
      display: block;
      min-height: 600px;
      .w-btn {
        margin-top: 35px;
        width: 270px;
      }
      .content_null {
        text-align: center;
        margin-bottom: 274px;
        span {
          margin-top: 100px;
          display: block;
          line-height: 30px;
          color: #656565;
          font-size: 14px;
        }
        .el-button {
          margin-top: 39px;
          @include wh(100px, 30px);
        }
      }
      .position_list_content {
        width: 100%;
      }
      .job-list {
        list-style: none;
        padding: 20px 0;
        color: #000;
        @include clearfix();
        &:hover {
          background: #eff7fd;
          cursor: pointer;
        }
        li {
          width: 25%;
          float: left;
          text-align: left;
          line-height: 20px;
          overflow: hidden; /*溢出隐藏*/
          text-overflow: ellipsis; /*以省略号...显示*/
          white-space: nowrap; /*强制不换行*/
          &:last-child {
            text-align: right;
          }
        }
        & + & {
          border-top: 1px dotted #ccc;
        }
        .i-addr,
        .i-date {
          &:after {
            color: #999;
          }
        }

        .i-addr:after {
          content: "\e6f8";
        }
        .i-date:after {
          content: "\e61a";
        }
      }
      .job-list + .job-list {
        border-top: 1px dotted #ccc;
      }
      // .list_item {
      //   border-bottom: 1px dashed #e9e9e9;
      //   padding-bottom: 10px;
      //   padding-top: 10px;
      //   &:hover {
      //     background: #eff7fd;
      //     cursor: pointer;
      //   }
      //   .position_name {
      //     overflow: hidden; /*溢出隐藏*/
      //     text-overflow: ellipsis; /*以省略号...显示*/
      //     white-space: nowrap; /*强制不换行*/
      //   }
      //   .create_time {
      //     text-align: right;
      //   }
      // }
    }
  }
  .layout_right {
    @include shadow();
    float: right;
    width: 280px;
    position: relative;
    background: #fff;
    overflow: hidden;
    padding: 10px 15px;
    > img {
      width: 100%;
      margin-top: 10px;
    }
    .title {
      font-weight: bold;
      color: #333333;
      margin: 20px 0 0 0;
      display: block;
      font-size: 14px;
    }
    // .el-button {
    //   width: 100%;
    //   height: 36px;
    //   margin-bottom: 10px;
    // }
    .btn-fluid {
      margin-top: 10px;
      @include lineH(36px);
    }
    .admin {
      margin-top: 30px;
      .level {
        color: #999;
        margin-top: 4px;
      }
      .user-info {
        text-align: center;
        margin-bottom: 20px;
        .photo {
          position: relative;
          width: 85px;
          height: 85px;
          background-color: #fff;
          border: 5px solid #f8f8f8;
          border-radius: 100%;
          margin: 10px auto;

          &:after {
            content: "\e681";
            @include iconfont();
            font-size: 70px;
            line-height: 1;
            color: #b2b2b2;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9;
          }
          &.i-admin:after {
            content: "\e696";
          }

          img {
            display: block;
            width: 100%;
            border-radius: 100%;
            position: relative;
            z-index: 11;
          }
        }

        .name {
          font-size: 16px;
          font-weight: bold;
        }

        .spec {
          font-size: 13px;
          margin: 20px 0;

          li {
            display: inline-block;
            margin-top: 4px;
            margin-bottom: 4px;

            & + li {
              padding-left: 8px;
              margin-left: 5px;
            }
          }
        }
      }
    }
    .user_info {
      margin-top: 10px;
      font-size: 14px;
      @include df;
      img {
        @include whf(48px);
        margin-right: 20px;
      }
      > div {
        span {
          display: block;
          color: #333333;
          padding: 5px 0;
          &.admin {
            color: #888888;
          }
        }
      }
    }
  }
}
</style>
