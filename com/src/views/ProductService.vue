<template>
  <section>
   <img class="userinfo_bg" src="../../static/img/server_banner.png" />
   <div class="headdiv">
    <el-image :src="src1" style="margin-right:120px"></el-image>
    <el-image :src="src2" style="margin-right:120px"></el-image>
    <el-image :src="src3" ></el-image>
  </div>

  <div  class="text">
      他们也在这里招聘
  </div>

    <div class="divimg">
      <div  class="titleImg">
        <img class="logurl" src="../../static/img/com_1.png" />
        <img class="logurl" src="../../static/img/com_2.png" />
        <img class="logurl" src="../../static/img/com_3.png" />
        <img class="logurl" src="../../static/img/com_3.png" />
      </div>
         <div class="titleImg">
        <img class="logurl" src="../../static/img/com_1.png" />
        <img class="logurl" src="../../static/img/com_2.png" />
        <img class="logurl" src="../../static/img/com_3.png" />
        <img class="logurl" src="../../static/img/com_3.png" />
      </div>
       <div  class="titleImg">
        <img class="logurl" src="../../static/img/com_1.png" />
        <img class="logurl" src="../../static/img/com_2.png" />
        <img class="logurl" src="../../static/img/com_3.png" />
        <img class="logurl" src="../../static/img/com_3.png" />
      </div>
   </div>
   <div class="foot" >
     <div style="float:left">
      <img  src="../../static/img/server_botton.png" class="imgwidth"/>  
     </div>
    <div style="float:left">
      <div class="textFoot">
          感受不一样的招聘体验！
      </div>
       <div style="margin-top:36px">
         <input type="button" class="btn" value="立即加入"  >
      </div>
     
   </div>
   <div style="clear: both;"></div>

   </div>

  </section>
</template>


<script>
// import { updatePassword } from "../api/api";
export default {
  name: "product-service",  //产品服务
  data() {
    return {
      src1: '../../static/img/server_1.png',
      src2: '../../static/img/server_2.png',
      src3: '../../static/img/server_3.png',
    
    };

    
  },
  // components: {
  //   navbar
  // },
  methods: {

  },
  created() {
  },
  mounted() {
  }
};
</script>

<style  lang="scss" scoped>
@import "~@/styles/mixin.scss";
  .userinfo_bg {
  
    min-width:1200px;
    height: auto;
  }
   .logurl {
    margin-right:30px;
    width: 240px;
    height: 88px;

  }
  .imgwidth
  {

    height:318px;
    width:540px

  }
  .headdiv
  {
    width:963px;
    margin:72px auto;
    text-align:center

  }
  .divimg{

    margin:56px auto;
    width:1050px

  }
  .titleImg
  {
    margin-top:24px;
    display: -webkit-flex;
  }
 .btn {
    border-radius:6px;
    background-color: #44a9e1;
    height: 52px;
    width: 200px;
    margin-left: 160px;
    color: #ffffff;
    font-size: 16px;
  }
  .text{
      text-align:center;
      color:#333333;
      font-size:24px;
      margin:72px auto;
      width:963px

  }
  .foot{
    margin:80px auto;
    width:1050px;
    height:320px
  }
  .textFoot{
    text-align:center;
    color:#333333;
    font-size:18px;
    margin-top:106px;
    margin-left:160px;
    font-weight: bold
  }

</style>
