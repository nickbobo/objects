<template>
  <div class="w-body c-bg">
    <!-- 搜索结果 -->
    <div class="container">
      <div class="about-wrap">
        <div class="w-title">
          <h2>关于我们</h2>
        </div>
        <div class="about-us">
          <img src="../../../static/img/about-us.jpg" alt="关于我们">
        </div>
        <div class="aritle">
          <p>人才拼图网站为人才数据专业平台,由中智集团及中智上海经济技术合作有限公司旗下从事专业猎聘、招聘流程外包（RPO）和猎聘解决方案的上海中智人才顾问咨询有限公司负责运营。</p>
          <p>
            中国国际技术智力合作有限公司（简称中智，英文缩写CIIC），总部位于北京，成立于1987年6月，是国务院国有资产监督管理委员会管理的，以主营人力资源业的国有重点骨干企业(中央企业)。作为中国领先的人力资源企业，中智以20余个主要省会城市为中心，建立了覆盖31个省、自治区、直辖市的375个城市的全国性线下服务组织网络、信息平台、专业团队和服务体系，通过发挥跨区域集团优势，为客户提供优质服务。
          </p>
          <p>成立于2000年的上海中智人才顾问咨询有限公司 （以下简称中智人才）是中智旗下从事中高端猎头、招聘及招聘流程外包和猎聘解决方案的专业服务公司。</p>
          <p>
            集20余年的专业经营，中智人才不仅成为中国猎聘服务行业的常青藤公司，同时为各行各业的中外企业提供数以千计的中高级管理人员，并打造了具有丰富行业经验的顾问队伍。此外，借助中智的行业品牌和客户资源，中智人才致力于建立猎聘赋能服务平台以整合社会各方猎聘专业服务资源，为中智及猎聘服务合作方客户提供高效、专业及个性化的服务方案。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//关于我们
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>
<style scoped lang="scss">

.container { 
  width: $con-w;
  position: relative;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.w-title {
  position: relative;
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
}
.w-title h2 {
  font-size: 20px;
  line-height: 1;
}
.w-body {
  padding-top: 30px;
  padding-bottom: 35px;
}

// 关于我们
.about-wrap {
  padding: 25px 55px;
  background-color: #fff;
  img{
    width: 100%;
  }
}

.about-wrap .w-title {
  padding-left: 20px;
  border-bottom: none;
}

// .about-wrap .w-title:before {
//   content: "";
//   width: 5px;
//   height: 20px;
//   position: absolute;
//   top: 20px;
//   left: 0;
//   background: #80b4ee;
// }

.about-wrap .aritle {
  margin-top: 30px;
  padding-bottom: 50px;
  font-size: 15px;
}

.about-wrap .aritle p {
  margin-top: 30px;
}
</style>
