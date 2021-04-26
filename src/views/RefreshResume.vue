<template>
  <section>
    <div class="refresh-resume_content" >
      <el-row id="pdfDom">
        <el-col :span="24" class="refresh_content">
          <el-button type class="resume_refresh_but">简历预览</el-button>

          <basic-info ref="basicInfo"></basic-info>
          <intention></intention>
          <work-exp></work-exp>
          <project-experience></project-experience>
          <education-experience></education-experience>
          <self-evaluation></self-evaluation>
          <skill></skill>
        </el-col>
        <el-col class="refresh_right_but">
          <el-row>
            <el-button type="primary" plain @click="onEditResume">编辑简历</el-button>
          </el-row>
          <el-row>
            <el-button type="primary" plain @click="getPdf(`${$refs.basicInfo.showData.Name}的简历`)">下载简历</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </section>
</template>


<script>
// import { updatePassword } from "../api/api";
import ResumeProgress from "../components/Resume/ResumeProgress";
import BasicInfo from "../components/Resume/BasicInfo";
import Manage from "../components/Resume/Manage";
import WorkExp from "../components/Resume/WorkExp";
import Intention from "../components/Resume/Intention";

import ProjectExperience from "../components/Resume/ProjectExperience";
import EducationExperience from "../components/Resume/EducationExperience";

import SelfEvaluation from "../components/Resume/SelfEvaluation";
import Skill from "../components/Resume/Skill";

export default {
  name: "RefreshResume", //简历预览
  components: {
    ResumeProgress,
    Manage,
    BasicInfo,
    Intention,
    WorkExp,
    ProjectExperience,
    EducationExperience,
    SelfEvaluation,
    Skill
  },
  data() {
    return {
      msg: "",
      percentage: 20,
      htmlTitle: ''
    };
  },
  methods: {
      onEditResume(){
          this.$router.push({ path: "/resume" }).catch(err => {});
      }
  },
  created() {
    this.$store.dispatch("getCityItem").then(res => {});
    this.$store.dispatch("getIndustryItemList");
    this.$store.dispatch("GetDictItemJobCategoryList");
  },
  mounted() {
    this.$store.dispatch("editResumeStatus", false);
  }
};
</script>
<style lang="scss">
.el-progress-bar__outer {
  width: auto;
}

.refresh_right_but {
  position: absolute;
  margin-left: 872px;
  width:200px;
  .el-row {
    margin-bottom: 8px;
    button {
      width: 112px;
      height: 36px;
      background: #fff;
      border: 1px solid #44a9e1;
      color: #44a9e1;
      &.el-button {
        width: 112px;
        height: 36px;
        padding: 0;
      }
    }
  }
}
</style>

<style  lang="scss" scoped>
@import "~@/styles/mixin.scss";

.refresh-resume_content {
  margin-top: 10px;
  margin-bottom: 20px;
  .refresh_content {
    width: 860px;
    background: #fff;
    padding: 20px 30px;
    .resume_refresh_but {
      @include wh(124px, 36px);
      position: absolute;
      z-index: 999;
      background: #44a9e1;
      padding: 0;
      color: #fff;
      margin: 4px 0 0 -6px;
    }
  }
  .refresh_right_but {
    position: absolute;
    margin-left: 872px;
    .el-col {
      bottom: 8px;
      button {
        width: 112px;
        height: 36px;
        
      }
    }
  }
}

.buton-style {
  @include buttonStyle;
}

.content {
  width: 60vw;
  min-width: 1200px;
  display: -webkit-flex;
  justify-content: space-evenly;
  font-size: 14px;
  .left-content {
    width: 70%;
    margin-top: 20px;
    min-width: 860px;
    .resume-info {
      background: #fff;
      padding: 30px;
      margin: 20px 0px;
      // > div {
      //   margin-bottom: 30px;
      // }
      // img {
      //   @include wh(150px, 150px);
      // }
      // .user-info {
      //   margin-top: 10px;
      //   .el-col {
      //     @include lineH(40px);
      //   }
      // }
      // .icon-edit {
      //   @include icon-def-style(1);
      // }
    }
  }

  .right-content {
    width: 25%;
    height: 30vh;
    background: #fff;
    margin-top: 20px;
    padding: 10px 20px;
    min-width: 320px;
    min-height: 300px;
    margin-left: 20px;
  }
}
.position-progress {
  padding: 10px;
}
</style>
