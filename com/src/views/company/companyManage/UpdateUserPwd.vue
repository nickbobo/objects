<template>
  <div class="update-user-pwd">
    <div class="choice-type-layout">
      <el-form
        :model="formData"
        :rules="rulesFormLeft"
        ref="formData"
        :disabled="!isEditInfo"
      >
        <div class="input-row">
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">用户名</span>
            <el-form-item prop="Username">
              <el-input
                v-model="formData.Username"
                placeholder="请输入用户名"
                class="form_input"
                maxlength="30"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </div>
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">原密码</span>
            <el-form-item prop="OldPassword">
              <el-input
                v-model="formData.OldPassword"
                placeholder="请输入原密码"
                class="form_input"
                maxlength="30"
                show-password
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="input-row">
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">新密码</span>
            <el-form-item prop="NewPassword">
              <el-input
                v-model="formData.NewPassword"
                placeholder="请输入新密码"
                class="form_input"
                maxlength="30"
                show-password
              ></el-input>
            </el-form-item>
          </div>

          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">确认密码</span>
            <el-form-item prop="RePassword">
              <el-input
                v-model="formData.RePassword"
                placeholder="请输入新密码"
                class="form_input"
                maxlength="30"
                show-password
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>

    <div class="submit-btn-layout but_list">
      <button
        class="w-btn btn-md-w btn-cancel"
        v-if="isEditInfo"
        @click="isEditInfo = false" type='button'
      >
        取消
      </button>
      <button class="w-btn btn-md-w" type='button' @click="submitSave('formData')">
        {{ isEditInfo ? "保存" : "编辑" }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { EdtPassword } from "api/companyApi";
export default {
  name: "resume-preview", //公司信息
  computed: {
    ...mapGetters(["user_info"])
  },
  data() {
    return {
      msg: "",
      isEditInfo: false,
      formData: {
        Username: "",
        NewPassword: "",
        OldPassword: "",
        RePassword: ""
      },
      rulesFormLeft: {
        Username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        NewPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        OldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        RePassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    // 重置密码
    submitSave() {
      var that = this;
      if (!this.isEditInfo) {
        this.isEditInfo = !this.isEditInfo;
        return;
      }
      this.$refs["formData"].validate(valid => {
        if (valid) {
          if (that.formData.NewPassword != that.formData.RePassword) {
            this.$message.error("两次密码输入不一致，请重新输入!");
            return;
          }
          EdtPassword(that.formData).then(res => {
            if (res.data.Success) {
              this.$message.success("修改成功");
            } else {
              this.$message.error(res.data.Message);
            }
          });
        }
      });
    }
  },
  created() {},
  mounted() {
    this.formData.Username = this.user_info.Username; // 设置修改密码时用户名的值
  }
};
</script>

<style lang="scss" scoped>
.update-user-pwd {
  width: 100%;
  margin-bottom: 10px;
  .choice-type-layout {
    margin-top: 15px;
    .input-row {
      display: flex;
      .choice-tag-div {
        position: relative;
        padding-left: 9em;
        padding-right: 25px;
        width: 50%;

        .choice-type-layout-tag-text {
          position: absolute;
          left: 5px;
          top: 0;
          line-height: 34px;
          color: #999;
          width: 8em;
        }
        .el-form-item {
          margin-bottom: 20px;
          /deep/ .el-input__inner {
            height: 38px;
          }
          /deep/ .el-form-item__content {
            line-height: 38px;
            height: 38px;
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
