

<template>
  <div class="overheadInfor">
    <el-row>
      <el-row class="basic-info">
        <el-col :span="23" class="user-headimg title_font_mix18">技能标签</el-col>
        <el-col :span="1" v-if="true">
          <svg-icon v-if="$store.getters.resume_status" icon-class="edit" class="icon-edit icon-svg-but" />
        </el-col>
      </el-row>
      <el-row class="content">
        <el-col :span="3">用户增长</el-col> <el-col :span="3">用户增长</el-col><el-col :span="3">用户增长</el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "OverheadInfor",
  created() {
    this._navbar = true;
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.skill {
  margin-top: 20px;
  background: #fff;
  font-size: 14px;
  color: #333333;
  .basic-info {
    border-top: 1px solid #dddddd;
    padding-top: 30px;
    img {
      @include wh(150px, 150px);
    }
    .user-info {
      padding-left: 20px;
      .el-col {
        @include lineH(40px);
      }
    }
  }
  .info-content {
    .el-row {
      @include lineH(40px);
    }
    .title_sty {
      text-align: right;
      padding-right: 35px;
    }
  }

  .work-exp-list {
    .work-exp-item {
      margin-top: 10px;

      .el-row {
        margin-top: 18px;
        &.job_duties {
          margin-top: 0px;
        }
        &.company_profile {
          color: #888888;
        }
        .icon-edit {
          margin-left: -10px;
        }
      }
    }
  }

  .content {
    margin-top: 20px;
    .el-col {
      background: #eee;
      border-radius: 12px;
      padding: 4px 11px;
      font-size: 14px;
      text-align: center;
      margin-right:24px;
    }
  }
}
</style>
