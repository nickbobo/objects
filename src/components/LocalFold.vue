<template>
  <div>
    <!-- <div style="text-align: center">{{title}}</div> -->
    <!-- <div class="top-prove">为了证明楼下的那货不会对我造成影响</div> -->
    <div :class="showTotal ? 'total-introduce' : 'detailed-introduce'">
      <div class="intro-content" :title="introduce" ref="desc">
        <span class="merchant-desc" v-if="introduce">
          {{ introduce }}
        </span>
      </div>

      <div class="unfold" @click="showTotalIntro" v-if="showExchangeButton">
        <p>{{ exchangeButton ? "展开" : "折叠" }}</p>
      </div>
    </div>
    <!-- <div class="bottom-prove">为了证明楼上的那货不会对我造成影响</div> -->
    <!-- <div class="change-buttom">
      <div class="long" @click="tryLong">点这试试一段比较长的文字</div>
      <div class="short" @click="tryShort">点这试试一段比较短的文字</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "LocalFold",
  data() {
    return {
      title: "演示展开收起",
      introduce: "",
      test:"Vue是一套用于构建用户界面的渐进式框架。Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。Vue是一套用于构建用户界面的渐进式框架。Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。",
      // 是否展示所有文本内容
      showTotal: true,
      // 显示展开还是收起
      exchangeButton: true,
      // 是否显示展开收起按钮
      showExchangeButton: false,
      rem: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    showTotalIntro() {
      // console.log(this.showTotal);
      this.showTotal = !this.showTotal;
      this.exchangeButton = !this.exchangeButton;
    },
    getRem() {
      // console.log('getRem');
      const defaultRem = 16;
      let winWidth = window.innerWidth;
      // console.log('winWidth:' + winWidth);
      let rem = (winWidth / 375) * defaultRem;
      return rem;
    },
    init(data) {
      //   data; //
      this.introduce = '摘要随着计算机技术和因特网的迅猛发展，网上查询、检索和下载专业数据已成为科技情报文献检索数据库的建设和维护提供方便。摘要随着计算机技术和因特网的迅猛发展，摘要随着计算机技术和因特网的迅猛发展，网上查询、检索和下载专业数据已成为科技情报文献检索数据库的建设和维护提供方便。摘要是对论文综合的介绍，使人了解论s网上查询、检索和下载专业数据已成为科技情报文献检索数据库的建设和维护提供方便。摘要是对论文综合的介绍，使人了解论摘要是对论文综合的介绍，使人了解论摘要随着计算机技术和因特网的迅猛发展，网上查询、检索和下载专业数据已成为科技情报文献检索数据库的建设和维护提供方便。摘要是对论文综合的介绍，使人了解论摘要随着计算机技术和因特网的迅猛发展，网上查询、检索和下载专业数据已成为科技情报文献检索数据库的建设和维护提供方便。摘要是对论文综合的介绍，使人了解论摘要随着计算机技术和因特网的迅猛发展，网上查询、检索和下载专业数据已成为科技情报文献检索数据库的建设和维护提供方便。摘要是对论文综合的介绍，使人了解论文阐述的主要内容、语言习惯，在撰写英文摘要时应特别注意。摘要随着计算机技术和因特网的迅猛发展，网上查询、检索和下载专业数据已成为科技情报文献检索数据库的建设和维护提供方便。摘要随着计算机技术和因特网的迅猛发展，摘要随着计算机技术和因特网的迅猛发展，网上查询、检索和下载专业数据已成为科技情报文献检索数据库的建设和维护提供方便。摘要是对论文综合的介绍，使人了解论s网上查询、检索和下载专业数据已成为科技情报文献检索数据库的建设和维护提供方便。摘要是对论文综合的介绍，使人了解论摘要是对论文综合的介绍，使人了解论摘要随着计算机技术和因特网的迅猛发展，网上查询、检索和下载专业数据已成为科技情报文献检索数据库的建设和维护提供方便。摘要是对论文综合的介绍，使人了解论摘要随着计算机技术和因特网的迅猛发展，网上查询、检索和下载专业数据已成为科技情报文献检索数据库的建设和维护提供方便。摘要是对论文综合的介绍，使人了解论摘要随着计算机技术和因特网的迅猛发展，网上查询、检索和下载专业数据已成为科技情报文献检索数据库的建设和维护提供方便。摘要是对论文综合的介绍，使人了解论文阐述的主要内容、语言习惯，在撰写英文摘要时应特别注意'
      //'拥有财富、名声、权力，这世界上的一切的男人--哥尔·D·罗杰，在被行刑受死之前说了一句话，让全世界的人都涌向了大海。“想要我的宝藏吗？如果想要的话，那就到海上去找吧，我全部都放在那里。”，世界开始迎接“大海贼时代”的来临。拥有财富、名声、权力，这世界上的一切的男人 “海贼王”哥尔·D·罗杰，在被行刑受死之前说了一句话，让全世界的人都涌向了大海。“想要我的宝藏吗？如果想要的话，那就到海上去找吧，我全部都放在那里。”，世界开始迎接“大海贼时代”的来临。拥有财富、名声、权力，这世界上的一切的男人--哥尔·D·罗杰，在被行刑受死之前说了一句话，让全世界的人都涌向了大海。“想要我的宝藏吗？如果想要的话，那就到海上去找吧，我全部都放在那里。”，世界开始迎接“大海贼时代”的来临。拥有财富、名声、权力，这世界上的一切的男人 “海贼王”哥尔·D·罗杰，在被行刑受死之前说了一句话，让全世界的人都涌向了大海。“想要我的宝藏吗？如果想要的话，那就到海上去找吧，我全部都放在那里。”，世界开始迎接“大海贼时代”的来临拥有财富、名声、权力，这世界上的一切的男人--哥尔·D·罗杰，在被行刑受死之前说了一句话，让全世界的人都涌向了大海。“想要我的宝藏吗？如果想要的话，那就到海上去找吧，我全部都放在那里。”，世界开始迎接“大海贼时代”的来临。拥有财富、名声、权力，这世界上的一切的男人 “海贼王”哥尔·D·罗杰，在被行刑受死之前说了一句话，让全世界的人都涌向了大海。“想要我的宝藏吗？如果想要的话，那就到海上去找吧，我全部都放在那里。”，世界开始迎接“大海贼时代”的来临。拥有财富、名声、权力，这世界上的一切的男人--哥尔·D·罗杰，在被行刑受死之前说了一句话，让全世界的人都涌向了大海。“想要我的宝藏吗？如果想要的话，那就到海上去找吧，我全部都放在那里。”，世界开始迎接“大海贼时代”的来临。拥有财富、名声、权力，这世界上的一切的男人 “海贼王”哥尔·D·罗杰，在被行刑受死之前说了一句话，让全世界的人都涌向了大海。“想要我的宝藏吗？如果想要的话，那就到海上去找吧，我全部都放在那里。”，世界开始迎接“大海贼时代”的来临。';
    },
    // tryLong() {
    //   let longIntroduce =
    //     "Vue是一套用于构建用户界面的渐进式框架。Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。Vue是一套用于构建用户界面的渐进式框架。Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。";
    //   if (this.introduce !== longIntroduce) {
    //     this.showExchangeButton = false;
    //     this.showTotal = true;
    //     this.introduce = longIntroduce;
    //   }
    // },
    // tryShort() {
    //   let shortIntroduce =
    //     "Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。";
    //   if (this.introduce !== shortIntroduce) {
    //     this.showExchangeButton = false;
    //     this.showTotal = true;
    //     this.introduce = shortIntroduce;
    //   }
    // }
  },
  watch: {
    introduce: function() {
      this.$nextTick(
        function() {
          // 判断介绍是否超过四行
          let rem = parseFloat(this.getRem());
          // console.log('watch 中的rem', rem);
          if (!this.$refs.desc) {
            // console.log('desc null');
            return;
          }
          let descHeight = window
            .getComputedStyle(this.$refs.desc)
            .height.replace("px", "");
          // console.log('descHeight:' + descHeight);
          // console.log('如果 descHeight 超过' + (3.25 * rem) + '就要显示展开按钮');
          if (descHeight > 3.25 * rem) {
            // console.log('超过了四行');
            // 显示展开收起按钮
            this.showExchangeButton = true;
            this.exchangeButton = true;
            // 不是显示所有
            this.showTotal = false;
          } else {
            // 不显示展开收起按钮
            this.showExchangeButton = false;
            // 没有超过四行就显示所有
            this.showTotal = true;
            // console.log('showExchangeButton', this.showExchangeButton);
            // console.log('showTotal', this.showTotal);
          }
        }.bind(this)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.top-prove {
  height: 100px;
  width: 100%;
  background: #dddddd;
  text-align: center;
  line-height: 100px;
}
.total-introduce {
  height: auto;
  overflow: hidden;
  font-size: 14px;
  color: #434343;
  position: relative;
  // margin: 10px;
  .intro-content {
    .merchant-desc {
      width: 100%;
      line-height: 21px;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
  // .unfold {
  //   display: block;
  //   z-index: 11;
  //   float: right;
  //   width: 40px;
  //   height: 21px;
  //   p {
  //     margin: 0;
  //     line-height: 21px;
  //     color: #7fbe87;
  //   }
  // }
}
.detailed-introduce {
  font-size: 14px;
  color: #434343;
  position: relative;
  overflow: hidden;
  &:before {
    content: "......";
    width: 100px;
    height: 114px;
    font-size: 14px;
    position: absolute;
    /* background: red; */
    bottom: -40px;
    font-weight: bold;
  }
  .intro-content {
    // 最大高度设为4倍的行间距
    max-height: 180px;
    // line-height: 21px;
    word-wrap: break-word;
    /*强制打散字符*/
    word-break: break-all;
    background: #ffffff;
    /*同背景色*/
    color: #434343;
    overflow: hidden;
    .merchant-desc {
      width: 100%;
      line-height: 21px;
    }
    &:after,
      // 这是展开前实际显示的内容
      &:before {
      content: attr(title);
      position: absolute;
      left: 101px;
      top: 292px;
      height: 190px;
      overflow: hidden;
      width: 84%;
      color: #43434300;

      // overflow: hidden;
    }
    // 把最后最后一行自身的上面三行遮住
    // &:before {
    //   display: block;
    //   overflow: hidden;
    //   z-index: 1;
    //   max-height: 156px;
    //   background: #ffffff;
    // }
    &:after {
      // display: -webkit-box;
      // -webkit-box-orient: vertical;
      // overflow: hidden;
      // height: 180px;
      // /*截取行数*/
      // -webkit-line-clamp: 6;
      // text-overflow: ellipsis;
      // -webkit-box-sizing: border-box;
      // box-sizing: border-box;
      // /*行首缩进字符数，值为[(截取行数-1)*尾部留空字符数]*/
      // text-indent: -12em;
      // /*尾部留空字符数*/
      // padding-right: 4em;
    }
  }
}

.unfold {
  // z-index: 999;
  width: 120px;
  height: 24px;
  // position: absolute;
  background: #ddd;
  text-align: center;
  line-height: 24px;
  left: 50%;
  margin-left: calc(50% - 60px);
  margin-top: 40px;
  border-radius: 4px;
  cursor: pointer;
  p {
    height: 24px;
    line-height: 24px;
    margin: 0;
    line-height: 21px;
    color: #666666;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    &:hover{
      color:#333;
    }
  }
}
.bottom-prove {
  height: 100px;
  width: 100%;
  background: #dddddd;
  text-align: center;
  line-height: 100px;
}
.change-buttom {
  font-size: 14px;
  color: #2371be;
  .long {
    text-align: 21px;
    text-align: center;
    height: 21px;
  }
  .short {
    text-align: 21px;
    text-align: center;
    height: 20px;
  }
}
</style>
