<template>
  <div class="experience_feedback">
    <el-dialog :visible.sync="isShowDialog" width="620px" class="pop_up_dialog" :modal-append-to-body="false"
               :close-on-click-modal="false" @close="handleClose">
      <div ref="tab_form" v-show="tab">
        <div class="top_div flex">
          尊敬的人才拼图用户，请将您的意见、想法、建议或投诉内容告诉我们，以帮助我们 全体用户提供更加优质的服务，我们将尽快回复您的反馈。
        </div>
        <div class="main_div">
          <div class="blue_title">您的联系方式</div>
          <div class="user_info">
            <el-form :model="userInfo" ref="userInfo" label-position="top" :rules="rulesUserInfo" label-width="80px">
              <el-form-item label="姓名" prop="Name">
                <el-input v-model="userInfo.Name"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="Mobile">
                <el-input v-model="userInfo.Mobile" @blur="mobileBlur"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="Email">
                <el-input v-model="userInfo.Email"></el-input>
              </el-form-item>
              <el-form-item label="您的意见" prop="Suggest">
                <el-input type="textarea" v-model="userInfo.Suggest" :rows="3"></el-input>
              </el-form-item>
            </el-form>
            <div class="pic_wall">
              <ul class="flex">
                <li v-for="(item, index) in fileList" :key="index">
                  <img :src="$apiImgUrl(item.url)" class="item-thumbnail" />
                  <a @click="handleRemove(item,fileList)">
                    <svg-icon icon-class="cancel" class="icon icon-svg-cancel" /></a>
                  <!-- <img :src="$apiImgUrl(item.Picture)" @error="defImg()" /> -->
                </li>
              </ul>
            </div>
            <el-upload action="" :show-file-list="false" :http-request="uploadFileMethod" :on-preview="handlePreview"
                       :on-remove="handleRemove" :file-list="fileList" :before-remove="beforeRemove" multiple :limit="3"
                       :on-exceed="handleExceed">
              <el-button class="buton-style upload" size="medium" type="primary">上传图片</el-button>
              <div slot="tip" class="el-upload__tip upload-msg">在此添加您要说明问题的图片，支持gif/jpg/png格式</div>
            </el-upload>
            <div class="btnarea flex">
              <el-button type @click="onCommit" class="blue_btn">提交</el-button>
            </div>
          </div>
        </div>
      </div>
      <div ref="tab_return" class="tab_return" v-show="!tab">
        <div :class="[isReturnSuccess ? 'success_tip' : 'fail_tip']">
        </div>
        <div v-show="isReturnSuccess">
          <div class="retrun_msg">
            <p>您已成功提交反馈，感谢您的宝贵建议</p>
          </div>
          <!-- <div class="btnarea flex">
            <el-button type @click="onClick" class="blue_btn">知道了</el-button>
          </div> -->
          <span slot="footer" class="dialog-footer">
            <div class="btnarea flex">
              <el-button type="primary" @click="isShowDialog = false" class="blue_btn">知道了</el-button>
            </div>
          </span>
        </div>
        <div v-show="!isReturnSuccess">
          <div class="retrun_msg">
            <p>提交失败~检查看看是因为什么问题呢</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <div class="btnarea flex">
              <el-button type="primary" @click="isShowDialog = false" class="blue_btn">返回上级页面</el-button>
            </div>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { isWscnEmail, isMobile } from "@/utils/validate";
import { UploadPicture, AddSuggest } from "@/api/candidateSuggest"; //上传图片,提交意见 api
export default {
  name: "ExperienceFeedback",
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
      tab: true, //体验反馈提交后界面切换
      isReturnSuccess: true, //体验反馈提交后成功或失败提示,true成功, false失败
      isShowDialog: false,
      userInfo: {
        Name: "",
        Email: "",
        Mobile: "",
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
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ] //上传图片的文明列表
    };
  },
  methods: {
    isShow() {
      this.isShowDialog = true;
    },
    //对话框关闭事件,重置表单
    handleClose() {
      this.tab = true;
      //that.$reset("userInfo");
      this.$refs["userInfo"].resetFields();
      this.fileList.length = 0;
    },
    //提交
    onCommit() {
      let that = this;
      //insert图片数据
      that.fileList.forEach(element => {
        that.userInfo.Picture.unshift(element.url);
      });
      //debugger
      this.$refs["userInfo"].validate(valid => {
        if (valid) {
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
      if(fileObject.size > 5242880 ){  //大小限制 5M 单位字节
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
    mobileBlur() {
      this.mobileMsg = "";
    }
  } /* end. methods*/,

  computed: {},
  created() {},
  mounted() {},
  watch: {}
};
</script>

<style lang="scss" >
//重置input textarea 颜色
.experience_feedback {
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
      width: 100px;
      height: 32px;
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(68, 169, 225, 1);
      border-radius: 4px;
      font-size: 14px;
      padding:0;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(68, 169, 225, 1);
    }
  }
  &.blue_btn {
    font-size: 16px;
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
ul {
  padding: 0;
}
ul li {
  list-style: none;
}
</style>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";
.flex {
  display: -webkit-flex;
  display: flex;
}
.experience_feedback {
  .top_div {
    height: 80px;
    width: 560px;
    background: rgba(234, 247, 248, 1);
    text-align: center;
    justify-content: center;
    align-items: center;
    align-content: center;
    line-height: 30px;
    color: #333;
    padding: 17px 18px 21px;
  }
  .main_div {
    margin-top: 40px;
  }
  .blue_title {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(68, 168, 225, 1);
    line-height: 36px;
  }
  .user_info {
    padding: 10px 70px;
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

  .out_btn {
    @include wh(172px, 42px);
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
}
</style>
