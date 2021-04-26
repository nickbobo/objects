<template>
  <div class="join_us">
    <el-dialog :visible.sync="isShowDialog" width="920px" class="pop_up_dialog" :modal-append-to-body="false" :close-on-click-modal="false">
      <div class="top_pic">
      </div>
      <div class="msg-out first">
        <div class="msg-content">
          中智人才借助中智的行业品牌、客户资源和央企的独特背景，致力于建立猎聘赋能服务平台，并希望通过整合社会各方猎聘专业服务资源建立人力资本专业服务的生态圈。欢迎各行各业专业人士加入我公司。
        </div>
      </div>
      <div class="msg-out">
        <div class="msg-content">
          <ul>
            <li>您可通过以下方式与我们取得联系</li>
            <li>联系人：Shirley</li>
            <li>电话：201-54594545-6325</li>
            <li>邮件：Shirleyxy@ciicsh.com</li>
          </ul>
        </div>
      </div>
      <div class="bottom_pic">
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "JoinUs",
  props: {},
  components: {},
  data() {
    return {
      isShowDialog: false
    };
  },
  methods: {
    isShow() {
      this.isShowDialog = true;
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {}
};
</script>

<style scoped lang="scss">
.top_pic {
  height: 72px;
  background-image: url("/static/img/join_us.png");
  background-position: 15% 50%;
  background-repeat: no-repeat;
}

.bottom_pic {
  margin-top: 30px;
  height: 284px;
  background-image: url("/static/img/join_us_bottom.png");
  background-size: 100% 100%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.msg-out {
  border-left: 4px solid #cfe5f1;
  margin: 0 10px 30px 15px;
  &.first {
    margin-top: 52px;
  }
  .msg-content {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    margin-left: 35px;
  }
  ul {
    padding: 0;
  }
  ul li {
    list-style: none;
    line-height: 30px;
    font-size: 16px;
    color: #333;
    line-height: 48px;
  }
  .msg-out:nth-child(2) {
    margin-top: 72px;
  }
}
</style>
