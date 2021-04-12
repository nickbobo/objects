<template>
  <div class="bannedWord">
    <div>闲鱼违禁词将用<span class="checked">红色</span>标注出来</div>
    <div class="word">
      <el-input type="textarea" v-model="word"></el-input>

    </div>
    <div class="query_result" v-html="encodeTextAreaString(brightenKeyword(word,keyword))">

    </div>
  </div>
</template>

<script>
  export default {
    name: "bannedWord",

    data() {
      return {
        word: "",
        fileUrl: "",
        keyword: `精仿,高仿,发票,小票,原厂,原单,永久,王者,暴力,百分百,完美,最后,唯一,顶尖,最大,绝对,全网,独一无二,
        正品,原装拆机,刀,抢,大号,小号,假,SB,ED,ml,仿,国别,政治,党,天然,正品,极致,
        第一,最好,历史最低,及其,100%,百分百,一定,绝对,真皮,头层牛皮,猫眼石,
        国家级,世界级,最高级,最佳,第一,唯一,首个,最好,精确,顶级,最低,最底,最,最便宜,最大程度,最新技术,
        最先进科学,国家级产品,填补国内空白,绝对,独家,首家,最新,最先进,第一品牌,金牌,名牌,
        最赚,超赚,最先,巨星,奢侈,至尊,顶级享受,
        钻石,宝石,翡翠,玛瑙,玉,金银,S925,象牙,珍珠,动物制品,珊瑚,苹果,
        华为,oppo,迷信,佛,招财,辟邪,低俗,裸,性,身材,美瞳,洗发水,洗衣液,
        国别,政治,党,迷信,佛，招财,辟邪,低俗,
        洗面奶,牙膏,各种乳液,口罩,药品,计生用品,避孕套,书本,极限词,烟,食品,
        土豆丝,茶,水果,抹茶,马卡龙,拉菲,雪糕,冰棒,冰淇淋,鸭舌,南瓜,豆沙,
        草莓,饼,血,肉,蛋白,面,奶,乳,沙拉,辅食,糖果,杂粮,饭,刮痧,祛毒,去湿,
        母婴用品,儿童和成人纸尿裤,卫生巾,月子,婴儿,宝宝,宝妈,孕妇,香薰,精油,保健,
        疗效,爆款,运费险,买二送一,卡通人物,明星,网红,抖音,其他平台名字,紫砂壶,生巧,
        饼干,咖啡,微信,威信,QQ,姐,酒,军用,帖子,互,互想要,互赞,直播,京东,58同城,转转,苏宁易购,名创优品,
        微信,w,v,x,威信,QQ,qq,百度云,唯品会,迅雷,树洞,你懂的,屌,野,Png,曲奇,常识,视频`
      };
    },
    methods: {
      encodeTextAreaString(str) {
        if (str == "") return 'N/A'
        var reg = new RegExp("\n", "g");
        str = str.replace(reg, "<br/>");
        var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
        str = str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
        return str;
      },
      brightenKeyword(val, keyword) {
        if (keyword.length > 0) {
          let keywordArr = keyword.split(",");
          val = val + "";
          keywordArr.forEach(item => {
            if (val.indexOf(item) !== -1 && item !== "") {
              val = val.replace(
                new RegExp(item, 'g'),
                '<font class="checked">' + item + "</font>"
              );
            }
          });
          return val;
        } else {
          return val;
        }
      }
    },
    mounted() {
      console.info(1111)
    }
  };
</script>

<style lang="scss" scoped>
  /* .bannedWord {
    text-align: center;
  } */

  .word {
    width: 650px;
    margin: 0 auto;

    >>>.el-textarea__inner {
      width: 100%;
      height: 700px;
    }
  }


  .query_result {
    width: 80%;
    margin-left: 10%;
    height: 900px;
    text-align: initial;
  }

  >>>.checked {
    color: #f75353;
    font-size: 17px;
    font-weight: bold;

  }

  /* .a_link, .entry a[href*='m/study/']{color:#f30;text-decoration:underline; padding:2px 0; } */
  >>>.checked:hover {
    color: #f30;
    text-decoration: none;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='%23ff3300' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E") repeat-x 0 100%;
    background-size: 20px auto;
    animation: waveMove 1s infinite linear;
  }

  @keyframes waveMove {
    from {
      background-position: 0 100%;
    }

    to {
      background-position: -20px 100%;
    }
  }
</style>