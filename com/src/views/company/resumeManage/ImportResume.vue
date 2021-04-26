<template>
  <div class="import_resume">
    <div class="import_resume_content" v-if="!importResumeModuleStatus">
      <div class="resume_search">
        <el-form :model="searchData">
          <div class="resume_search_items">
            <el-form-item label="文件名">
              <el-input
                v-model="searchData.FileName"
                placeholder="请输入文件名"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="开始日期"
              prop="StartTime"
              class="start-end-time"
            >
              <el-date-picker
                v-model="searchData.StartTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="开始日期"
                :picker-options="common.startTime(searchData.EndTime)"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="结束日期"
              prop="StartTime"
              class="start-end-time"
            >
              <el-date-picker
                v-model="searchData.EndTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
                :picker-options="common.endTime(searchData.StartTime)"
                :default-value="new Date()"
              >
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="resume_search_items">
            <el-form-item label="简历状态">
              <el-select
                placeholder="请选择简历状态"
                v-model="searchData.ImportStatus"
                size="small"
              >
                <el-option
                  v-for="(val, key, index) in ImportStatusList"
                  :key="key"
                  :label="val"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="操作人">
              <el-select
                v-model="searchData.CreateUserId"
                placeholder="操作人"
                size="small"
                clearable
              >
                <el-option
                  v-for="item in positionPublishUserList"
                  :key="item.Id"
                  :label="item.Contract"
                  :value="item.Id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="失败原因">
              <el-input v-model="searchData.Remark" size="small"></el-input>
            </el-form-item>
          </div>

          <!-- <div class="resume_search_items">
            <el-form-item label="目前职位" class="input_long">
              <el-input
                v-model="searchData.CurPosition"
                placeholder="请输入目前职位"
                size="small"
              ></el-input>
            </el-form-item>
          </div> -->
          <div class="su_but">
            <button
              @click="closeData"
              type="button"
              class="w-btn btn-md-w btn-cancel"
            >
              重置条件
            </button>
            <!-- <button @click="onImportResume" class="w-btn btn-md-w">
              导入简历
            </button> -->
            <button @click="onSearch" class="w-btn btn-md-w" type="button">
              搜索简历
            </button>
          </div>
        </el-form>
      </div>
      <div class="resume_lists">
        <resume-list
          ref="resumeList"
          @getList="getList(true)"
          @isLookAddress="openPath"
          :importResume="true"
          :pageIndex.sync="searchData.Offset"
        ></resume-list>
      </div>
    </div>
    <import-resume-module
      ref="importResumeModule"
      v-show="importResumeModuleStatus"
      @getList="getList(true)"
      :importResumeModuleStatus.sync="importResumeModuleStatus"
      :listTotal="listTotal"
    ></import-resume-module>
    <look-address ref="lookAddress"></look-address>
    <!-- <null-resume-list
      v-if="isTheFirstTimeList"
      :showTitle="nullTitle"
    ></null-resume-list> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ResumeList from "views/components/ResumeList";
import ImportResumeModule from "views/components/ImportResumeModule";
import NullResumeList from "./NullResumeList";
import { GetImportStatusList, GetPager } from "api/resume";
import LookAddress from "views/components/LookAddress";
import {
  GetDeliveryResumePager,
  GetUserFavoritePager,
  CollectResume,
  GetCollectResumePager,
  CollectResumeCancel,
  GetImportCreateCompanyResumePager
} from "api/companyApi";

import { GetPositionPublisherList } from "api/positionManager";
export default {
  name: "ImportResume", //导入简历
  computed: {
    ...mapGetters([
      "dd_salary_list",
      "industry_item_list",
      "dd_work_year",
      "dd_degree", // 学历要求
      "dd_sex",
      "dd_publish_channel",
      "dictitem_job_category_list",
      "user_info"
    ])
  },
  components: {
    ResumeList,
    ImportResumeModule,
    NullResumeList,
    LookAddress
  },
  data() {
    return {
      isTheFirstTimeList: true, //首次加载是否为空
      nullTitle: "您还没有收到应聘简历哦！",
      resumeStatus: "",
      searchData: {
        CompanyId: "",
        FileName: "",
        Remark: "",
        CreateUserId: "",
        ImportStatus: "",
        StartTime: "",
        EndTime: "",
        Limit: 10,
        // ResumeSource: 2, //1=新增，2=导入，3=应聘，4=邮件解析，5=关联
        // Gender: "",
        // Name: "",
        // City: "",
        // AgeFrom: "",
        // AgeTo: "",
        // StartWorkFrom: "",
        // StartWorkTo: "",
        // CurCompany: "",
        // CurPosition: "",
        Offset: 0
      },
      positionPublishUserList: [],
      ImportStatusList: [],
      listTotal: 0,
      importResumeModuleStatus: false
    };
  },
  methods: {
    openPath(data) {
      this.$refs.lookAddress.isShowDialog = true; //简历原件弹框
      this.$refs.lookAddress.init(  //简历原件初始化
        data.ResumeSourceUrl
      );
    },
    closeData() {
      this.searchData = {
        CompanyId: "",
        FileName: "",
        ImportStatus: "",
        StartTime: "",
        EndTime: "",
        Limit: 10,
        // ResumeSource: 2, //1=新增，2=导入，3=应聘，4=邮件解析，5=关联
        // Gender: "",
        // Name: "",
        // City: "",
        // AgeFrom: 0,
        // AgeTo: 0,
        // StartWorkFrom: 0,
        // StartWorkTo: 0,
        // CurCompany: "",
        // CurPosition: "",
        Offset: 0
      };
      this.onSearch();
    },
    onSearch() {
      this.getList(true);
    },
    GetImportStatusList() {
      GetImportStatusList({}).then(res => {
        if (res.data.Success) {
          this.ImportStatusList = res.data.Data;
        }
      });
    },

    // 获取职位发布人列表
    getPostionPublisherList() {
      GetPositionPublisherList().then(res => {
        if (res.data.Success) {
          this.positionPublishUserList = res.data.Data;
        }
      });
    },
    getList(status) {
      this.searchData.CompanyId = this.user_info.CompanyId;
      GetPager(this.searchData).then(res => {
        if (res.data.Success) {
          if (this.$refs.resumeList) {
            this.$refs.resumeList.init(res.data.Data);
          }

          this.listTotal = res.data.Data.Total;
        }
      });
    },
    /**
     * 导入简历切换
     */
    onImportResume() {
      this.importResumeModuleStatus = true;
    }
  },
  mounted() {},
  created() {
    this.$store.dispatch("getAllDD");
    this.$store.dispatch("GetDictItemJobCategoryList"); //职能
    this.$nextTick(() => {
      this.getList();
    });

    this.$Bus.$on("getImportResumeList", () => {
      this.getList();
      this.importResumeModuleStatus = false;
    });
    this.GetImportStatusList();
    this.getPostionPublisherList();
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
// .el-form-item {
//   &.start-end-time {
//     width: 66.66%;
//   }
// }
</style>
