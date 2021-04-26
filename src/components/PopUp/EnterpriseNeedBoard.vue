<template>
  <div class="enterprise_needboard">
    <el-dialog :visible.sync="isShowDialog" width="925px" class="pop_up_dialog" :modal-append-to-body="false"
               :close-on-click-modal="false" @close="handleClose">
      <div ref="tab_form" v-show="tab">
        <div class="top_title flex">
          企业招聘需求快速登记
        </div>
        <div class="top_div">
          <p>中智人才顾问公司是中智公司旗下从事中高端猎头、招聘及招聘流程外包和猎聘解决方案的专业服务公司。 </p>
          <p>如您有任何招聘需求，请填写以下信息，填写完成后我们将尽快与您联系。</p>
          <p>也可通过以下方式与我们取得联系。</p>
          <div class="blue">
            <p>联系人：Shirley</p>&nbsp;&nbsp;
            <p>电话：021-54594545-6325</p>&nbsp;&nbsp;
            <p>邮件：shirleyxy@ciicsh.com</p>
          </div>
        </div>
        <div class="main_div">
          <div class="need_info">
            <el-form :model="userInfo" ref="userInfo" label-position="top" :rules="rulesUserInfo" label-width="80px">
              <el-form-item label="企业名" prop="Name">
                <el-input v-model="userInfo.Name"></el-input>
              </el-form-item>
              <el-form-item label="企业简介" prop="Remark">
                <el-input type="textarea" v-model="userInfo.Remark" :rows="3"></el-input>
              </el-form-item>
              <el-form-item label="联系人" prop="Contact">
                <el-input v-model="userInfo.Contact"></el-input>
              </el-form-item>
              <el-form-item label="联系人手机">
                <el-input v-model="userInfo.Mobile"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="Email">
                <el-input v-model="userInfo.Email"></el-input>
              </el-form-item>
              <el-form-item label="职位描述" prop="Describ">
                <el-input type="textarea" v-model="userInfo.Describ" :rows="3"></el-input>
              </el-form-item>
            </el-form>
            <div>
              <el-upload action="" :http-request="uploadFileMethod" :on-preview="handlePreview"
                         :on-remove="handleRemove" :file-list="fileList" :before-remove="beforeRemove" multiple
                         :limit="3" :on-exceed="handleExceed">
                <el-button class="buton-style upload" size="medium" type="primary">上传职位信息</el-button>
                <div slot="tip" class="el-upload__tip upload-msg">您也可在此上传您的职位JD，支持Word、PDF、 图片等格式，文件大小不超过20M</div>
              </el-upload>
              <div class="btnarea flex">
                <el-button type @click="onCommit" class="blue_btn">提交</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { isWscnEmail } from "@/utils/validate";
