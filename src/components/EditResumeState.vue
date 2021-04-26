<template>
  <el-row class="edit_resume_state">
    <el-col :span="24" class="title_font_style resume_show_edit">
      <span class="svg-container">
        <svg-icon icon-class="lock" />
      </span>
      简历隐私设置
    </el-col>
    <el-col :span="24" class="resume_show_status">
      简历显示状态：{{ resumeStatus }}
      <el-popover
        placement="bottom"
        width="300"
        height="172"
        trigger="manual"
        :visible-arrow="false"
        :offset="-120"
        v-model="resumeShowStatus"
        popper-class="popover_resume_show_status"
        content
      >
        <el-row class="resume_status">
          <el-row class="resume_show_status">
            <el-radio-group v-model="resumeStatus">
              <el-radio label="隐藏简历"></el-radio>
              <el-radio label="开放简历"></el-radio>
            </el-radio-group>
          </el-row>
          <el-row class="button_content">
            <el-button class="but_cancel" @click="onCancel">取消</el-button>

            <el-button class="but_save" @click="onShowPopovers.next()"
              >确定</el-button
            >
          </el-row>
        </el-row>
        <svg-icon
          icon-class="edit"
          slot="reference"
          @click="test"
          class="icon-edit icon-svg-but"
        />
      </el-popover>
    </el-col>
  </el-row>
</template>
<script>
import { IsHideResume } from "@/api/myResume";
export default {
  name: "EditResumeState",
  data() {
    return {
      resumeStatus: "开放简历",
      resumeShowStatus: false,
      onShowPopovers: null
    };
  },
  methods: {
    /**
    generator函数*
     */
    *onShowPopover() {
      this.resumeShowStatus = true;
      yield "提交";
      IsHideResume({
        IsHide: this.resumeStatus == "开放简历" ? true : false
      }).then(res => {
        if (res.data.Success) {
          this.$message({
            message: "简历状态修改成功",
            type: "success"
          });
          this.resumeShowStatus = false;
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },
    onCancel() {
      this.resumeShowStatus = false;
    },
    async test() {
      this.onShowPopovers = await this.onShowPopover();
      this.onShowPopovers.next();
    }
  },
  mounted() {
    this.$Bus.$on("IsHide", data => {
      this.resumeStatus = data ? "开放简历" : "隐藏简历";
    });
  },
  created() {
    this._navbar = true;
  }
};
</script>
<style lang="scss">
.el-popover {
  &.popover_resume_show_status {
    margin: 0px;
    padding-top: 35px;
    padding-bottom: 53px;
    .resume_show_status {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.resume_status {
  .button_content {
    margin-top: 37px;
    &.el-row {
      width: 100%;
      display: -webkit-flex;
      justify-content: center;
      .el-button {
        width: 100px;
        height: 32px;
        padding: 0;
        &.but_save {
          margin-left: 50px;
        }
      }
    }
  }
}

.edit_resume_state {
  .svg-container {
    margin-right: 15px;
    color: #bbb;
    font-size: 20px;
  }
  .el-col {
    &.file_format {
      color: rgba(136, 136, 136, 1);
    }

    &.resume_show_status {
      font-size: 14px;
      text-align: center;
      margin-top: 32px;
      padding-left: 30px;
      .icon-edit {
        margin-left: 50px;
      }
    }
  }
}
</style>
