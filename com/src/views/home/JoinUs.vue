<template>
  <div class="w-body c-bg">
    <!-- 搜索结果 -->
    <div class="container">
      <div class="about-wrap">
        <div class="w-title">
          <h2>加入我们</h2>
        </div>
        <div class="about-us">
          <img src="../../../static/img/join-us.jpg" alt="加入我们">
        </div>
        <div class="aritle">
          <p>中智人才借助中智的行业品牌、客户资源和央企的独特背景，致力于建立猎聘赋能服务平台，并希望通过整合社会各方猎聘专业服务资源建立人力资本专业服务的生态圈。欢迎各行各业专业人士加入我公司。</p>
          <p>您可通过以下方式与我们取得联系</p>
          <ul class="lxr">
            <li><span>联系人：</span>Shirley</li>
            <li><span>电话：</span>021-54594545-6325</li>
            <li><span>邮件：</span><a href="mailto:shirleyxy@ciicsh.com">shirleyxy@ciicsh.com</a></li>
          </ul>
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
<style lang="scss">

</style>
<style scoped lang="scss">

// .app-body {
//   &.blue {
//     background: #f6f6f8 url(~/static/img/page-bg.jpg) no-repeat top center;
//   }
// }
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

.about-wrap .aritle .lxr li {
  margin-top: 15px;
}
.about-wrap .aritle .lxr li span {
  display: inline-block;
  width: 5em;
}

.about-wrap .aritle > ul li {
  margin-bottom: 10px;
}
</style>
