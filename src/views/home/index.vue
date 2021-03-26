<template>

  <div class="home">
    <el-button icon="el-icon-download" class="topbutton" circle type="mini" @click="saveImage('Top3Img', 'airpods维修主图')">生成图片并下载</el-button>
    <div class="product" id="Top3Img" ref="Top3Img" v-if="false">
      <div class="com">上海战宇科技实体店</div>
      <div class="type">AirPods一二三代电池更换维修</div>
      <div class="issue">
        <div class="issue-item">断链 续航短</div>
        <div class="issue-item">进水 不充电</div>
        <div class="issue-item">声音小 破音</div>
        <div class="issue-item">电池无损更换</div>
        <div class="issue-item">原装正品电池</div>
      </div>
      <div class="price">充电仓+双耳惊爆价<span>130</span></div>
      <div class="promise">
        耳机免费清洁，承诺质保<span>90</span>天
      </div>

      <div class="img_bg">
        <img src="./../../../static/airpods.jpg">
      </div>
    </div>


    <div class="product" id="Top3Img" ref="Top3Img" v-if='false'>
      <div class="com">波波修耳机</div>
      <div class="type">BeatsX耳机维修</div>
      <div class="issue">
        <div class="issue-item">单耳响 有杂音</div>
        <div class="issue-item">不开机 红白灯</div>
        <div class="issue-item">闪红灯 换头梁</div>
        <div class="issue-item">续航短 换电池</div>
        <div class="issue-item">头梁无损更换</div>
      </div>
      <div class="price">头梁+电池惊爆价<span>90</span></div>
      <div class="promise">
        更换都是原装配件，承诺质保<span>90</span>天
      </div>

      <div class="img_bg beatsx">
        <img src="./../../../static/beatsx.jpg">
      </div>
    </div>


    <div class="product" id="Top3Img" ref="Top3Img">
      <div class="com">波波修耳机</div>
      <div class="type">AirPods Pro耳机维修</div>
      <div class="issue">
        <div class="issue-item">降噪 异常</div>
        <div class="issue-item">耳机 破音</div>
        <div class="issue-item">进水 不开机</div>
        <div class="issue-item">更换 电池</div>
        <div class="issue-item">更换 外壳</div>
      </div>
      <!-- <div class="price">头梁+电池惊爆价<span>90</span></div> -->
      <div class="promise">
        更换都是原装配件，承诺质保<span>90</span>天
      </div>

      <div class="img_bg airpodspro">
        <!-- <img src="./../../../static/airpodspro1.jpg"> -->
        <img src="./../../../static/airpodspro.jpg">

      </div>
    </div>



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
    .topbutton {
      margin-bottom: 600px;
    }

    .product {
      width: 500px;
      height: 500px;
      border: 1px solid #000;
      position: relative;
      display: body;
      font-weight: bold;
      background: #fff;
      border: 15px solid #3b77fb;
      border-radius: 20px;
      margin-bottom: 1000px;

      .img_bg {
        width: 240px;
        height: 240px;
        position: absolute;
        top: 100px;
        right: 10px;
        img {
          width: 100%;
        }
      }

      .beatsx {
        top: 130px;
        right: 0;

        img {
          width: 90%;
        }
      }

      .airpodspro {
        img {

          position: absolute;
          right: -10px;
          top: 20px;
          clip: rect(0px 243px 266px 0px);
        }

      }

      html {
        background: black;
      }

      h1 {
        background-color: black;
        font-family: "Raleway", sans-serif;
        font-size: 28px;
        color: red;
        text-shadow: -3px 3 #103c9b, 3 3px #103c9b, 3px 3 #103c9b, 3 -3px #103c9b;
      }

      .price {
        position: absolute;
        bottom: 60px;

        font-size: 30px;
        padding: 0 15px;
        background: #f98133;
        color: #fff;

        span {
          display: body;
          font-size: 40px;
          font-weight: bold;
          margin: 0 8px;
          position: relative;
          text-stroke: 3px #ffc198;
          -webkit-text-stroke: 3px #ffc198;
        }
      }

      .promise {
        background: #3b77fb;
        color: #fff;
        font-size: 30px;
        width: 100%;
        margin-top: 10px;
        position: absolute;
        bottom: 0;
        height: 60px;
        line-height: 60px;
        padding: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;

        span {
          display: body;
          margin: 10px 5px 0 5px;
          font-size: 50px;
          font-weight: bold;
          position: relative;
          text-stroke: 3px #276cff;
          -webkit-text-stroke: 3px #276cff;
        }
      }

      .issue {
        margin-left: 10px;
        position: relative;
        z-index: 999;

        div {
          padding: 2px 5px;
          background: #e62837;
          color: #fff;
          width: 240px;
          font-size: 25px;
          font-weight: bold;
          letter-spacing: 5px;
          margin-top: 15px;
          border-radius: 30px;
        }
      }

      .com {
        width: 200px;
        padding: 5px;
        color: #fff;

        font-size: 28px;
        font-weight: bold;
        letter-spacing: 5px;
        background: #3b77fb;
        border-bottom-right-radius: 20px;

        span {
          font-size: 18px;
          letter-spacing: 0px;
        }
      }

      .type {
        width: 100%;
        font-weight: bold;
        font-size: 32px;
        margin-top: 5px;
        text-stroke: 1px #c47171;
        -webkit-text-stroke: 1px #c47171;
        color: #b52838;
      }
    }
  }
</style>

<script>
  import html2canvas from 'html2canvas';
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
      //下面是methods中的内容
      //图片转换格式的方法 直接使用就好  不需要知道为什么
      dataURLToBlob(dataurl) {
        let arr = dataurl.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      },
      /*保存图片的方法（即按钮点击触发的方法）   
        第一个参数为需要保存的div的id名  
        第二个参数为保存图片的名称 */
      saveImage(divText, imgText) {
        let canvasID = this.$refs[divText];
        let that = this;
        let a = document.createElement('a');
        html2canvas(canvasID).then(canvas => {
          let dom = document.body.appendChild(canvas);
          dom.style.display = 'none';
          a.style.display = 'none';
          document.body.removeChild(dom);
          let blob = that.dataURLToBlob(dom.toDataURL('image/png'));
          a.setAttribute('href', URL.createObjectURL(blob));
          //这块是保存图片操作  可以设置保存的图片的信息
          a.setAttribute('download', imgText + '.png');
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(blob);
          document.body.removeChild(a);
        });
      },
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