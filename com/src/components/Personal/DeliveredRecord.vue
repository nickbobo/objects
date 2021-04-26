<template>
  <section>
    <div class="delivered-record_content">


      <el-row v-if="delivered_record_total == 0">
        <el-col :span="24">
          <span class="svg-folder">
            <svg-icon icon-class="icon-blank">item</svg-icon>
          </span>
        </el-col>
        <el-col :span="24">您还没有投递任何职位哦~</el-col>

        <el-col :span="24">
          <el-button
            size="medium"
            class="upload_resume"
            @click="onLookePosition"
            >现在就去看看工作机会</el-button
          >
        </el-col>
      </el-row>
      <position
        ref="position"
        v-show="delivered_record_total > 0"
        :isShowPositionApplyBut="true"
      ></position>
    </div>
  </section>
</template>

<script>
import position from "views/PositionComponent";
import { mapGetters } from "vuex";
export default {
  name: "DeliveredRecord", //个人中心---简历管理
  components: {
    position
  },
  computed: {
    ...mapGetters(["delivered_record_total"])
  },
  data() {
    return {
      msg: "",
      isShow: false
    };
  },
  methods: {
    onCreationResume() {
      this.$router.push({ path: "/resume" }).catch(err => {});
    },
    onLookePosition() {
      this.$router.push({ path: "/position" }).catch(err => {});
    }
  },
  created() {},
  mounted() {
    this.$refs.position.GetMyDeliveryList();
  }
};
</script>
<style lang="scss">
.delivered-record_content {
  .el-button {
    &.upload_resume {
      padding: 0;
      width: 388px;
      height: 40px;
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(68, 169, 225, 1);
      margin-top: 39px;
    }
  }
}
</style>
<style lang="scss" scoped>
.delivered-record_content {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  .svg-folder {
    color: #ddd;
    font-size: 42px;
    margin: 90px auto 30px auto;
    display: block;
  }
  .null_resume {
    margin-top: 72px;
  }
}
</style>
