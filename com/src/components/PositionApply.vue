<template>
  <el-row class="position_apply">
    <!-- 未登录 -->
    <el-dialog
      :visible.sync="loginDialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :show-close="true"
      custom-class="login_dialog"
      center
    >
      <login-form  @isShow="onIsShow" @close="loginDialog=false"></login-form>
    </el-dialog>

    <!-- 没有简历-->
    <el-dialog
      :visible.sync="nullResumeDialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      custom-class="null_resume"
      center
    >
      <el-row>
        <el-col :span="24" class="title"
          ><span class="title_font_mix16"
            >您还没有简历资料可以投递哦</span
          ></el-col
        >
        <el-col :span="24"
          ><el-button type="" class="ok" @click="onSkipResume"
            >立即完善您的简历资料</el-button
          ></el-col
        >
        <el-col :span="24"
          ><el-button
            type=""
            class="but_cancel"
            @click="nullResumeDialog = false"
            >取消</el-button
          ></el-col
        >
      </el-row>
    </el-dialog>

    <!-- 简历投递成功-->
    <el-dialog
      :visible.sync="deliverSucceedDialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      custom-class="deliver_succeed"
      center
    >
      <el-row>
        <el-col :span="24" class="title"
          ><span class="title_font_mix16">您已成功投递该职位</span></el-col
        >
        <el-col :span="24"><img src="~static/img/deliver_succeed.png"/></el-col>

        <el-col :span="24"
          ><span class="skip_title">3秒后自动关闭</span></el-col
        >
      </el-row>
    </el-dialog>

    <win-service-agreement ref="serviceAgreement" ></win-service-agreement>
  </el-row>
</template>
<script>
import LoginForm from "components/LoginForm";
import { Delivery } from "api/candidate";
import { mapGetters } from "vuex";
import WinServiceAgreement from "components/PopUP/ServiceAgreement";
import { AddCollection } from "api/candidate";
export default {
  name: "PositionApply", //职位申请按键
  components: {        
    LoginForm    ,
    WinServiceAgreement    
  },    
  computed: {
    ...mapGetters(["token", "resume_status"])
  },
  data() {
    return {
      loginDialog: false, // 登录弹出状态true
      nullResumeDialog: false, // 没有简历信息
      deliverSucceedDialog: false //投递成功
    };
  },

  methods: {

    AddCollect(id){
      let that = this;
      //判断是否登录
      if (!this.token) {
        this.loginDialog = true;
      }
      //再去收藏
      else {
        AddCollection({ PositionId: id }).then(res => {
        if (res.data.Success) {
          this.$message({
            message: "收藏成功",
            type: "success"
          });
        } else {
          this.$message.error(res.data.Message);
        }
      });
      }
    },
    onIsShow(){
        this.$refs.serviceAgreement.isShow();
    },
    setPositionApply(id) {
      let that = this;
      //判断是否登录
      if (!this.token) {
        this.loginDialog = true;
      }

      //判断是否有简历
      else if (this.resume_status == 2) {
        this.nullResumeDialog = true;
      }

      //再去提交申请职位
      else {
        Delivery({ PositionId: id }).then(res => {
          if (res.data.Success) {
            that.deliverSucceedDialog = true;
            setTimeout(()=>{
              this.deliverSucceedDialog = false;
            },3000)
          } else {
            this.$message.error({ message: res.data.Message, duration: 2000 });
          }
        });
      }
    },
    
    onSkipResume() {
      this.$router.push({ path: "/resume" }).catch(err => {});
    },
    onRefreshResume() {}
  },
  mounted() {
    // this.$store.dispatch("setCheckResume", true);
  },
  created() {}
};
</script>
<style lang="scss">
.el-dialog {
  &.login_dialog {
    height: 336px;
    width: 336px;
    overflow: hidden;
    .el-dialog__body {
      padding: 0;
    }
  }
  &.null_resume {
    width: 400px;
    height: 269px;
    .el-dialog__body {
      // display: -webkit-flex;
      padding: 0 60px;
      .el-col {
        text-align: center;
        &.title {
          margin-top: 42px;
        }
        .el-button {
          &.ok {
            margin-top: 36px;
            height: 48px;
            width: 280px;
            background: #44a8e1;
            font-weight: bold;
            color: #fff;
          }

          &.but_cancel {
            border: 0;
            margin-top: 24px;
            padding: 0;
          }
        }
      }
    }
  }
  &.deliver_succeed {
    width: 400px;
    height: 259px;
    .el-dialog__body {
      // display: -webkit-flex;
      padding: 0 60px;
      .el-col {
        text-align: center;
        &.title {
          margin-top: 22px;
        }
        img {
          margin-top: 26px;
          margin-bottom: 26px;
          width: 56px;
          width: 56px;
        }
        &.skip_title {
          color: #888888;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.position_apply {
  width: 80px;
  // height: 30px;
  margin-left: 10px;
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
