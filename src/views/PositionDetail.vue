<template>
  <section>
    <div class="position_detail">
      <position-apply ref="positionApply"></position-apply>
      <div class="position_detail_con">
        <div class="position_detail_left">
          <div class="position_info">
            <el-row>
              <el-col :span="20">
                <el-row>
                  <span class="position_name title_font_mix18">{{
                    dataInfo.PositionName
                  }}</span>
                  <span class="salary" v-if="dataInfo.Salary != ''">{{
                    dataInfo.Salary
                  }}</span>
                </el-row>
                <el-row class="info_gather">
                  <span
                    >{{ dataInfo.Degree | IsNull }} |
                    {{ dataInfo.WorkYear | IsNull }}
                  </span>
                </el-row>
              </el-col>
              <el-col :span="4" class="position_but">
                <el-col :span="24">
                  <el-button class="primary_but" @click="onPositionApply()"
                    >立即申请</el-button
                  >
                </el-col>
                <el-col :span="24">
                  <el-button class="plain_but" @click="onAddCollection"
                    >收藏职位</el-button
                  >
                </el-col>
              </el-col>
            </el-row>
            <el-row class="position_info_data">
              <el-col :span="24">
                <div class="position-line position_bottom flex">
                  <div class="line-item flex">
                    <svg-icon icon-class="user" class="icon-arrow1" />
                    <p>招聘人数 {{ dataInfo.RecruitNum }}</p>
                  </div>
                  <div class="line-item flex" v-if="$IsVal(dataInfo.City)">
                    <svg-icon icon-class="location" class="icon-location" />
                    <p>{{ dataInfo.City }}</p>
                  </div>
                  <div class="line-item flex">
                    <svg-icon icon-class="date" class="icon-date" />
                    <p>{{ dataInfo.UpdateTime }}</p>
                  </div>
                </div>
              </el-col>
            </el-row>

            <el-row class="duty_des">
              <el-col :span="24" class="info_title">工作内容</el-col>
              <el-col :span="24">{{ dataInfo.Duty }}</el-col>
              <el-col :span="24" class="info_title">任职要求</el-col>
              <el-col :span="24">{{ dataInfo.PositionDes }}</el-col>
            </el-row>
          </div>

          <div class="interest_position">
            <div class="interest_position_title">
              您可能感兴趣的职位
            </div>
            <position ref="position"></position>
          </div>
        </div>
        <div class="position_detail_right">
          <div class="title_font_mix16">
            职位发布企业
          </div>
          <img
            class="company_logo"
            :src="getCompanyLogo(companyId)"
            @error="defCompanyImg()"
            @click="onMoreCompanyPosition"
          />
          <div
            class="title_font_mix16_primary"
            style="cursor:pointer"
            @click="onMoreCompanyPosition"
          >
            {{ companyInfo.CompanyName }}
          </div>
          <el-row class="company_info">
            <el-col :span="24">
              <p>
                行业：{{ companyInfo.IndustryText }} <br />
                规模：{{ companyInfo.CompanyScaleText }}<br />
                性质：{{ companyInfo.CompanyStockTypeText }}<br />
                地址：{{ companyInfo.CityText }}
              </p>
            </el-col>
          </el-row>
          <div class="company_remark">
            {{ companyInfo.Remark }}
          </div>
          <div class="title_font_mix16 company_position">
            企业发布的其他职位
          </div>

          <el-row class="company_position_list">
            <el-col
              :span="24"
              v-for="(item, index) in companyPosition"
              :key="index"
            >
              <span class="position_name" @click="ShowDetail(item)">{{
                item.Position
              }}</span>
              <span class="address">{{ item.City }}</span>
              <span class="salary title_font_mix16_primary">{{
                item.Salary
              }}</span></el-col
            >
          </el-row>
          <el-row class="more_but">
            <el-button type="" @click="onMoreCompanyPosition"
              >查看更多职位</el-button
            >
          </el-row>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ResumeProgress from "@/components/Resume/ResumeProgress";
