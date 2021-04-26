<template>
  <div class="add_resume">
    <div class="import_resume_content" v-show="!isShowAdd">
      <div class="resume_search">
        <el-form :model="searchData">
          <div class="resume_search_items">
            <el-form-item label="性别" class="input_long">
              <el-select
                placeholder="请选择性别"
                v-model="searchData.Gender"
                size="small"
              >
                <el-option
                  v-for="items in dd_sex"
                  :key="items.ItemCode"
                  :label="items.ItemName"
                  :value="items.ItemName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input
                v-model="searchData.Name"
                placeholder="请输入姓名"
                size="small"
              ></el-input> </el-form-item
            ><el-form-item label="所在地">
              <el-input
                v-model="searchData.City"
                placeholder="请输入所在地"
                size="small"
              ></el-input>
            </el-form-item>
          </div>
          <div class="resume_search_items">
            <el-form-item label="目前公司" class="input_long">
              <el-input
                v-model="searchData.CurCompany"
                placeholder="请输入目前公司"
              ></el-input>
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
          </div>

          <div class="resume_search_items">
            <el-form-item label="目前职位" class="input_long">
              <el-input
                v-model="searchData.CurPosition"
                placeholder="请输入目前职位"
                size="small"
              ></el-input>
            </el-form-item>
          </div>
          <div class="su_but">
            <button @click="closeData" type='button' class="w-btn btn-md-w btn-cancel">
              重置条件
            </button>
            <button @click="onAddResume" type='button' class="w-btn btn-md-w">
              新增简历
            </button>
            <button @click="onSearch" type='button' class="w-btn btn-md-w">搜索简历</button>
          </div>
        </el-form>
      </div>
      <div class="resume_lists">
        <resume-list
          ref="resumeList"
          @getList="getList"
          :addResume="true"
          :pageIndex.sync="searchData.Offset"
        ></resume-list>
      </div>
    </div>

    <div class="left-content" v-if="isShowAdd">
      <el-row class="resume-info">
        <basic-info ref="basicInfo"></basic-info>
        <current-work></current-work>
        <intention></intention>
        <work-exp></work-exp>
        <project-experience></project-experience>
        <education-experience></education-experience>
        <train></train>
        <reward></reward>

        <self-evaluation></self-evaluation>
        <skill></skill>
        <language></language>
      </el-row>
    </div>
  </div>
</template>

<script>
// import { updatePassword } from "../api/api";
import ResumeProgress from "@/components/Resume/ResumeProgress";
import BasicInfo from "@/components/Resume/BasicInfo";
import Manage from "@/components/Resume/Manage";
import WorkExp from "@/components/Resume/WorkExp";
import Intention from "@/components/Resume/Intention";
import ProjectExperience from "@/components/Resume/ProjectExperience";
import EducationExperience from "@/components/Resume/EducationExperience";
import SelfEvaluation from "@/components/Resume/SelfEvaluation";
import Skill from "@/components/Resume/Skill";
import CurrentWork from "@/components/Resume/CurrentWork";
import Train from "@/components/Resume/Train";
import Reward from "@/components/Resume/Reward";

import Language from "@/components/Resume/Language";

import { mapGetters } from "vuex";
import { GetImportCreateCompanyResumePager } from "api/companyApi";
import ResumeList from "views/components/ResumeList";
export default {
  name: "AddResume", //新增简历
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
    ResumeProgress,
    Manage,
    BasicInfo,
    Intention,
    WorkExp,
    ProjectExperience,
    EducationExperience,
    SelfEvaluation,
    Skill,
    CurrentWork,
    ResumeList,
    Train,
    Reward,
    Language
  },
  data() {
    return {
      msg: "",
      percentage: 20,
      isShowAdd: false,
      searchData: {
        ResumeSource: 1, //新增
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
        ResumeSource: 1, //1=新增，2=导入，3=应聘，4=邮件解析，5=关联
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
      // const { href } = this.$router.resolve({
      //   name: "PositionManager",
      //   params: { id: 0 }
      // });
      // window.open(href, "_blank");
    },
    onSearch() {
      this.getList();
    },
    onAddResume() {
      this.$store.dispatch("updateAddResumeId", "");
      this.$store.dispatch("editResumeStatus", 1);
      this.isShowAdd = true;
    },
    getList() {
      GetImportCreateCompanyResumePager(this.searchData).then(res => {
        if (res.data.Success) {
          if (this.$refs.resumeList) {
            this.$refs.resumeList.init(res.data.Data);
          }
        } else {
        }
      });
    }
  },
  created() {
    this.$Bus.$off("isShowAdd");

    this.$Bus.$on("isShowAdd", () => {
      this.isShowAdd = true;
      this.$store.dispatch("editResumeStatus", 1);
      this.$nextTick(() => {
        if (this.$refs.basicInfo) this.$refs.basicInfo.getBaseInfo();
        // return;
      });
    });
    if (this.$route.query.ResumeId) {
      this.$store.dispatch("updateAddResumeId", this.$route.query.ResumeId);
      this.isShowAdd = true;
      this.$store.dispatch("editResumeStatus", 2);
      this.$nextTick(() => {
        this.$refs.basicInfo.getBaseInfo();
      });
    }
  },
  mounted() {
    this.$store.dispatch("getAllDD");
    this.$store.dispatch("GetDictItemJobCategoryList"); //职能
    this.$nextTick(() => {
      this.getList();
    });
  }
};
</script>
<style>
.el-progress-bar__outer {
  width: auto;
}
</style>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.buton-style {
  @include buttonStyle;
}

.add_resume {
  display: -webkit-flex;
  justify-content: space-evenly;
  font-size: 14px;
  .left-content {
    margin-bottom: 10px;
    text-align: left;
    min-width: 900px;
    .resume-info {
      background: #fff;
      padding: 25px 30px 30px 30px;
      > div + div {
        border-top: 1px solid #e5e5e5;
      }
    }
  }
}
.position-progress {
  padding: 10px;
}
</style>
