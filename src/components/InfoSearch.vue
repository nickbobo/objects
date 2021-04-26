<template>
  <div
    class="info_search"
    :class="{
      min_info_search: infoSearchSize == 'min',
      small_info_search: infoSearchSize == 'small'
    }"
  >
    <el-row>
      <el-col :span="4" class="city_content">
        <span>{{ cityVal ? cityVal : "全国" }}</span>
        <svg-icon
          icon-class="arrow"
          class="icon-svg-but pop_up"
          @click="onShowSelection('city')"
        />
      </el-col>
      <el-col :span="16" class="search_input">
        <el-input v-model="searchVal" placeholder="搜索公司/职位"></el-input>
        <svg-icon
          icon-class="magnifier"
          class="icon-svg-but svg-search"
          @click="onSearch()"
        />
      </el-col>
      <el-col :span="4">
        <el-button type @click="onSearch" class="search_but">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="hot_list">
      <el-col :span="24">
        <span class="hos_all" @click="onAllHos()" title="全部">热门搜索</span>
        <el-radio-group v-model="hosVal">
          <el-radio-button
            class="hot_item radio-group"
            v-for="(item, index) in hot_search"
            :key="index"
            @change="onHotSearch(item.HotKeyWordName)"
            :label="item.HotKeyWordName"
            >{{ item.HotKeyWordName }}</el-radio-button
          >
        </el-radio-group>
      </el-col>
    </el-row>
    <div class="more_search" v-if="!infoSearchSize">
      <el-row class="more_queries">
        <el-col :span="24">
          <span class="title_radio_group">行业</span>
          <el-radio-group v-model="industryVal">
            <el-radio-button label class="unlimited_but">不限</el-radio-button>
            <div class="radio_list">
              <el-radio-button
                class="list_item radio-group"
                v-for="(item, index) in $IsArrayChilds(industry_item_list)"
                :key="index"
                :label="item.ItemName"
                >{{ item.ItemName }}</el-radio-button
              >
            </div>
            <svg-icon
              icon-class="more"
              class="icon-svg-but pop_up"
              @click="onShowSelection('industry')"
            />
          </el-radio-group>
        </el-col>
      </el-row>

      <el-row class="more_queries">
        <el-col :span="24">
          <span>职能</span>
          <el-radio-group v-model="positionVal">
            <el-radio-button label class="unlimited_but">不限</el-radio-button>
            <div class="radio_list">
              <el-radio-button
                class="list_item radio-group"
                v-for="(item, index) in $IsArrayChilds(
                  dictitem_job_category_list
                )"
                :key="index"
                :label="item.ItemName"
                >{{ item.ItemName }}</el-radio-button
              >
            </div>
            <svg-icon
              icon-class="more"
              class="icon-svg-but pop_up"
              @click="onShowSelection('position')"
            />
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="more_queries">
        <el-col :span="24">
          <span>学历</span>
          <el-radio-group v-model="degreeVal">
            <el-radio-button label class="unlimited_but">不限</el-radio-button>
            <el-radio-button
              class="list_item radio-group"
              v-for="(item, index) in dd_degree"
              :key="index"
              :label="item.ItemName"
              >{{ item.ItemName }}</el-radio-button
            >
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="more_queries">
        <el-col :span="24">
          <span>薪资</span>
          <el-radio-group v-model="salaryVal">
            <el-radio-button label class="unlimited_but">不限</el-radio-button>
            <el-radio-button
              class="list_item radio-group"
              v-for="(item, index) in dd_work_year"
              :key="index"
              :label="item.ItemName"
              >{{ item.ItemName }}</el-radio-button
            >
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="more_queries">
        <el-col :span="24">
          <span>更多</span>

          <el-select
            placeholder="刷新时间"
            v-model="publishTimeVal"
            size="mini"
            class="publish_time"
          >
            <el-option
              v-for="items in dd_publish_time"
              :key="items.ItemName"
              :label="items.ItemName"
              :value="items.ItemCode"
            ></el-option>
          </el-select>

          <el-select placeholder="企业规模" v-model="staffSizeVal" size="mini">
            <el-option
              v-for="items in dd_staff_size"
              :key="items.ItemName"
              :label="items.ItemName"
              :value="items.ItemName"
            ></el-option>
          </el-select>

          <el-select
            placeholder="企业性质"
            v-model="companyStockVal"
            size="mini"
          >
            <el-option
              v-for="items in dd_company_stock"
              :key="items.ItemName"
              :label="items.ItemName"
              :value="items.ItemName"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>

    <el-row class="checked_tags" v-if="!infoSearchSize && tagsStatus">
      <el-col :span="24">
        <span>已选条件</span>

        <div class="tags_list">
          <el-tag
            v-for="tag in checkedTags"
            :key="tag.name"
            @close="handleClose(tag)"
            closable
            v-if="tag.name"
            >{{ tag.name }}</el-tag
          >
        </div>
      </el-col>
    </el-row>

    <city-selection
      ref="citySelection"
      :selection-list="selectionList"
      :selection-type="selectionType"
      :selection-title="selectionTitle"
      @selectionVal="getSelectVal(arguments)"
    ></city-selection>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CitySelection from "components/PopUP/CitySelection";
