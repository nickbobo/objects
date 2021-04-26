<template>
  <div class="email_config">
    <el-row class="email_config_header">
      <span style="font-size: 15px; line-heigh: 28px; color: #999"
        >绑定简历收集专用邮箱，我们可以帮您快速将各渠道收集的应聘简历汇总到平台[公司简历库]中</span
      >
      <el-button plain @click="editEmailConfigDialog = true"
        ><i
          class="iconfont icon-jia"
          style="color: #66b9ff; font-size: 14px; margin-right: 5px"
        ></i
        >添加邮箱</el-button
      >
    </el-row>

    <!-- style="border: 0; border-bottom: 1px dashed #E9E9E9;" -->
    <el-table :data="tableData">
      <el-table-column label="邮箱配置" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.Name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="域名" width="250">
        <template slot-scope="scope">
          {{ scope.row.Domain }}
        </template>
      </el-table-column>
      <!-- align="center" -->
      <el-table-column label="协议" width="90">
        <template slot-scope="scope">
          {{ scope.row.Protocol }}
        </template>
      </el-table-column>
      <el-table-column label="SSL" width="90">
        <template slot-scope="scope">
          {{ scope.row.Ssl ? "是" : "否" }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <i class="iconfont icon-apply"  @click="handleEdit(scope.$index, scope.row)" style="color: #ccc"></i> -->
          <i
            class="iconfont icon-del"
            @click="handleDelete(scope.$index, scope.row)"
            style="color: #ccc; margin-left:10px"
          ></i>
          <!-- <svg-icon
            icon-class="edit"
            class="icon-edit icon-svg-but"
            @click="handleEdit(scope.$index, scope.row)"
          />
          <svg-icon
            icon-class="trash"
            class="icon-edit icon-svg-but"
            style="margin-left:10px"
            @click="handleDelete(scope.$index, scope.row)"
          /> -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="editEmailConfigDialog"
      custom-class="email-config-dialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="$reset('formData')"
    >
      <!--    label-position="top" -->
      <el-form
        ref="formData"
        :rules="rulesEmailConfig"
        label-width="80px"
        :model="formData"
        :hide-required-asterisk="true"
        size="small"
      >
        <div>
          <el-row type="flex" justify="center">
            <!-- 左右两边的空白块 -->
            <el-col :span="2">
              <div class="mail-tab-item-unselect"></div>
            </el-col>
            <el-col :span="9">
              <div
                :class="{
                  'mail-tab-item-select': mailtabPosition == 0,
                  'mail-tab-item-unselect': mailtabPosition != 0
                }"
                @click="mailTabSelect('qq')"
              >
                <span>QQ邮箱</span>
              </div>
            </el-col>
            <el-col :span="11">
              <div
                :class="{
                  'mail-tab-item-select': mailtabPosition == 1,
                  'mail-tab-item-unselect': mailtabPosition != 1
                }"
                @click="mailTabSelect('firm')"
              >
                <span>腾讯企业邮</span>
              </div>
            </el-col>
            <el-col :span="9">
              <div
                :class="{
                  'mail-tab-item-select': mailtabPosition == 2,
                  'mail-tab-item-unselect': mailtabPosition != 2
                }"
                @click="mailTabSelect('163')"
              >
                <span>163邮箱</span>
              </div>
            </el-col>
            <el-col :span="9">
              <div
                :class="{
                  'mail-tab-item-select': mailtabPosition == 3,
                  'mail-tab-item-unselect': mailtabPosition != 3
                }"
                @click="mailTabSelect('126')"
              >
                <span>126邮箱</span>
              </div>
            </el-col>
            <el-col :span="9">
              <div
                :class="{
                  'mail-tab-item-select': mailtabPosition == 4,
                  'mail-tab-item-unselect': mailtabPosition != 4
                }"
                @click="mailTabSelect('OutLook')"
              >
                <span>Outlook</span>
              </div>
            </el-col>
            <el-col :span="9">
              <div
                :class="{
                  'mail-tab-item-select': mailtabPosition == 5,
                  'mail-tab-item-unselect': mailtabPosition != 5
                }"
                @click="mailTabSelect('custom')"
              >
                <span>自定义</span>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="mail-tab-item-unselect"></div>
            </el-col>
          </el-row>
          <!-- <el-radio-group v-model="tabPosition" style="margin-bottom: 15px;">
            <el-radio-button label="qq">QQ邮箱</el-radio-button>
            <el-radio-button label="firm" class="firm"
              >腾讯企业邮箱</el-radio-button
            >
            <el-radio-button label="163">163邮箱</el-radio-button>
            <el-radio-button label="126">126邮箱</el-radio-button>
            <el-radio-button label="OutLook">OutLook</el-radio-button>
            <el-radio-button label="custom">自定义</el-radio-button>
          </el-radio-group> -->
          <el-row style="margin-top:20px">
            <el-form-item label="邮箱">
              <!-- <span class="go_email_server"
                ><a> 您可能需要前往邮箱启用POP3/IMAP收信服务</a></span
              > -->
              <el-input
                v-model="formData.Email"
                placeholder="请输入邮箱"
              ></el-input
            ></el-form-item>
            <el-form-item label="名称" prop="Name">
              <el-input
                v-model="formData.Name"
                placeholder="请输入名称"
              ></el-input
            ></el-form-item>
            <el-form-item label="密码" prop="Password">
              <el-input
                v-model="formData.Password"
                placeholder="请输入密码"
                show-password
              ></el-input
            ></el-form-item>
            <el-form-item label="域名" prop="Domain">
              <el-input
                v-model="formData.Domain"
                placeholder="请输入域名"
              ></el-input
            ></el-form-item>
            <el-form-item label="协议" prop="Contract">
              <el-radio-group v-model="formData.Protocol">
                <el-radio label="pop3"></el-radio>
                <el-radio label="IMAP"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="SSL" prop="Ssl">
              <el-radio-group v-model="formData.Ssl">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-row class="test_email_but">
              <el-button
                type="primary"
                plain
                @click.native="CheckCompanyMail"
                size="mini" 
                style="margin-left: 80px"
              >
                测试
              </el-button>
              <span class="go_email_server"
                ><a> 您可能需要前往邮箱启用POP3/IMAP收信服务</a></span
              >
            </el-row>

            <div class="modal-footer">
              <button
                type="button"
                class="w-btn w-bt-xl btn-primary"
                @click="editEmailConfigDialog = false"
              >
                取消
              </button>
              <button type="button" @click="save" class="w-btn w-bt-xl">
                保存
              </button>
            </div>

            <!-- <el-row class="but_list">
              <el-button
                type=""
                size="mini"
                @click="editEmailConfigDialog = false"
                class="def_simple_but active"
                >取消</el-button
              >
              <el-button type="" size="mini" class="search_but" @click="save"
                >保存</el-button
              >
            </el-row> -->
          </el-row>
        </div>
      </el-form></el-dialog
    >

    <el-dialog
      :visible.sync="delDialog"
      custom-class="del"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-row> 确定要删除邮箱“{{ delItem.Email }}”？ </el-row>
      <el-row class="but_list">
        <div class="modal-footer">
          <button
            type="button"
            class="w-btn w-bt-xl btn-primary"
            @click="delDialog = false"
          >
            取消
          </button>
          <button type="button" @click="delAction" class="w-btn w-bt-xl">
            保存
          </button>
        </div>

        <!-- <el-button
          type=""
          size="mini"
          @click="delDialog = false"
          class="def_simple_but active"
          >取消</el-button
        >
        <el-button type="" size="mini" class="search_but" @click="handleDelete"
          >保存</el-button
        > -->
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { CompanyMail, post, get } from "api/api";
import { mapGetters } from "vuex";
export default {
  name: "email-config", //邮箱配置
  computed: {
    ...mapGetters(["user_info"])
  },
  data() {
    return {
      msg: "",
      tableData: [
        // {
        //   CompanyId: "",
        //   Name: "123.232323@12.com",
        //   Domain: "pop.email.qq.com:995",
        //   Email: "828819281928@qq.com",
        //   Password: "",
        //   Ssl: true,
        //   Protocol: "pop3"
        // }
      ],
      tabPosition: "qq",
      mailtabPosition: 0,
      delDialog: false,
      delItem: {},
      editEmailConfigDialog: false,
      rulesEmailConfig: {
        // Name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        Password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        Email: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this).Email
          }
        ]
      },
      formData: {
        CompanyId: "",
        Name: "",
        Domain: "",
        Email: "",
        Password: "",
        Ssl: true,
        Protocol: ""
      },
      defTabList: [
        {
          Domain: "pop.exmail.qq.com:995",
          Ssl: true,
          Protocol: "pop3"
        },
        {
          Domain: "pop.exmail.qq.com:995",
          Ssl: true,
          Protocol: "pop3"
        },
        {
          Domain: "pop.163.com:110",
          Ssl: true,
          Protocol: "pop3"
        },
        {
          Domain: "pop.126.com:995",
          Ssl: true,
          Protocol: "pop3"
        },
        {
          Domain: "outlook.office365.com:995",
          Ssl: true,
          Protocol: "pop3"
        },
        {
          Domain: "mail.ciicsh.com:110",
          Ssl: false,
          Protocol: "pop3"
        }
      ]
    };
  },
  // components: {
  //   navbar
  // },
  methods: {
    mailTabSelect(newVal) {
      switch (newVal) {
        case "qq":
          this.formData = { ...this.formData, ...this.defTabList[0] };
          this.mailtabPosition = 0;
          break;
        case "firm":
          this.formData = { ...this.formData, ...this.defTabList[1] };
          this.mailtabPosition = 1;
          break;
        case "163":
          this.formData = { ...this.formData, ...this.defTabList[2] };
          this.mailtabPosition = 2;
          break;
        case "126":
          this.formData = { ...this.formData, ...this.defTabList[3] };
          this.mailtabPosition = 3;
          break;
        case "OutLook":
          this.formData = { ...this.formData, ...this.defTabList[4] };
          this.mailtabPosition = 4;
          break;
        case "custom":
          this.formData = { ...this.formData, ...this.defTabList[5] };
          this.mailtabPosition = 5;
          break;
      }
    },
    handleEdit() {
      this.editEmailConfigDialog = true;
    },
    handleDelete(index, item) {
      this.delItem = item;
      this.delDialog = true;
    },
    async delAction() {
      let data ={
        id:this.delItem.Id
      }
      let res = await get(`${CompanyMail}DelEmailInfo`, data);
      if (res.Success) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.delDialog = false;
        this.getList();
      } else {
        this.$message({
          message: res.Message,
          type: "error"
        });
      }
    },

    save() {
      this.formData.CompanyId = this.user_info.CompanyId;
      let that = this;
      this.$refs["formData"].validate(valid => {
        if (valid) {
          that.saveAction();
        }
      });
    },
    async getList() {
      let res = await post(`${CompanyMail}GetEmailList`, {});
      if (res.Success) {
        this.tableData = res.Data;
      }
    },
    async saveAction() {
      let res = await post(`${CompanyMail}AddEmailInfo`, this.formData);
      if (res.Success) {
        this.$message({
          message: "保存成功",
          type: "success"
        });
        this.editEmailConfigDialog = false;
        this.getList();
      } else {
        this.$message({
          message: res.Message,
          type: "error"
        });
      }
    },
    async CheckCompanyMail() {
      let res = await post(`${CompanyMail}CheckCompanyMail`, this.formData);
      console.log(this.formData);
      if (res.Success) {
        this.$message({
          message: "邮箱配置连接成功",
          type: "success"
        });
      } else {
        this.$message({
          message: res.Message,
          type: "error"
        });
      }
    }
  },
  created() {
    this.formData.CompanyId = this.user_info.CompanyId;
    this.getList();
  },
  mounted() {},
  watch: {
    tabPosition: function(newVal) {
      switch (newVal) {
        case "qq":
          this.formData = { ...this.formData, ...this.defTabList[0] };

          break;
        case "firm":
          this.formData = { ...this.formData, ...this.defTabList[1] };
          this.mailtabPosition = 1;
          break;
        case "163":
          this.formData = { ...this.formData, ...this.defTabList[2] };
          this.mailtabPosition = 2;
          break;
        case "126":
          this.formData = { ...this.formData, ...this.defTabList[3] };
          this.mailtabPosition = 3;
          break;
        case "OutLook":
          this.formData = { ...this.formData, ...this.defTabList[4] };
          this.mailtabPosition = 4;
          break;
        case "custom":
          this.formData = { ...this.formData, ...this.defTabList[5] };
          this.mailtabPosition = 5;
          break;
      }
    }
  }
};
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";
.el-dialog {
  &.email-config-dialog {
    width: 600px;
    height: 600px;
    .el-dialog__header {
      text-align: center;
    }
  }
  &.del {
    width: 520px;
    text-align: center;
  }
}
.email_config {
  .el-radio-group {
    width: 496px;
    .el-radio-button {
      .el-radio-button__inner {
        color: #888888;
        line-height: 30px;
        font-size: 12px;
        padding: 0;
        height: 30px;
        width: 80px;
      }
      &.is-active {
        .el-radio-button__inner {
          color: #fff;
          background: #44a9e1;
          border: 0;
        }
      }
      &.firm {
        .el-radio-button__inner {
          width: 96px;
        }
      }
    }
  }

  .test_email_but {
    height: 28px;
  }
  .but_list {
    text-align: center;
    margin-top: 42px;
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
</style>
<style lang="scss" scoped>
.email_config {
  width: 900px;
  margin-left: 12px;
  background: #fff;
  // position: fixed;
  .email_config_header {
    margin: 0 40px;
    margin-top: 9px;
    position: relative;
    height: 60px;
    line-height: 60px;
    > span {
      color: #aaaaaa;
      font-size: 12px;
    }
    .el-button {
      position: absolute;
      right: 0;
      margin-top: 15px;
      height: 30px;
      padding: 0;
      width: 100px;
    }
  }
  .el-table {
    margin-left: 40px;
  }
  .form_data_item {
    span {
      &.go_email_server {
        position: absolute;
        top: -42px;
        left: 48px;
        color: #44a9e1;
        font-size: 12px;
        a {
          text-decoration: underline;
        }
      }
    }
  }
  .go_email_server {
    color: #44a9e1;
    font-size: 12px;
    a {
      text-decoration: underline;
    }
  }
}
.mail-tab-item-unselect {
  height: 46px;
  border-bottom: 4px solid #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 15px;
}

.mail-tab-item-select {
  height: 46px;
  border-bottom: 4px solid #66b9ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #66b9ff;
  font-size: 15px;
}
</style>
