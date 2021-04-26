<template>
  <div class="self-evaluation">
    <el-row class="basic-info  r-title">
      <el-col :span="23" class="user-headimg title_font_mix18">自我评价</el-col>
      <button class="r-fun  r-edit" type="button" v-if="fromData.SelfEvaluation">
        <span
          v-if="resume_status"
          @click="onEdit()"
          class="iconfont icon-apply"
        ></span>
      </button>
    </el-row>
    <span v-if="!fromData.SelfEvaluation  && add_resume_id" class="add-line" @click="onEdit()">
      <span v-if="resume_status">添加自我评价</span>
    </span>
    <el-row class="content" v-if="fromData.SelfEvaluation">{{
      fromData.SelfEvaluation | IsNull
    }}</el-row>

    <el-dialog
      title="自我评价"
      :visible.sync="isShowdialog"
      class="edit_dialog education_experience"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="dialogClose"
    >
      <el-form
        ref="fromData"
        label-position="top"
        :rules="rules"
        label-width="80px"
        :model="fromData"
        :hide-required-asterisk="true"
        size="small"
      >
        <el-row>
          <el-col :span="24" class="form_one_row self_evaluation">
            <el-form-item prop="Birthday">
              <el-input
                type="textarea"
                maxlength="500"
                show-word-limit
                v-model="fromData.SelfEvaluation"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="modal-footer">
          <button
            type="button"
            class="w-btn w-bt-xl btn-primary"
            @click="isShowdialog = false"
          >
            取消
          </button>
          <button
            type="button"
            @click="onSave('fromData')"
            class="w-btn w-bt-xl"
          >
            保存
          </button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { GetSelfEvaluation, EditSelfEvaluation } from "@/api/myResume";
import { mapGetters } from "vuex";
export default {
  name: "SelfEvaluation",
  computed: {
    ...mapGetters(["add_resume_id", "resume_status"])
  },
  data() {
    return {
      fromData: {
        SelfEvaluation: ""
      },
      isShowdialog: false,
      rules: {}
    };
  },
  methods: {
    resetFields() {
      this.fromData = {
        SelfEvaluation: ""
      };
    },
    datePickerChange() {
      this.$forceUpdate(); //外部js无效  只对当前组件有效
    },
    onAdd() {
      this.isShowdialog = true;
      this.resetFields();
    },
    dialogClose() {
      this.getList();
    },
    getList() {
      GetSelfEvaluation({ ResumeId: this.add_resume_id }).then(res => {
        if (res.data.Success) {
          if (res.data.Data) this.fromData = res.data.Data;
        } else {
        }
      });
    },
    editAction() {
      this.fromData.ResumeId = this.add_resume_id;
      EditSelfEvaluation(this.fromData).then(res => {
        if (res.data.Success) {
          this.isShowdialog = false;
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.Message,
            type: "error"
          });
        }
      });
    },
    onCancel() {
      this.isShowdialog = false;
    },
    onSave() {
      this.editAction();
    },
    onEdit() {
      if (this.add_resume_id === "" && !this.add_resume_id) {
        this.$message({
          message: "请先添加基本信息",
          type: "warning"
        });
        return;
      }
      this.isShowdialog = true;
    }
  },
  created() {
    if (this.add_resume_id) this.getList();
  }
};
</script>
<style lang="scss">
.form_one_row.self_evaluation {
  .el-textarea {
    width: 720px;
    margin-left: 20px;
    height: 155px;
    textarea {
      width: 720px;
      height: 155px;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.self-evaluation {
  background: #fff;
  font-size: 14px;
  color: #333333;
  .r-fun.r-edit {
    top: 0;
  }

  .content {
    // margin-top: 20px;
    padding: 15px 0;
  }
}
</style>
