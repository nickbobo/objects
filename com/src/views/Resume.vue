<template>
  <section>
    <div class="content">
      <!-- <img src="../../static/img/user_bg.png"> -->
      <div class="left-content">
        <resume-progress></resume-progress>
        <el-row class="resume-info">
          <el-col :span="24">
            <basic-info ref="basicInfo"></basic-info>

            <current-work></current-work>
            <intention></intention>
            <work-exp></work-exp>
            <project-experience></project-experience>
            <education-experience></education-experience>
            <self-evaluation></self-evaluation>
            <skill></skill>
          </el-col>
        </el-row>
      </div>
      <div class="right-content">
        <div class="right-content_item">
          <manage></manage>
        </div>
      </div>
    </div>
  </section>
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

export default {
  name: "resume", //简历编辑
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
    CurrentWork
  },
  data() {
    return {
      msg: "",
      percentage: 20
    };
  },
  methods: {},
  created() {
    this.$store.dispatch("getAllDD");
    this.$store.dispatch("editResumeStatus", true);
  },
  mounted() {
    localStorage.setExpire("userId", "zhangsan");
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
    margin-top: 20px;
    min-width: 320px;
    min-height: 300px;
    margin-left: 20px;
    .right-content_item {
      background: #fff;
      padding: 10px 20px 45px;
    }
  }
}
.position-progress {
  padding: 10px;
}
</style>
