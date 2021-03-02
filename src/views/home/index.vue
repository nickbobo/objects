<template>
  <div class="home">
    <div class="home_bg"></div>
    <div></div>
    <div class="menu">
      <div class="item" v-for="(item, index) in menuList" :key="index" @click="goPage">
        <div class="item-con">
          <div class="icon"><img :src="item.icon" /></div>
          <div class="title">
            <span class="title1">{{ item.title1 }}</span>
            <span class="title2">{{ item.title2 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",

  data() {
    return {
      fileUrl: "",
      showPdf: false,
      contractVisable: false,
      menuList: [
        {
          icon:
            "https://static.31meijia.com/img/mobisite/templateIcons/column/persons.png",
          title1: "观众预登陆",
          title2: "Visitor",
        },
        {
          icon:
            "https://static.31meijia.com/img/mobisite/templateIcons/column/地图导航.png",
          title1: "展位平面图",
          title2: "Floorplan",
        },
        {
          icon:
            "https://static.31meijia.com/img/mobisite/templateIcons/column/抽奖_1.png",
          title1: "研讨会报名",
          title2: "",
        },
        {
          icon:
            "https://static.31meijia.com/img/mobisite/templateIcons/column/抽奖_1.png",
          title1: "Conf",
          title2: "Registration",
        },
        {
          icon:
            "https://static.31meijia.com/img/mobisite/templateIcons/column/clipboard.png",
          title1: "研讨会议程",
          title2: "培训课程",
        },
        {
          icon:
            "https://static.31meijia.com/img/mobisite/templateIcons/column/clipboard.png",
          title1: "Conf Program",
          title2: "",
        },
        {
          icon:
            "https://static.31meijia.com/img/mobisite/templateIcons/column/指南.png",
          title1: "逸散泄露",
          title2: "",
        },
        {
          icon:
            "https://static.31meijia.com/img/mobisite/templateIcons/column/指南.png",
          title1: "FE Course",
          title2: "",
        },
      ],
    };
  },
  // 观众预登陆 展位平面图 研讨会报名 Conf 研讨会议程 conf Program 逸散泄露 培训课程
  // FE Course
  methods: {
    goPage() {
      this.$router.push({ path: "/viewer" });  //观众登记
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .home_bg {
    background-image: url("https://uimg.31meijia.com//Uploads/Files/2019/05/05/f2d029e4ee154379a89f88c0df5845b8.jpg");
    background-size: 100% 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center top;
  }
  .menu {
    margin-top: 410px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    width: 50%;
    .item-con {
      height: 70px;
      overflow: overlay;
      background-image: none;
      background-color: rgba(148, 148, 148, 0.7);
      border-radius: 0px;
      transform: scale(1) rotateZ(0deg);
      display: flex;
      width: 90%;
      margin: 5%;
      align-items: center;

      .icon {
        width: 32px;
        height: 32px;
        padding-left: 20px;
        display: inline-block;
        vertical-align: middle;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        display: block;
        text-align: center;
        margin-left: 15px;
        span {
          display: block;
          width: 100%;
        }
      }
    }
  }
}
</style>
