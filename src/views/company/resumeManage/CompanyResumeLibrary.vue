<template>
  <div class="company_resume_library" v-show="pageLoading">
    <div v-show="!isShowNullResumeList">
      <div class="resume_search">
      
        <el-form :model="searchData">
          <el-row class="resume_search_items">
            <el-form-item label="简历关键字" prop="KeyWord">
              <el-input v-model="formData.KeyWord" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="当前职位" prop="CurPosition">
              <el-input
                v-model="formData.CurPosition"
                placeholder="当前职位"
              ></el-input>
            </el-form-item>

            <el-form-item label="简历更新时间" prop="UpdateTimeUpdateTime">
              <el-select
                placeholder="简历更新时间"
                v-model="formData.UpdateTimeUpdateTime"
              >
                <el-option
                  v-for="items in $store.getters.dd_publish_time"
                  :key="items.ItemName"
                  :label="items.ItemName"
                  :value="items.ItemCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>

          <el-row class="resume_search_items">
            <el-form-item class="num_select" label="工作年限" prop="AgeFrom">
              <el-input
                type="number"
                size="small"
                v-model="formData.StartWorkTime"
              ></el-input>
              <el-input
                type="number"
                size="small"
                v-model="formData.EndWorkTime"
              ></el-input>
            </el-form-item>
            <el-form-item class="num_select" label="年龄" prop="AgeFrom">
              <el-input
                type="number"
                size="small"
                v-model="formData.AgeFrom"
              ></el-input>
              <el-input
                type="number"
                size="small"
                v-model="formData.AgeTo"
              ></el-input>
            </el-form-item>
            <el-form-item label="学历" prop="Education">
              <el-select placeholder="请选择学历" v-model="formData.Education">
                <el-option
                  v-for="items in dd_degree"
                  :key="items.ItemName"
                  :label="items.ItemName"
                  :value="items.ItemName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>

          <el-row class="resume_search_items" v-if="isShow">
            <el-form-item label="公司名称" prop="CurCompany">
              <el-input v-model="formData.CurCompany" placeholder=""></el-input>
            </el-form-item>

            <el-form-item label="所在行业" prop="CurIndustry">
              <el-select
                placeholder="所在行业"
                filterable
                allow-create
                v-model="formData.CurIndustry"
              >
                <el-option-group
                  v-for="industryItem in $store.getters.industry_item_list"
                  :key="industryItem.ItemName"
                  :label="industryItem.ItemName"
                >
                  <el-option
                    v-for="item in industryItem.Childs"
                    :key="item.ItemName"
                    :label="item.ItemName"
                    :value="item.ItemName"
                  ></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item label="目前所在地" prop="City">
              <el-select
                placeholder="目前所在地"
                filterable
                v-model="formData.City"
              >
                <el-option-group
                  v-for="items in $store.getters.city_item"
                  :key="items.ItemName"
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
            </el-form-item>
          </el-row>
          <el-row class="resume_search_items" v-if="isShow">
            <el-form-item label="期望工作地" prop="ExpectCity">
              <el-select
                placeholder="期望工作地"
                filterable
                v-model="formData.ExpectCity"
              >
                <el-option-group
                  v-for="items in $store.getters.city_item"
                  :key="items.ItemName"
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
            </el-form-item>
            <el-form-item label="性别" prop="Gender">
              <el-select placeholder="性别" v-model="formData.Gender">
                <el-option
                  v-for="items in dd_sex"
                  :key="items.ItemName"
                  :label="items.ItemName"
                  :value="items.ItemName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="简历来源" class="input_long">
              <el-select
                placeholder="简历来源"
                v-model="formData.ResumeSource"
                size="small"
              >
                <el-option
                  v-for="items in ResumeSourceList"
                  :key="items.value"
                  :label="items.value"
                  :value="items.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row class="resume_search_items" v-if="isShow">
            <el-form-item label="政治面貌">
              <el-select
                placeholder="请选择政治面貌"
                v-model="formData.Political"
                @change="common.selectChange"
              >
                <el-option
                  v-for="items in dd_political"
                  :key="items.ItemName"
                  :label="items.ItemName"
                  :value="items.ItemName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="海外经历" prop="IsOverseaStudy">
              <el-select
                placeholder="请选择海外经历"
                v-model="formData.OverseasStudy"
              >
                <el-option
                  v-for="items in dd_overseas_study"
                  :key="items.ItemName"
                  :label="items.ItemName"
                  :value="items.ItemName"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学校名称" prop="SchoolName">
              <el-input
                type="text"
                maxlength="35"
                show-word-limit
                v-model="formData.SchoolName"
                placeholder="请输入学校名称"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row class="resume_search_items" v-if="isShow">
            <el-form-item label="职能类别" prop="WorkExp">
              <el-select
                placeholder="职能类别"
                allow-create
                filterable
                v-model="formData.WorkExp"
              >
                <el-option-group
                  v-for="items in $store.getters.dictitem_job_category_list"
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
            </el-form-item>
          </el-row>
          <!-- <div
            class="click-toggle"
            :class="{ open: isShow }"
            @click="isShow = !isShow"
          >
            <span>{{ isShow ? "收起" : "展开" }}</span>
          </div> -->
          <!-- <el-row class="resume_search_items">

          </el-row> -->

          <div class="su_but">
            <button
              @click="isShow = !isShow"
              class="w-btn btn-md-w btn-cancel"
              type="button"
            >
              {{ isShow ? "收起" : "展开" }}
            </button>
            <button
              @click="closeData"
              class="w-btn btn-md-w btn-cancel"
              type="button"
            >
              重置条件
            </button>
            <button @click="onSearch" class="w-btn btn-md-w" type="button">
              搜索简历
            </button>
          </div>
        </el-form>
      </div>

      <ul class="cv-tab">
        <li :class="{ active: isActive }" @click="onSwitch()">
          <a>公司简历库结果 ({{ resumeCompanyNum }})</a>
        </li>
        <li :class="{ active: !isActive }" @click="onSwitch()">
          <a
            >平台简历库结果 ({{
              resumeAllNum > 100000 ? "10w+" : resumeAllNum
            }})</a
          >
        </li>
      </ul>
      <div class="resume_lists">
        <resume-list
          ref="resumeList"
          @getList="getList"
          :companyResumeLibrary="true"
          :pageIndex.sync="formData.Offset"
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
import { post, resumeManage } from "api/api";
import { GetImportCreateCompanyResumePager } from "api/companyApi";
import NullResumeList from "./NullResumeList";
import { CompanyResumeListFromEs, AllResumeListFromEs } from "api/resume";
export default {
  name: "CompanyResumeLibrary", //公司简历库
  computed: {
    ...mapGetters([
      "dd_salary_list",
      "industry_item_list",
      "dd_work_year",
      "dd_degree", // 学历要求
      "dd_sex",
      "dd_political",
      "dd_overseas_study",
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
      isShow: false,
      isActive: true,
      //TODO
      // isShowList: false,
      resumeCompanyNum: 0,
      resumeAllNum: 0,
      formData: {
        KeyWord: "",
        CurCompany: "", //公司名称
        CurIndustry: "", //所在行业
        CurPosition: "", //职能类别
        WorkExp: "",
        City: "", //目前所在地
        ExpectCity: "", //期望工作地
        Education: "",
        UpdateTimeUpdateTime: "", //简历更新时间
        AgeFrom: "", //年龄
        AgeTo: "",
        //WorkYear: "", //工作年限
        StartWorkTime: "",
        EndWorkTime: "",
        Gender: "",
        OpenId: "",
        ResumeSource: "",
        Offset: 0,
        Limit: 10
      },
      registerGroupId: "",
      pageLoading: true,
      resumeStatus: "",
      isShowNullResumeList: false,
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
        Political: "",
        OverseasStudy: "",
        SchoolName: "",
        // ResumeSource: "",
        KeyWord: "",
        CurCompany: "", //公司名称
        CurIndustry: "", //所在行业
        CurPosition: "", //职能类别
        WorkExp: "",
        City: "", //目前所在地
        ExpectCity: "", //期望工作地
        Education: "",
        UpdateTimeUpdateTime: "", //简历更新时间
        AgeFrom: "", //年龄
        AgeTo: "",
        //WorkYear: "", //工作年限
        StartWorkTime: "",
        EndWorkTime: "",
        Gender: "",
        OpenId: "",
        Offset: 0,
        Limit: 10
      }
    };
  },
  methods: {
    onIsShow() {
      this.isShow != this.isShow;
    },
    onSwitch(item) {
      this.isActive = !this.isActive;
      this.getList();
      this.isShowList = true;
    },
    //搜索简历 按钮事件

    getListTotal() {
      AllResumeListFromEs(this.formData).then(res => {
        if (res.data.Data) {
          this.resumeAllNum = res.data.Data.Count;
        } else {
        }
      });
    },
    async getList() {
      this.formData.Limit = 10;
      this.formData.GroupId = this.registerGroupId;
      if (this.isActive) {
        let res = await post(
          `${resumeManage}GetCompanyResumeListFromEs`,
          this.formData
        );
        if (this.$refs.resumeList) this.$refs.resumeList.init(res.Data);

        this.resumeCompanyNum = res.Data.Count;
      } else {
        let res = await post(
          `${resumeManage}GetAllResumeListFromEs`,
          this.formData
        );
        if (this.$refs.resumeList) this.$refs.resumeList.init(res.Data);
        this.resumeAllNum = res.Data.Count;
      }
    },
    closeData() {
      // this.searchData = {
      //   KeyWord: "",
      //   CurCompany: "", //公司名称
      //   CurIndustry: "", //所在行业
      //   CurPosition: "", //职能类别
      //   City: "", //目前所在地
      //   ExpectCity: "", //期望工作地
      //   Education: "",
      //   UpdateTimeUpdateTime: "", //简历更新时间
      //   AgeFrom: "", //年龄
      //   AgeTo: "",
      //   //WorkYear: "", //工作年限
      //   StartWorkTime: "",
      //   EndWorkTime: "",
      //   Gender: "",
      //   OpenId: "",
      //   ResumeSource: "",
      //   Offset: 0,
      //   Limit: 10
      // };
      this.formData = {
        Political: "",
        OverseasStudy: "",
        SchoolName: "",
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
        Gender: "",
        OpenId: "",
        ResumeSource: "",
        Offset: 0,
        Limit: 10
      };
      this.onSearch();
    },
    onSearch() {
      this.getList(true);
    }
    // getList(status) {
    //   GetImportCreateCompanyResumePager(this.searchData).then(res => {
    //     if (res.data.Success) {
    //       if (this.$refs.resumeList) {
    //         this.$refs.resumeList.init(res.data.Data);
    //       }
    //       this.isTheFirstTimeList = status ? false : true;
    //       if (res.data.Data.Items.length > 0) {
    //         this.isShowNullResumeList = false;
    //       }
    //     } else {
    //     }
    //     this.pageLoading = false;
    //   });
    // }
  },
  mounted() {},
  created() {
    // console.info(this.$route.query.GroupId)
    // if (this.$route.query.GroupId){
    //   this.registerGroupId = this.$route.query.GroupId
    // }
    this.$store.dispatch("getAllDD");
    this.$store.dispatch("GetDictItemJobCategoryList"); //职能
    this.getList();
    this.getListTotal();
  }
};
</script>
<style lang="scss">
@import "~@/styles/mixin.scss";

.cv-tab {
  margin-top: 35px;
  @include clearfix();
  li {
    float: left;
    a {
      display: block;
      background-color: #dddddd;
      font-size: 16px;
      color: #000;
      line-height: 20px;
      padding: 12px 20px;
      margin-right: 12px;
      margin-top: 6px;
      &:hover {
        background-color: $bgray-hover;
      }
    }
    &.active {
      a {
        cursor: default;
        margin-top: 0;
        padding-top: 18px;
        background-color: #fff;
        box-shadow: 0 -16px 16px rgba(6, 6, 6, 0.1);
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.resume_search .resume_search_items .el-form-item {
  padding-left: 8em;
}
.resume_search .resume_search_items .el-form-item label.el-form-item__label {
  width: 8em;
}
.click-toggle {
  width: 150px;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
  :hover {
    color: royalblue;
  }
}
</style>