import { AddCollection } from "api/candidate";
import PositionApply from "components/PositionApply";
import {
  GetPositionDetail,
  GetCompanyInfo,
  PositionSearch
} from "api/position";
import position from "views/PositionComponent.vue";
export default {
  name: "PositionDetail", //职位详情
  components: {
    ResumeProgress,
    position,
    PositionApply
  },
  data() {
    return {
      msg: "",
      percentage: 20,
      dataInfo: {
        Id: "f706034e-f215-4ad7-5785-08d7da9fe658",
        CompanyId: "56bc5f24-0c3a-439e-92e4-edd66c8d3518",
        PositionName: "护士22",
        CompanyName: "护士联盟",
        Scope: "100-499人",
        Industry: "工艺品/珠宝/玩具",
        Degree: "大专",
        WorkYear: "3-5年",
        RecruitNum: 1,
        UpdateTime: "2020-04-09",
        Address: "北京天安门3",
        Salary: "10K-13K",
        Status: "已发布",
        Duty: "123",
        PositionDes: "321",
        CompanyDes: "123",
        HasCollected: false
      },
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
        AuditState: 3,
        AuditUserId: null,
        AuditTime: null,
        IsDelete: false,
        CreateUserId: null,
        CreateTime: null,
        UpdateUserId: "",
        UpdateTime: "",
        CompanyPhotoUrl: null,
        CompanyTypeText: "业",
        CompanyAuditStateText: "",
        Id: ""
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
      companyPosition: [],
      companyId: ""
    };
  },
  methods: {
    onAddCollection() {
      this.$refs.positionApply.AddCollect(this.$route.query.positionId);
      // AddCollection({ PositionId: this.$route.query.positionId }).then(res => {
      //   if (res.data.Success) {
      //     this.$message({
      //       message: "收藏成功",
      //       type: "success"
      //     });
      //   } else {
      //     this.$message.error(res.data.Message);
      //   }
      // });
    },
    ShowDetail(item) {
      this.$route.query.positionId = item.Id;
      this.GetPositionDetail();
    },
    GetPositionDetail() {
      GetPositionDetail({ Id: this.$route.query.positionId }).then(res => {
        if (res.data.Success) {
          res.data.Data.City = this.common.getCityIdByName(res.data.Data.City);
          this.dataInfo = res.data.Data;
          this.companyId = res.data.Data.CompanyId;
          this.GetCompanyInfo(res.data.Data.CompanyId);
          this.PositionSearch(res.data.Data.CompanyId);
        } else {
        }
      });
    },
    GetCompanyInfo(id) {
      GetCompanyInfo({ CompanyId: id }).then(res => {
        if (res.data.Success) {
          this.companyInfo = res.data.Data;
        } else {
        }
      });
    },

    PositionSearch(id) {
      this.searchData.CompanyId = id;
      PositionSearch(this.searchData).then(res => {
        if (res.data.Success) {
          this.companyPosition = res.data.Data.Items;
        } else {
        }
      });
    },
    onMoreCompanyPosition() {
      this.$router
        .push({ path: "/companyDetail", query: { companyId: this.companyId } })
        .catch(err => {});
    },
    onPositionApply(id) {
      this.$refs.positionApply.setPositionApply(this.$route.query.positionId);
    },
    GetCompanyLogo(id) {
      GetCompanyLogo({ CompanyId: id }).then(res => {
        if (res.data.Success) {
          // this.companyInfo = res.data.Data;
        } else {
        }
      });
    }
  },
  created() {},
  mounted() {
    this.$refs.position.init();
    this.GetPositionDetail();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.position_detail {
  display: -webkit-flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
  .position_detail_con {
    min-width: 1200px;
    display: -webkit-flex;
    .position_detail_left {
      min-width: 820px;
      .position_info {
        padding: 24px 30px;
        background: #fff;
        > .el-row {
          .info_gather {
            margin-top: 20px;
          }
          .salary {
            margin-left: 277px;
            font-size: 22px;
            font-weight: bold;
            color: #44a8e1;
          }
          .position_but {
            width: 100px;
            padding-top: 3px;
            > .el-col {
              display: -webkit-flex;
              justify-content: flex-end;
              margin-bottom: 8px;
            }
          }
          &.position_info_data {
            padding-bottom: 25px;
            border-bottom: 1px solid #ddd;
            .position-line {
              .line-item {
                margin-right: 60px;
                color: #888888;
                .svg-icon {
                  margin-right: 12px;
                  color: #cccccc;
                  font-size: 14px;
                }
              }
            }
          }
          &.duty_des {
            color: #333;
            .info_title {
              padding: 29px 0 24px 0;
              font-size: 16px;
              font-weight: bold;
              color: #000;
            }
          }
        }
      }
      .interest_position {
        margin-top: 10px;
        padding: 24px 30px;
        background: #fff;
        .interest_position_title {
          font-size: 18px;
          font-weight: bold;
          color: #44a8e1;
          padding-bottom: 24px;
          border-bottom: 1px solid #ddd;
        }
      }
    }
    .position_detail_right {
      min-width: 360px;
      margin-left: 20px;
      background: #ffffff;
      padding: 27px 20px;
      .company_logo {
        margin-top: 18px;
        margin-bottom: 17px;
        cursor: pointer;
        @include wh(320px, 124px);
      }
      .company_info {
        margin-top: 24px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 15px;
        margin-bottom: 24px;
        p {
          line-height: 32px;
          color: #666;
          font-size: 14px;
        }
      }
      .company_position {
        margin-top: 60px;
        margin-bottom: 40px;
      }
      .company_remark {
        width: 320px;
      }
      .company_position_list {
        width: 320px;
        .el-col {
          display: -webkit-flex;
          border-bottom: 1px dashed #ddd;
          padding-bottom: 18px;
          margin-top: 15px;
           cursor: pointer;
        }
        .position_name {
          margin-left: 0px;
          width:150px;
         
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
        }
        .address {
          margin-left: 79px;
        }
        .salary {
          width:109px;
          margin-left: 32px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .more_but {
        text-align: center;
        margin-top: 24px;

        > .el-button {
          background: #eeeeee;
          width: 120px;

          height: 24px;
          padding: 0;
        }
      }
    }
  }
}
</style>