import { UploadPicture, AddSuggest } from "@/api/candidateSuggest"; //api
export default {
  name: "EnterpriseNeedBoard",
  props: {},
  components: {},
  data() {
    const validateEmail = (rule, value, callback) => {
      if (value) {
        if (!isWscnEmail(value)) {
          callback(new Error("请输入正确格式的邮箱地址"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    return {
      tab: true, //体验反馈提交后界面切换
      isReturnSuccess: true, //体验反馈提交后成功或失败提示,true成功, false失败
      isShowDialog: false,
      //TODO 企业快速需求
      userInfo: {
        Name: "", //企业名
        Email: "", //企业简介
        Mobile: "", //联系人
        Suggest: "",//联系人手机
        Picture: [],//邮箱
        Id: ""      //职位描述
      },
      //表单验证规则
      rulesUserInfo: {
        Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        Email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateEmail }
        ]
      },
      fileList: [] //上传的附件文件
    };
  },
  methods: {
    isShow() {
      this.isShowDialog = true;
    },
    handleClose() {
      let that = this;
      that.tab = true;
      that.$reset("userInfo");
    },
    //提交
    onCommit() {
      //this.userInfo.Picture = [...this.fileList];
      let that = this;
      //TODO
      that.fileList.forEach(element => {
        that.userInfo.Xxx.unshift(element.url);
      });
      this.$refs["userInfo"].validate(valid => {
        if (valid) {
          //TODO 调整为企业招聘需求快速登记api
          AddSuggest(this.userInfo).then(res => {
            if (res.data.Success) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.onSuccess();
            } else {
              this.onFail();
            }
          });
        } else {
          return false;
        }
      });
    },
    //提交回调
    onSuccess() {
      this.tab = false;
      this.isReturnSuccess = true;
    },
    onFail() {
      this.tab = false;
      isReturnSuccess = false;
    },
    //反馈界面-知道了

    //企业招聘需求快速登记-上传
    uploadFileMethod(param) {
      let that = this;
      let fileObject = param.file;
      /*上传文件类型判断*/
      var FileExt = param.file.name.replace(/.+\./, "");
      if (
        ["doc", "docx", "html", "txt", "pdf", "jpg", "bmp", "png"].indexOf(
          FileExt.toLowerCase()
        ) === -1
      ) {
        this.$message({
          type: "warning",
          message: "请上传后缀名为doc,docx,html,txt,pdf的附件！"
        });
        return false;
      }
      let size = fileObject.size;
      if (size / (1024 * 1024) > 20) {
        this.$message.error("文件大小不能超过20M");
      }
      let formData = new FormData();
      formData.append("file", fileObject);
      //TODO,换接口
      UploadPicture(formData).then(res => {
        if (res.data.Success) {
          this.$message({
            showClose: true,
            message: "上传成功。",
            type: "success"
          });
          that.fileList.Picture.push({ name: "", url: res.data.Data });
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },

    handleRemove(file, fileList) {
      fileList.splice(
        fileList.findIndex(item => item.uid === file.uid),
        1
      );
    },
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {}
};
</script>

<style lang="scss" >
//重置input textarea 颜色
.enterprise_needboard {
  .el-input__inner,
  .el-textarea__inner {
    width: 100%;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
    border-radius: 0;
    /*outline: medium;*/
  }
  .el-form-item__label {
    padding: 0;
    font-size: 14px;
    color: #888;
    font-weight: 400;
  }
}
.el-button {
  &.buton-style {
    &.upload {
      width: 120px;
      height: 32px;
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(68, 169, 225, 1);
      border-radius: 4px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(68, 169, 225, 1);
    }
  }
  &.blue_btn {
    font-size: 14px;
    width: 172px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    color: #fff;
    background: #44a8e1;
  }
}
</style>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";
.flex {
  display: -webkit-flex;
  display: flex;
}
.enterprise_needboard {
  .top_title {
    font-size: 30px;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    align-content: center;
    color: rgba(68, 168, 225, 1);
  }
  .top_div {
    height: 80px;
    // background: rgba(234, 247, 248, 1);
    text-align: center;
    justify-content: center;
    align-items: center;
    align-content: center;
    line-height: 30px;
    color: #333;
    padding: 17px 18px 21px;
    .blue {
      margin-top: 19px;
      margin: 0 auto;
      width: 612px;
      background: #d6f0fe;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      p {
        display: inline;
      }
    }
  }
  .main_div {
    margin-top: 80px;
  }
  // .blue_title {
  //   font-size: 16px;
  //   font-family: Microsoft YaHei;
  //   font-weight: bold;
  //   color: rgba(68, 168, 225, 1);
  //   line-height: 36px;
  // }
  .need_info {
    padding: 10px 200px;
    .btnarea {
      margin-top: 35px;
      justify-content: center;
    }
  }
  .upload-msg {
    margin-top: 24px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(136, 136, 136, 1);
  }

  .tab_return {
    height: 420px;
    .retrun_msg {
      text-align: center;
      margin-top: 50px;
      p {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }
    .btnarea {
      justify-content: center;
      margin-top: 56px;
    }
  }
  .success_tip {
    margin-top: 100px;
    height: 56px;
    background-image: url("/static/img/deliver_succeed.png");
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
  .fail_tip {
    margin-top: 100px;
    height: 56px;
    background-image: url("/static/img/fail.png");
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
}
</style>
