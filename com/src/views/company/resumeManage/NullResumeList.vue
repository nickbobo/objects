<template>
  <div class="null_resume_list">
    <i class="iconfont icon-sad"></i>
    <span class="txt">
      {{ showTitle }}
    </span>
    <!-- <el-row>
      <el-col :span="24">
        <span class="svg-folder">
          <svg-icon icon-class="icon-blank">item</svg-icon>
        </span>
      </el-col>
      <el-col :span="24">{{ showTitle }}</el-col>
    </el-row> -->
  </div>
</template>
<script>
export default {
  name: "NullResumeList", //委托服务
  props: ["showTitle"],
  data() {
    return {
      resumeStatus: ""
    };
  },
  methods: {},
  mounted() {},
  created() {}
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.null_resume_list {
  // @include shadow();
  padding: 120px 0;
  text-align: center;
  background-color: #fff;
  .iconfont {
    display: block;
    font-size: 70px;
    line-height: 1;
    color: #eaeaea;
    margin-right: 25px;
    margin-bottom: 35px;
  }
  .txt {
    display: block;
    font-size: 16px;
    color: #000;
    line-height: 32px;
  }
  .w-btn {
    margin-top: 25px;
  }
}
</style>
