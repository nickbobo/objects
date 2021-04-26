<template>
  <div class="materials">
    <div class="materials-title">
      <div class="title">企业资质材料</div>
      <div class="title-content">
        上传企业工商管理登记证，待平台审核通过后，即可在平台公布发布职位进行招聘哦
      </div>
    </div>
    <div class="upload-layout" :class="{ left: isUpload }">
      <!-- 文件预览删除 -->
      <div class="file-review-layout" v-if="isUpload" @click="downloadFile()">
        <span
          class="iconfont icon-close_fill"
          @click="deleteUploadFile()"
        ></span>
        <img :src="FilePath" alt="" class="file-img" />
      </div>
      <!-- 上传按钮 -->
      <el-upload
        class="avatar-uploader"
        :action="fileUploadUrl"
        :show-file-list="false"
        :http-request="uploadFileMethod"
      >
        <div class="upload_but">
          <el-button  plain size="medium">{{
            isUpload ? "重新上传" : "添加文件"
          }}</el-button>
        </div>
      </el-upload>
      <div class="upload-hint">
        支持word\pdf\jpg\png等, 文件不超过5M
      </div>
    </div>
    <div class="submit-btn-layout-2">
      <button type='button' class="w-btn btn-md-w btn-cancel" v-if="isUpload">
        取消
      </button>
      <button
        style="margin-left: 20px"
        class="w-btn btn-md-w" type='button'
        @click="submitUploadFile()"
        v-if="isUpload"
      >
        提交
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GetCompanyAttachment, CompanyAttachmentUpload } from "api/companyApi";
// import { updatePassword } from "../api/api";
export default {
  name: "resume-preview", //简历预览
  computed: {
    ...mapGetters(["user_info"])
  },
  data() {
    return {
      msg: "",
      isUpload: false,
      fileUploadUrl: "",
      FilePath: "/static/img/upload-img.jpg",
      file: "", // 上传的文件
      fileId: "", // 已上传文件的id
      fileName: "" // 已上传文件名
    };
  },
  methods: {
    // 证明材料的相关方法
    // 获取已上传文件列表
    getUpLoadFile() {
      var that = this;
      GetCompanyAttachment().then(res => {
        if (res.data.Success && res.data.Data) {
          that.isUpload = true;
          that.fileId = res.data.Data.Id;
          this.FilePath = this.$apiGetFile(that.fileId);
          that.fileName = res.data.Data.FileName;
        }
      });
    },

    uploadFileMethod(param) {
      let fileObject = param.file;
      var FileExt = param.file.name.replace(/.+\./, "");
      // console.log(FileExt);
      if (
        ["doc", "docx", "png", "jpeg", "jpg", "pdf"].indexOf(
          FileExt.toLowerCase()
        ) === -1
      ) {
        this.$message({
          type: "warning",
          message: "请上传后缀名为doc,docx,png,jpg,pdf的附件！"
        });
        return false;
      }
      this.isUpload = true;
      let size = fileObject.size;
      if (size / (1024 * 1024) > 5) {
        this.$message.error("文件大小不能超过5M");
      }

      this.file = fileObject;
      this.$message({
        showClose: true,
        message: "已添加文件，点击提交按钮进行提交",
        type: "success"
      });
      const reader = new FileReader();
      // readAsDataURL：读取为base64格式
      reader.readAsDataURL(fileObject);
      // onload 在文件读取成功时触发
      reader.onload = () => {
        const ImgBase64 = reader.result;
        // 实现预览，实际是拿到图片的base64数据去挂在到图片的src上
        this.FilePath = ImgBase64;
      };
      //  this.FilePath = URL.createObjectURL(fileObject.raw);
      //this.submitUploadFile();
    },
    // 删除已上传文件
    deleteUploadFile() {
      event.stopPropagation();
      var that = this;
      that
        .$confirm("确认删除上传的文件？")
        .then(_ => {
          //done();
          that.isUpload = false;
          if (that.fileId && that.fileId != "") {
            DelCompanyAttr({ Id: that.fileId }).then(res => {
              that.isUpload = false;
            });
          }
        })
        .catch(error => {
          //   console.log(error);
        });
    },

    submitUploadFile() {
      if (this.file == "") {
        this.$message.error("请添加文件");
        return;
      }
      // 这个地方是真正提交
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("companyId", this.user_info.CompanyId);
      formData.append("name", this.file.name);
      this.uploadLoadingDialog = true;
      CompanyAttachmentUpload(formData).then(res => {
        if (res.data.Code == 0) {
          this.$message({
            showClose: true,
            message: "上传成功",
            type: "success"
          });
          this.isUpload = true;
          this.uploadLoadingDialog = false;
          this.getUpLoadFile();
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },

    // 下载文件
    downloadFile() {
      var that = this;
      if (that.fileId == "") {
        return;
      }
      var url =
        process.env.BASE_COMPANY_API +
        "/api/Common/GetFile?file=" +
        that.fileId +
        "&GroupId=" +
        process.env.GroupId;
      window.open(url);
    }
  },
  created() {},
  mounted() {
    this.getUpLoadFile(); // 获取上传文件的信息
  }
};
</script>

<style lang="scss" scoped>
.materials {
  .materials-title {
    .title {
      font-size: 15px;
      font-weight: bold;
      color: #333;
      line-height: 1.4;
    }
    .title-content {
      font-size: 15px;
      color: #999;
      margin-bottom: 30px;
      padding-top: 10px;
    }
  }
  .file-img {
    @include wh(80px, 80px);
  }
  .upload-hint {
    font-size: 15px;
    color: #999;
    margin-bottom: 30px;
    padding-top: 10px;
    margin-top: 15px;
  }
  .el-upload {
    margin-left: 100px;
  }
  .upload-layout {
    position: relative;
    .file-review-layout {
      position: absolute;
      left: 0;
      .icon-close_fill {
        position: absolute;
        right: -8px;
        top: -8px;
      }
    }
    &.left {
      padding-left: 100px;
    }
  }
}
</style>
