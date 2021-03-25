<template>

  <div class="home">
    <div class="product">
      <div class="com">战宇科技</div>
      <div class="type">AirPods一二三代电池更换维修</div>
      <div class="issue">
        <div class="issue-item">降噪杂音 断链 不充电</div>
        <div class="issue-item">声音小 进水 破音</div>
        <div class="issue-item">电池无痕无损更换</div>
        <div class="issue-item">原装正品电池</div>
      </div>
      <div class="promise">
        耳机充电仓免费清洁，承诺质保90天
      </div>
    </div>
    <el-button icon="el-icon-download" circle type="mini" @click="saveImage('Top3Img', '工时最多前三原因')"></el-button>
    <div v-if="false">
      <div class="home_bg"></div>
      <div class="content">
        <h4>2019阀门世界亚洲博览会暨研讨会</h4>
        <div>
          时间：2019/08/28 09:00~2019/08/29 17:00<br />地址：上海世博展览馆，中国上海浦东新区国展路1099号<br />联系电话Tel:0086-21-63519609<br />联系邮箱Email:
          vwasia.expo@kci-world.com
        </div>
      </div>
      <div class="menu">
        <div class="item" v-for="(item, index) in menuList" :key="index" @click="goPage(index)">
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

  </div>
</template>
<style lang="scss" scoped>
  .home {
    .product {
      width: 500px;
      height: 500px;
      border: 1px solid #000;
      position: relative;
      display: body;
      font-weight:bold;
      background:#fff;
      border:5px solid #3b77fb;
      border-radius:20px;

      .promise{
        background:#f98133;
        color:#fff;
        font-size: 22px;
        width: 360px;
        margin-top: 10px;
      }
      .issue {
        margin-left: 30px;

        div {
          padding: 5px 10px;
          background: #e62837;
          color: #fff;
          width: 200px;
          font-size: 20px;
          font-weight: bold;
          margin-top: 15px;
          border-radius: 30px;
        }
      }

      .com {
        /* position:absolute; */
        /* top: 0; */
        /* let:0; */
        width: 180px;
        padding: 5px;
        color: #fff;
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 5px;
        background: #3b77fb;
        border-bottom-right-radius: 20px;
      }

      .type {
        width: 100%;
        font-weight: bold;
        font-size: 30px;
        color: #b52838;
      }
    }
  }
</style>

<script>
  export default {
    name: 'home',

    data() {
      return {
        fileUrl: '',
        showPdf: false,
        contractVisable: false,
        menuList: [
          {
            icon:
              'https://static.31meijia.com/img/mobisite/templateIcons/column/persons.png',
            title1: '观众预登陆',
            title2: 'Visitor'
          },
          {
            icon:
              'https://static.31meijia.com/img/mobisite/templateIcons/column/地图导航.png',
            title1: '展位平面图',
            title2: 'Floorplan'
          },
          {
            icon:
              'https://static.31meijia.com/img/mobisite/templateIcons/column/抽奖_1.png',
            title1: '研讨会报名',
            title2: ''
          },
          {
            icon:
              'https://static.31meijia.com/img/mobisite/templateIcons/column/抽奖_1.png',
            title1: 'Conf',
            title2: 'Registration'
          },
          {
            icon:
              'https://static.31meijia.com/img/mobisite/templateIcons/column/clipboard.png',
            title1: '研讨会议程',
            title2: '培训课程'
          },
          {
            icon:
              'https://static.31meijia.com/img/mobisite/templateIcons/column/clipboard.png',
            title1: 'Conf Program',
            title2: ''
          },
          {
            icon:
              'https://static.31meijia.com/img/mobisite/templateIcons/column/指南.png',
            title1: '逸散泄露',
            title2: ''
          },
          {
            icon:
              'https://static.31meijia.com/img/mobisite/templateIcons/column/指南.png',
            title1: 'FE Course',
            title2: ''
          }
        ]
      }
    },
    // 观众预登陆 展位平面图 研讨会报名 Conf 研讨会议程 conf Program 逸散泄露 培训课程
    // FE Course
    methods: {
      goPage(status) {
        switch (status) {
          case 0:
            this.$router.push({ path: '/viewer' }) //观众登记
            // this.$router.push({ path: "/exhibitor" }); //观众登记
            break
          case 1:
            this.downloadFile(
              '文件名.pdf',
              'http://image.cache.timepack.cn/nodejs.pdf'
            )
            break
        }
      },

      downloadFile(fileName, url) {
        if (!url) {
          return
        }
        // let url = window.URL.createObjectURL(new Blob([data]));
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    max-width: 640px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .home_bg {
      background-image: url('https://uimg.31meijia.com//Uploads/Files/2019/05/05/f2d029e4ee154379a89f88c0df5845b8.jpg');
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

    .content {
      position: relative;
      top: 200px;
      width: 100%;
      color: #6e6e6e;

      h4 {
        font-size: 20px;
        margin-bottom: 5px;
        font-weight: bold;
        overflow: hidden;
      }

      div {
        width: 100%;
        text-align: center;
      }
    }

    .menu {
      margin-top: 250px;
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
        color: #fff;
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