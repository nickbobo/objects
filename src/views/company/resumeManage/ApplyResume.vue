<template>
  <div class="apply_resume" v-show="!pageLoading">
    <div v-show="!isTheFirstTimeList">
      <div class="resume_search" ref="resumeSearch">
        <el-form :model="searchData">
          <div class="resume_search_items">
            <el-form-item label="职位" class="input_long">
              <position-input
                ref="positionInput"
                :deliveryPositionId.sync="searchData.DeliveryPositionId"
                @onsearch="onSearch"
              ></position-input> </el-form-item
            ><el-form-item label="学位">
              <el-select placeholder="学历要求" v-model="searchData.Degree">
                <el-option
                  v-for="items in dd_degree"
                  :key="items.ItemName"
                  :label="items.ItemName"
                  :value="items.ItemName"
                ></el-option>
              </el-select> </el-form-item
            ><el-form-item label="性别">
              <el-select placeholder="性别" v-model="searchData.Gender">
                <el-option
                  v-for="items in dd_sex"
                  :key="items.ItemName"
                  :label="items.ItemName"
                  :value="items.ItemName"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-row class="resume_search_items">
            <el-form-item label="姓名" class="input_long">
              <el-input
                v-model="searchData.Name"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>

            <el-form-item label="所在地">
              <el-input
                v-model="searchData.City"
                placeholder="请输入所在地"
              ></el-input>
            </el-form-item>

            <el-form-item class="num_select" label="年龄" prop="AgeFrom">
              <el-input
                type="number"

                v-model="searchData.AgeFrom"
              ></el-input>
              <el-input
                type="number"
        
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
              <!-- <el-select
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
              </el-select> -->

              <el-input
                v-model="searchData.CurPosition"
                placeholder="请输入目前职位"
              ></el-input>
            </el-form-item>
            <el-form-item class="num_select" label="工作年限" prop="AgeFrom">
              <el-input
                type="number"
                v-model="searchData.StartWorkFrom"
              ></el-input>
              <el-input
                type="number"
                v-model="searchData.StartWorkTo"
              ></el-input>
            </el-form-item>
          </el-row>

          <el-row class="resume_search_items">
            <el-form-item label="更新时间" class="input_long">
              <el-select placeholder="更新时间" v-model="searchData.DataRange">
                <el-option
                  v-for="items in updateDateTime"
                  :key="items.id"
                  :label="items.value"
                  :value="items.id"
                ></el-option>
              </el-select>
            </el-form-item>
                        <el-form-item label="简历来源" class="input_long">
              <el-select
                placeholder="简历来源"
                v-model="searchData.ResumeSource"
                size="small"
              >
                <el-option
                  v-for="items in ResumeSourceList"
                  :key="items.value"
                  :label="items.value"
                  :value="items.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>

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
          @getList="getList"
          :applyResume="true"
          :pageIndex.sync="searchData.Offset"
        ></resume-list>
      </div>
    </div>
    <null-resume-list
      v-if="isTheFirstTimeList"
      :showTitle="nullTitle"
    ></null-resume-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ResumeList from "views/components/ResumeList";
import { GetDeliveryResumePager } from "api/companyApi";
import NullResumeList from "./NullResumeList";
import PositionInput from "views/components/PositionInput";
export default {
  name: "ApplyResume", //应聘简历
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
    NullResumeList,
    PositionInput
  },
  data() {
    return {
      pageLoading: true,
      resumeStatus: "",
      isTheFirstTimeList: true, //首次加载是否为空
      nullTitle: "您还没有收到应聘简历哦！",
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
        ResumeSource:'',
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
      }
    };
  },
  methods: {
    ...mapActions(["getAllDD"]),
    closeData() {
      this.$refs.positionInput.positionId = "";
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
    /**
     * status 是否是首次加载 false 首次加载  true搜索
     */
    getList(status) {
      GetDeliveryResumePager(this.searchData).then(res => {
        if (res.data.Success) {
          if (this.$refs.resumeList) {
            this.$refs.resumeList.init(res.data.Data);
          }
          this.isTheFirstTimeList = status ? false : true;
          if (res.data.Data.Items.length > 0) {
            this.isTheFirstTimeList = false;
          }
        } else {
        }
        this.pageLoading = false;
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getList();
    });
  },
  created() {
    this.$store.dispatch("getAllDD");
    // this.getAllDD();
    this.$store.dispatch("GetDictItemJobCategoryList"); //职能
  }
};
</script>
<style lang="scss">
@import "~@/styles/mixin.scss";
// .apply_resume {
//   // background: #fff;
//   // .el-form-item__content {
//   //   width: 215px;
//   // }
// }
</style>

<style lang="scss" scoped>

</style>
