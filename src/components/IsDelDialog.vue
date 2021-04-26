<template>
  <el-dialog
    custom-class="modal-overlay"
    :visible.sync="isShowDelDialog"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    :destroy-on-close="true"
  >
    <div class="modal-box modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          <div class="del-tip">
            确定删除该段{{titles}}?
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="w-btn btn-primary"
            @click="isShowDelDialog = false"
          >
            取消
          </button>
          <button type="button" class="w-btn" @click="onShowPopovers.next()">
            确定
          </button>
        </div>
      </div>
      <button class="close" type="button" @click="isShowDelDialog = false">
        <span class="iconfont icon-close"></span>
      </button>
    </div>
  </el-dialog>
</template>

<script>
// import { updatePassword } from "../api/api";
export default {
  name: "is-del-dialog", //简历预览
  props:['titles'],
  data() {
    return {
      msg: "",
      onShowPopovers:null,
      activeItem:{},
      isShowDelDialog:false
    };
  },
  // components: {
  //   navbar
  // },
  methods: {
        /**
    generator函数*
     */
    *generator() {
      this.isShowDelDialog = true;
      yield "提交";
      // this.onDelWorkExp();
      this.$emit("callbackFun",this.activeItem)
    },
    async showIsDel(item) {
      this.activeItem = item;
      this.onShowPopovers = await this.generator();
      this.onShowPopovers.next();
    },
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>

// @import "../../static/less/modal.scss";
</style>
