

<template>
  <el-row>
    <el-col :span="24" class="title_font_style">上传简历，快速完善个人资料哦</el-col>
    <el-col :span="24" class="file_format">支持word、pdf、html、excel 文件格式</el-col>
    <el-col :span="24" class>
      <upload-files ref="uploadFiles"></upload-files>
      <!-- <el-button type="info" class="buton-style refresh_resume" size='mini'  @click="onRefreshResume" plain >上传简历</el-button> -->
    </el-col>
    <el-col :span="24" class><edit-resume-state></edit-resume-state></el-col>
    
    <el-dialog :visible.sync="uploadLoadingDialog" :show-close="false" width="30%" center>
      <span>简历上传中，请稍后...</span>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
    <el-dialog :visible.sync="uploadOkDialog" width="30%" center>
      <span>简历已成功上传并解析， 请核准以下信息以确保信息无误！</span>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </el-row>
</template>
<script>
import EditResumeState from "@/components/EditResumeState";
import UploadFiles from "components/UploadFiles";
export default {
  name: "Manage",
  components:{
    EditResumeState ,
    UploadFiles
  },
  data() {
    return {
      resumeStatus: "",
      uploadLoadingDialog: false,
      uploadOkDialog: false
    };
  },
  methods: {
    onUploadResume() {
      this.uploadLoadingDialog = true;
      setTimeout(() => {
        this.uploadLoadingDialog = false;
        this.uploadOkDialog = true;
      }, 1000);
    },
    onRefreshResume(){

    }
  },
  mounted() {
  },
  created() {
  }
};
</script>
<style lang="scss" >

</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.el-col {
  margin: 10px 0;

  &.file_format {
    color: rgba(136, 136, 136, 1);
  }
}
</style>
