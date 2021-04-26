<template>
  <navbar>
    <!-- <div class="header-cont"> -->
    <div class="header-content">
      <div class="logo-icon" @click="goHome"></div>
      <div class="navbar">
        <ul v-if="isShow">
          <li
            v-for="(item, index) in menuList"
            :key="index"
            @click="onPageJumps(item)"
            :class="{
              active: item.path == getFatherPath($route.path),
              one: index == 0
            }"
            v-show="!item.hidden"
          >
            {{ item.name }} {{ item.hidden }}
          </li>
        </ul>
      </div>
      <div class="header-right">
        <!-- <el-popover
          placement="top-end"
          width="90"
          trigger="hover"
          v-if="roles.includes('personage')"
        >
          <el-row class="info_popover">
            <el-col :span="24" @click.native="onClickUserInfo">个人中心</el-col>
            <el-col :span="24" @click.native="onLogOut">退出登录</el-col>
          </el-row>
          <div class="user-head-img" slot="reference">
            <img :src="my_portrait_url" @error="defHeadImg()" />
          </div>
        </el-popover> -->

        <el-popover
          placement="left-start"
          width="90"
          min-width="90"
          trigger="hover"
          popper-class="headers-popover"
          v-if="
            roles.includes('company') ||
              user_info.UserType == 2 ||
              user_info.UserType == 3
          "
        >
          <el-row class="info_popover">
            <el-col :span="24" @click.native="onAccountInfo">账户信息</el-col>
            <el-col :span="24" @click.native="onEditPwd">修改密码</el-col>
            <el-col :span="24" @click.native="onLogOuts">退出登录</el-col>
          </el-row>
          <div class="photo i-admin" slot="reference">
            <!-- @error="defImg()" -->
            <!-- <img :src="my_portrait_url" @error="defHeadImg()" /> -->
          </div>
        </el-popover>
        <!-- <div
          class="recruiters"
          v-if="roles.includes('caller')"
          @click="onClickCompany"
        >
          我是招聘方
        </div> -->
        <div
          class="recruiters"
          v-if="!roles.includes('company')"
          @click="onClickCandidate"
        >
          我是求职方
        </div>
      </div>
    </div>

    <account-info ref="accountInfo"></account-info>
    <edit-pwd ref="editPwd"></edit-pwd>
    <!-- </div> -->
  </navbar>
</template>

