<template>
  <div class="company_detail">
    <div class="company_detail_top_bg"></div>
    <div class="company_detail_content">
      <div class="company_detail_header_content">
        <div class="company_detail_header">
           <img class="company_logo"  :src="getCompanyLogo(companyInfo.Id)" @error="defCompanyImg()"/>
          <div class="company_info">
            <el-col :span="24">
              <span class="title_font_mix18">{{
                companyInfo.CompanyName
              }}</span>
            </el-col>
            <el-col :span="24" class="company_info_con"
              >行业：{{ companyInfo.IndustryText }}<br />
              规模：{{ companyInfo.CompanyScaleText }} <br />性质：{{
                companyInfo.CompanyStockTypeText
              }}
            </el-col>
          </div>
          <div class="company_address">
            地址：{{ companyInfo.CityText }} <br />企业网址：{{
              companyInfo.WebUrl
            }}
          </div>
        </div>
      </div>
      <div class="company_detail_center">
        <div class="company_detail_centers">
          <div class="company_brief wire_title">
            <span class="title_font_mix18">企业介绍</span>
          </div>
          <div class="brief_content">
           <!-- /** 展开/折叠 */  -->
            <local-fold ref="localFold"></local-fold>
          </div>

          <div class="position_input wire_title">
            <span class="title_font_mix18">职位</span>
            <el-select
              placeholder="刷新时间"
              v-model="publishTimeVal"
              size="mini"
              class="publish_time"
              @change="onPositionByCompany"
            >
              <el-option
                v-for="items in dd_publish_time"
                :key="items.ItemName"
                :label="items.ItemName"
                :value="items.ItemCode"
              ></el-option>
            </el-select>

            <el-cascader
              :options="cityList"
              v-model="cityVal"
              placeholder="工作地点"
              size="mini"
              :show-all-levels="false"
              @change="onPositionByCompany"
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.label }}</span>
                <span v-if="!node.isLeaf">({{ data.children.length }})</span>
              </template>
            </el-cascader>

            <el-input
              v-model="keyVal"
              size="mini"
              placeholder="职位名称/关键字"
              @change="onPositionByCompany"
            ></el-input>
            <el-button type="primary" size="mini" @click="onPositionByCompany"
              >搜索</el-button
            >
          </div>

          <div>
            <position ref="position"></position>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResumeProgress from "@/components/Resume/ResumeProgress";
import LocalFold from "components/LocalFold";
import { mapGetters } from "vuex";
import {
  GetPositionDetail,
  GetCompanyInfo,
  PositionSearch
} from "api/position";
import position from "views/PositionComponent";
export default {
  name: "CompanyDetail", //职位详情
  components: {
    ResumeProgress,
    position,
    LocalFold
  },
  computed: {
    ...mapGetters(["dd_publish_time", "city_item"])
  },
  data() {
    return {
      publishTimeVal: "",
      cityVal: "",
      keyVal: "",
      // publishTimeList: [],
      cityList: [],
      msg: "",
      percentage: 20,
      textarea: ``,
      // dataInfo: {
      //   Id: "f706034e-f215-4ad7-5785-08d7da9fe658",
      //   CompanyId: "56bc5f24-0c3a-439e-92e4-edd66c8d3518",
      //   PositionName: "护士22",
      //   CompanyName: "护士联盟",
      //   Scope: "100-499人",
      //   Industry: "工艺品/珠宝/玩具",
      //   Degree: "大专",
      //   WorkYear: "3-5年",
      //   RecruitNum: 1,
      //   UpdateTime: "2020-04-09",
      //   Address: "北京天安门3",
      //   Salary: "10K-13K",
      //   Status: "已发布",
      //   Duty: "123",
      //   PositionDes: "321",
      //   CompanyDes: "123",
      //   HasCollected: false
      // },
      companyInfo: {
        CompanyName: "", //名称
        CompanyType: 1,
        Industry: "",
        IndustryText: "", //行业
        City: "",
        CityText: "", //地址
        CompanyStockType: 8,
        CompanyStockTypeText: "", //性质
        ContactPerson: "",
        TelUserName: "",
        Email: "",
        Phone: "",
        RecruitPerson: "",
        RecruitPersonTel: "",
        CompanyScale: "",
        CompanyScaleText: "", //规模
        SalesScale: "",
        SalesScaleText: "",
        FoundedTime: "",
        MainProducts: "",
        MajorClient: "",
        Competitor: "",
        WebUrl: "",
        TaxName: "",
        TaxLegal: null,
        TaxNumber: "",
        TaxAddress: "",
        TaxPhone: "",
        BankName: "",
        AccountNumber: "",
        PostAddress: "",
        PostRecipient: "",
        PostPhone: "",
        ZipCode: "",
        Description: "",
        Remark: "", //简介
        AuditState: 0,
        AuditUserId: null,
        AuditTime: null,
        IsDelete: false,
        CreateUserId: null,
        CreateTime: null,
        UpdateUserId: "",
        UpdateTime: "",
        CompanyPhotoUrl: null,
        CompanyTypeText: "",
        CompanyAuditStateText: "",
        Id: "56bc5f24-0c3a-439e-92e4-edd66c8d3518"
      },
      searchData: {
        Keywords: "",
        City: "",
        Position: "",
        CompanyId: "",
        Companyname: "",
        Industry: "",
        JobCategory: "",
        Education: "",
        Salary: "",
        UpdateTime: "",
        Scope: "",
        CompanyStockType: "",
        Offset: 0,
        Limit: 3
      },
      companyPosition: []
    };
  },
  methods: {
    GetCompanyInfo() {
      GetCompanyInfo({ CompanyId: this.$route.query.companyId }).then(res => {
        if (res.data.Success) {
          this.companyInfo = res.data.Data;
          this.onPositionByCompany(); 
        } else {
        }
      });
    },

    /**
      获取当前公司所有职位信息列表
     */
    onPositionByCompany() {
      let data = {
        Keywords: this.keyVal,
        City: this.cityVal,
        Position: "",
        CompanyId: this.companyInfo.Id,
        Companyname: "",
        Industry: "",
        JobCategory: "",
        Education: "",
        Salary: "",
        UpdateTime: this.publishTimeVal == "0" ? "" : this.publishTimeVal,
        Scope: "",
        CompanyStockType: "",
        Offset: 0,
        Limit: 10
      };
      if (data.City instanceof Array) {
        data.City = data.City[1];
      }
      this.$refs.position.getList(data);
    }
  },
  created() {
    /** 展开/折叠 */
    this.$nextTick(() => {
      this.$refs.localFold.init(this.companyInfo.Remark);
    });
  },
  mounted() {
    this.GetCompanyInfo();
    this.$store.dispatch("getAllDD").then(res => {});
    this.$store.dispatch("getCityItem"); //地图
    this.cityList = this.$GetCitySelectData(this.city_item); //地图数据转换
  }
};
</script>

