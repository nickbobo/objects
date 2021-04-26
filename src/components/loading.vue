<template>
  <div v-if="show" class="lds-spinner">
    <el-dialog
      :visible.sync="show"
      :modal-append-to-body="false"
      :show-close="false"
      :modal="false"
      :append-to-body="true"
      center
      class="loading_dialog"
    >
      <el-row class="upload_loading_dialog">
        <el-col :span="24">
          <svg-icon
            icon-class="loading"
            class="icon-svg-but loading_svg_icon"
          />
        </el-col>
      </el-row>
      <!-- <span slot="footer" class="dialog-footer"></span> -->
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Loading",
  props: {
    show: Boolean
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.loading_dialog {
  .el-dialog {
    margin: 0 !important;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff00;
  }
}

</style>
<style lang="scss" scoped>
.upload_loading_dialog {
  text-align: center;
  margin-top: -15px;
  margin-bottom: 40px;
  .loading_svg_icon {
    font-size: 36px;
    color: #44a8e1;
    margin-bottom: 30px;

    -webkit-transform: rotate(360deg);
    animation: rotation 3s linear infinite;
    -moz-animation: rotation 3s linear infinite;
    -webkit-animation: rotation 3s linear infinite;
    -o-animation: rotation 3s linear infinite;
  }
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.lds-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.spinner {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  .double-bounce1,
  .double-bounce2 {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #ff000f;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: bounce 2s infinite ease-in-out;
    animation: bounce 2s infinite ease-in-out;
  }
  .double-bounce2 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
}

@-webkit-keyframes bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
