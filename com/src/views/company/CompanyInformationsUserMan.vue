<template>
  <div class="layout_content">
    <!-- 选择框 -->
    <div class="top_menu_select">
      <div
        :class="{
          top_menu_select_select: pagerType == 0,
          top_menu_select_unselect: pagerType != 0
        }"
        @click="changePagerType(0)"
        v-if="user_info.UserType == 2"
      >
        <span>企业信息维护</span>
      </div>
      <div
        :class="{
          top_menu_select_select: pagerType == 1,
          top_menu_select_unselect: pagerType != 1
        }"
        @click="changePagerType(1)"
        style="margin-left: 10px"
      >
        <span>用户管理</span>
      </div>
    </div>
    <!-- 分割线 -->
    <!-- <div class="line"></div> -->
    <!-- 企业信息维护 -->
    <div v-if="pagerType == 0" class="content">
      <div class="left_menu">
        <div
          class="w-btn left_menu_item"
          v-for="(item, index) in tagList"
          :key="index"
          :class="{
            'btn-left-select': choiceType == index,
            'btn-left-unselect': choiceType != index
          }"
          @click="choiceTabType(index)"
        >
          {{ item }}
        </div>
      </div>

      <div class="right_content" v-if="choiceType == 0">
        <company-info ref="companyInfo"></company-info>
        <!-- 公司信息显示布局 -->
      </div>
      <!-- 证明材料显示布局 -->
      <div class="right_content" v-if="choiceType == 1">
        <materials ref="materials"></materials>
      </div>
      <div
        class="right_content billing_info"
        style="min-height: 300px"
        v-if="choiceType == 2"
      >
        <email-config></email-config>
      </div>
      <!-- 开票信息显示布局 -->
      <div class="right_content billing_info" v-if="choiceType == 3">
        <invoice-info></invoice-info>
      </div>
      <!-- 修改密码显示布局 -->
      <div class="right_content billing_info" v-if="choiceType == 4">
        <update-user-pwd></update-user-pwd>
      </div>
    </div>

    <!-- 用户管理 -->
    <div class="user_manager" v-if="pagerType == 1">
      <user-manage></user-manage>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import {
//   GetUserInfoList,
//   AddChildUser,
//   UpdateChildUser,
//   RestUserPassWord,
//   DelUser,
//   ForbidUser,
//   TransferAdmin,
// } from "api/companyApi";
import EmailConfig from "views/company/EmailConfig";
import CompanyInfo from "views/company/companyManage/CompanyInfo";
import Materials from "views/company/companyManage/Materials";
import InvoiceInfo from "views/company/companyManage/InvoiceInfo";
import UpdateUserPwd from "views/company/companyManage/UpdateUserPwd";
import UserManage from "views/company/UserManage";
export default {
  name: "CompanyInformationsUserMan", //企业信息维护和用户管理页面
  components: {
    EmailConfig,
    CompanyInfo,
    Materials,
    InvoiceInfo,
    UpdateUserPwd,
    UserManage
  },
  data() {
    return {
      // AduitState: false, // 信息未通过审核，或者审核中
      // IsPerfect: false, // 信息未完善
      pagerType: 0, //0: 企业信息维护  1: 用户管理
      choiceType: 0, //0: 公司信息  1： 证明材料  2：开票信息  3：修改密码
      tagList: ["公司信息", "证明材料", "邮箱配置", "开票信息", "修改密码"]
    };
  },
  computed: {
    ...mapGetters(["user_info"])
  },
  methods: {
    choiceTabType(choicetype) {
      var that = this;
      that.choiceType = choicetype;
    },
    changePagerType(pagertype) {
      this.pagerType = pagertype;
    },
    handleSizeChange() {}
  },

  created() {
    this.pagerType = this.$route.query.pType; // 获取点击进入的类型
    this.$store.dispatch("getCityItem"); //地图
    this.$store.dispatch("getIndustryItemList"); // 行业
    this.$store.dispatch("GetCompanyStockList"); //"企业性质
    this.$store.dispatch("getAllDD"); // 获取所有信息
    // this.getUserInfoList(); // 获取用户信息列表
  }
};
</script>
<style></style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.layout_content {
  .choice-type-layout {
    .el-form-item {
      width: 340px;
      margin-bottom: 23px;
    }
    .el-form-item__content {
      line-height: 36px;
      width: 340px;
    }
    .el-cascader,
    .el-input,
    .el-select {
      &.form_input {
        width: 343px;
        height: 38px;
      }
    }
    .form_input {
      .el-input__inner {
        height: 36px;
      }
    }
    .el-textarea {
      &.form_input {
        width: 792px;
        height: 224px;
        textarea {
          width: 821px;
          height: 200px;
        }
      }
    }
    .el-input.is-disabled .el-input__inner {
      background-color: #fdfdfd;
    }
  }
  .choice-type-layout-tag-text {
    font-family: "ArialMT", "Arial";
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #999999;
    display: block;
    // margin-right: 10px;
    // margin-bottom: 15px;
    line-height: 36px;
    width: 110px;
  }
  .content {
    padding: 25px 45px 45px;
    margin-bottom: 35px;
    min-height: 400px;
    .billing_info {
      min-height: 300px;
      .choice-type-layout {
        .el-form-item {
          width: 340px;
          margin-bottom: 23px;
        }
        .el-form-item__content {
          line-height: 36px;
          width: 340px;
        }
        .el-cascader,
        .el-input,
        .el-select {
          &.form_input {
            width: 340px;
            height: 36px;
          }
        }
      }
    }
    > .el-row {
      display: flex;
    }
    .left_menu {
      display: block;
      width: 140px;
      position: absolute;
      z-index: 99;
      .left_menu_item {
        margin-top: 15px;
      }
    }
    .right_content {
      // background: #fff;
      display: block;
      padding: 0px 30px 12px 50px;
      position: relative;
      display: flex;
      position: relative;
      padding-left: 190px;
      padding-right: 15px;
      > .el-row {
        color: #aaaaaa;
        font-size: 12px;
        position: absolute;
      }
    }
    .but_list_layout {
      margin-left: 132px;
      display: flex;
      justify-content: center;
      background: #fff;
      padding-bottom: 30px;
      margin-bottom: 10px;

      .but_list {
        text-align: center;
        .el-button {
          @include wh(100px, 32px);
          padding: 0;
          font-size: 12px;
          border-radius: 3px;
        }
        .el-button + .el-button {
          margin-left: 20px;
        }
      }
    }
    .file-review-layout {
      width: 80px;
      height: 80px;
      position: relative;
      background-color: #f5f5f5;
      float: left;
      margin-right: 20px;
    }
    .el-upload {
      // position: absolute;
      // width: 257px;
      // height: 100px;

      .el-button {
        @include wh(100px, 32px);
        padding: 0;
        font-size: 12px;
        border-radius: 3px;
        margin-bottom: 12px;
      }
      .upload_but {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }
      .choice-type-layout-tag-text {
        margin-bottom: 0px;
      }
    }
  }
  .user_manager {
    background: #fff;
    padding: 24px 40px;
    background: #fff;
    min-height: 400px;
    margin-bottom: 30px;
    box-shadow: 0 -5px 15px rgba(6, 6, 6, 0.1);
    .el-button {
      &.primary_but {
        @include wh(100px, 32px);
        padding: 0;
        font-size: 12px;
        font-weight: 400;
      }
      &.cancle_but {
        @include wh(100px, 32px);
        padding: 0;
        font-size: 12px;
        font-weight: 400;
      }
    }

    .el-table {
      thead {
        .cell {
          text-align: center; // table 表头 左对齐
        }
      }
      .delete-row {
        color: #d8d8d8;
      }

      .el-table__expand-icon {
        //修改 el-tabel 折叠按钮的位置
        float: right;
      }
      // border: 0;border-bottom: 1px dashed #E9E9E9;
      // 去掉table的border start----------------------------
      border: 0;
      th,
      tr,
      td {
        border: 0;
        background-color: #fff;
        border-bottom: 1px dashed #e9e9e9;
      }
      &::before {
        height: 0px;
      }
      &::after {
        width: 0;
      }

      .el-table__fixed:before {
        height: 0;
      }
    }
    .el-dialog {
      &.user_info {
        width: 600px;
        .el-dialog__header {
          text-align: left;
          padding-left: 30px;
        }
        .el-dialog__body {
          padding: 30px 30px 0;
        }
        .el-dialog__footer {
          margin-top: 36px;
          padding-bottom: 50px;
          padding-top: 0;
          .dialog-btn-center {
            .el-row {
              text-align: center;
            }
          }
        }
        .account_status_but {
          width: 80px;
          height: 32px;
          color: #333;
          border: 1px solid #ddd;
          background: inherit;
          background-color: rgba(255, 255, 255, 1);
          border-radius: 4px;
          font-family: "STHeitiSC-Light", "Heiti SC Light", "Heiti SC";
          font-style: normal;
          text-align: center;
          line-height: 32px;
          cursor: pointer;
          &.active {
            color: #44a9e1;
            border: 1px solid #44a9e1;
          }
        }
      }
      &.edit_admin {
        width: 480px;
        padding-top: 30px;
        padding-left: 60px;
        padding-right: 60px;
        .el-dialog__body {
          padding: 20px 0 36px 0;
        }
        .el-dialog__footer {
          padding-top: 0;
          padding-bottom: 30px;
        }
        .cancel_but {
          margin-top: 18px;
        }
      }
    }
  }
}
/////////////////////样式重写///////////
// .el-popover {
//   &.el-popper {
//     &.arrow_container {
//       font-size: 14px;
//       padding: 16px 10px 0 10px;
//       text-align: center;
//       color: #666;
//       font-weight: 500;
//       .el-row {
//         margin-bottom: 10px;
//         &:hover {
//           cursor: pointer;
//           color: #44a8e1;
//         }
//       }
//     }
//   }
// }
</style>
<style lang="scss" scoped>
.layout_content {
  width: 1200px;
  margin: 0 auto;
}
.top_menu_select {
  margin-top: 35px;
  display: flex;
  font-family: "Arial-BoldMT", "Arial Bold", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
}
.top_menu_select_select {
  width: 148px;
  height: 50px;
  background: #ffffff;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  color: black;
  cursor: pointer;
  box-shadow: 0 -5px 15px rgba(6, 6, 6, 0.1);
}
.top_menu_select_unselect {
  width: 148px;
  height: 40px;
  background: #dddddd;
  margin-top: 10px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  color: black;
  cursor: pointer;
  box-shadow: 0 -5px 15px rgba(6, 6, 6, 0.1);
}
.line {
  background: #fff;
  width: 1032px;
  height: 2px;
}
.content {
  padding: 25px 45px 45px;
  background-color: white;
  box-shadow: 0 -5px 15px rgba(6, 6, 6, 0.1);
}
.btn-left-unselect {
  background: inherit;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #428dde;
  border-radius: 5px;
  box-shadow: none;
  font-family: "ArialMT", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #428dde;
  text-align: center;
  line-height: normal;
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  width: 140px;
  height: 36px;
  cursor: pointer;
}

// background-color: #44a8e1;
.btn-left-select {
  background: inherit;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #66b9ff;
  background-color: #66b9ff;
  border-radius: 5px;
  box-shadow: none;
  font-family: "ArialMT", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: normal;
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  width: 140px;
  height: 36px;
  cursor: pointer;
}
.btn-left-select:hover {
  background-color: #66b9ff;
  border-color: #66b9ff;
  color: white;
}
.btn-left-unselect:hover {
  background-color: #66b9ff;
  border-color: #66b9ff;
  color: white;
}

.choice-layout {
  background: white;
}
.choice-type-layout {
  margin-top: 10px;
  &.two {
    margin-left: 32px;
  }
}

.submit-btn-layout {
  display: flex;
  justify-content: center;
  //   margin-top: 30px;
}
.submit-btn-layout-2 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  //   margin-top: 30px;
}
.qualification-materials-tag-font {
  font-family: "Arial-BoldMT", "Arial Bold", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 15px;
  color: #333333;
}
.qualification-materials-information-font {
  font-family: "STHeitiSC-Light", "Heiti SC Light", "Heiti SC";
  font-weight: 200;
  font-style: normal;
  font-size: 15px;
  color: #999999;
  margin-top: 10px;
}

.upload-layout {
  display: flex;
  margin-top: 20px;
}
.user-manager-top {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  background: white;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
}
.user-manager-top3 {
  display: flex;
  flex-direction: column;
  background: white;
}
.user-manager-top-2 {
  display: flex;
  background: white;
}
.user-manager-top-font {
  font-family: "ArialMT", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
  color: #888888;
}
// .dialog-btn-center {
//   display: flex;
//   justify-content: center;
//   justify-items: center;
// }
.dialog-set-admin-info-txt {
  font-family: "ArialMT", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  color: #999999;
}
.account-state-layout {
  display: flex;
}

.dialogOpera-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
}
.choice-tag-div {
  display: flex;
  // justify-content: center;
  // align-items: center;
}
.form-switch {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  height: 27px;
  line-height: 26px;
  min-width: 35px;
  padding: 0 5px;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  background-color: white;
  text-align: center;
}

.form-switch.active {
  border-color: #66b9ff;
  background-color: #66b9ff;
  padding-left: 5px;
  padding-right: 5px;
}

.list-item-icon {
  color: #333;
}
.list-item-icon:hover {
  color: #428dde;
}
// i:hover{
//   color: #428dde;
// }
</style>
