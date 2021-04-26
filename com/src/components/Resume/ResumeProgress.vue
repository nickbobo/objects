<template>
  <div class="resume-progress">
    <div class="position-progress title_font_style">当前简历完成度</div>
    <div class="progerss_content">
      <el-progress
        class="progress"
        :percentage="percentage"
        :showText="false"
        :strokeWidth="10"
        :color="customColor"
      ></el-progress>
      <el-button  class="refresh_resume plain_but" @click="onRefreshResume" >刷新简历</el-button>
      <el-button  class="preview_resume plain_but" @click="onPreviewResume" >预览简历</el-button>
    </div>
  </div>
</template>
<script>
import Bus from "@/utils/bus";
import { RefreshResume, GetMyResumeScore } from "@/api/myResume";
import { mapGetters } from "vuex";
export default {
  name: "resumeProgress",
  computed: {
    ...mapGetters(["my_resume_score"])
  },
  data() {
    return {
      msg: "",
      percentage: 0,
      customColor: "#409eff",
      customColors: [
        { color: "#5296DB", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ]
    };
  },
  methods: {
    onRefreshResume() {
      this.$store.dispatch("RefreshResume")
    },
    onPreviewResume() {
      this.$router.push({ path: "/refreshResume" }).catch(err => {});
    }
  },
  mounted() {
    this.percentage = Number(this.my_resume_score.split("%")[0]);
  },
  created() {
    this.$store.dispatch("GetMyResumeScore");
  }
};
</script>
<style lang="scss">
.resume-progress {
}
</style>
<style  lang="scss" scoped>
@mixin buttonStyle {
  width: 80px;
  padding: 6px 0px;
}

.title_font_style {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
}

// .buton-style {
//   @include buttonStyle;
// }
.resume-progress {
  height: 80px;
  background: #fff;
  padding: 0px 30px;
  .position-progress {
    padding: 15px 0 0 0;
  }
  .progerss_content {
    display: -webkit-flex;
    // justify-content: space-between;
    align-items: center;
    .el-row {
      display: flex;
      /* justify-content: center; */
      align-items: center;
    }
    .progress {
      width: 598px;
      margin-top: 10px;
    }
    button {
      @include buttonStyle;
    }

    .refresh_resume {
      margin-left: 30px;
    }
    .preview_resume {
      margin-left: 12px;
    }
  }
}
</style>
