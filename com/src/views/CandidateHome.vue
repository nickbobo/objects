<template>
  <section>
    <div class="candidate-home">
      <div class="left-content">
        <el-row class="resume-info">
          <el-col :span="24">
            <info-search :info-search-size="'min'"></info-search>
          </el-col>
        </el-row>
        <el-row class="position_content">
          <el-row class="position_title">最新职位</el-row>
          <position ref="position"></position>
        </el-row>
      </div>
      <suspend-search></suspend-search>
      <div class="right-content">
      <div class="right-content_item">
        <el-row class="info_content" >
          <el-col :span="7" class="header_img">
            <img :src="my_portrait_url" @error="defHeadImg()"/>
          </el-col>
          <el-col :span="17">
            <el-row class="candidate_name">
              <el-col :span="24" class="title_font_mix18">{{
                base_info.Name ? base_info.Name : "--"
              }}</el-col>
              <el-col :span="24" class="candidate_info">
                {{ base_info.CurIndustry ? base_info.CurIndustry : "--" }}｜
                {{ base_info.CurPosition ? base_info.CurPosition : "--" }}<br/>
                {{ base_info.Age }}｜ {{ base_info.WorkYear }}年工作经验｜{{
                  base_info.Education ? base_info.Education : "--"
                }}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="resume_info" >
          <el-col :span="24" class="title_resume_full"
            >当前简历完整度{{ my_resume_score?my_resume_score:"0%" }}</el-col
          >
          <el-col :span="24">
            <el-progress
              class="progress"
              :percentage="percentage"
              :showText="false"
              :strokeWidth="10"
              :color="customColor"
            ></el-progress>
          </el-col>
          <el-col :span="24" class="resume_hint"
            >提升简历完整度，可获取更多职位机会哦</el-col
          >
          <el-col :span="24" class="resume_but"> 

            <el-button class="plain_but refresh_but" @click="onResumeRefresh">刷新简历</el-button>
            <el-button class="plain_but" @click="onCreationResume"
              >编辑简历</el-button
            >
            <upload-files ref="uploadFiles" ></upload-files>
          </el-col>
        </el-row>
        <edit-resume-state ></edit-resume-state>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ResumeProgress from "../components/Resume/ResumeProgress";
import EditResumeState from "../components/EditResumeState";
import UploadFiles from "components/UploadFiles";
import position from "./PositionComponent.vue";
import InfoSearch from "components/InfoSearch";
import SuspendSearch from "components/SuspendSearch";
import { mapGetters } from "vuex";
export default {
  name: "CandidateHome", //简历编辑
  components: {
    ResumeProgress,
    EditResumeState,
    UploadFiles,
    position,
    InfoSearch,
    SuspendSearch
  },
  computed: {
    ...mapGetters(["my_resume_score", "base_info", "my_portrait_url"])
  },
  data() {
    return {
      msg: "",
      percentage: 0,
      customColor: "#409eff"
    };
  },
  methods: {
    onCreationResume() {
      this.$router.push({ path: "/resume" }).catch(err => {});
    },
    onUploadResume() {
      this.$refs.uploadFiles.onUploadResume();
    },
    onResumeRefresh(){
      this.$store.dispatch("RefreshResume")
    }
  },
  created() {},
  mounted() {
    this.$store.dispatch("getBaseInfo").then(res => {});
    this.$refs.position.init();
    if (this.my_resume_score && (typeof this.my_resume_score) != 'object') {
      this.percentage = Number(this.my_resume_score.split("%")[0]);
    }
  }
};
</script>
<style lang="scss">
.candidate-home {
  .resume_info {
    .resume_but {
      .el-button--mini {
        width: 80px;
        height: 30px;
        // background: #ddd;
        color: #666666;
        &:hover {
          color: #333333;
        }
      }
      .el-button{
        margin-left:20px;
      }
      .refresh_but{
        margin-left:0px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.buton-style {
  @include buttonStyle;
}

.candidate-home {
  width: 60vw;
  min-width: 1200px;
  display: -webkit-flex;
  justify-content: space-evenly;
  font-size: 14px;
  margin-bottom: 20px;
  .left-content {
    width: 70%;
    margin-top: 20px;
    min-width: 860px;
    .resume-info {
      background: #fff;
      padding-bottom: 15px;
    }
    .position_content {
      background: #fff;
      margin-top: 20px;
      padding: 10px 30px;
      .position_title {
        border-bottom: 1px solid #ddd;
        padding-bottom: 20px;
        margin-top: 22px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }

  .right-content {
    width: 25%;
    margin-top: 20px;
    min-width: 320px;
    margin-left: 20px;
    margin-bottom: 30px;
    .right-content_item{
      padding: 24px 20px;
      background: #fff;
    }
    .info_content {
      padding-bottom: 20px;
      border-bottom: 1px solid #dddddd;
      .header_img {
        width: 80px;
        height: 88px;
        img {
          width: 80px;
          height: 88px;
        }
      }
      .candidate_name {
        margin-left: 20px;
        .title_font_mix18 {
          margin-top: 8px;
        }
        .candidate_info {
          margin-top: 20px;
          line-height: 26px;
          color: #666666;
        }
      }
    }
    .resume_info {
      .title_resume_full {
        margin-top: 19px;
        margin-bottom: 14px;
        font-weight: 400;
      }
      .progress {
        margin-bottom: 11px;
      }
      .resume_hint {
        color: #888888;
        font-size: 12px;
      }
      .resume_but {
        margin-top: 24px;
        margin-bottom: 37px;
        display: flex;
      }
    }
  }
}
.position-progress {
  padding: 10px;
}
</style>
