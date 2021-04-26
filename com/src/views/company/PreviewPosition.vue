<template>
  <div class="preview_position" v-if="isShow">
    <div class="job-details" data-height>
      <div class="view-title">职位预览</div>
      <div class="view-channel">
        <span>发布渠道：</span
        ><span v-for="(item, index) in dataInfo.PublishChannel" :key="index"
          ><span v-if="index != 0">,</span>{{ item }}
        </span>
        <span class="state">{{
          PublicStateList[dataInfo.PublicState]
            ? PublicStateList[dataInfo.PublicState]
            : "草稿职位"
        }}</span>
      </div>
      <div class="job-item">
        <div class="j-hd">
          <div class="name">{{ dataInfo.PositionName | IsNull }}</div>
          <div class="salary">{{ dataInfo.SalaryTxt | IsNull }}</div>
        </div>
        <div class="j-bd">
          <ul class="j-list split">
            <li class="i-com">{{ dataInfo.CompanyName | IsNull }}</li>
            <li>{{ dataInfo.DegreeTxt | IsNull }}</li>
            <!-- <li>统招</li> -->
            <li>{{ dataInfo.WorkYearTxt | IsNull }}</li>
            <!-- <li>英语-熟练</li> -->
            <li>{{ dataInfo.AgeFrom }}~{{ dataInfo.AgeTo }}</li>
          </ul>
          <ul class="j-list spec">
            <li class="i-num">招聘人数 {{ dataInfo.RecruitNum }}</li>
            <li class="i-addr">{{ dataInfo.CityTxt }}</li>
            <li class="i-date">
              {{ dataInfo.PublishEndTime | Format("yyyy-MM-dd") }}
            </li>
          </ul>
        </div>
      </div>
      <div class="article">
        <div class="pos_desc">
          <h3>工作内容</h3>
          <div v-html="common.encodeTextAreaString(dataInfo.Duty)"></div>
          <!-- <el-input
            type="textarea"
            autosize
            readonly
            v-model="dataInfo.Duty"
          ></el-input> -->
        </div>
        <div class="pos_desc">
          <h3>任职要求</h3>
           <div v-html="common.encodeTextAreaString(dataInfo.PositionDes)"></div>
          <!-- <el-input
            type="textarea"
            autosize
            readonly
            v-model="dataInfo.PositionDes"
          ></el-input> -->
        </div>
      </div>
    </div>
    <div class="position_info" v-if="false">
      <div>
        <p class="title">职位预览</p>
      </div>
      <div class="position_but flex">
        <span>发布渠道：</span
        ><span v-for="(item, index) in dataInfo.PublishChannel" :key="index"
          ><span v-if="index != 0">,</span>{{ item }}
        </span>
      </div>
      <!-- <el-row>
        <el-col :span="4" class="position_but" v-if="false">
          <el-col :span="24">
            <el-button class="primary_but">立即申请</el-button>
          </el-col>
          <el-col :span="24">
            <el-button class="plain_but">收藏职位</el-button>
          </el-col>
        </el-col> 
      </el-row>-->
      <div class="position_name_line">
        <span class="position_name title_font_mix16">{{
          dataInfo.PositionName
        }}</span>
        <span class="flex">
          <span class="salary" v-if="dataInfo.SalaryTxt != ''">{{
            dataInfo.SalaryTxt
          }}</span>
          <span class="status">{{
            PublicStateList[dataInfo.PublicState]
              ? PublicStateList[dataInfo.PublicState]
              : "草稿职位"
          }}</span>
        </span>
      </div>
      <el-row class="info_gather">
        <span
          >{{ dataInfo.DegreeTxt | IsNull }} |
          {{ dataInfo.WorkYearTxt | IsNull }}
        </span>
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
              <p>{{ dataInfo.CityTxt }}</p>
            </div>
            <div class="line-item flex">
              <svg-icon icon-class="date" class="icon-date" />
              <p>{{ dataInfo.PublishEndTime | Format("yyyy-MM-dd") }}</p>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="info_title">
        <span>工作内容</span>
      </div>
      <div class="duty_des">
        <el-input
          type="textarea"
          autosize
          readonly
          v-model="dataInfo.Duty"
        ></el-input>
      </div>
      <div class="info_title">
        <span>任职要求</span>
      </div>
      <div class="duty_des">
        <el-input
          type="textarea"
          autosize
          readonly
          v-model="dataInfo.PositionDes"
        ></el-input>
      </div>
    </div>
    <div class="right_but_list">
      <!-- <el-popover placement="right" popper-class="icon_arrow" width="120" trigger="click">
        <el-row class="info_popover">
          <el-col :span="24">候选人简历{{candidateNum}}</el-col>
          <el-col :span="24">已筛选{{candidateNum}}</el-col>
          <el-col :span="24">不合格{{candidateNum}}</el-col>
        </el-row>
        <div slot="reference">
          <el-button type="" @click="showInfo" ref="positionCandidateNum">{{candidateNum}}候选人</el-button>
        </div>
      </el-popover> -->
      <el-popover
        ref="popover"
        placement="right"
        popper-class="icon_arrow"
        width="120"
        trigger="hover"
      >
        <el-row class="info_popover">
          <el-col :span="24"
            >候选人简历{{ dataInfo.DeliveryNoProcessCount }}</el-col
          >
          <el-col :span="24">已筛选{{ dataInfo.DeliverySuccessCount }}</el-col>
          <el-col :span="24">不合格{{ dataInfo.DeliveryFailCount }}</el-col>
        </el-row>
      </el-popover>
      <el-button
        type=""
        class="w-btn"
        @click="showInfo"
        ref="positionCandidateNum"
        v-popover:popover
        v-show="isShowBut(dataInfo.PublicState, 5, 2, 6, 7, 8)"
        >{{ dataInfo.DeliveryCount }}候选人</el-button
      >
      <el-button
        type=""
        class="w-btn"
        v-show="positionId == '' || isShowBut(dataInfo.PublicState, 1, 3, 7)"
        @click="editPosition"
        ref="positionEdt"
        >编辑职位</el-button
      >
      <el-button
        type=""
        class="w-btn"
        v-if="positionId == ''"
        @click="saveDraftPostion"
        ref="positionSaveDraft"
        >保存草稿</el-button
      >
      <!-- <el-button type="" v-if="isShowBut(dataInfo.PublicState,6,7)">重新发布</el-button> -->
      <el-button
        type=""
        class="w-btn"
        v-if="positionId == ''"
        @click="publishPostion"
        ref="positionPublish"
        >发布职位</el-button
      >
      <!-- <el-button type="" v-if="isShowBut(dataInfo.PublicState,2,8)">撤回发布</el-button> -->
      <el-button
        type=""
        class="w-btn"
        v-if="
          !dataInfo.HasEntrust && isShowBut(dataInfo.PublicState, 1, 3, 5, 2, 8)
        "
        @click="entrustPositionProcess(1)"
        ref="positionEntrust"
        >委托职位</el-button
      >
      <el-button
        type=""
        class="w-btn"
        v-if="
          dataInfo.HasEntrust && isShowBut(dataInfo.PublicState, 1, 3, 5, 2, 8)
        "
        @click="entrustPositionProcess(2)"
        ref="positionEntrust"
        >取消委托</el-button
      >
      <!-- <el-button type="" v-if="dataInfo.HasEntrust && isShowBut(dataInfo.PublicState,5) && !isShowBut(dataInfo.PublicState,6,7)" @click="updatePositionStatus(8)" ref="positionSuspend"
        >暂停招聘</el-button
      >
      <el-button v-if="dataInfo.HasEntrust && isShowBut(dataInfo.PublicState,8)"  type="">继续招聘</el-button>
      <el-button type="" v-if="dataInfo.HasEntrust && isShowBut(dataInfo.PublicState,5) && !isShowBut(dataInfo.PublicState,6,7)" @click="updatePositionStatus(7)" ref="positionStop"
        >结束招聘</el-button
      > -->
      <el-button
        type=""
        class="w-btn"
        @click="deletePosition"
        v-if="positionId != ''"
        ref="positionDel"
        >删除职位</el-button
      >
    </div>
  </div>
