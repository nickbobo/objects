<template>
  <section>
    <div class="header-cont">
      <span class="svg-container" v-for="(item,index) in svgList" :key="index">
          {{item}}<br/><br/>
        <svg-icon :iconClass="item">item</svg-icon>
      </span>
    </div>
  </section>
</template>


<script>
// import { updatePassword } from "../api/api";
export default {
  name: "SvgShowList",
  data() {
    return {
      msg: "",
      svgList: []
    };
  },

  methods: {},
  created() {
    const req = require.context("../icons/svg", false, /\.svg$/).keys();
    for (let item of req) {
      this.svgList.push(item.slice(2).split(".")[0]);
    }
  },
  mounted() {}
};
</script>

<style  lang="scss" scoped>
span{
    width:100px;
    height:100px;
    margin:30px;
}
.svg-container {
  padding: 6px 5px 6px 15px;
  color: rgb(32, 132, 249);
  vertical-align: middle;
  fill: rgb(32, 132, 249);
  display: inline-block;
}
</style>
