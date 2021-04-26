<template>
  <div class="search-resume">
    <div class="company_detail_header">
      <div class="w-title">
        <h2>搜索简历</h2>
      </div>
      <el-form
        ref="formData"
        label-position="top"
        :model="formData"
        :hide-required-asterisk="true"
        size="small"
      >
        <div class="form-search" v-show="!isExpand">
          <el-form-item label="简历关键字" prop="KeyWord">
            <el-input
              class="keyWords-long"
              placeholder="简历关键字"
              v-model="formData.KeyWord"
            ></el-input>
          </el-form-item>
          <span class="iconfont icon-search" @click="onSearch"></span>
        </div>
        <div class="search-full" v-show="isExpand">
          <el-form-item label="简历关键字" prop="KeyWord" v-if="isExpand">
            <el-input v-model="formData.KeyWord" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="公司名称" prop="CurCompany">
            <el-input v-model="formData.CurCompany" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="所在行业" prop="CurIndustry">
            <el-select
              placeholder="所在行业"
              filterable
              allow-create
              default-first-option
              collapse-tags
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

          <el-form-item label="职能类别" prop="CurPosition">
            <el-select
              placeholder="职能类别"
              filterable
              v-model="formData.CurPosition"
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
          <el-form-item label="年龄" prop="Age">
            <div class="age_select flex">
              <el-input
                type="number"
                min="16"
                max="50"
                v-model="formData.AgeFrom"
              ></el-input>
              <el-input
                type="number"
                min="16"
                max="50"
                v-model="formData.AgeTo"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="工作年限" prop="WorkTime">
            <div class="age_select flex">
              <el-input
                type="number"
                min="1"
                max="50"
                v-model="formData.StartWorkTime"
              ></el-input>
              <el-input
                type="number"
                min="1"
                max="50"
                v-model="formData.EndWorkTime"
              ></el-input>
            </div>
          </el-form-item>

          <el-form-item label="性别" prop="Gender">
            <el-select placeholder="性别" v-model="formData.Gender">
              <el-option
                v-for="items in dd_sex"
                :key="items.ItemName"
                :label="items.ItemName"
                :value="items.ItemCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div
          class="click-toggle"
          :class="{ open: isExpand }"
          @click="expandSearchDiv"
        >
          <span>{{ isExpand ? "收起" : "展开" }}</span
          >高级搜索<i class="iconfont icon-down"></i>
        </div>
        <div class="btn-group text-center">
          <button
            class="w-btn btn-cancel"
            v-if="isExpand"  type='button'
            @click="onCancel('formData')"
          >
            重置
          </button>
          <button class="w-btn" type='button' @click="onSearch">
            搜索
          </button>
        </div>
        <el-form-item class="button_content" v-if="false">
          <button class="w-btn btn-cancel" type='button' @click="onCancel('formData')">
            重置
          </button>
          <button type="" class="w-btn" type='button' @click="onSearch">
            搜索
          </button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 简历列表 -->
    <ul class="cv-tab">
      <li :class="{ active: isActive }" @click="onSwitch()">
        <a>公司简历库结果 ({{ resumeCompanyNum }})</a>
      </li>
      <li :class="{ active: !isActive }" @click="onSwitch()">
        <a>平台简历库结果 ({{ resumeAllNum }})</a>
      </li>
    </ul>

    <div class="resumeList">
      <resume-list
        ref="resumeList"
        @getList="getList"
        :searchResume="true"
        :platformResume="!isActive"
        :pageIndex.sync="formData.Offset"
      ></resume-list>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ResumeList from "../components/ResumeList"; //简历搜索List