</template>
<script>
import {
  PublishAddPosition, //新增职位 - 提交审核
  SaveAddPosition, //新增职位 - 保存为草稿
  SaveEditPosition, //编辑职位 - 保存为草稿
  PublishEditPosition,
  EntrustPositionProcess,
  ChangePositionStatus,
  deletePosition,
  GetPositionDetail //企业端职位详情
} from "api/positionManager";
import { deepCopyTwo } from "@/utils/index";
export default {
  name: "PreviewPosition",
  data() {
    return {
      positionId: "",
      candidateNum: 0,
      isShow: true,
      PublicStateList: [
        "",
        "草稿职位",
        "待审核",
        "审批不通过",
        "",
        "发布中",
        "已结束",
        "已结束",
        "已暂停"
      ],
      dataInfo: {
        // PositionName: "软件开发工程师",
        // Salary: "12k-18k",
        // Degree: "本科",
        // WorkYear: "6",
        // Duty:
        //   "The Documentation Localization team is a hardworking group of individuals dedicated to bringing Apple’s products to the world. Our team is responsible for producing print and digital documentation for Apple hardware and software in up to 40 languages. Deliverables include items such as graphics for in-App user help content, App welcome screens, printed information booklets, online user guides, ePubs for iBooks, and product packaging for Apple hardware products. See examples of some of these deliverables at http://support.apple.com/manuals.",
        // PositionDes:
        //   "- The working environment is very fast paced requiring management of aggressive delivery schedules and extensive cross-functional collaboration with project managers, engineers, translators, QA and marketing teams. As a production designer on the Documentation Localization team you will: Act as project lead for a portfolio of product families and guide colleagues through the localization of various deliverable types. Assist in training new team members, troubleshoot production issues and provide localization solutions that uphold Apple design & quality standards. Identify and spearhead opportunities for process, design, and technical improvements.In addition to employing your production skills you will also be executing UNIX commands in Terminal, running automation scripts, and testing technical tools that support our work. This is truly a team at the intersection of design and technology.Education & Experience- BA/BS degree in Graphic Design or related field",
        // RecruitNum: "30",
        // City: "上海",
        // UpdateTime: "2012-12-12",
        // PublishChannel: ["人才拼图", "智联招聘"],
        // Status: "草稿职位"
      }
    };
  },
  created() {
    if (JSON.stringify(this.$route.params) != "{}") {
      this.dataInfo = this.$route.params;
      this.positionId = this.dataInfo.Id;
    } else {
      this.positionId = this.$route.query.positionId;
      this.getPositionDetail();
    }
  },
  mounted() {},
  methods: {
    /**
     * 获取职位详情
     */
    getPositionDetail() {
      GetPositionDetail({ Id: this.positionId }).then(res => {
        if (res.data.Success) {
          let data = res.data.Data;
          data.CityTxt = this.common.getItemNameByItemCode(
            this.$store.getters.city_item,
            data.City
          );
          data.PublishChannel = data.PublishChannel.split(";");
          this.dataInfo = { ...this.formData, ...data };
        } else {
        }
      });
    },

    isShowBut(status, ...statusList) {
      let stat = false;
      for (let item of statusList) {
        if (status == item) {
          return true;
        }
      }
      return stat;
    },
    //候选人
    showInfo() {},

    /**
     * 委托职位
     * status=1 委托  2 取消委托
     */
    entrustPositionProcess(status) {
      EntrustPositionProcess({
        PositionId: this.positionId,
        Status: status
      }).then(res => {
        if (res.data.Success) {
          this.$message({
            type: "success",
            message: status == 2 ? "该职位已取消委托!" : "该职位已委托!"
          });
        }
      });
    },
    /**
     * 修改职位状态
     * state：撤回（7）/暂停（8）/恢复（9）
     */
    updatePositionStatus(state) {
      ChangePositionStatus({ PositionId: this.positionId, State: state }).then(
        res => {
          if (res.data.Success) {
            let message = "";
            if (state == 8) {
              message = "该职位已暂停招聘!";
            }
            this.$message({
              type: "success",
              message: message
            });
          }
        }
      );
    },

    /**
     * 删除职位
     */
    deletePosition() {
      this.$confirm(
        '确定要删除职位 "' + this.dataInfo.PositionName + '" ?',
        "",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        }
      )
        .then(() => {
          DeletePosition({
            Id: this.positionId
          }).then(res => {
            if (res.data.Success) {
              if (refresh == undefined) {
                // 重新请求列表数据和修改侧边栏数据
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                // 职位详情删除
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            } else {
              this.$message({
                type: "info",
                message: res.data.Message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //暂停招聘
    suspendPosition() {},
    //结束招聘
    stopPosition() {},
    //删除职位
    delPosition() {},
    //编辑职位
    editPosition() {
      // this.isShow = false;
      // this.$emit("update:isShowPreviewPosition", false);
      let data = deepCopyTwo(this.dataInfo);
      // data.PublishChannel = data.PublishChannel.split(";");
      // if (data.PublishGroupIds) {
      //   data.PublishGroupIds = data.PublishGroupIds.split(";");
      // } else {
      //   data.PublishGroupIds = [];
      // }
      this.$router.push({
        name: `IssuePosition`,
        params: data,
        query: {
          positionId: this.positionId
        }
      });
    },
    //保存草稿
    saveDraftPostion() {
      let data = deepCopyTwo(this.dataInfo);
      // data.PublishChannel = data.PublishChannel.split(";");
      // if (data.PublishGroupIds) {
      //   data.PublishGroupIds = data.PublishGroupIds.split(";");
      // } else {
      //   data.PublishGroupIds = [];
      // }
      if (this.positionId == "") {
        SaveAddPosition(data).then(res => {
          if (res.data.Success) {
            let data = res.data.Data;
            this.$message({
              message: "保存草稿职位成功",
              type: "success"
            });
            this.$router.push({
              path: "/PositionManager",
              query: { pageId: 1 }
            });
          } else {
            this.$message.error(res.data.Message);
          }
        });
      } else {
        SaveEditPosition(data).then(res => {
          //编辑职位
          if (res.data.Success) {
            let data = res.data.Data;
            this.$message({
              message: "保存草稿职位成功",
              type: "success"
            });
            this.$router.push({
              path: "/PositionManager",
              query: { pageId: 1 }
            });
          } else {
            this.$message.error(res.data.Message);
          }
        });
      }
    },
    //发布职位
    publishPostion() {
      let data = deepCopyTwo(this.dataInfo);
      // data.PublishChannel = data.PublishChannel.split(";");
      // if (data.PublishGroupIds) {
      //   data.PublishGroupIds = data.PublishGroupIds.split(";");
      // } else {
      //   data.PublishGroupIds = [];
      // }
      if (this.positionId == "") {
        PublishAddPosition(data).then(res => {
          if (res.data.Success) {
            this.$message({
              message: "职位发布成功",
              type: "success"
            });
            this.$router.push({
              path: "/PositionManager",
              query: { pageId: 0 }
            });
          } else {
            this.$message.error(res.data.Message);
          }
        });
      } else {
        PublishEditPosition(data).then(res => {
          if (res.data.Success) {
            this.$message({
              message: "职位发布成功",
              type: "success"
            });
            this.$router.push({
              path: "/PositionManager",
              query: { pageId: 0 }
            });
          } else {
            this.$message.error(res.data.Message);
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.preview_position {
  width: 1200px;
  margin: 0 auto;
  p.title {
    background: #44a8e1;
    color: #fff;
    font-size: 12px;
    width: 72px;
    line-height: 20px;
    height: 20px;
    border-radius: 0;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  @include df;

  // 职位详情
  .job-details {
    position: relative;
    background-color: #fff;
    padding: 30px;
    margin-bottom: 20px;
    width: 900px;
    @include shadow();
    .view-title {
      position: absolute;
      top: 0;
      right: 0;
      line-height: 32px;
      color: #fff;
      background-color: #ccc;
      padding-left: 25px;
      padding-right: 30px;

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: -24px;
        width: 0;
        height: 0;
        border-color: transparent #ccc;
        /*上下颜色 左右颜色*/
        border-width: 0 24px 32px 0;
        border-style: solid;
      }
    }
    .view-channel {
      span {
        color: #999;
      }
      .state {
        display: inline-block;
        background-color: #ccc;
        padding: 0 12px;
        text-align: center;
        line-height: 24px;
        color: #fff;
        border-radius: 24px;
        margin-left: 10px;
      }
    }
    .job-item {
      padding: 20px 0;
      .j-hd {
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 15px;
        @include clearfix();
        > div {
          float: left;
          width: 50%;
        }
        .name {
          font-size: 18px;
          font-weight: bold;
          line-height: 22px;
        }
        .salary {
          text-align: right;
          color: $blue;
          font-size: 22px;
          font-weight: bold;
          line-height: 1;
        }
      }
      .j-bd {
        padding-right: 80px;
        position: relative;
        .j-apply {
          opacity: 0;
          position: absolute;
          top: 0;
          right: 0;
          transition: opacity 0.3s ease;
          &:hover {
            opacity: 0.9;
            color: #fff;
          }
        }
      }
      .j-list {
        margin-top: 20px;
        @include clearfix();
        color: #000;
        li {
          float: left;
        }
        &.spec {
          color: #999;
          li {
            width: 140px;
          }
        }
      }
      & + & {
        border-top: 1px dotted #ccc;
      }
      ul.split {
        li + li {
          position: relative;
          padding-left: 15px;
          margin-left: 15px;
          &:after {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            height: 12px;
            margin-top: -6px;
            width: 1px;
            background-color: #ccc;
          }
        }
      }
      .j-list {
        margin-top: 15px;
      }
      [class^="i-"] {
        position: relative;
        padding-left: 26px;
        &:after {
          position: absolute;
          left: 0;
          top: 50%;
          @include iconfont();
          transform: translateY(-50%);
          line-height: 1;
          font-size: 20px;
        }
      }
      .i-com:after {
        content: "\eb1a";
        color: $blue;
      }
      .i-num:after {
        content: "\e615";
      }
      .i-addr:after {
        content: "\e6f8";
      }
      .i-date:after {
        content: "\e61a";
      }
      .i-hy:after {
        content: "\e868";
      }
      .i-web:after {
        content: "\e629";
      }
      .action {
        position: absolute;
        top: 0;
        right: 0;
        .w-btn {
          display: block;
          margin-bottom: 6px;
        }
      }
    }
    .article {
      margin-top: 20px;
    }
  }

  .right_but_list {
    display: table;
    width: 280px;
    margin-left: 20px;
    background: #fff;
    padding: 24px 20px;

    @include shadow();
    .el-button {
      margin-bottom: 12px;
      width: 100%;
      &.w-btn {
        padding: 0;
        display: block;
        border: 1px solid #428dde;
        color: #428dde;
        line-height: 36px;
        height: 36px;
        font-size: 14px;
        background-color: #fff;
        &:hover {
          box-shadow: none;
          border: 1px solid $blue-hover;
          background-color: $blue-hover;
          color: #fff;
          // .submenu {
          //   left: auto;
          //   right: 240px;
          //   display: block;
          //   li {
          //     padding-top: 5px;
          //     padding-bottom: 5px;
          //   }
          // }
        }
      }
    }
    .el-button + .el-button {
      margin-left: 0;
    }
  }
  .pos_desc {
    font-size: 15px;
    line-height: 24px;

    h3 {
      font-size: 18px;
      color: #000;
      margin-bottom: 15px;
    }
    >>> .el-textarea {
      textarea {
        border: 0;
        overflow: hidden;
        resize: none;
      }
    }
    // & + & {
    //   margin-top: 35px;
    // }
  }
  .pos_desc + .pos_desc {
    margin-top: 35px;
  }

  .position_info {
    @include shadow();
    text-align: left;
    padding: 24px 30px;
    background: #fff;
    width: 900px;
    //发布渠道
    .position_but {
      margin-top: 7px;
      font-size: 13px;
      color: #a9a9a9;
    }
    .position_name_line {
      display: flex;
      display: -webkit-flex;
      margin-top: 19px;
      // border: 1px solid #000;
      align-items: center;
      justify-content: space-between;
      .salary {
        font-size: 22px;
        font-weight: bold;
        color: #44a8e1;
        margin-right: 20px;
      }
      .status {
        background: rgba(245, 245, 245, 1);
        color: #878787;
        font-size: 12px;
        width: 72px;
        line-height: 20px;
        height: 20px;
        border-radius: 4px;
        text-align: center;
        justify-content: center;
        align-items: center;
        margin-top: 3px;
      }
    }
    //学历
    .info_gather {
      font-size: 14px;
      color: #656565;
      margin-top: 20px;
    }
    //招聘人数,地点,发布日期
    .position_info_data {
      margin-top: 24px;
      padding-bottom: 25px;
      border-bottom: 1px solid #ddd;
      .position-line {
        .line-item {
          margin-right: 60px;
          color: #888888;
          font-size: 14px;
          .svg-icon {
            margin-right: 12px;
            color: #cccccc;
            font-size: 14px;
          }
        }
      }
    }
    .info_title {
      font-size: 14px;
      font-weight: bold;
      color: #333;
      margin-top: 30px;
    }
    .duty_des {
      margin-top: 30px;
      color: #656565;
      font-size: 14px;
      line-height: 30px;
      .el-textarea {
        textarea {
          border: 0;
          overflow: hidden;
          resize: none;
        }
      }
    }
  }
  .right_but_list {
    display: table;
    width: 280px;
    margin-left: 20px;
    background: #fff;
    padding: 24px 20px;

    @include shadow();
    .el-button {
      margin-bottom: 12px;
      width: 100%;
      &.w-btn {
        padding: 0;
        display: block;
        border: 1px solid #428dde;
        color: #428dde;
        line-height: 36px;
        height: 36px;
        font-size: 14px;
        background-color: #fff;
        &:hover {
          box-shadow: none;
          border: 1px solid $blue-hover;
          background-color: $blue-hover;
          color: #fff;
          // .submenu {
          //   left: auto;
          //   right: 240px;
          //   display: block;
          //   li {
          //     padding-top: 5px;
          //     padding-bottom: 5px;
          //   }
          // }
        }
      }
    }
    .el-button + .el-button {
      margin-left: 0;
    }
  }
}

// .preview_position {
//   margin-bottom: 10px;
//   button.el-button {
//     background: #fff;
//     border: 1px solid #44a9e1;
//     color: #44a9e1;
//     box-shadow: 0px 0px 12px 0px rgba(162, 190, 196, 0.3);
//     border-radius: 4px;
//   }
// }
</style>
