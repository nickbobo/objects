<template>
  <div class="about_us">
    <el-dialog :visible.sync="isShowDialog" width="925px" class="pop_up_dialog" :modal-append-to-body="false" :close-on-click-modal="false">
      <div class="top_pic">
      </div>
      <div class="msg-out">
        <div class="msg-content">
          人才拼图网站为人才数据专业平台,由中智集团及中智上海经济技术合作有限公司旗下从事专业猎聘、招聘流程外包（RPO）和猎聘解决方案的上海中智人才顾问咨询有限公司负责运营。
        </div>
      </div>
      <div class="msg-out">
        <div class="msg-content">
          中国国际技术智力合作有限公司（简称中智，英文缩写CIIC），总部位于北京，成立于1987年6月，是国务院国有资产监督管理委员会管理的，以主营人力资源业的国有重点骨干企业(中央企业)。作为中国领先的人力资源企业，中智以20余个主要省会城市为中心，建立了覆盖31个省、自治区、直辖市的375个城市的全国性线下服务组织网络、信息平台、专业团队和服务体系，通过发挥跨区域集团优势，为客户提供优质服务。
        </div>
      </div>
      <div class="msg-out">
        <div class="msg-content">
       成立于2000年的上海中智人才顾问咨询有限公司 （以下简称中智人才）是中智旗下从事中高端猎头、招聘及招聘流程外包和猎聘解决方案的专业服务公司。 
        </div>
      </div>
      <div class="msg-out">
        <div class="msg-content">
          余年的专业经营，中智人才不仅成为中国猎聘服务行业的常青藤公司，同时为各行各业的中外企业提供数以千计的中高级管理人员，并打造了具有丰富行业经验的顾问队伍。此外，借助中智的行业品牌和客户资源，中智人才致力于建立猎聘赋能服务平台以整合社会各方猎聘专业服务资源，为中智及猎聘服务合作方客户提供高效、专业及个性化的服务方案。
        </div>
      </div>
      <div class="bottom_pic">
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
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
  height: 100px;
  background-image: url("/static/img/about_us.png");
  background-position: 15% 50%;
  background-repeat: no-repeat;
}
.bottom_pic {
  height: 195px;
  background-image: url("/static/img/about_us_bottom.png");
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
.msg-out {
  border-left: 4px solid #CFE5F1;
  margin: 0 10px 30px 15px;
  .msg-content {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    margin-left: 35px;
  }
}
.msg-out:nth-child(2),.msg-out:nth-child(3),.msg-out:nth-child(4){
  margin-top: 30px;
}
</style>