<style lang="scss">

.position_input{
  .el-input__inner{
    height:32px;
  }
}
</style>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
textarea.el-textarea__inner {
  border: 0;
  overflow: hidden;
  resize: none;
}
.app-body {
  background: red;
}

.company_detail {
  margin-bottom: 20px;
  background-color: #fff;
  width: 100%;
  .company_detail_top_bg {
    content: "";
    width: 100%;
    background-color: #bddee5;
    height: 200px;
  }
  .company_detail_content {
    // position: absolute;
    margin-top: -170px;
    width: 100%;
    .company_detail_header_content {
      display: -webkit-flex;
      justify-content: center;
      .company_detail_header {
        border-radius: 12px;
        box-shadow: 0px 0px 13px 0px rgba(197, 214, 218, 1);
        min-width: 1200px;
        height: 200px;
        @include bgImg("company_detail_bg.png");
        background-size: 100% 200px;
        display: -webkit-flex;
        font-size: 14px;
        color: #666;
        > .el-row {
          display: -webkit-flex;
        }
        img {
          margin-left: 60px;
          margin-top: 36px;
          @include wh(320px, 124px);
        }
        .company_info {
          margin-top: 36px;
          margin-left: 40px;
          .company_info_con {
            margin-top: 20px;
            line-height: 30px;
            color: #666666;
          }
        }
        .company_address {
          margin-top: 105px;
          line-height: 30px;
        }
      }
    }

    .company_detail_center {
      background: white;
      // padding: 40px 60px;
      // background: #888;
      width: 100%;
      display: -webkit-flex;
      justify-content: center;
      .company_detail_centers {
        padding: 40px 60px;
        min-width: 1200px;
        .wire_title {
          height: 32px;
          line-height: 32px;
          > span {
            margin-left: 32px;
          }
          &:before {
            position: absolute;
            content: "";
            width: 8px;
            height: 32px;
            background: #44a8e1;
          }
        }
        .brief_content {
          width: 1080px;
          line-height: 30px;
          margin-top: 20px;

          overflow: hidden;

          text-overflow: ellipsis; //这是让文本溢出后，显示成省略号。

          // white-space: nowrap; //禁止自动换行
          // height: 180px;
        }
        .position_input {
          margin-top: 40px;
          display:-webkit-flex;
          .publish_time {
            width: 200px;
            margin-left: 63px;
          }
          .el-cascader {
            width: 200px;
            margin-left: 11px;
          }
          .el-input {
            margin-left: 11px;
            width: 400px;
          }
          .el-button {
            margin-left: 11px;
            width: 100px;
          }
        }
      }
    }
  }
}
</style>
