<template>
  <div class="user-manage">
    <!-- 初始密码和新增用户 -->
    <div class="user-manager-top" v-if="AduitState && IsPerfect">
      <span class="user-manager-top-font">密码将以短信的方式发送到你手机</span>
      <el-button plain @click="showAddUser" v-if="user_info.UserType == 2"
        ><span class="iconfont icon-jia"></span>新增用户</el-button
      >
    </div>

    <!-- 信息未完善 -->
    <div class="user-manager-top" v-if="!IsPerfect">
      <span class="user-manager-top-font"
        >贵司未完成企业资质审核认证，还不能添加账号哦</span
      >
      <el-button plain @click="changePagerType(0)">立即去完善</el-button>
    </div>

    <!-- 审核中或者审核未通过 -->
    <div class="user-manager-top" v-if="!AduitState && IsPerfect">
      <span class="user-manager-top-font"
        >贵公司已提交企业资质审核认证信息资料，仍在审核中，暂时还不能添加用户哦！请耐心等待</span
      >
    </div>

    <div class="user-manager-top3">
      <el-table
        :data="tableData"
        border
        class-name="table-data"
        :border="false"
      >
        <el-table-column
          prop="Contract"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="Mobile"
          label="手机"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="Email"
          label="邮箱"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="Username"
          label="用户名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="UserStateText"
          label="账号状态"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column label="添加日期" width="100" align="center">
          <template slot-scope="scope">{{
            scope.row.CreateTime | Format("yyyy-MM-dd")
          }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <button
              type="button"
              class="list-item-icon"
              v-if="scope.row.UserType == 3"
              @click="editUser(3, scope.row)"
            >
              <span class="iconfont icon-apply"></span>
            </button>
            <button
              type="button"
              class="list-item-icon"
              v-if="scope.row.UserType == 3"
              @click="showSetAdminDialog(scope.row)"
            >
              <span
                class="iconfont icon-admin"
                style=" margin-left: 10px"
              ></span>
            </button>

            <button
              class="list-item-icon"
              v-if="scope.row.UserType == 3"
              type="button"
              @click="deleteCUser(scope.row)"
            >
              <span class="iconfont icon-del" style="margin-left: 10px"></span>
            </button>

            <button
              class="list-item-icon"
              type="button"
              v-if="scope.row.UserType == 2"
              @click="editUser(2, scope.row)"
            >
              <span class="iconfont icon-apply"></span>
            </button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        v-if="total > 10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="PagerIndex"
        :page-size="PagerSize"
        layout="pager, jumper"
        :total="total"
        style="margin-top: 20px"
      >
      </el-pagination>
    </div>
    <!-- 编辑管理员信息的弹框 -->
    <el-dialog
      title="管理员信息"
      custom-class="user_info"
      :visible.sync="dialogFormForAdministrator"
      :before-close="handleClose"
    >
      <el-form :model="formUserData" :rules="rulesFormUser" ref="formUserData">
        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">姓名*</span>
          <el-form-item prop="Contract">
            <el-input
              v-model="formUserData.Contract"
              placeholder="请输入姓名"
              autocomplete="off"
              style="width: 400px"
              maxlength="30"
            ></el-input>
          </el-form-item>
        </div>

        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">邮箱*</span>
          <el-form-item prop="Email">
            <el-input
              v-model="formUserData.Email"
              placeholder="请输入邮箱"
              autocomplete="off"
              style="width: 400px"
              maxlength="30"
            ></el-input>
          </el-form-item>
        </div>

        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">用户名*</span>
          <el-form-item prop="Username">
            <el-input
              v-model="formUserData.Username"
              placeholder="请输入用户名"
              autocomplete="off"
              style="width: 400px"
              :disabled="true"
              maxlength="30"
            ></el-input>
          </el-form-item>
        </div>

        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">手机号*</span>
          <el-form-item prop="Mobile">
            <el-input
              v-model="formUserData.Mobile"
              placeholder="请输入手机号"
              autocomplete="off"
              style="width: 400px"
              :disabled="true"
              maxlength="11"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <div class="dialog-btn-center">
          <el-row>
            <el-button
              type="info"
              class="btn-cancel w-btn"
              @click="dialogFormForAdministrator = false"
              >取消</el-button
            >
            <el-button
              type="primary"
              class=" w-btn"
              @click="editAdminUserInfo()"
              >保存</el-button
            >
          </el-row>
        </div>
      </div>
    </el-dialog>

    <!-- 新增用户弹框 -->
    <el-dialog
      title="新增用户"
      custom-class="user_info"
      :visible.sync="userDialog"
      :before-close="handleClose"
    >
      <el-form ref="formUserData" :model="formUserData" :rules="rulesFormUser">
        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">姓名*</span>
          <el-form-item prop="Contract">
            <el-input
              v-model="formUserData.Contract"
              placeholder="请输入姓名"
              autocomplete="off"
              maxlength="30"
            ></el-input>
          </el-form-item>
        </div>

        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">邮箱*</span>
          <el-form-item prop="Email">
            <el-input
              v-model="formUserData.Email"
              placeholder="请输入邮箱"
              autocomplete="off"
              maxlength="30"
            ></el-input>
          </el-form-item>
        </div>

        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">用户名*</span>
          <el-form-item prop="Username">
            <el-input
              v-model="formUserData.Username"
              placeholder="请输入用户名"
              autocomplete="off"
              maxlength="30"
            ></el-input>
          </el-form-item>
        </div>

        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">手机号*</span>
          <el-form-item prop="Mobile">
            <el-input
              v-model="formUserData.Mobile"
              placeholder="请输入手机号"
              autocomplete="off"
              maxlength="11"
            ></el-input>
          </el-form-item>
        </div>

        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">账号状态* </span>
          <el-form-item>
            <div
              :class="{
                active: formUserData.UserState == 1
              }"
              class="form-switch"
              style=" margin-top:-5px"
              data-switch="启用|禁用"
              @click="changeAddUserAccountState(!formUserData.UserState)"
            >
              <em>{{ formUserData.UserState == 1 ? "启用" : "禁用" }}</em
              ><i></i>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="dialog-btn-center">
          <el-button
            class="w-btn btn-md-w btn-cancel w-btn"
            @click="userDialog = false"
          >
            取消
          </el-button>
          <el-button class="w-btn btn-md-w" @click="addUser()">
            保存
          </el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 普通用户选择操作行为 -->

    <!-- 普通用户的编辑弹框-->
    <el-dialog
      title="编辑用户"
      custom-class="user_info"
      :visible.sync="dialogFormForEdituser"
      :before-close="handleClose"
    >
      <el-form
        :model="formDataForCUser"
        ref="formDataForCUser"
        :rules="rulesFormUser"
      >
        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">姓名*</span>
          <el-form-item prop="Contract">
            <el-input
              v-model="formDataForCUser.Contract"
              placeholder="请输入姓名"
              autocomplete="off"
              style="width: 400px;"
              maxlength="30"
            ></el-input>
          </el-form-item>
        </div>

        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">邮箱*</span>
          <el-form-item prop="Email">
            <el-input
              v-model="formDataForCUser.Email"
              placeholder="请输入邮箱"
              autocomplete="off"
              style="width: 400px"
              maxlength="30"
            ></el-input>
          </el-form-item>
        </div>

        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">用户名*</span>
          <el-form-item prop="Username">
            <el-input
              v-model="formDataForCUser.Username"
              placeholder="请输入用户名"
              autocomplete="off"
              style="width: 400px"
              maxlength="30"
            ></el-input>
          </el-form-item>
        </div>

        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">手机号*</span>
          <el-form-item prop="Mobile">
            <el-input
              v-model="formDataForCUser.Mobile"
              placeholder="请输入手机号"
              autocomplete="off"
              style="width: 400px"
              maxlength="11"
            ></el-input>
          </el-form-item>
        </div>
        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">账号状态* </span>
          <el-form-item>
            <div
              :class="{
                active: formDataForCUser.UserState == 1
              }"
              class="form-switch"
              style=" margin-top:-5px"
              data-switch="启用|禁用"
              @click="forbiddenAccount()"
            >
              <em>{{ formDataForCUser.UserState == 1 ? "启用" : "禁用" }}</em
              ><i></i>
            </div>
          </el-form-item>
        </div>
        <div class="choice-tag-div">
          <span class="choice-type-layout-tag-text">密码重置* </span>
          <el-form-item>
            <div
              class="form-switch active"
              style=" margin-top:-5px"
              data-switch="启用|禁用"
              @click="cuserResetPsw()"
            >
              <em>是</em><i></i>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div slot="footer" class="dialog-footer">
          <div class="dialog-btn-center">
            <el-row>
              <el-button
                type="info"
                class="w-btn btn-cancel"
                @click="dialogFormForEdituser = false"
                >取消</el-button
              >
              <el-button type="primary" class="w-btn " @click="editUserInfo()"
                >保存</el-button
              >
            </el-row>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 设置为管理员的弹框 -->
    <el-dialog
      :title="setUserForAdmin"
      custom-class="edit_admin"
      :visible.sync="dialogFormForSetAdmin"
      center
    >
      <div>
        <span class="dialog-set-admin-info-txt"
          >请输入管理员账号密码并确认</span
        >
        <el-input
          v-model="adminpassword"
          placeholder="请输入管理员账号密码"
          style="margin-top: 16px;"
          show-password
          maxlength="18"
        ></el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <div class="dialog-btn-center">
          <el-row>
            <el-button
              type="info"
              class=" w-btn btn-cancel"
              @click="dialogFormForSetAdmin = false"
              >取消</el-button
            >
            <el-button
              style="background-color: #428dde"
              type="primary"
              class=" w-btn"
              @click="giveAdminTo()"
              >确定</el-button
            >
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  UpdateChildUser,
  GetUserInfoList,
  GetCompanyState,
  RestUserPassWord,
  AddChildUser,
  ForbidUser,
  DelUser,
  TransferAdmin
} from "api/companyApi";
export default {
  name: "user-manage", //简历预览
  computed: {
    ...mapGetters(["user_info"])
  },
  data() {
    return {
      msg: "",
      tableData: [
        {
          CompanyId: "",
          Contract: "",
          CreateTime: null,
          CreateUserId: null,
          Email: "",
          Enable: false,
          GroupId: "",
          Id: "",
          IsDelete: false,
          Mobile: "",
          UpdateTime: "",
          UpdateUserId: "",
          UserState: 1,
          UserStateText: "",
          UserType: 2,
          UserTypeText: "",
          Username: ""
        }
      ],
      userDialog: false,
      AduitState: false, // 信息未通过审核，或者审核中
      IsPerfect: false, // 信息未完善
      dialogFormForEdituser: false,
      dialogFormForAdministrator: false,
      dialogFormForSetAdmin: false, // 用户信息弹框
      setUserForAdmin: "", // 设置管理员名称
      rulesFormUser: {
        Email: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this).Email
          }
        ],
        Mobile: [
          {
            required: true,
            trigger: "blur",
            validator: this.$formValidate(this).Mobile
          }
        ],
        Username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        Contract: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      adminpassword: "", // 管理员密码
      formDataForAddUser: {
        Contract: "",
        Email: "",
        Username: "",
        Mobile: "",
        UserState: 1,
        GroupId: ""
      },
      formDataForAdmin: {
        Id: "",
        Username: "",
        Contract: "",
        Mobile: "",
        Email: ""
      },
      PagerIndex: 1,
      PagerSize: 10,
      Offset: 0, // 当前第几页
      Limit: 10, // 每页返回数量
      total: 0, //一共多少条数据
      formUserData: {
        Contract: "",
        Email: "",
        Username: "",
        Mobile: "",
        UserState: 1,
        GroupId: ""
      },

      formDataForCUser: {
        Id: "",
        Username: "",
        Contract: "",
        Mobile: "",
        Email: "",
        UserState: 1,
        isPwd: false,
        isStatus: true
      }
    };
  },
  // components: {
  //   navbar
  // },
  methods: {
    showAddUser() {
      this.userDialog = true;
      this.formUserData = {
        Contract: "",
        Email: "",
        Username: "",
        Mobile: "",
        UserState: 1,
        GroupId: ""
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
    // 获取用户信息列表
    getUserInfoList() {
      var that = this;
      GetUserInfoList({
        Username: "",
        CompanyId: this.user_info.CompanyId,
        Offset: that.Offset,
        Limit: that.Limit
      }).then(res => {
        // console.log(res);
        if (res.data.Success) {
          that.total = Number.parseInt(res.data.Data.Total);
          that.tableData = res.data.Data.Items;
          that.formDataForAddUser.GroupId = process.env.GroupId;
        } else {
          that.$message.error(res.data.Message);
        }
      });
    },
    // 改变新增用户的账号状态
    changeAddUserAccountState(state) {
      this.formDataForAddUser.UserState = state;
    },
    // 新增用户弹框显示
    showaddUser() {
      this.userDialog = true;
    },
    addUser() {
      // AddChildUser
      var that = this;
      this.$refs["formUserData"].validate(valid => {
        if (valid) {
          AddChildUser(that.formUserData).then(res => {
            //console.log(res);
            if (res.data.Success) {
              that.userDialog = false;
              // 重新获取用户列表
              that.getUserInfoList();
            } else {
              that.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    //普通用户 重置密码
    cuserResetPsw() {
      var that = this;
      RestUserPassWord({ Id: that.formDataForCUser.Id }).then(res => {
        // console.log(res);
        if (res.data.Success) {
          that.dialogFormForEdituser = false;
          that.$message.success(res.data.Message);
          // // 重新获取用户列表
          // that.getUserInfoList();
        } else {
          that.$message.error(res.data.Message);
        }
      });
    },
    handleClose(done) {
      var that = this;
      that
        .$confirm("确认关闭？")
        .then(_ => {
          done();
          that.dialogFormForAdduser = false;
          that.dialogFormForAdministrator = false;
          that.dialogFormForEdituser = false;
          that.dialogFormForSetAdmin = false;
          that.dialogOpera = false;
        })
        .catch(_ => {});
    },

    changePagerType() {},
    // 保存修改管理员用户信息
    editAdminUserInfo() {
      var that = this;
      this.$refs["formUserData"].validate(valid => {
        if (valid) {
          UpdateChildUser(that.formUserData).then(res => {
            if (res.data.Success) {
              that.dialogFormForAdministrator = false;
              this.$store.dispatch("updateUserInfo", that.formUserData);
              that.getUserInfoList();
            } else {
              that.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 禁用或者启用账号
    forbiddenAccount() {
      var that = this;
      ForbidUser({
        Id: that.formDataForCUser.Id,
        UserState: that.formDataForCUser.UserState == 1 ? 2 : 1
      }).then(res => {
        if (res.data.Success) {
          that.dialogFormForEdituser = false;
          that.$message.success(res.data.Message);
          // 重新获取用户列表
          that.getUserInfoList();
        } else {
          that.$message.error(res.data.Message);
        }
      });
    },
    // 保存修改普通用户信息
    editUserInfo() {
      var that = this;
      this.$refs["formDataForCUser"].validate(valid => {
        if (valid) {
          //   if (this.formDataForCUser.isPwd) {
          //     this.cuserResetPsw();
          //   }
          //   if (
          //     this.formDataForCUser.isStatus !=
          //     (this.formDataForCUser.UserState == 2 ? false : true)
          //   ) {
          //     this.forbiddenAccount();
          //   }
          UpdateChildUser(that.formDataForCUser).then(res => {
            if (res.data.Success) {
              that.dialogFormForEdituser = false;
              // 重新获取用户列表
              that.getUserInfoList();
            } else {
              that.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 设置管理员
    showSetAdminDialog(row) {
      var that = this;
      that.edit(row);
      that.dialogFormForSetAdmin = true;
      that.dialogOpera = false;
    },
    // 编辑管理员
    editUser(type, row) {
      var that = this;
      // 如果是管理员
      if (type == 2) {
        that.dialogFormForAdministrator = true;
      } else if (type == 3) {
        // 如果是普通用户
        that.dialogFormForEdituser = true;
      }
      //
      that.dialogOpera = false;
      that.edit(row);
    },

    // 转让管理员
    giveAdminTo() {
      var that = this;
      if (that.adminpassword == "") {
        that.$message.error("请输入管理员密码");
      } else {
        TransferAdmin({
          Id: that.formDataForCUser.Id,
          Password: that.adminpassword
        }).then(res => {
          if (res.data.Success) {
            that.dialogFormForSetAdmin = false;
            that.$message.success(res.data.Message);
            // 重新获取用户列表
            that.getUserInfoList();
          } else {
            that.$message.error(res.data.Message);
          }
        });
      }
    },
    handleCurrentChange() {
      // 获取用户列表
      this.Offset = (this.PagerIndex - 1) * this.PagerSize;
      this.getUserInfoList();
    },
    handleSizeChange() {},
    // 删除普通用户
    deleteCUser(row) {
      var that = this;
      that.edit(row);
      that
        .$confirm("确认删除？")
        .then(_ => {
          DelUser({ Id: that.formDataForCUser.Id }).then(res => {
            if (res.data.Success) {
              that.dialogOpera = false;
              that.$message.success(res.data.Message);
              // 重新获取用户列表
              that.getUserInfoList();
            } else {
              that.$message.error(res.data.Message);
            }
          });
        })
        .catch(error => {
          //   console.log(error);
        });
    },
    // 点击列表上的编辑icon
    edit(row) {
      // 如果是管理员 直接弹出管理员信息弹框
      console.info(row);
      if (row.UserType == 2) {
        Object.assign(this.formUserData, row);
        // this.editUser(2);
      } else if (row.UserType == 3) {
        // 普通用户弹出选择框
        Object.assign(this.formDataForCUser, row);
        this.formDataForCUser.isStatus =
          this.formDataForCUser.UserState == 2 ? false : true;
        this.setUserForAdmin = "确定设置“" + row.Contract + "”为新的管理员？";
      }
    }
  },
  created() {},
  mounted() {
    this.getUserInfoList(); // 获取用户信息列表
    this.getCompanyState();
  }
};
</script>

<style lang="scss" scoped>
.user-manage {
  .user-manager-top {
    line-height: 28px;
    width: 100%;
    position: relative;
    padding-top: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;
    > span {
      font-size: 15px;
    }
    .el-button {
      position: absolute;
      right: 0;
      height: 28px;
      padding: 0 10px;
    }
  }
  /deep/ .el-table {
    .el-table__header-wrapper {
      border-bottom: 1px dashed #ddd;
    }
    th {
      &.is-leaf {
        border: 0px;
      }
    }
    .el-table__row {
      border-bottom: 1px dashed #ddd;
    }
    td {
      &.is-center {
        padding: 15px 0;
        font-size: 15px;
        border: 0px;
        border-bottom: 1px dashed #ddd;
      }
    }
  }
  /deep/ .el-dialog__body {
    padding: 25px 35px 0 35px;
  }
  /deep/ .el-button {
    &.w-btn {
      line-height: 42px;
      height: 42px;
      min-width: 150px;
      font-size: 15px;
      padding: 0 18px;
      background-color: #428dde;
      color: #fff;
      white-space: nowrap;
      text-align: center;
      font-size: 15px;
      border: 1px solid #428dde;
      &.btn-cancel {
        background-color: #bbbbbb;
        border-color: #bbbbbb;
      }
    }
  }
  .choice-tag-div {
    display: flex;
    position: relative;
    padding-left: 8em;
    > span {
      position: absolute;
      left: 5px;
      top: 0;
      line-height: 34px;
    }
    .el-form-item {
      min-height: 34px;
      width: 100%;
      .el-form-item__content {
        line-height: 34px;
      }
      .el-input__inner {
        height: 34px;
      }
    }
  }
  .iconfont {
    color: #ccc;
    font-size: 20px;
    line-height: 1;
  }
  .dialog-btn-center {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    .w-btn + .w-btn {
      margin-left: 13px;
    }
  }
}
</style>
