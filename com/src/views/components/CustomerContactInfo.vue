<template>
  <div class="customer_contact_info">
    <span class="title">信息隐藏，请联系客户服务</span>

    <el-popover
      placement="bottom"
      popper-class="contact_info"
      width="100"
      trigger="click"
    >
      <div class="contact_info_content">
        <span class="content_title">客服联系方式：</span>
        <div>
          <el-row>
            <svg-icon
              icon-class="phone"
              class="icon-edit icon-svg-but"
            />021-54594548 <span class="svg_title">（直线）</span>
          </el-row>
          <el-row>
            <svg-icon
              icon-class="mail"
              class="icon-mail icon-svg-but"
            />shirleyxy@ciicsh.
          </el-row>
        </div>
      </div>
      <el-button type="" slot="reference" type="button">我要联系</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "CustomerContactInfo", //客服联系信息
  data() {
    return {
      msg: ""
    };
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";
.customer_contact_info {
  font-size: 12px;
  @include df;
  @include df-ai;
  position: relative;
  z-index: 999;
  height: 40px;
  white-space: nowrap;
  .title {
    background: #dae9ef;
    line-height: 13px;
    color: #333;
  }
  .el-button {
    padding: 3px 6px;
    font-size: 12px;
    height: 20px;
    width: 60px;
    margin-left: 4px;
  }
}
.el-popover {
  &.el-popper {
    &.contact_info {
      width: 280px !important;
      height: 148px !important;
      padding: 21px;
      .content_title {
        font-size: 14px;
        font-weight: 600;
        display: block;
        margin-bottom: 25px;
      }
      .icon-svg-but {
        font-size: 15px;
        color: #44a8e1;
        width: 40px;
        &.icon-mail {
          font-size: 20px;
        }
      }
      .svg_title {
        color: #A9A9A9;
      }
      .contact_info_content {
        > div {
          font-size: 14px;
          color: #44a8e1;
          .el-row {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
