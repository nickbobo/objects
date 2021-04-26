<template>
  <section>
    <div class="resume-manag_content">
      <el-row>
        <el-col :span="24">
          <span class="svg-folder">
            <svg-icon icon-class="folder">item</svg-icon>
          </span>
        </el-col>

        <div class="panel">
          <div class="panel-item">
            <span class="iconfont icon-files"></span>
            <div class="txt">上传简历资料快速完善您的个人投递资料哦</div>
            <el-upload
              class="upload-demo"
              action=""
              :http-request="onRefreshResume"
            >
              <a class="w-btn btn-fluid">
                上传简历
              </a>
            </el-upload>
            <!-- <a href="#" class="w-btn btn-fluid">上传简历</a> -->
          </div>
          <div class="panel-item">
            <span class="iconfont icon-resume"></span>
            <div class="txt">还没有简历资料？</div>
            <a href="#/resume" class="w-btn btn-fluid">创建简历</a>
          </div>
        </div>

        <!-- <el-row v-if="resume_status == 1">
          <el-col :span="24"
            >您已创建您的简历，在此您可快速预览您的简历哦</el-col
          >
          <el-col :span="24">
            <el-button
              size="medium"
              class="upload_resume"
              @click="onCreationResume"
              >查看我的简历</el-button
            >
          </el-col>
        </el-row> -->
        <!-- <el-row v-if="resume_status == 2">
          <el-col :span="24">上传简历资料快速完善您的个人投递资料哦</el-col>
          <el-col :span="24"
            ><upload-files
              ref="uploadFiles"
              class="upload_resume"
            ></upload-files>
          </el-col>
          <el-col :span="24" class="null_resume">还没有简历资料？</el-col>
          <el-col :span="24">
            <el-button
              size="medium"
              class="creation_resume"
              @click="onCreationResume"
              >创建简历</el-button
            >
          </el-col>
        </el-row> -->
      </el-row>
    </div>
  </section>
</template>

<script>
import { CheckResume } from "api/myResume";
import UploadFiles from "components/UploadFiles";
import { mapGetters } from "vuex";
export default {
  name: "ResumeManag", //个人中心---简历管理
  components: {
    UploadFiles
  },
  data() {
    return {
      msg: "",
      isResume: false
    };
  },
  computed: {
    ...mapGetters(["resume_status"])
  },
  // components: {
  //   navbar
  // },
  methods: {
    onCreationResume() {
      this.$router.push({ path: "/resume" }).catch(err => {});
    },
    onRefreshResume(param) {
      this.$refs.uploadFiles.uploadFileMethod(param);
    }
  },
  created() {
    this.$store.dispatch("setCheckResume", true);
  },
  mounted() {}
};
</script>
<style lang="scss">
@import "~@/styles/mixin.scss";
.resume-manag_content {
  // 简历管理
  .panel {
    padding-top: 80px;
    text-align: center;
  }


  .upload_resume {
    .el-upload {
      margin-left: 178px;
    }
    .el-button {
      padding: 0;
      width: 388px;
      height: 40px;
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(68, 169, 225, 1);
      margin-top: 20px;
    }
  }
  .el-button {
    &.upload_resume {
      padding: 0;
      width: 388px;
      height: 40px;
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(68, 169, 225, 1);
      margin-top: 20px;
    }
    &.creation_resume {
      width: 388px;
      height: 40px;
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(221, 221, 221, 1);
      margin-top: 19px;
    }
  }
}
</style>
<style lang="scss" scoped>
.resume-manag_content {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  .svg-folder {
    color: #ddd;
    font-size: 42px;
    margin: 52px auto 48px auto;
    display: block;
  }
  .null_resume {
    margin-top: 72px;
  }
}
</style>
