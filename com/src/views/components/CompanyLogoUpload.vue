<template>
  <el-row class="company_logo_upload">
    <el-col :span="24">公司logo上传</el-col>
    <!-- <el-dialog
      :visible.sync="uploadLoadingDialog"
      :modal-append-to-body="false"
      :show-close="false"
      width="30%"
      center
    >
      <el-row class="upload_loading_dialog">
        <el-col :span="24">
          <svg-icon
            icon-class="loading"
            class="icon-svg-but loading_svg_icon"
          />
        </el-col>
        <el-col :span="24">简历上传中，请稍后...</el-col>
      </el-row>
    </el-dialog> -->
    <!-- <el-dialog
      :visible.sync="uploadOkDialog"
      :modal-append-to-body="false"
      custom-class="upload_resume_ok"
      center
    >
      <el-form
        ref="resumeForm"
        label-position="top"
        :rules="ruleValidate"
        label-width="80px"
        :model="resumeData"
      >
        <div class="succeed_title">
          <span class="title_font_mix16"
            >简历已成功上传并解析，<br />
            请核准以下信息以确保信息无误！</span
          >
        </div>
        <el-form-item label="姓名" prop="Name">
          <el-input v-model="resumeData.Name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="Mobile">
          <el-input v-model="resumeData.Mobile"></el-input>
        </el-form-item>
        <el-form-item label="海外经历(留学)" prop="IsOverseaStudy">
              <el-select v-model="resumeData.IsOverseaStudy" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="items in dd_overseas_study"
                  :key="items.ItemCode"
                  :label="items.ItemName"
                  :value="items.ItemCode">
                </el-option>
              </el-select>
        </el-form-item>

        
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            class="affirm_edit"
            @click="onSave('resumeForm')"
            >确认并保存</el-button
          >
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer"></span>
    </el-dialog> -->
  </el-row>
</template>
<script>
import { ConfirmCandidateInformation, SingleUpload } from "api/myResume";
import { isWscnEmail, isMobile } from "@/utils/validate";
import { ConfirmMyInformation } from "api/candidate";
import { mapGetters } from "vuex";
export default {
  name: "UploadFiles",
  computed: {
    ...mapGetters(["dd_overseas_study", "user_info"])
  },
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error("请输入正确格式的手机号"));
      } else {
        callback();
      }
    };
    return {
      resumeStatus: "",
      uploadLoadingDialog: false,
      uploadOkDialog: false,
      ruleValidate: {
        Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        Mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateMobile }
        ],
        IsOverseaStudy: [
          { required: true, message: "请输入海外留学", trigger: "blur" }
        ]
      },
      resumeData: {
        IsOverseaStudy: 'StudyAbroad_01',
        Id: "",
        Message: "",
        Mobile: "",
        Name: ""
      },
      optionsOverseasStudy: [
        {
          value: 'StudyAbroad_01',
          label: '无'
        },
        {
          value: 'StudyAbroad_02',
          label: '有'
        },
      ]
    };
  },
  methods: {
    onSave(resumeForm) {
      // ConfirmMyInformation
      this.$refs[resumeForm].validate(valid => {
        if (valid) {
          ConfirmCandidateInformation({
            Name: this.resumeData.Name,
            Mobile: this.resumeData.Mobile,
            OverseasStudy: this.resumeData.IsOverseaStudy,
            ResumeCompanyId: this.resumeData.ResumeCompanyId
          }).then(res => {
            if (res.data.Success) {
              this.uploadOkDialog = false;
              this.$message({
                showClose: true,
                message: "保存成功",
                type: "success"
              });
              this.$Bus.$emit("getImportResumeList");
              

            } else {
              this.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    uploadFileMethod(param) {
      let fileObject = param.file;
      var FileExt = param.file.name.replace(/.+\./, "");
      if (
        ["doc", "docx", "html", "txt", "pdf"].indexOf(FileExt.toLowerCase()) ===
        -1
      ) {
        this.$message({
          type: "warning",
          message: "请上传后缀名为doc,docx,html,txt,pdf的附件！"
        });
        return false;
      }
      let size = fileObject.size;
      if (size / (1024 * 1024) > 5) {
        this.$message.error("文件大小不能超过5M");
        // =======
        //       if(fileObject.size > 5242880 ){  //大小限制 5M 单位字节
        //         this.$message({
        //           type: "warning",
        //           message: "上传文件size超过上限！"
        //         });
        //         return false;
        // >>>>>>> 93ce60e917b7581f09eb35faf164be170967c635
      }
      let formData = new FormData();
      formData.append("file", fileObject);
      this.uploadLoadingDialog = true;
      SingleUpload(formData).then(res => {
        if (res.data.Success) {
          this.$message({
            showClose: true,
            message: "上传成功",
            type: "success"
          });
          if (res.data.Data.ResultCode === 1) {
            this.resumeData = res.data.Data;

            this.resumeData = { ...this.resumeData, ...res.data.Data };
            this.resumeData.IsOverseaStudy = this.resumeData.IsOverseaStudy;
            this.resumeData.ResumeCompanyId = this.resumeData.Data;
            this.uploadOkDialog = true;
          } else {
            this.$message.error(res.data.Data.Message);
          }
        } else {
          this.$message.error(res.data.Message);
        }
        this.uploadLoadingDialog = false;
      });
    },
    onUploadResume() {
      this.uploadLoadingDialog = true;
      setTimeout(() => {
        this.uploadLoadingDialog = false;
        this.uploadOkDialog = true;
      }, 2000);
    },
    onRefreshResume() {}
  },
  mounted() {},
  created() {}
};
</script>
<style lang="scss">
.el-upload-list {
  display: none;
}

.el-dialog {
  &.upload_resume_ok {
    .el-dialog__body {
      padding: 0;
    }
    padding-left: 100px;
    width: 520px;
    height: 633px;
    .el-form-item {
      width: 320px;
    }
    .succeed_title {
      display: flex;
      align-items: center;
      margin-top: 36px;
      margin-bottom: 40px;
      img {
        width: 56px;
        height: 56px;
      }
      span {
        margin-left: 20px;
      }
    }
    .affirm_edit {
      margin-top: 14px;
      background: #44a8e1;
      padding: 0;
      width: 320px;
      height: 40px;
      /* color: red; */
      background: #44a8e1;
      border: 2px solid #44a9e1;
      margin-top: 20px;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.company_logo_upload {
  width: 80px;
  height: 30px;
  .el-col {
    &.file_format {
      color: rgba(136, 136, 136, 1);
    }
  }

  .el-dialog__body {
    padding-top: 0;
  }
  .upload_loading_dialog {
    text-align: center;
    margin-top: -15px;
    margin-bottom: 40px;
    .loading_svg_icon {
      font-size: 36px;
      color: #44a8e1;
      margin-bottom: 30px;

      -webkit-transform: rotate(360deg);
      animation: rotation 3s linear infinite;
      -moz-animation: rotation 3s linear infinite;
      -webkit-animation: rotation 3s linear infinite;
      -o-animation: rotation 3s linear infinite;
    }
  }
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
