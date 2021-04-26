<template>
  <div class="resume_detail" v-if="isRouterAlive">
    <div class="left-content" id="pdfDom">
      <el-row class="resume-info">
        <basic-info
          ref="basicInfo"
          @reload="reload"
          :deliveryStatus.sync="deliveryStatus"
          :isOwn.sync="isOwn"
          :IsCollect.sync="IsCollect"
        ></basic-info>
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
    <resume-button-operation
      ref="resumeBO"
      :editDeliveryStatusData="editDeliveryStatusData"
      @getList="$refs.basicInfo.getBaseInfo()"
    ></resume-button-operation>
    <div class="right-content" v-if="deliveryStatus != -2">
      <!-- -1 -->
      <div v-if="deliveryStatus == -1 && !isOwn">
        <el-button
          @click="$refs.resumeBO.onRelevancePosition($route.query.ResumeId)"
          >关联职位</el-button
        >
        <el-button type="" v-if="isOwn">简历更新版导入</el-button>
      </div>

      <!-- 2 -->
      <div v-if="deliveryStatus == 2 && $route.query.PositionId">
        <el-button
          type=""
          @click="
            $refs.resumeBO.editDeliveryStatusAction(editDeliveryStatusData, 1)
          "
          >加入筛选</el-button
        >
        <el-button
          type=""
          @click="
            $refs.resumeBO.editDeliveryStatusAction(editDeliveryStatusData, 0)
          "
          >人选不合格</el-button
        >
      </div>

      <!-- 1 -->
      <div v-if="deliveryStatus == 1 && $route.query.PositionId">
        <el-button
          type=""
          @click="
            $refs.resumeBO.editDeliveryStatusAction(editDeliveryStatusData, 2)
          "
          >加入候选</el-button
        >
        <el-button
          type=""
          @click="
            $refs.resumeBO.editDeliveryStatusAction(editDeliveryStatusData, 0)
          "
          >人选不合格</el-button
        >
        <el-button
          type=""
          @click="$refs.resumeBO.cancelRelevancePosition($route.query.Id)"
          >取消职位关联</el-button
        >
      </div>

      <!-- 0 -->
      <div v-if="deliveryStatus == 0 && $route.query.PositionId">
        <el-button
          type=""
          @click="
            $refs.resumeBO.editDeliveryStatusAction(editDeliveryStatusData, 2)
          "
          >加入候选</el-button
        >
        <el-button
          type=""
          @click="
            $refs.resumeBO.editDeliveryStatusAction(editDeliveryStatusData, 1)
          "
          >加入筛选</el-button
        >
        <el-button
          type=""
          @click="$refs.resumeBO.cancelRelevancePosition($route.query.Id)"
          >取消职位关联</el-button
        >
      </div>

      <el-button
        type=""
        v-if="IsCollect"
        @click="$refs.resumeBO.onDelFavorite($route.query.ResumeId)"
        >取消收藏</el-button
      >
      <el-button
        type=""
        v-else
        @click="$refs.resumeBO.isShowFavorite($route.query.ResumeId)"
        >收藏简历</el-button
      >

      <div v-if="isOwn">
        <el-button @click="$refs.resumeBO.onEditResume($route.query.ResumeId)"
          >编辑简历</el-button
        >
        <el-button
          @click="
            $refs.resumeBO.onDownloadResume($refs.basicInfo.showData.Name)
          "
          >下载简历</el-button
        >
      </div>
      <!-- <el-button
        @click="openPath"
        
        >简历原件  {{$refs.basicInfo.showData.ResumeSource}}</el-button
      > -->
      <el-button @click="openPath" v-if="$refs.basicInfo.showData.ResumeSourceUrl" type='button'>简历原件</el-button>
      <el-button @click="dialogVisibletags = !dialogVisibletags"
        >添加标签</el-button
      >
      <el-button @click="dialogVisibleRemarks = !dialogVisibleRemarks"
        >添加备注</el-button
      >
    </div>
    <div
      class="right-content-menu"
      v-if="deliveryStatus != -2 && tagdatalist"
    >
      <div class="tag-layout">
        <span>标签</span>
        <i
          class="el-icon-edit"
          style="float"
          @click="dialogVisibletags = !dialogVisibletags"
        ></i>
      </div>
      <div class="tag-group" style="margin-top: 10px">
        <el-tag
          v-for="(item, index) in tagdatalist"
          :key="index"
          style="margin-left: 5px; margin-top: 5px"
          >{{ item.ResumeLable }}</el-tag
        >
      </div>
    </div>

    <div
      class="right-content-menu"
      v-if="deliveryStatus != -2 && remarkstxts.length > 0"
    >
      <div class="tag-layout">
        <span>备注</span>
        <i
          class="el-icon-edit"
          style="float"
          @click="dialogVisibleRemarks = !dialogVisibleRemarks"
        ></i>
      </div>
      <div class="remarks">
        <p>{{ remarkstxts }}</p>
      </div>
    </div>
    <look-address ref="lookAddress"></look-address>

    <!-- 个人标签 start-->

    <el-dialog
      title=""
      :visible.sync="dialogVisibletags"
      custom-class="modal-overlay"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :show-close="false"
      @close="closeTagDialog"
    >
      <div id="skillTagsPop" class="modal-overlay">
        <div class="modal-box modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">简历标签</h4>
            </div>
            <div class="modal-body">
              <div class="jn-box">
                <div class="jn-hd">
                  <div class="title">
                    当前简历标签 (<b
                      ><span class="tags-num">{{
                        localDataList ? localDataList.length : 0
                      }}</span
                      >/8</b
                    >)
                  </div>
                  <div class="jn-add">
                    <input
                      type="text"
                      v-model="skillVal"
                      maxlength="10"
                      show-word-limit
                      placeholder="请输入自定义标签..."
                      id="tagText"
                      class="w-input"
                    />
                    <!-- <el-input
                        v-model="skillVal"
                        type="text"
                        maxlength="10"
                        class="w-input"
                        show-word-limit
                        placeholder="请输入自定义标签..."
                      ></el-input> -->

                    <button
                      id="addTag"
                      class="btn-border"
                      type='button'
                      @click="onAddSkill('')"
                    >
                      <span class="iconfont icon-jia" ></span>
                      添加标签
                    </button>

                    <el-row :span="24" class="input_msg">{{
                      skillMessage
                    }}</el-row>
                  </div>
                </div>
                <div class="jn-bd">
                  <div class="skill-box" data-skill>
                    <div
                      class="s-item"
                      :key="item.ResumeLable"
                      v-for="item in localDataList"
                    >
                      {{ item.ResumeLable }}
                      <span
                        class="iconfont icon-close"
                        @click="onDel(item)"
                      ></span>
                    </div>
                    <!-- <div class="s-item" data-delect>
                        技能1
                        <span class="iconfont icon-close"></span>
                      </div>
                      <div class="s-item" data-delect>
                        技能1
                        <span class="iconfont icon-close"></span>
                      </div> -->
                  </div>
                  <div class="hot-skill">
                    <div class="title">热门标签</div>
                    <div class="hot-list">
                      <span
                        :key="index"
                        v-for="(item, index) in hot_label"
                        @click="onAddSkill(item.ResumeLable)"
                        >{{ item.ResumeLable }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="w-btn w-bt-xl btn-primary"
                @click="dialogVisibletags = false"
              >
                取消
              </button>
              <button type="button" @click="onSave()" class="w-btn w-bt-xl">
                保存
              </button>
            </div>
          </div>
          <button class="close" type='button' @click="dialogVisibletags = false">
            <span class="iconfont icon-close"></span>
          </button>
        </div>
      </div>
    </el-dialog>
    <!-- 个人标签 end -->

    <!-- 编辑备注 -->
    <el-dialog
      title="编辑备注"
      :visible.sync="dialogVisibleRemarks"
      width="30%"
    >
      <el-form :model="ruleForm" ref="ruleForm">
        <el-form-item prop="localremark">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入备注内容"
            v-model="ruleForm.localremark"
            maxlength="200"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">保存</el-button> -->
        <div class="dialog-footer-center">
          <button
            class="w-btn btn-md-w btn-cancel"
            @click="dialogVisibleRemarks = false" type='button'
          >
            取消
          </button>
          <button
            style="margin-left: 20px"
            class="w-btn btn-md-w" type='button'
            @click="addRemarks('ruleForm')"
          >
            保存
          </button>
        </div>
      </div>
    </el-dialog>
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
import ResumeList from "views/components/ResumeList";
import Language from "@/components/Resume/Language";
import { mapGetters } from "vuex";
import LookAddress from "views/components/LookAddress";

import ResumeButtonOperation from "views/components/ResumeButtonOperation";

import {
  GetSkill,
  EditSkill,
  DelSkill,
  ResumeLableById,
  SaveResumeLable,
  AllSysResumeLable,
  AddOrUpdateResumeRemark,
  GetResumeRemark
} from "@/api/myResume";
import { deepCopyTwo } from "utils/index";
export default {
  name: "ResumeDetail", //简历详情
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
    ResumeButtonOperation,
    LookAddress,
    ResumeProgress,
    Manage,
    BasicInfo,
    Intention,
    ResumeList,
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
      deliveryStatus: -2,
      IsCollect: false, //是否已收藏
      isRouterAlive: true,
      isOwn: false,
      srcUrl: "",
      editDeliveryStatusData: {
        PositionId: this.$route.query.PositionId,
        ResumeId: this.$route.query.ResumeId,
        Id: this.$route.query.Id
      },

      dialogVisibleRemarks: false,

      dialogVisibletags: false,
      datalist: [],
      tagdatalist: [],
      localDataList: [],
      skillVal: "",
      skillMessage: "",
      skillList: [],
      fromData: {
        ResumeId: "",
        SkillName: "string",
        UseTime: "",
        MasteryLevel: "",
        Id: "bff5da61-7f30-4a7b-a04a-358eeb6ac45e"
      },
      remarkstxts: "",
      hot_label: [],
      ruleForm: { localremark: "" },
      rules: {
        localremark: [
          { required: true, message: "请输入备注内容", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    openPath() {
      this.srcUrl = this.$refs.basicInfo.showData.ResumeSourceUrl;
      this.$refs.lookAddress.isShowDialog = true;
      this.$refs.lookAddress.init(
        this.$refs.basicInfo.showData.ResumeSourceUrl
      );
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
        this.$store.dispatch("editResumeStatus", false);
        this.$nextTick(() => {
          this.$refs.basicInfo.getBaseInfo();
        });
      });
    },

    // 添加标签弹框中的方法 start
    onAddSkill(val) {
      if (this.localDataList.length > 7) {
        this.skillMessage = "标签不能超过8个";
        return;
      }

      if (val) {
        this.skillVal = val;
      } else {
        if (this.skillVal != "") {
          if (this.skillVal.length > 10) {
            return (this.skillMessage = "标签长度不能超过10位");
          }
        }
      }
      this.skillMessage = "";
      if (this.skillVal != "") {
        let isExist = this.localDataList.some(item => {
          if (item.ResumeLable === this.skillVal) {
            return true;
          }
        });
        if (this.localDataList.length > 7) {
          this.skillMessage = "标签不能超过8个";
        } else {
          if (isExist) {
            this.skillMessage = "标签已经存在";
          } else {
            this.localDataList.push({
              ResumeLable: this.skillVal
            });
            //this.editAction();
            this.skillVal = "";
          }
        }
      } else {
        this.skillMessage = "标签内容不能为空";
      }
    },
    datePickerChange() {
      this.$forceUpdate(); //外部js无效  只对当前组件有效
    },
    onAdd() {
      if (this.add_resume_id === "" && !this.add_resume_id) {
        this.$message({
          message: "请先添加基本信息",
          type: "warning"
        });
        return;
      }
      this.isShowdialog = true;
    },
    getList() {
      // this.datalist = [];
      GetSkill({ ResumeId: this.add_resume_id }).then(res => {
        if (res.data.Success) {
          this.showList = res.data.Data;
          this.datalist = deepCopyTwo(res.data.Data);
        } else {
        }
      });
    },
    editAction() {
      EditSkill({
        skill: {
          ResumeId: this.add_resume_id,
          SkillName: this.skillVal,
          UseTime: "",
          MasteryLevel: "",
          Id: "bff5da61-7f30-4a7b-a04a-358eeb6ac45e"
        },
        type: 1 //1 新增   2 修改
      }).then(res => {
        if (res.data.Success) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.getList();
        } else {
          this.$message({
            message: res.data.Message,
            type: "error"
          });
        }
      });
    },
    onCancel() {
      this.isShowdialog = false;
    },
    onSave() {
      var that = this;
      SaveResumeLable({
        ResumeId: that.$route.query.ResumeId,
        ResumeLables: that.localDataList
      }).then(res => {
        if (res.data.Success) {
          this.isShowdialog = false;
          this.dialogVisibletags = false;
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.Message,
            type: "error"
          });
        }
      });
    },
    onEdit() {
      this.isShowdialog = true;
      this.skillMessage = "";
    },

    onDel(item) {
      this.skillMessage = "";
      this.localDataList.some((items, i) => {
        if (items.ResumeLable == item.ResumeLable) {
          this.localDataList.splice(i, 1); //在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
          return true;
        }
      });
    },
    // 获取系统简历标签
    getSysResumeLable() {
      AllSysResumeLable().then(res => {
        if (res.data.Success) {
          this.hot_label = res.data.Data;
        }
      });
    },
    // 获取个人简历标签
    getPersonReumeLable() {
      //consoleconsole.log('获取个人简历标签');
      var that = this;
      ResumeLableById({ resumeId: that.$route.query.ResumeId }).then(res => {
        if (res.data.Success) {
          that.tagdatalist = res.data.Data;
          if (res.data.Data != null) {
            that.localDataList = JSON.parse(JSON.stringify(that.tagdatalist));
          }
        }
      });
    },
    // 保存标签
    saveResumeLable() {},

    closeTagDialog() {
      this.getPersonReumeLable();
    },
    // 添加标签弹框中的方法 end

    // 添加或更新备注
    addRemarks(formName) {
      var that = this;
      AddOrUpdateResumeRemark({
        ResumeId: that.$route.query.ResumeId,
        Remark: that.ruleForm.localremark
      }).then(res => {
        if (res.data.Success) {
          that.dialogVisibleRemarks = false;
          that.remarkstxts = res.data.Data.Remark + "";
          that.$message({
            message: "保存成功",
            type: "success"
          });
          //that.ruleForm.localremark = '';
        } else {
          that.$message({
            message: res.data.Message,
            type: "error"
          });
        }
      });
    },
    // 获取备注
    getRemarks() {
      var that = this;
      GetResumeRemark({ resumeId: that.$route.query.ResumeId }).then(res => {
        if (res.data.Success) {
          that.remarkstxts = res.data.Data.Remark + "";
          that.ruleForm.localremark = that.remarkstxts;

          
          //consoleconsole.log(that.remarkstxts.length);
        }

        
      });
    }
  },
  created() {
    let that = this;
    if (this.$route.query.ResumeId) {
      this.$store.dispatch("updateAddResumeId", this.$route.query.ResumeId);
      this.$store.dispatch("editResumeStatus", false);
      this.$nextTick(() => {
        this.$refs.basicInfo.getBaseInfo();
      });
      that.getSysResumeLable();
      that.getPersonReumeLable();
      that.getRemarks();
    }
  },
  mounted() {
    this.$store.dispatch("getAllDD");
    this.$store.dispatch("GetDictItemJobCategoryList"); //职能
  }
};
</script>
<style lang="scss">
.resume_detail {
  .el-progress-bar__outer {
    width: auto;
  }
  .el-popper {
    .resume_version_popover {
      text-align: center;

      .info_popover {
        text-align: center;
      }
    }
  }
  .el-input {
    margin-top: 20px;
    width: 620px;
    .el-input__inner {
      width: 620px;
      width: 100%;
      border-top-width: 0px;
      border-left-width: 0px;
      border-right-width: 0px;
      border-bottom-width: 1px;
      font-size: 16px;
      color: #333;
      border-radius: 0;
    }
  }
  .add_skill {
    position: absolute;
    margin-left: -68px;
    margin-top: 20px;
    background: rgba(249, 249, 249, 1);
  }
  .tag_list {
    margin-top: 20px;
    margin-bottom: 30px;
    .el-tag {
      background: #374c58;
      font-size: 14px;
      color: #ffffff;
      margin-right: 10px;
      margin-bottom: 20px;
      .el-icon-close {
        font-size: 14px;
        color: #fff;
        font-weight: bold;
        height: 12px;
        width: 12px;
        // border-radius: 0;
        line-height: 12px;

        &:hover {
          background: #795e5e;
          opacity: 8;
        }
      }
    }
  }
  .input_msg {
    color: red;
  }
}
</style>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.input_msg {
  color: red;
}
.buton-style {
  @include buttonStyle;
}

