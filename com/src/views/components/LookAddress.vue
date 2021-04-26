<template>
  <section>
    <div class="look-address">
      <el-dialog
        :visible.sync="isShowDialog"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :show-close="true"
        custom-class="look-address-dialog"
      >
        <div class="title">
          简历原件
        </div>
        <div id="iframe"></div>
        <!-- id="dialogFrame"
          :src="reportUrl"
          frameborder="0"
          scrolling="no"
          hight="auto"
          style="background-color:transparent; 
          position: absolute; 
          z-index: -1; 
          height:1400px;
          width: 100%; 
          top: 0;left:0;" -->

        <!-- <iframe
          id="dialogFrame"
          ref="iframe"
          frameborder="false"
          scrolling="no"
          width="100%"
          height="100%"
          allowtransparency="true"
        ></iframe> -->
      </el-dialog>
    </div>
  </section>
</template>

<script>
import { get } from "@/api/api";
export default {
  name: "look-address", //简历预览

  data() {
    return {
      msg: "",
      isShowDialog: false,
      htmlConent: "",
      reportUrl: "http://www.baidu.com"
    };
  },
  methods: {
    init(url) {
      let src = "";
      let ifUrl = url.substring(0, 4);
      if (ifUrl === "http") {
        src = url;
      } else {
        src = `${process.env.BASE_COMPANY_API}/api${url}`;
        //  src = `${process.env.BASE_COMPANY_API}/api/common/GetResume?id=1A5B7906-F538-4B89-A23F-9E50BA6F1B62`
      }
      let token = localStorage.getExpire('COMPANY_TOKEN')
      src = src+'&token='+ token.substring(7)
      this.$nextTick(() => {
        let iframeDom = document.getElementById("iframe");
        iframeDom.innerHTML = "";

        // src = `http://172.16.112.36:8070/api/common/GetResume?id=1A5B7906-F538-4B89-A23F-9E50BA6F1B62`
        this.createIframe(iframeDom, src, () => {});
        // src = 'http://172.16.112.36:8070/api/common/GetResume?id=2759935F-E9C0-4D67-845C-20C76EECAA9F'
        //  this.$refs.iframe.contentWindow.location.replace(src)
      });
    },
    createIframe(dom, src, onload) {
      try {
        var iframe = document.createElement(
          '<iframe name="ifr" id="ifr"></iframe>'
        );
      } catch (e) {
        var iframe = document.createElement("iframe");
        iframe.name = "ifr";
        iframe.id = "ifr";
      }
      // let iframe = document.createElement("iframe");
      iframe.style.width = "100%";
      iframe.style.height = "65vh";
      iframe.style.margin = "0";
      iframe.style.padding = "0";
      iframe.style.overflow = "hidder";
      iframe.style.border = "none";
      // iframe.charset = "gbk";
      // iframe.document.charset='gbk';
      // console.info(document.createElement(iframe))
      // iframe.document.write('<meta http-equiv="Content-Type" content="text/html; charset=gbk" />/n');
      // iframe.write('<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />/n');
      if (
        onload &&
        Object.prototype.toString.call(onload) === "[object Function]"
      ) {
        if (iframe.attachEvent) {
          iframe.attachEvent("onload", onload);
        } else if (iframe.addEventListener) {
          iframe.addEventListener("load", onload);
        } else {
          iframe.onload = onload;
        }
      }
      iframe.src = src;
      dom.appendChild(iframe);
      // document.getElementById("ifr").document.charset = "gbk";

      return iframe;
    },
    inits(url) {
      const self = this;
      this.$nextTick(() => {
        const iframe = document.querySelector("#dialogFrame");
        if (iframe.attachEvent) {
          iframe.attachEvent("onload", function() {
            // const iframeNode = window.frames["ifra"].document
            // self.getDom(iframeNode)
            var Iframe = document.getElementById("dialogFrame");
            try {
              // 声明变量取值bai
              var bHeight = Iframe.contentWindow.document.body.scrollHeight;
              var dHeight =
                Iframe.contentWindow.document.documentElement.scrollHeight;
              var height = Math.max(bHeight, dHeight); // 取最du大值
              Iframe.height = height;
            } catch (ex) {}
          });
        } else {
          iframe.onload = function() {
            setTimeout(() => {
              var Iframe = document.getElementById("dialogFrame");
              try {
                // 声明变量取值bai
                var bHeight = Iframe.contentWindow.document.body.scrollHeight;
                var dHeight =
                  Iframe.contentWindow.document.documentElement.scrollHeight;

                var bWidth = Iframe.contentWindow.document.body.scrollWidth;
                var dWidth =
                  Iframe.contentWindow.document.documentElement.scrollWidth;
                var height = Math.max(bHeight, dHeight); // 取最du大值

                var width = Math.max(bWidth, dWidth);

                Iframe.height = height;
                Iframe.width = width;
              } catch (ex) {}
            }, 10000);

            // const iframeNode = window.frames["ifra"].document
            // self.getDom(iframeNode)
          };
        }
      });
    }
  },
  created() {
    // console.info(this.srcUrl)
    // let iframe = document.getElementById("dialogFrame");
    // let iwindow = iframe.contentWindow;
    // let idoc = iwindow.document;
    // console.log("window", iwindow); //获取iframe的window对象
    // console.log("document", idoc); //获取iframe的document
    // console.log("html", idoc.documentElement); //获取iframe的html
    // console.log("head", idoc.head); //获取head
    // console.log("body", idoc.body); //获取body
  },
  mounted() {}
};
</script>

<style lang="scss">
.el-dialog {
  &.look-address-dialog {
    height: 75vh;
    width: 80%;
    .el-dialog__body {
      // overflow: scroll;
      height: 75vh;
      width: 80%;
      position: fixed;
      margin-top: 20px;
      padding: 0;
      #iframe {
        height: 80vh;
        width: 100%;
      }
      .title {
        margin-left: 20px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>