<script>
import { mapGetters } from "vuex";
import navbar from "components/Navbar";
import { SendMessage, GetHomeUrl } from "api/api";
import AccountInfo from "views/components/AccountInfo";
import EditPwd from "views/components/EditPwd";
export default {
  name: "headers",

  computed: {
    ...mapGetters([
      "user_info",
      "siderbar_routers",
      "token",
      "def_user_header",
      "roles",
      "my_portrait_url"
    ])
  },
  components: {
    navbar,
    AccountInfo,
    EditPwd
  },
  data() {
    return {
      msg: "",
      isShow: false,
      currentAddress: "",
      visible: false,
      menuList: [],
      ruleForm: {
        newPass: "",
        checkPass: "",
        oldPass: ""
      }
    };
  },

  methods: {
    GetHomeUrl() {
      GetHomeUrl({}).then(res => {
        if (res.data.Success) {
          window.open(res.data.Data, "_blank");
        } else {
        }
      });
    },
    goHome() {
      let path = "/CompanyLogin";
      if (this.user_info) {
        path = "/CompanyHome";
      }
      this.$router.push({ path: path }).catch(err => {});
    },
    getFatherPath(item) {
      return "/" + item.split("/")[1];
    },
    onAccountInfo() {
      this.$refs.accountInfo.isShowAccountInfo = true;
    },
    onEditPwd() {
      this.$refs.editPwd.isShowDialog = true;
    },
    defImg() {
      let img = event.srcElement;
      img.src = this.def_user_header;
      img.onerror = null; //防止闪图
    },
    onPageJumps(item) {
      if (this.$route.path != item.path)
        this.$router.push({
          path: `${item.path}`
        });
    },
    onClickUserInfo() {
      this.$router
        .push({
          path: "/PersonalCenter"
        })
        .catch(err => {});
    },
    onLogOut(e) {
      e.preventDefault();
      this.$store
        .dispatch("LogOut")
        .then(() => {
          this.$router.push({ path: "/home" });
          this.$router.go(0);
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    onLogOuts(e) {
      this.isShow = false;
      e.preventDefault();
      this.$store
        .dispatch("LogOut", true)
        .then(() => {
          if (this.user_info.UserType == 4) {
            this.$router.push({ path: "/CustomerLogin" });
          } else {
            this.$router.push({ path: "/CompanyLogin" });
          }
          this.$router.go(0);
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    onClickCompany() {
      // this.$store.dispatch("getCompanyLogin");
      this.$router.push({ path: "/CompanyLogin" });
      
    },
    onClickCandidate() {
      this.GetHomeUrl();
      
      // https://www.rencaipintu.com
      // this.$store
      //   .dispatch("GetInfo")
      //   .then(() => {
      //     this.$router.push({ path: "/home" });
      //     this.$router.go(0);
      //   })
      //   .catch(err => {
      //     this.$message.error(err);
      //   });
    }
  },
  created() {
    // 页面创建生命周期函数
    this.$store.dispatch("SetMyPortraitUrl");
  },
  mounted() {
    this.$Bus.$on("headerInit", () => {
      this.isShow = false;
      // this.menuList = this.siderbar_routers.children;
      this.menuList = { ...this.menuList, ...this.siderbar_routers.children };
      this.isShow = true;
    });
  }
};
</script>
<style lang="scss">
.el-popover {
  &.headers-popover {
    min-width: 90px;
    width: 90px;
  }
}
</style>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.app-header.navbar {
  @include boxSd(0 10px 10px rgba(6, 6, 6, 0.06));
  border-bottom: 0px;
  background-color: #fff;
  overflow: hidden;
  height: 70px;
  position: relative;
}
$fontColor: #44a8e1;
.svg-container {
  padding: 6px 5px 6px 15px;
  color: rgb(32, 132, 249);
  vertical-align: middle;
  fill: rgb(32, 132, 249);
  width: 30px;
  display: inline-block;
}
// .header-cont {
//   // position: fixed;
//   width: 100vw;
//   min-width: $layout-w;
//   display: -webkit-flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 999;
//   @include wh(100vw, 72px);
//   background: rgba(255, 255, 255, 1);
//   box-shadow: 0px 0px 12px 0px rgba(102, 102, 102, 0.3);
.header-content {
  width: $layout-w;
  position: relative;
  height: 72px;
  -ms-flex-align: center;
  margin: 0 auto;
  @include container();
  .logo-icon {
    cursor: pointer;
    @include wh(105px, 50px);
    float: left;
    @include bgImg("home_logo.png");
    background-size: 105px 50px;
    margin: 10px 50px 10px 0px;
  }
  .company_titles {
    margin-left: 100px;
  }
  .navbar {
    height: 55px;
    margin-top: 15px;
    float: left;
    ul {
      flex-wrap: nowrap;
      padding: 0;
      margin: 0;
      li {
        height: 55px;
        padding: 15px;
        margin: 0 20px;
        float: left;
        box-sizing: border-box;
        list-style: none;
        cursor: pointer;
        color: #000;
        display: block;
        font-size: 18px;
        font-weight: bold;
        &.active {
          color: $blue;
        }
        &:hover {
          color: $blue;
        }
        &.one {
          margin-left: 88px;
        }
      }
    }
  }
  .header-right {
    position: absolute;
    right: 0;
    margin-top: 15px;
    padding-left: 5px;
    .photo {
      cursor: pointer;
      position: relative;
      width: 36px;
      height: 36px;
      background-color: #fff;
      border: 3px solid #f8f8f8;
      border-radius: 100%;

      &:after {
        content: "\e681";
        @include iconfont();
        font-size: 30px;
        line-height: 1;
        color: #b2b2b2;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9;
      }

      &.i-admin:after {
        content: "\e696";
      }
      img {
        display: block;
        width: 100%;
        border-radius: 100%;
        position: relative;
        z-index: 11;
      }
    }
    // .user-head-img {
    //   cursor: pointer;
    //   position: relative;
    //   // @include wh(36px,36px);
    //   background-color: #fff;
    //   border: 3px solid #f8f8f8;
    //   border-radius: 100%;
    //   img {
    //     display: block;
    //     @include wh(36px, 36px);
    //     border-radius: 100%;
    //     position: relative;
    //     z-index: 11;
    //   }
    //   .photo {
    //     position: relative;
    //     width: 85px;
    //     height: 85px;
    //     background-color: #fff;
    //     border: 5px solid #f8f8f8;
    //     border-radius: 100%;
    //     margin: 10px auto;

    //     &:after {
    //       content: "\e681";
    //       @include iconfont();
    //       font-size: 70px;
    //       line-height: 1;
    //       color: #b2b2b2;
    //       position: absolute;
    //       top: 50%;
    //       left: 50%;
    //       transform: translate(-50%, -50%);
    //       z-index: 9;
    //     }
    //     &.i-admin:after {
    //       content: "\e696";
    //     }

    //     img {
    //       display: block;
    //       width: 100%;
    //       border-radius: 100%;
    //       position: relative;
    //       z-index: 11;
    //     }
    //   }
    // }
    .recruiters {
      float: right;
      @include wh(130px, 42px);
      margin-top: 12px;
      display: block;
      background-color: #f7f7f7;
      line-height: 42px;
      color: #333;
      text-align: center;
      border-radius: 6px 6px 0 0;
      @include boxSd(0 0 10px rgba(6, 6, 6, 0.3));
      &:hover {
        background-color: #f1f1f1;
        cursor: pointer;
      }
    }
  }
}
// }

.info_popover {
  div {
    margin-top: 10px;
    cursor: pointer;
  }
  div:hover {
    color: #44a8e1;
  }
}

.dropdown-itemp {
  text-align: left;
  font-size: 15px;
  padding: 10px;
  color: #2d8cf0;
}
.icon_xiala {
  margin-left: 30px;
}

.header-item .ivu-dropdown-item {
  padding: 15px;
}
.header-item {
  width: 130px;
  /*background-color: #20a8d8;*/
  /*background-color: white;*/

  height: 55px;
}

.nav.navbar-nav.ml-auto {
  margin-right: 20px;
}
.img-avatar {
  width: 45px;
}
.alarm_center {
  font-size: 13px;
  color: #ff8a8a;
}
.alarm_center span {
  color: red;
}
</style>