import { deepCopyTwo } from "@/utils/index";
export default {
  name: "InfoSearch",
  props: { infoSearchSize: "" },
  computed: {
    ...mapGetters([
      "dd_degree",
      "dd_work_year",
      "hot_search",
      "city_item",
      "dd_publish_time",
      "dd_staff_size",
      "industry_item_list",
      "dictitem_job_category_list",
      "dd_company_stock"
    ])
  },
  components: {
    CitySelection
  },
  data() {
    return {
      msg: "",
      searchVal: "",
      cityVal: "",
      industryItemListOne: [],
      dictitemJobCategoryListOne: [],
      hosVal: "",
      industryVal: "",
      positionVal: "",
      degreeVal: "",
      salaryVal: "",
      companyStockVal: "",
      publishTimeVal: "",
      staffSizeVal: "",
      checkedTags: [
        { name: "", type: "hos" },
        { name: "", type: "industry" },
        { name: "", type: "position" },
        { name: "", type: "degree" },
        { name: "", type: "salary" },
        { name: "", type: "UpdateTime" },
        { name: "", type: "Scope" },
        { name: "", type: "CompanyStockType" }
      ],
      tagsStatus: false,
      selectionList: [],
      selectionType: "city",
      selectionTitle: "城市"
    };
  },
  methods: {
    onSearch(val) {
      let hosVal = "";
      if (val && typeof val == "string") {
        hosVal = val;
      } else {
        hosVal = this.searchVal;
      }

      let data = {
        Position: "", //职能
        Companyname: "", //公司名称
        Industry: this.industryVal, //行业
        City: this.cityVal ? `${this.cityVal}` : "", //城市
        Salary: this.salaryVal, //薪资
        UpdateTime: this.publishTimeVal == "0" ? "" : this.publishTimeVal, //刷新时间
        Keywords: hosVal, //关键词
        CompanyId: "",
        JobCategory: this.positionVal, //职能
        Education: this.degreeVal, //学历
        Scope: this.staffSizeVal == "企业规模不限" ? "" : this.staffSizeVal, //企业规模
        CompanyStockType:
          this.companyStockVal == "企业性质不限" ? "" : this.companyStockVal, //公司性质
        OpenId: "",
        Offset: 0,
        Limit: 10
      };
      this.$store.dispatch("setSearchData", data);
    },
    handleClose(tag) {
      this.updateTag(tag.type, "");
      switch (tag.type) {
        case "hos":
          this.hosVal = "";
          break;
        case "industry":
          this.industryVal = "";
          break;
        case "degree":
          this.degreeVal = "";
          break;
        case "position":
          this.positionVal = "";
          break;
        case "salary":
          this.salaryVal = "";
          break;
        case "UpdateTime":
          this.publishTimeVal = "";
          break;
        case "Scope":
          this.staffSizeVal = "";
          break;
        case "CompanyStockType":
          this.companyStockVal = "";
          break;
      }
      this.onSearch();
    },
    onShowSelection(type) {
      let that = this;
      that.selectionType = type;
      switch (type) {
        case "industry":
          that.selectionList = this.industry_item_list;
          that.selectionTitle = "行业";
          this.$refs.citySelection.isShow(this.industryVal);
          break;
        case "city":
          that.selectionList = this.city_item;
          that.selectionTitle = "城市";
          this.$refs.citySelection.isShow(this.cityVal);
          break;
        case "position":
          that.selectionList = this.dictitem_job_category_list;
          that.selectionTitle = "职能";
          this.$refs.citySelection.isShow(this.positionVal);
          break;
      }
    },
    onHotSearch(hosval) {
      this.onSearch(hosval);
      // this.searchVal = val;
    },
    onAllHos() {
      this.hosVal = "";
      this.searchVal = "";
    },
    getSelectVal(item) {
      switch (item[0]) {
        case "industry":
          this.industryVal = item[1];
          break;
        case "city":
          this.cityVal = item[1];
          break;
        case "position":
          this.positionVal = item[1];
          break;
      }
      this.onSearch();
    },
    updateTag(type, val) {
      this.tagsStatus = false;
      for (let item of this.checkedTags) {
        if (item.type == type) {
          item.name = val;
        }
        if (item.name) {
          this.tagsStatus = true;
        }
      }
      if (type == "hos") {
      }

      // this.onSearch();
    }
  },
  created() {},
  mounted() {
    this.$Bus.$on("searchData", data => {
      this.searchVal = data.Keywords;
      this.onSearch();
    });
    this.$store.dispatch("getHoTSearch"); //热门
    this.$store.dispatch("getCityItem"); //地图
    
      this.$store.dispatch("getAllDD").then(res => {});

      this.$store.dispatch("getIndustryItemList"); // 行业
      this.$store.dispatch("GetDictItemJobCategoryList"); //职能
      this.$store.dispatch("GetCompanyStockList"); //"企业性质
  
    // if (this.industry_item_list.length > 0) {
    //   if (this.industry_item_list[0].Childs)
    //     this.industryItemListOne = this.industry_item_list[0].Childs;
    // }
    // if (this.dictitem_job_category_list.length > 0) {
    //   if (this.dictitem_job_category_list[0].Childs)
    //     this.dictitemJobCategoryListOne = this.dictitem_job_category_list[0].Childs;
    // }
  },
  watch: {
    searchVal: function(newVal) {
      this.$Bus.$emit("searchVal", newVal);
    },
    hosVal: function(newVal) {
      // this.searchVal = newVal;
      this.updateTag("hos", newVal);
      this.onSearch(newVal);
    },
    industryVal: function(newVal) {
      this.updateTag("industry", newVal);
      this.onSearch();
    },
    positionVal: function(newVal) {
      this.updateTag("position", newVal);
      this.onSearch();
    },
    degreeVal: function(newVal) {
      this.updateTag("degree", newVal);
      this.onSearch();
    },
    salaryVal: function(newVal) {
      this.updateTag("salary", newVal);
      this.onSearch();
    },
    checkedTags: function(newVal) {
      this.tagsStatus = false;
    },
    publishTimeVal: function(newVal) {
      if (newVal != "0")
        for (let item of this.dd_publish_time) {
          if (newVal == item.ItemCode) {
            this.updateTag(
              "UpdateTime",
              item.ItemName ? "刷新时间：" + item.ItemName : ""
            );
          }
        }
      else {
        this.updateTag("UpdateTime", "");
      }

      this.onSearch();
    },
    staffSizeVal: function(newVal) {
      if (newVal != "企业规模不限")
        this.updateTag("Scope", newVal ? "企业规模：" + newVal : "");
      else this.updateTag("Scope", "");
      this.onSearch();
    },
    companyStockVal: function(newVal) {
      if (newVal != "企业性质不限")
        this.updateTag("CompanyStockType", newVal ? "企业性质：" + newVal : "");
      else this.updateTag("CompanyStockType", "");
      this.onSearch();
    }
  }
};
</script>
<style lang="scss">
.more_search {
  min-width: 1200px;
  .el-radio-group {
    display: -webkit-flex;
    align-items: center;
  }
  .radio_list {
    width: 792px;
    line-height: 40px;
    overflow: hidden;
    height: 30px;
    //     display: -webkit-flex;
    // align-items: center;
  }
}