// 获取公司自己的简历; 获取所有的简历;
import { CompanyResumeListFromEs, AllResumeListFromEs } from "api/resume";
import { post, resumeManage } from "api/api";
export default {
  name: "SearchResume", //搜索简历
  components: {
    ResumeList
  },
  computed: {
    ...mapGetters([
      "dd_publish_time",
      "dd_work_year", //工作年限
      "dd_degree", //学历
      "dd_sex"
    ])
  },
  data() {
    return {
      resumeList: [],
      isActive: true,
      //TODO
      isShowList: false,
      resumeCompanyNum: 0,
      resumeAllNum: 0,
      isExpand: false,
      formData: {
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
        Offset: 0,
        Limit: 10
      },
      rulesFrom: {} //el-form rules
    };
  },
  methods: {
    //重置搜索条件 el-form标签加上 ref和model;el-form-item标签对应的prop;form data对象中设置对应属性
    onCancel() {
      this.$refs["formData"].resetFields();
      this.formData.AgeFrom = "";
      this.formData.AgeTo = "";
      this.formData.StartWorkTime = "";
      this.formData.EndWorkTime = "";
    },

    //搜索简历 按钮事件
    onSearch() {
      this.getList();
      this.isShowList = true;
    },

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
    //搜索块收起/展开
    expandSearchDiv() {
      this.isExpand = !this.isExpand;
    },
    //搜索简历库切换btn
    onSwitch(item) {
      this.isActive = !this.isActive;
      this.onSearch(); //搜索简历列表
    }
  },
  created() {
    this.$store.dispatch("getAllDD"); //src\store\modules\basicData.js,如学历,薪资,企业规模...
    this.$store.dispatch("getIndustryItemList"); // 行业
    this.onSearch();
    this.getListTotal();
  },

  //在页面离开时记录滚动位置
  beforeRouteLeave(to, from, next) {
    this.scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    next();
  },

  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter(to, from, next) {
    next(vm => {
      document.body.scrollTop = vm.scrollTop;
    });
  },
  mounted() {}
};
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";
$FormItemHeight: 38px;
$FormItemWidthLong: 100%;
$FormItemWidth: 100%;
.search-resume {
  .el-form-item {
    margin-bottom: 15px;
    display: -webkit-flex;
    margin-bottom: 14px;
    float: left;
    width: 50%;
    position: relative;
    padding-left: 7em;
    padding-right: 100px;
    .el-form-item__label {
      color: #666666;
      position: absolute;
      font-weight: 400;
      width: 7em;
      left: 5px;
      top: 0;
      line-height: 34px;
      color: #999;
      line-height: $FormItemHeight;
    }
    .el-select,
    .el-input__inner {
      @include wh($FormItemWidth, $FormItemHeight);
    }
    .el-input {
      width: $FormItemWidth;
    }
    .el-form-item__content {
      text-align: left;
      line-height: $FormItemHeight;
      height: $FormItemHeight;
    }
    .el-form-item__content {
      text-align: left;
      line-height: $FormItemHeight;
      height: $FormItemHeight;
      width: $FormItemWidth;
    }
    .el-input__icon {
      line-height: $FormItemHeight;
    }
    &.input_textarea {
      line-height: inherit;
      .el-form-item__content {
        height: auto;
      }
    }
    .el-cascader {
      line-height: $FormItemHeight;
    }
  }
  .tab-content {
    .el-button {
      @include wh(212px, 40px);
      background: #fff;
      border: 1px solid #dedede;
      color: #888888;
      padding: 0px;
      box-shadow: 0px 0px 12px 0px rgba(162, 190, 196, 0.3);
      border-radius: 0;
      &.active {
        border: 1px solid #44a9e1;
        color: #45aae1;
      }
    }
  }

  .app-body {
    background: url("~static/img/search_resume_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: top left;
    // border: 1px solid #000;
  }
  form.el-form {
    margin: 0 auto;
  }

  .company_detail_header {
    .data_time {
      input {
        &.el-input__inner {
          padding-left: 30px;
        }
      }
    }
    .input_mini {
      width: 240px;

      .el-col {
        text-align: center;
      }
      .el-input {
        width: 100%;
      }
    }

    //年龄
    .age_select {
      margin-left: 0 !important;
      text-align: center;
      @include df;
      width: 100%;
      // width: $FormItemWidth;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 12px;
        height: 1px;
        background-color: #ccc;
        margin-left: -6px;
        margin-top: 0;
      }
      .el-input {
        margin-right: 15px;
      }
      .el-input + .el-input {
        margin-left: 15px;
        margin-right: 0px;
      }
      .el-input__inner {
        width: 100%;
        padding-right: 0;
      }
    }
  }
}

.form-search {
  // overflow: auto;
  position: relative;
  background-color: #eee;
  height: 42px;
  line-height: 42px;
  border-radius: 42px;
  padding-left: 25px;
  padding-right: 50px;
  .el-form-item {
    width: 100%;
    height: 42px;
    margin: 0;
    padding: 0;
    font-size: 0;
    .el-form-item__content {
      font-size: 0;
      height: 42px;
      line-height: 42px;
      .el-input {
        font-size: 0;
        input {
          &.el-input__inner {
            font-size: 14px;
            height: 42px;
            padding: 0;
            border: 0;
            background-color: #eee;
          }
        }
      }
    }
  }
  .icon-search {
    font-size: 20px;
    line-height: 42px;
    width: 50px;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    cursor: pointer;
  }
}
</style>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.search-resume {
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 35px;
  .company_detail_header {
    @include shadow();
    background: #fff;
    font-size: 14px;
    color: #666;
    flex-direction: column;
    padding: 20px 45px 55px 45px;

    .w-title {
      margin-left: -20px;
      border-bottom: none;
    }

    .search-full {
      padding-right: 30px;
      overflow: auto;
      margin-top: 15px;
    }
  }

  //简历列表
  .tab-content {
    margin: 0 auto;
    margin-top: 16px;
  }

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
}

.button_content {
  > div {
    > button {
      width: 120px;
      padding: 0;
    }
    > a {
      margin-left: 10px;
      display: block;
      width: 100px;
    }
  }
}
.btn-group {
  margin-top: 35px;
  font-size: 0;
  .w-btn {
    min-width: 125px;
    margin: 0 4px;
  }
}
.click-toggle {
  margin-top: 25px;
  background-color: #f7f7f7;
  color: #000;
  text-align: center;
  line-height: 42px;
  height: 42px;
  cursor: pointer;
  .iconfont {
    color: #c6c6c6;
    margin-left: 4px;
    display: inline-block;
  }
  &.open {
    .iconfont:before {
      content: "\e74c";
    }
  }
  &:hover {
    background-color: #f5f5f5;
    color: #428dde;
  }
  &:hover {
    .iconfont {
      color: #428dde;
    }
  }
}
</style>
