<template>
  <div class="w-body c-bg experience-feedback">
    <div class="container">
      <div class="fd-fluid">
        <div class="fd-title">
          <h2>体验反馈</h2>
        </div>
        <div class="fd-intro">
          <p>尊敬的人才拼图用户</p>
          <p>
            请将您的意见、想法、建议或投诉内容告诉我们，以帮助我们为全体用户提供更佳优质的服务，
          </p>
          <p>我们将尽快回复您的反馈。</p>
        </div>
        <div class="fd-hr">
          <hr />
        </div>
        <div>
          <el-form
            :model="userInfo"
            ref="userInfo"
            label-position="top"
            :rules="rulesUserInfo"
            label-width="80px"
          >
            <div class="el-form-item-out">
              <el-form-item prop="Name">
                <el-input
                  v-model="userInfo.Name"
                  placeholder="姓名"
                  :maxlength="10"
                ></el-input>
              </el-form-item>
              <el-form-item prop="Mobile">
                <el-input
                  v-model="userInfo.Mobile"
                  @blur="mobileBlur"
                  placeholder="手机号"
                ></el-input>
              </el-form-item>
              <el-form-item prop="Email">
                <el-input
                  v-model="userInfo.Email"
                  placeholder="邮箱"
                ></el-input>
              </el-form-item>
            </div>
            <!-- <input type="text" id="name" name="name" placeholder="您的姓名" style="margin: 8px 0;">
            <input type="text" id="mobile" name="mobile" placeholder="手机号">
            <input type="text" id="email" name="email" placeholder="邮箱" style="margin:8px 0;"> -->
            <el-form-item prop="Suggest">
              <el-input
                type="textarea"
                v-model="userInfo.Suggest"
                :rows="3"
                placeholder="您的建议/意见"
              ></el-input>
            </el-form-item>
            <div class="upload-content">
              <div class="content-img">
                <ul class="content-img-list"></ul>
                <div class="pic_wall">
                  <ul class="flex">
                    <li v-for="(item, index) in fileList" :key="index">
                      <img :src="$apiImgUrl(item.url)" class="item-thumbnail" />
                      <a @click="handleRemove(item, fileList)">
                        <svg-icon
                          icon-class="cancel"
                          class="icon icon-svg-cancel"
                      /></a>
                      <!-- <img :src="$apiImgUrl(item.Picture)" @error="defImg()" /> -->
                    </li>
                  </ul>
                </div>
                <el-upload
                  action=""
                  :show-file-list="false"
                  :http-request="uploadFileMethod"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                >
                  <el-button class="white">上传图片</el-button>
                  <span slot="tip" class="el-upload__tip add-img-intr"
                    >在此添加您要说明问题的图片，支持gif/jpg/png格式</span
                  >
                </el-upload>
                <!-- <label type="button" class="file-button">
                  <span class="btn">上传图片</span>
                  <input type="file" name="fileupload" accept="image/*" id="uploadImg">
                  <span class="add-img-intr">在此添加您要说明问题的图片，支持gif/jpg/png格式</span>
                </label> -->
              </div>
            </div>
            <div class="btn-area">
              <el-button type @click="onCommit" class="w-btn">提交</el-button>
              <!-- <el-button type @click="onTest" class="w-btn">测试</el-button> -->
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog
      :visible="isShowDialog"
      width="360px"
      class="pop_up_dialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <div class="state-box">
        <div v-if="isReturnSuccess">
          <div class="spec">
            <span class="iconfont icon-check"></span>
            <div class="txt">您已成功提交反馈，感谢您的宝贵意见！</div>
          </div>
          <a
            @click="onSuccessClick"
            class="w-btn btn-fluid"
            data-dismiss="modal"
            >知道了</a
          >
        </div>
        <div v-if="!isReturnSuccess">
          <div class="spec">
            <span class="iconfont icon-info"></span>
            <div class="txt">提交失败，看看是什么问题呢？</div>
          </div>
          <a @click="onFailClick" class="w-btn btn-fluid" data-dismiss="modal"
            >返回检查</a
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//体验反馈
import { isWscnEmail, isMobile } from "@/utils/validate";
import { UploadPicture, AddSuggest } from "@/api/candidateSuggest"; //上传图片,提交意见 api
export default {
  props: {},
  components: {},
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error("请输入正确格式的手机号"));
      }
      if (this.mobileMsg) {
        callback(new Error(this.mobileMsg));
      } else {
        callback();
      }
    };
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
      isReturnSuccess: false, //体验反馈提交后成功或失败提示,true成功, false失败
      isShowDialog: false,
      userInfo: {
        Name: "",
        Mobile: "",
        Email: "",
        Suggest: "",
        Picture: [],
        Id: ""
      },
      //表单验证规则
      rulesUserInfo: {
        Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        Mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateMobile }
        ],
        Email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateEmail }
        ]
      },
      fileList: []
    };
  },
  methods: {
    mobileBlur() {
      this.mobileMsg = "";
    },
    //提示关闭事件,重置表单
    handleClose() {
      // this.$refs["userInfo"].resetFields();
      // this.fileList.length = 0;
      this.isShowDialog = false;
    },
    //提交
    onCommit() {
      let that = this;
      //insert图片数据
      that.fileList.forEach(element => {
        that.userInfo.Picture.unshift(element.url);
      });
      //debugger
      that.$refs["userInfo"].validate(valid => {
        if (valid) {
          AddSuggest(that.userInfo).then(res => {
            if (res.data.Success) {
              // this.$message({
              //   message: "保存成功",
              //   type: "success"
              // });
              //this.onSuccess();
              that.isReturnSuccess = true;
              that.isShowDialog = true;
              that.userInfo.Picture = [];
              that.fileList = [];
            } else {
              that.isReturnSuccess = false;
              this.isShowDialog = true;
              //this.onFail();
            }
          });
        } else {
          return false;
        }
      });
    },

    //提交回调
    // onSuccess() {
    //   this.isShowDialog = true;
    // },
    // onFail() {
    //   this.isShowDialog = true;
    // },
    //上传图片
    uploadFileMethod(param) {
      let that = this;
      let fileObject = param.file;
      // debuggers
      var FileExt = param.file.name.replace(/.+\./, ""); //
      if (["jpg", "gif", "png"].indexOf(FileExt.toLowerCase()) === -1) {
        this.$message({
          type: "warning",
          message: "请上传后缀名为gif,jpg,png 格式的图片！"
        });
        return false;
      }
      if (fileObject.size > 5242880) {
        //大小限制 5M 单位字节
        this.$message({
          type: "warning",
          message: "上传图片size超过上限！"
        });
        return false;
      }
      let formData = new FormData();
      formData.append("file", fileObject);
      //上传图片api
      UploadPicture(formData).then(res => {
        if (res.data.Success) {
          this.$message({
            showClose: true,
            message: "上传成功",
            type: "success"
          });
          //debugger
          that.fileList.push({ name: "", url: res.data.Data });
          //that.userInfo.Picture.push(res.data.Data);
          //console.log(that.fileList)
        } else {
          that.$message.error(res.data.Message);
        }
      });
    },

    handleRemove(file, fileList) {
      fileList.splice(
        fileList.findIndex(item => item.uid === file.uid),
        1
      );
      //console.log(file, fileList);
      //console.log(file)
    },
    //点击图片列表上的图片处理事件
    handlePreview(file) {
      console.log("Preview");
      console.log(file);
    },
    //文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //成功之后,点击知道了
    onSuccessClick() {
      this.$refs["userInfo"].resetFields();
      this.fileList.length = [];
      this.isShowDialog = false;
      this.$router.push({ path: "/CompanyHome" }).catch(err => {});
    },
    //点击返回检查
    onFailClick() {
      this.isShowDialog = false;
    },
    //保存alter对话框测试
    onTest() {
      this.isShowDialog = true;
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {}
};
</script>
<style lang="scss">
.experience-feedback {
  .el-form-item-out {
    display: -webkit-flex;
    flex-direction: row;
    .el-form-item {
      width: 30%;
      margin-left: 10px;
      // margin-bottom: 10px;
      .el-form-item__error {
        margin-top: 0;
      }
    }
    .el-form-item:first-child {
      margin-left: 0;
    }
  }

  .el-input__inner {
    height: 48px;
    line-height: 48px;
    margin: 8px 0;
    padding: 12px 20px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-textarea{
    height: 250px;
  }
  .el-textarea__inner {
    width: 100%;
    height: 250px;
    padding: 12px 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    background-color: #f2f2f2;
    font-size: 15px;
    resize: none;
  }

  .el-button.white.el-button--default {
    position: relative;
    display: inline-table;
    width: 90px;
    overflow: hidden;
    text-align: center;
    vertical-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    padding: 0;
    line-height: 35px;
  }

  .el-dialog {
    margin: 0 !important;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 25px 35px 35px;
    }
  }
}
</style>
<style scoped lang="scss">
.experience-feedback {
  .container {
    width: $con-w;
    position: relative;
    margin: 0 auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 30px;
  }

  .fd-fluid {
    background-color: #fff;
    padding: 35px 55px 30px;
    -webkit-box-shadow: 0 10px 15px rgba(6, 6, 6, 0.06);
    box-shadow: 0 10px 15px rgba(6, 6, 6, 0.06);
  }
  .fd-title::before {
    content: "";
    width: 5px;
    height: 20px;
    position: absolute;
    top: 20px;
    left: 0;
    background: #80b4ee;
  }
  .fd-title {
    position: relative;
    padding: 20px;
  }
  .fd-title h2 {
    font-size: 20px;
    line-height: 1;
  }
  .fd-intro {
    font-size: 15px;
    line-height: 2;
    padding-bottom: 25px;
  }
  .fd-hr hr {
    border: 3px solid #f2f2f2;
  }
  hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 0;
    border-top: 1px solid #e5e5e5;
  }

  //上传图片右侧文字提示
  .fd-fluid span.add-img-intr {
    position: relative;
    display: inline;
    overflow: hidden;
    width: 200px;
    font-size: 15px;
    color: #b6b6b6;
    margin: auto 0 auto 15px;
  }

  .w-btn {
    display: inline-block;
    width: 150px;
    height: 42px;
    line-height: 42px;
    padding: 0 18px;
    background-color: #428dde;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    font-size: 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: background 0.5s ease;
    transition: background 0.5s ease;
  }
  //上传图片样式
  .pic_wall {
    margin-bottom: 20px;
    .item-thumbnail {
      vertical-align: middle;
      display: inline-block;
      width: 100px;
      height: 100px;
      position: relative;
      margin-right: 10px;
    }

    li {
      overflow: hidden;
      z-index: 0;
      position: relative;
      display: list-item;
      .icon {
        &.icon-svg-cancel {
          position: absolute;
          right: 14px;
          top: 6px;
          // font-size: 18px;
          color: #333;
        }
      }
    }
  }
  //提交反馈弹窗alter所涉及的CSS
  //垂直翻转
  // .icon {
  //   display: inline-block;
  //   -moz-transform: scaleY(-1);
  //   -webkit-transform: scaleY(-1);
  //   -o-transform: scaleY(-1);
  //   transform: scaleY(-1);
  // }
  .state-box {
    .spec {
      text-align: center;
      // .icon {
      //   display: inline-block;
      //   line-height: 1;
      //   height: 1.2em; //调整,否则iconf 底部被遮挡
      //   // margin-top: 20px;
      // }
      .iconfont {
        display: inline-block;
        line-height: 1;
        margin-top: 20px;
        &.icon-info {
          font-size: 70px;
          color: #ddd;
        }
        &.icon-check {
          font-size: 70px;
          color: #99c3f1;
        }
      }
      .txt {
        margin-top: 15px;
        margin-bottom: 25px;
        font-size: 16px;
        font-weight: bold;
        line-height: 24px;
        color: #333;
      }
      // .icon {
      //   &.icon-svg-check {
      //     font-size: 70px;
      //     color: #99c3f1;
      //   }
      //   &.icon-svg-info {
      //     font-size: 50px;
      //     color: #ddd;
      //   }
      // }
    }
    .btn-fluid {
      width: 100%;
    }
  }
  .btn-area {
    margin-top: 20px;
  }
}
// .state-box .spec .txt {
//   margin-top: 15px;
//   margin-bottom: 25px;
//   font-size: 16px;
//   font-weight: bold;
//   line-height: 24px;
//   color: #333;
// }
//返回检查btn
</style>
