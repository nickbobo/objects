<template>
  <div class="basic-info">
    <div class="user_info">
      <el-form
        ref="userInfo"
        label-position="top"
        :rules="rulesUserInfo"
        label-width="80px"
        :model="userInfo"
      >
        <el-form-item label="姓名" prop="Name">
          <el-input v-model="userInfo.Name" :disabled="editStatus"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select
            v-model="userInfo.Gender"
            placeholder="性别"
            :disabled="editStatus"
          >
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机">
          <el-input v-model="userInfo.Mobile" readonly></el-input>
          <el-button
            class="edit_mobile"
            type="primary"
            @click="onEditMobile"
            v-if="!editStatus"
            >更换</el-button
          >
        </el-form-item>

        <el-form-item label="邮箱" prop="Email">
          <el-input v-model="userInfo.Email" :readonly="editStatus"></el-input>
        </el-form-item>

        <el-form-item v-if="editStatus" class="form_edit_but">
          <el-button
            type="primary"
            size="medium"
            @click="onEdit"
            class="edit_but"
            >编辑</el-button
          >
        </el-form-item>

        <el-form-item v-if="!editStatus" class="edit_form_but">
          <el-button
            type="primary"
            size="medium"
            @click="onCancel"
            class="cancel_but"
            >取消</el-button
          >
          <el-button
            type="primary"
            size="medium"
            @click="onSave('userInfo')"
            class="save_but"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <edit-mobile ref="editMobile"></edit-mobile>
  </div>
</template>
<script>
import { deepCopyTwo } from "@/utils/index";
import { isWscnEmail } from "@/utils/validate";
import { UpdateMyInformation } from "@/api/candidate";
import EditMobile from "@/components/EditMobile";
export default {
  name: "BasicInfo",
  components: { EditMobile },
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
      mobileMsg: "",
      mobileCodeMsg: "",
      rulesUserInfo: {
        Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        Email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateEmail }
        ]
      },
      editStatus: true,
      userInfo: {
        Name: "",
        Gender: "",
        Email: "",
        Mobile: ""
      },
      userInfos: { Name: "", Gender: "", Email: "", Mobile: "" }
    };
  },
  created() {},
  methods: {
    init(userinfo) {
      this.userInfos = userinfo;
      this.userInfo = deepCopyTwo(userinfo);
      this.$forceUpdate();
    },
    onSave(userInfo) {
      this.$refs[userInfo].validate(valid => {
        if (valid) {
          UpdateMyInformation(this.userInfo).then(res => {
            if (res.data.Success) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.onSuccess();
              this.$store.dispatch("MyInformation", true);
            } else {
            }
          });
        } else {
          return false;
        }
      });
    },
    onEdit() {
      this.editStatus = false;
    },
    onEditMobile() {
      this.$refs.editMobile.onEditMobile(this.userInfo.Mobile);
    },

    onSuccess() {
      this.editStatus = true;
      this.userInfo = this.userInfo;
      this.$forceUpdate();
    },
    onCancel() {
      this.editStatus = true;
      this.userInfo = deepCopyTwo(this.userInfos);
      this.$forceUpdate();
    }
  }
};
</script>
<style lang="scss">
.basic-info {
  .user_info {
    .edit_but {
      width: 172px;
      height: 42px;
      background: #44a9e1;
    }
    .form_edit_but {
      margin-top: 52px;
    }
    .edit_form_but {
      margin-top: 52px;
      .el-button {
        width: 124px;
        height: 42px;
        font-size: 16px;
        &.cancel_but {
          background: #fff;
          color: #44a9e1;
          border: 2px solid rgba(68, 169, 225, 1);
        }
        &.save_but {
          margin-left: 16px;
        }
      }
    }

    .el-form-item__label {
      line-height: 0;
      padding: 0;
      font-size: 14px;
      font-weight: 300;
      color: #888;
    }
    .el-input.is-disabled .el-input__inner {
      color: #333;
      background-color: #fff;
      line-height: 0;
      height: auto;
      margin-top: 20px;
      padding-bottom: 10px;
    }
    .el-input__inner {
      width: 100%;
      padding-left: 0;
      border-top-width: 0px;
      border-left-width: 0px;
      border-right-width: 0px;
      border-bottom-width: 1px;
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      border-radius: 0;
      /*outline: medium;*/
    }
    .el-select {
      width: 100%;
    }
    .el-form-item__content {
      text-align: center;
    }
    button.el-button.edit_mobile.el-button--primary {
      position: absolute;
      margin-left: -78px;
      margin-top: 15px;
      width: 52px;
      color: #44a9e1;
      top: 0;
      right: 0;
      padding: 0;
      height: 20px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(68, 169, 225, 1);
      border-radius: 4px;
    }
  }
  .edit-mobile_dialog {
    .el-dialog__body {
      width: 80%;
      margin-left: 10%;
    }
    .edit_mobile_dialog .el-col {
      text-align: center;
    }
    button.el-button.get_code.el-button--default {
      position: absolute;
      margin-left: -78px;
      margin-top: 2px;
      font-size: 14px;
      width: 70px;
      color: #44a9e1;
      padding: 0;
      height: 36px;
      background: #fff;
      border: 0;
      border-radius: 4px;
    }
    .affirm_edit {
      width: 100%;
      // margin-left: 10%;
      background: #44a8e1;
      margin-top: 30px;
    }

    span.el-dialog__title {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    i.el-dialog__close.el-icon.el-icon-close {
      color: #44a8e1;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .edit-mobile_dialog_con {
    .el-dialog {
      width: 400px;
      height: 500px;
    }
  }
}
</style>
<style lang="scss" scoped>
.edit-mobile_dialog {
  span {
    width: 100%;
    text-align: center;
  }
}

.dialog_title {
  color: #888888;
  font-size: 14px;
}
.user_mobile_title {
  margin-top: 10px;
  span {
    font-weight: bold;
    color: #000;
    font-size: 18px;
  }
}
</style>