.radio-group {
  &.list_item {
    .el-radio-button {
      span {
        margin-right: 0px;
      }
    }
  }
  &.hot_item {
    margin-right: 40px;
    cursor: pointer;
    border: 0;
  }
  &.el-radio-button {
    span {
      // height: 26px;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      //   margin-top: 20px;
      padding: 0;
      border: 0;
      &.el-radio-button__inner {
        border: 0;
      }
    }
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      color: #44a9e1;
      background-color: #fff;
      box-shadow: 0 0 0 0;
    }
  }
}

.search_input {
  .el-input__inner {
    font-size: 16px;
    padding-left: 56px;
    height: 44px;
    line-height: 44px;
    width: 904px;
  }
}
.min_info_search {
  .search_input {
    .el-input__inner {
      width: 608px;
    }
  }
}
.small_info_search {
  .search_input {
    .el-input__inner {
      width: 708px;
    }
  }
}

.unlimited_but {
  margin-left: 25px;
  margin-right: 41px;
  &.el-radio-button {
    .el-radio-button__inner {
      width: 52px;
      height: 26px;
      color: #fff;
      padding: 0;
      background: #bbbbbb;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      &:hover {
        background-color: #1c8dcb;
      }
    }
    span {
      //   margin-top: 20px;
      padding: 0;
      border: 0;
      &.el-radio-button__inner {
        border: 0;
      }
    }
  }
  &.is-active {
    .el-radio-button__inner {
      background: #44a8e1;
    }
  }

  .el-input__inner {
    width: 52px;
    height: 26px;
  }
}

