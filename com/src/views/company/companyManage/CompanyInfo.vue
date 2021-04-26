<template>
  <div class="company-info">
    <el-row>
      <span style="font-size: 15px; color: #999; " v-if="!AduitState"
        >待完善信息提交后，平台将尽快进行审核哦～</span
      >
      <span style="font-size: 15px; color: #07AA17; " v-if="AduitState"
        >贵司已经通过企业资质审核啦~现在就开始来畅享"人才拼图"平台的体验吧—</span
      >
    </el-row>
    <div class="choice-type-layout">
      <el-form
        :model="formData"
        :rules="rulesFormLeft"
        ref="formData"
        :disabled="!editCompanyInfo"
      >
        <div class="input-row">
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">公司名称*</span>
            <el-form-item prop="CompanyName">
              <el-input
                v-model="formData.CompanyName"
                placeholder="请输入公司名称"
                class="form_input"
                maxlength="30"
              ></el-input>
            </el-form-item>
          </div>
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">所在城市*</span>
            <el-form-item prop="City">
              <el-cascader
                :options="city_item"
                :props="optionProps"
                v-model="formData.City"
                placeholder="请选择所在城市"
                :show-all-levels="false"
                filterable
                class="form_input"
              >
              </el-cascader>
            </el-form-item>
          </div>
        </div>

        <div class="input-row">
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">所属行业*</span>
            <el-form-item prop="Industry">
              <el-select
                v-model="formData.Industry"
                placeholder="请选择所属行业"
                class="form_input"
              >
                <el-option-group
                  v-for="industryItem in industry_item_list"
                  :key="industryItem.ItemName"
                  :label="industryItem.ItemName"
                >
                  <el-option
                    v-for="item in industryItem.Childs"
                    :key="item.ItemName"
                    :label="item.ItemName"
                    :value="item.ItemCode"
                  ></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </div>
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">公司性质*</span>
            <el-form-item prop="CompanyStockType">
              <el-select
                v-model="formData.CompanyStockType"
                placeholder="请选择公司性质"
                class="form_input"
              >
                <el-option
                  v-for="item in dd_company_stock"
                  :key="item.ItemCode"
                  :label="item.ItemName"
                  :value="item.ItemCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="input-row">
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">公司规模*</span>
            <el-form-item prop="CompanyScale">
              <el-select
                v-model="formData.CompanyScale"
                placeholder="请选择公司规模"
                class="form_input"
              >
                <el-option
                  v-for="item in dd_staff_size"
                  :key="item.ItemCode"
                  :label="item.ItemName"
                  :value="item.ItemCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">成立时间</span>
            <el-form-item prop="FoundedTime">
              <el-date-picker
                v-model="formData.FoundedTime"
                type="date"
                placeholder="选择时间"
                class="form_input"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </div>

        <div class="input-row">
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text"> 联系人*</span>
            <el-form-item prop="ContactPerson">
              <el-input
                v-model="formData.ContactPerson"
                placeholder="请输入联系人"
                class="form_input"
                maxlength="30"
              ></el-input>
            </el-form-item>
          </div>
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">联系人电话*</span>
            <el-form-item prop="Phone">
              <el-input
                v-model="formData.Phone"
                placeholder="请输入联系人电话"
                class="form_input"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input-row">
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">招聘负责人</span>
            <el-form-item prop="RecruitPerson">
              <el-input
                v-model="formData.RecruitPerson"
                placeholder="请输入招聘负责人"
                class="form_input"
                maxlength="30"
              ></el-input>
            </el-form-item>
          </div>
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">招聘负责人电话</span>
            <el-form-item prop="RecruitPersonTel">
              <el-input
                v-model="formData.RecruitPersonTel"
                placeholder="请输入招聘负责人电话"
                class="form_input"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input-row">
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">公司网址*</span>
            <el-form-item prop="WebUrl">
              <el-input
                v-model="formData.WebUrl"
                placeholder="请输入公司网址"
                class="form_input"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input-row">
          <div class="choice-tag-div input-rows">
            <span class="choice-type-layout-tag-text">公司介绍*</span>
            <el-form-item prop="Description">
              <el-input
                type="textarea"
                v-model="formData.Description"
                placeholder="请输入公司介绍"
                class="form_input"
                maxlength="500"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input-row">
          <div class="choice-tag-div company_logo">
            <span class="choice-type-layout-tag-text">公司logo</span>
            <el-form-item>
              <img
                :src="FilePath"
                alt=""
                class="file-img"
                @error="errorFilePaths"
              />
              <el-upload
                class="avatar-uploader"
                :action="fileUploadUrl"
                :show-file-list="false"
                :http-request="uploadFileMethod"
                :disabled="isUpload"
              >
                <div class="upload_but">
                  <el-button plain size="medium" type='button' :disabled="isUpload">{{
                    isUpload ? "审核中" : "添加文件"
                  }}</el-button>
                </div>
              </el-upload>
            </el-form-item>
            <button class="save-but w-btn" v-if="!isUpload" @click="submitUploadFile"
              >上传logo</button
            >
          </div>
        </div>
      </el-form>
    </div>

    <div class="submit-btn-layout but_list">
      <button
        class="w-btn btn-md-w btn-cancel"
        v-if="editCompanyInfo" type='button'
        @click="cancel() " 
      >
        取消
      </button>
      <button class="w-btn btn-md-w"  type='button' @click="submitCompanyInfo('formData')">
        {{ editCompanyInfo ? "保存" : "编辑" }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { deepCopyTwo } from "@/utils/index";
import {
  GetCompanyState,
  GetCompanyBasic,
  UpdateCompanyBasic,
  UploadCompanyLogo,
  GetCompanyLogo,
  GetCompanyLogoState
  // CompanyAttachmentUpload,
  // GetCompanyAttachment,
  // DelCompanyAttr,
  // GetCompanyTaxInfo,
  // UpdateCompanyTaxInfo,
  // EdtPassword,
  // GetUserInfoList,
  // AddChildUser,
  // UpdateChildUser,
  // RestUserPassWord,
  // DelUser,
  // ForbidUser,
  // TransferAdmin
} from "api/companyApi";
export default {
  name: "resume-preview", //公司信息
  computed: {
    ...mapGetters([
      "user_info",
      "industry_item_list",
      "dd_staff_size",
      "dd_company_stock",
      "city_item"
    ])
  },
  data() {
    return {
      file: "", // 上传的文件
      isUpload: false,
      fileUploadUrl: "",
      FilePath: "/static/img/company_icon.png",
      FilePaths:'/static/img/company_icon.png',
      errorFilePath: "/static/img/company_icon.png",
      msg: "",
      AduitState: false,
      editCompanyInfo: false,
      logoUrl:"",
      formData: {
        CompanyName: "",
        Industry: "",
        CompanyScale: "",
        ContactPerson: "",
        RecruitPerson: "",
        WebUrl: "",
        Description: "",
        City: "",
        CompanyStockType: "",
        FoundedTime: "",
        Phone: "",
        RecruitPersonTel: ""
      },
      optionProps: {
        value: "ItemCode",
        label: "ItemName",
        children: "Childs"
      },
      rulesFormLeft: {
        CompanyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        Industry: [
          {
            required: true,
            message: "请选择所属行业",
            trigger: "blur"
          }
        ],
        CompanyScale: [
          { required: true, message: "请选择公司规模", trigger: "blur" }
        ],
        ContactPerson: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        Description: [
          { required: true, message: "请输入公司简介", trigger: "blur" }
        ]
      }
    };
  },
 
  methods: {
    cancel(){
      this.editCompanyInfo = false;
      // this.FilePaths = this.FilePath;
      // this.file = '';
    },
    errorFilePaths(){
      return this.errorFilePath
    },
    // saveCompanylogo() {
    //   //保存公司logo
    //   this.submitUploadFile();
    // },
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
      
    },
    // 获取公司的状态
    getCompanyState() {
      var that = this;
      GetCompanyState({ CompangyId: this.user_info.CompanyId }).then(res => {
        if (res.data.Success) {
          that.AduitState = res.data.Data.AduitState;
          that.IsPerfect = res.data.Data.IsPerfect;
        }
      });
    },

    //获取公司信息
    getCompanyInfo() {
      GetCompanyBasic({ CompangyId: this.user_info.CompanyId }).then(res => {
        if (res.data.Success) {
          let data = res.data.Data;
          data.CompanyStockType = data.CompanyStockType.toString();
          this.formData = data;
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },
    submitUploadFile() {
      if (this.file == "") {
        this.$message.error("请添加文件");
        return;
      }
      // this.FilePath = this.FilePaths;
      // 这个地方是真正提交
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("companyId", this.user_info.CompanyId);
      formData.append("name", this.file.name);
      this.uploadLoadingDialog = true;
      UploadCompanyLogo(formData).then(res => {
        if (res.data.Code == 0) {
          this.$message({
            showClose: true,
            message: "上传成功",
            type: "success"
          });
          this.isUpload = true;
          this.uploadLoadingDialog = false;
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },

    // getImgUrl() {
    //   return require("http://localhost:62117/api/CompanyBasic/GetCompanyLogo");
    // },
    blobToBase64(bolb) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = e => {
          resolve(e.target.result);
        };
        fileReader.readAsDataURL(bolb);
        fileReader.onerror = () => {
          reject(new Error("文件流异常"));
        };
      });
    },
    getCompanyUrl() {
      GetCompanyLogo({ companyId: this.user_info.CompanyId }).then(res => {
        //
      });
    },
    //获取图片上传思绪
    GetCompanyLogoState() {
      GetCompanyLogoState().then(res => {
        console.info(res);
        this.FilePath = this.errorFilePath;
        if (res.data) {
          if (res.data.Data) {
            if (res.data.Data == "审核中") {
              this.isUpload = true;
            }
             if (res.data.Data == "审核成功") {
              this.FilePath = this.$GetCompnyImgUrl(this.user_info.CompanyId);
            }
          }
        }else{
          
        }
      });
    },
    submitCompanyInfo() {
      var that = this;
      if (!this.editCompanyInfo) {
        this.editCompanyInfo = !this.editCompanyInfo;
        return;
      }
      this.$refs["formData"].validate(valid => {
        if (valid) {
          let data = deepCopyTwo(that.formData);
          if (data.City.length > 0) {
            data.City = data.City[1];
          }
          UpdateCompanyBasic(data).then(res => {
            if (res.data.Success) {
              that.editCompanyInfo = false;
            } else {
              this.$message.error(res.data.Message);
            }
          });
        }
      });
    }
  },
  created() {
    this.getCompanyState();
    this.getCompanyInfo(); // 获取公司基本信息
    let timestamp = new Date().valueOf();
    this.getCompanyUrl();
    this.GetCompanyLogoState();
    // this.FilePath = `${process.env.BASE_COMPANY_API}/api/CompanyBasic/GetCompanyLogo?companyId=${this.user_info.CompanyId}&t=${timestamp}`;
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.company-info {
  width: 100%;
  margin-bottom: 10px;
  .choice-type-layout {
    margin-top: 15px;
    .input-row {
      display: flex;
      .choice-tag-div {
        position: relative;
        padding-left: 7em;
        padding-right: 25px;
        width: 50%;
        &.company_logo {
          margin-top: 10px;
          .el-upload{
            height: auto;
            position: auto;
            width: auto;
          }
          /deep/ .el-form-item{
            width: auto;
          }
          /deep/ .el-form-item__content {
            display: flex;
            .avatar-uploader {
              margin-left: 10px;
              margin-top: 20px;
              // overflow: auto;
              height: 40px;
            }
          }
          display: flex;
          .save-but{
            margin-top: 20px;
          }
        }
        .choice-type-layout-tag-text {
          position: absolute;
          left: 5px;
          top: 0;
          line-height: 34px;
          color: #999;
          width: 7em;
        }
        .el-form-item {
          margin-bottom: 20px;
          /deep/ .el-input__inner {
            height: 38px;
          }
          /deep/ .el-form-item__content {
            line-height: 38px;
            height: 38px;
            .file-img {
              @include wh(80px, 80px);
            }
          }
          width: 100%;
          /deep/ .el-cascader {
            width: 100%;
          }
          /deep/ .el-select {
            width: 100%;
          }
          /deep/ .el-date-editor {
            width: 100%;
          }
        }
        &.input-rows {
          height: 200px;
          width: 100%;
          /deep/ .el-textarea {
            height: 200px;
            .el-textarea__inner {
              height: 200px;
            }
          }
        }
      }
      .choice-tag-div + .choice-tag-div {
        padding-right: 0;
        padding-left: 8em;
      }
    }
    .input-rows {
      display: flex;
    }
  }
  .submit-btn-layout {
    margin-top: 40px;
    text-align: center;
    width: 100%;
  }
}
</style>
