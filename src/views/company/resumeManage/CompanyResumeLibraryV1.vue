<template>
  <div class="company_resume_library" v-show="!pageLoading">
    <div v-show="!isShowNullResumeList">
      <div class="resume_search">
        <el-form :model="searchData">
          <div class="resume_search_items">
            <el-form-item label="简历来源" class="input_long">
              <el-select
                placeholder="简历来源"
                v-model="searchData.ResumeSource"
                size="small"
              >
                <el-option
                  v-for="items in ResumeSourceList"
                  :key="items.id"
                  :label="items.value"
                  :value="items.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item label="学位">
              <el-select
                placeholder="学历要求"
                v-model="searchData.Degree"
                size="small"
              >
                <el-option
                  v-for="items in dd_degree"
                  :key="items.ItemName"
                  :label="items.ItemName"
                  :value="items.ItemName"
                ></el-option>
              </el-select> </el-form-item
            > -->

            <el-form-item label="性别">
              <el-select
                placeholder="性别"
                v-model="searchData.Gender"
                size="small"
              >
                <el-option
                  v-for="items in dd_sex"
                  :key="items.ItemName"
                  :label="items.ItemName"
                  :value="items.ItemName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="更新时间" class="input_long">
              <el-select
                placeholder="更新时间"
                v-model="searchData.DataRange"
                size="small"
              >
                <el-option
                  v-for="items in updateDateTime"
                  :key="items.id"
                  :label="items.value"
                  :value="items.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-row class="resume_search_items">
            <el-form-item label="姓名" class="input_long">
              <el-input
                v-model="searchData.Name"
                placeholder="请输入姓名"
                size="small"
              ></el-input>
            </el-form-item>

            <el-form-item label="所在地">
              <el-input
                v-model="searchData.City"
                placeholder="请输入所在地"
                size="small"
              ></el-input>
            </el-form-item>

            <el-form-item class="num_select" label="年龄" prop="AgeFrom">
              <el-input
                type="number"
                size="small"
                v-model="searchData.AgeFrom"
              ></el-input>
              <el-input
                type="number"
                size="small"
                v-model="searchData.AgeTo"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row class="resume_search_items">
            <el-form-item label="目前公司" class="input_long">
              <el-input
                v-model="searchData.CurCompany"
                placeholder="请输入目前公司"
              ></el-input>
            </el-form-item>

            <el-form-item label="目前职位">
              <el-select
                size="small"
                placeholder="请选择目前职位"
                filterable
                v-model="searchData.CurPosition"
              >
                <el-option-group
                  v-for="items in dictitem_job_category_list"
                  :key="items.ItemCode"
                  :label="items.ItemName"
                >
                  <el-option
                    v-for="item in items.Childs"
                    :key="item.ItemCode"
                    :label="item.ItemName"
                    :value="item.ItemName"
                  ></el-option>
                </el-option-group>
              </el-select>

              <!-- <el-input
                v-model="searchData.CurPosition"
                placeholder="请选择目前职位"
              ></el-input> -->
            </el-form-item>
            <el-form-item class="num_select" label="工作年限" prop="AgeFrom">
              <el-input
                type="number"
                size="small"
                v-model="searchData.StartWorkFrom"
              ></el-input>
              <el-input
                type="number"
                size="small"
                v-model="searchData.StartWorkTo"
              ></el-input>
            </el-form-item>
          </el-row>

          <!-- <el-row class="resume_search_items">

          </el-row> -->

          <div class="su_but">
            <button @click="closeData" type='button' class="w-btn btn-md-w btn-cancel">
              重置条件
            </button>
            <button @click="onSearch" type='button' class="w-btn btn-md-w">搜索简历</button>
          </div>
        </el-form>
      </div>
      <div class="resume_lists">
        <resume-list
          ref="resumeList"
          @getList="getList(true)"
          :companyResumeLibrary="true"
          :pageIndex.sync="searchData.Offset"
        ></resume-list>
      </div>
    </div>
    <null-resume-list
      v-if="isShowNullResumeList"
      :showTitle="nullTitle"
    ></null-resume-list>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ResumeList from "views/components/ResumeList";
import { GetImportCreateCompanyResumePager } from "api/companyApi";
import NullResumeList from "./NullResumeList";
export default {
  name: "CompanyResumeLibrary", //公司简历库
  computed: {
    ...mapGetters([
      "dd_salary_list",
      "industry_item_list",
      "dd_work_year",
      "dd_degree", // 学历要求
      "dd_sex",
      "dd_publish_channel",
      "dictitem_job_category_list"
    ])
  },
  components: {
    ResumeList,
    NullResumeList
  },
  data() {
    return {
      pageLoading: true,
      resumeStatus: "",
      isShowNullResumeList: true,
      nullTitle: "您还没有收到应聘简历哦！",
      updateDateTime: [
        {
          id: 0,
          value: "所有"
        },
        {
          id: 1,
          value: "一月内"
        },
        {
          id: 2,
          value: "半月内"
        },
        {
          id: 3,
          value: "一周内"
        }
      ],

      // 1=新增，2=导入，3=应聘，4=邮件解析，5=关联
      ResumeSourceList: [
        {
          id: 1,
          value: "手动录入"
        },
        {
          id: 2,
          value: "本地导入"
        },
        {
          id: 3,
          value: "应聘投递"
        },
        {
          id: 4,
          value: "邮件解析"
        }
      ],
      searchData: {
        //         DeliveryPositionId: "JobCategory_0101",
        // DeliveryStatus: 0,
        // DataRange: 0,
        // Degree: "Degree_04",
        // Gender: "SEX_01",
        // Name: "bobo",
        // City: "上海",
        // AgeFrom: 0,
        // AgeTo: 0,
        // StartWorkFrom: 0,
        // StartWorkTo: 0,
        // CurCompany: "",
        // CurPosition: "前端开发工程师",
        // Offset: 0,
        // DateTimeDesc: 0

        // ResumeSource: "",
        Gender: "",
        Name: "",
        City: "",
        AgeFrom: 0,
        AgeTo: 0,
        StartWorkFrom: 0,
        StartWorkTo: 0,
        CurCompany: "",
        CurPosition: "",
        Offset: 0
      }
    };
  },
  methods: {
    closeData() {
      this.searchData = {
        DeliveryPositionId: "",
        DeliveryStatus: "",
        DataRange: 0,
        Degree: "",
        Gender: "",
        Name: "",
        City: "",
        AgeFrom: 0,
        AgeTo: 0,
        StartWorkFrom: 0,
        StartWorkTo: 0,
        CurCompany: "",
        CurPosition: "",
        Offset: 0
      };
      this.onSearch();
    },
    onSearch() {
      this.getList(true);
    },
    getList(status) {
      GetImportCreateCompanyResumePager(this.searchData).then(res => {
        if (res.data.Success) {
          if (this.$refs.resumeList) {
            this.$refs.resumeList.init(res.data.Data);
          }
          this.isTheFirstTimeList = status ? false : true;
          if (res.data.Data.Items.length > 0) {
            this.isShowNullResumeList = false;
          }
        } else {
        }
        this.pageLoading = false;
      });
    }
  },
  mounted() {},
  created() {
    this.$store.dispatch("getAllDD");
    this.$store.dispatch("GetDictItemJobCategoryList"); //职能
    this.getList();
  }
};
</script>
<style lang="scss">
@import "~@/styles/mixin.scss";
</style>