.el-tag {
  .el-icon-close {
    color: #fff;
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.info_search {
  padding-top: 20px;
  background: #fff;
  color: #333;
  font-weight: 400;
  max-width: 1200px;
  > .el-row {
    height: 44px;
    justify-content: center;
    display: -webkit-flex;
    align-items: center;
    font-size: 14px;
    min-width: 1200px;
    padding: 0 52px;
    background: #fff;
    &.checked_tags {
      margin-top: 30px;
      > .el-col {
        min-width: 1096px;
        min-height: 40px;
        background: rgba(249, 249, 249, 1);
        border: 1px solid rgba(221, 221, 221, 1);
        padding-left: 18px;
        display: -webkit-flex;
        // align-items: center;
        > span {
          width: 70px;
          margin-top: 10px;
        }
        .tags_list {
          display: -webkit-flex;
          flex-wrap: wrap;
          margin-top: 10px;
          .el-tag {
            margin-bottom: 10px;
            height: 20px;
            line-height: 20px;
            background: #409eff;
            color: #fff;
            //   border-radius: 0;
            margin-left: 20px;
            .el-icon-close {
              color: #fff;
            }
          }
        }
      }
    }
    .city_content {
      height: 44px;
      width: 97px;
      display: -webkit-flex;
      align-items: center;
      position: inherit;
      > span {
        width: 50px;
      }
      .pop_up {
        color: #dddddd;
        font-size: 26px;
        margin-left: 12px;
        position: absolute;
        right: 0;
      }
    }

    .search_input {
      position: inherit;
      width: 904px;
      margin-left: 10px;

      .svg-search {
        position: absolute;
        font-size: 20px;
        left: 18px;

        top: 0px;
        height: 44px;
        line-height: 44px;
      }
    }

    &.hot_list {
      justify-content: flex-start;
      height: auto;
      margin-top: 24px;
      .hos_all {
        cursor: pointer;
      }
      // margin-bottom: 24px;
      > .el-col {
        display: -webkit-flex;
        align-items: center;
      }
      span {
        margin-right: 34px;
        &.hot_item {
          margin-right: 40px;
          cursor: pointer;
        }
      }
    }
  }

  .more_search {
    overflow: hidden;
    > .el-row {
      height: 44px;
      justify-content: center;
      display: -webkit-flex;
      //   align-items: center;
      font-size: 14px;
      min-width: 1200px;
      padding: 0 52px;
      background: #fff;
      flex-wrap: wrap;
      &.more_queries {
        height: auto;
        margin-left: 27px;
        margin-top: 20px;

        > div {
          display: -webkit-flex;
          //   align-items: center;
          flex-wrap: wrap;
          // min-width: 900px;
          > span {
            height: 26px;
            line-height: 26px;
          }
        }
        .el-button {
          width: 52px;
          height: 26px;
          padding: 0;
          margin-left: 25px;
          margin-right: 41px;
        }
        .list_item {
          margin-right: 52px;
          line-height: 30px;
        }
        .el-select {
          margin-right: 20px;
        }
        .publish_time {
          margin-left: 26px;
        }
      }
    }
  }
  &.min_info_search {
    > .el-row {
      min-width: 860px;
      padding: 0 30px;
      .search_input {
        width: 608px;
      }
    }
  }
  &.small_info_search {
    padding-top: 24px;
    padding-bottom: 24px;
    > .el-row {
      min-width: 900px;
      padding: 0 0px;
      .search_input {
        width: 708px;
      }
    }
  }
}
</style>