.resume_detail {
  // display: -webkit-flex;
  // justify-content: space-evenly;
  font-size: 14px;
  width: $con-w;
  margin: 0 auto;
  overflow: auto;
  margin-bottom: 35px;
  .left-content {
    @include shadow();
    text-align: left;
    width: 900px;
    float: left;
    .resume-info {
      background: #fff;
      padding: 25px 30px 30px 30px;
      > div + div {
        border-top: 1px solid #e5e5e5;
      }
    }
  }
  .right-content {
    float: right;
    position: relative;
    float: left;
    padding: 24px 24px;
    width: 280px;
    background: #fff;
    display: inline-table;
    margin-left: 20px;
    @include shadow();
    button + button {
      margin-left: 0;
      margin-top: 10px;
    }
    button {
      width: 100%;
      height: 36px;
      padding: 0;

      display: block;
      border: 1px solid $blue;
      color: $blue;
      line-height: 36px;
      height: 36px;
      font-size: 14px;
      background-color: #fff;
      &:hover {
        box-shadow: none;
        border: 1px solid $blue-hover;
        background-color: $blue-hover;
        color: #fff;
      }
      &.active {
        box-shadow: none;
        border: 1px solid $blue-hover;
        background-color: $blue-hover;
        color: #fff;
      }
    }
  }

  .right-content-menu {
    float: right;
    padding: 24px 24px;
    width: 280px;
    background: #fff;
    margin-left: 20px;
    margin-top: 20px;
    @include shadow();
    .el-icon-edit {
      float: right;
      color: #333333;
      &:hover {
        box-shadow: none;
        color: $blue-hover;
      }
    }
    .tag-layout {
      color: #333333;
      font-size: 16px;
      font-weight: bold;
    }
    .remarks {
      margin-top: 15px;
      color: #333333;
      font-size: 14px;
      line-height: 22px;
      word-break: break-all;
    }
  }

  .el-button + .el-button {
    margin-left: 0;
  }
  .el-button {
    width: 120px;
    height: 36px;
    padding: 0;
    font-size: 14px;
    border: 1px solid #44a9e1;
    background: #fff;
    color: #44a9e1;
    border-radius: 4px;
    margin-bottom: 8px;
    &:hover {
      border: 1px solid #1c8dcb;
      color: #1c8dcb;
    }
  }
  .dialog-footer-center {
    text-align: center;
  }
  .jn-box {
    margin-top: 30px;
    margin-bottom: 30px;
    .title {
      font-size: 15px;
    }
    .hot-skill {
      margin-top: 20px;
      position: relative;
      padding-left: 80px;
      .title {
        position: absolute;
        left: 0;
        top: 0;
        line-height: 30px;
        color: #999;
        padding-left: 5px;
      }
    }
    .hot-list {
      margin-top: 10px;

      span {
        display: inline-block;
        background-color: #fff;
        padding-left: 5px;
        padding-right: 5px;
        min-width: 80px;
        height: 30px;
        cursor: pointer;
        line-height: 30px;
        border: 1px solid $blue-hover;
        text-align: center;
        margin-right: 15px;
        margin-bottom: 10px;
        &:hover {
          border-color: #008aff;
        }
      }
    }
  }
  .jn-hd {
    margin-bottom: 20px;
    .title {
      line-height: 34px;
    }
    position: relative;
    .jn-add {
      position: absolute;
      top: 0;
      right: 0;
      .w-input {
        float: left;
        width: 220px;
        margin-right: 8px;
        border-color: #ccc;
      }
      .btn-border {
        padding: 0 8px;
        line-height: 34px;
        height: 34px;
        border: 1px solid #ccc;
        background-color: transparent;
        color: #333;
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
        .iconfont {
          font-size: 12px;
          color: $blue;
        }
        &:hover {
          border-color: $blue-hover;
        }
      }
    }
  }
  .jn-bd {
    .skill-box {
      margin-top: 15px;
      background-color: #f6faff;
      border: 1px solid #f6f6f6;
      border-radius: 6px;
      padding: 7.5px 15px;
      min-height: 40px;
      .s-item {
        margin: 7.5px;
      }
    }
  }

  .liet_content {
    margin-top: 20px;
    .el-col {
      background: #eee;
      border-radius: 12px;
      padding: 4px 8px;
      font-size: 14px;
      text-align: center;
      margin-right: 24px;
      .el-tag {
        background: #374c58;
        font-size: 14px;
        color: #ffffff;
        margin-right: 10px;
      }
    }
  }

  .skill-box {
    @include clearfix();
    .s-item {
      cursor: pointer;
      float: left;
      border: 1px solid #ddd;
      height: 30px;
      line-height: 30px;
      padding: 0 25px 0 15px;
      margin-right: 10px;
      margin-bottom: 10px;
      position: relative;
      background-color: #fff;
      .iconfont {
        position: absolute;
        top: 50%;
        right: 8px;
        font-size: 12px;
        line-height: 1;
        margin-top: -6px;
        color: #afafaf;
        font-weight: bold;
      }
      &:hover {
        border-color: $blue;
        .iconfont {
          color: $blue;
        }
      }
    }
  }
}
.position-progress {
  padding: 10px;
}
</style>
