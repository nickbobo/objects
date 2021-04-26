<template>
  <div class="entrust_service">

    <div class="service-wrap">
      <div class="tip">
        ［人才拼图］为集网页、微信公众号为一体、招聘信息多渠道发布、人才简历多渠道收集导入与管理、多用户管理维护为一体的数据平台。它汇集了中智上海人才顾问公司20余年深耕于各行业的专业招聘服务团队、数百万份人才简历资料，为中智9万余家客户及其他各类机构提供线上线下一体化的高端人才招聘、招聘流程外包、招聘解决方案等服务。
      </div>
      <section>
        <h2 class="title">我们可以为您做什么？</h2>
        <ul class="do">
          <li>
            <img src="~static/img/do-item-1.jpg">
            <span>线上多渠道<br>招聘信息发布</span>
          </li>
          <li>
            <img src="~static/img/do-item-2.jpg">
            <span>简历资料汇总管理</span>
          </li>
          <li>
            <img src="~static/img/do-item-3.jpg">
            <span>本地简历数据导入，<br>便携管理</span>
          </li>
          <li>
            <img src="~static/img/do-item-4.jpg">
            <span>多账号协同管理</span>
          </li>
        </ul>
      </section>
      <section>
        <h2 class="title">我们的服务——RPO产品</h2>
        <h4><span>拼人才</span> - 多渠道招聘信息发布及应聘人选资料收集汇总管理</h4>
        <p>帮助企业在各招聘渠道（包括中智招聘平台即人才拼图数据平台 、中智人才招聘微信公众号）发布招聘信息、收集汇总各渠道应聘人选简历上传入库，并按招聘职位予以归类汇总，供企业随时查阅、筛选和重复使用。</p>
        <h4><span>拼面试</span> - 多渠道人才信息收集、筛选、意向确认及面试安排</h4>
        <p>客服务人员根据企业委托的招聘职位需求进行全方位的人选简历搜集，在确认候选人意向的基础上推荐给企业。在与企业沟通确认意向人选后，安排其面试。</p>
        <h4><span>拼入职</span> - 多渠道人才信息收集、筛选、面试安排及录用到岗</h4>
        <p>客服人员会根据企业委托的招聘需求，完成人选简历搜集、筛选、意向确认、面试安排，直至正式录用上岗，进行全方位的流程服务。</p>
        <h4><span>项目招聘外包</span> - 根据企业批量化招聘项目的需求，提供定制化的项目招聘外包</h4>
        <p>项目外包服务包括为企业部署招聘专用微信公众号，并在人才拼图平台下增设企业自己的招聘网页、客户端口和管理端口。线下客服务团队将为企业用户进行多渠道招聘信息的发布、各平台渠道人选简历的收集与汇总，并在资料筛选且确认人选意向及专业评估后，将合适的人选推荐给企业面试，及后续跟踪服务等，并在与企业约定的时间范围内完成批量化招聘工作。</p>
      </section>
      <section>
        <h2 class="title">如何委托于我们？</h2>
        <p>您可在职位管理模块对您发布的职位进行委托操作<br>亦或是在招聘的任何阶段将需求委托于我们，我们的客服人员将竭诚为您服务</p>
        <dl>
          <dt>详请咨询联系</dt>
          <dd>
            <span>联系人：</span>Shirley
          </dd>
          <dd>
            <span>电话：</span>021-54594545-6325
          </dd>
          <dd>
            <span>邮箱：</span><a href="mailto:shirleyxy@ciicsh.com">shirleyxy@ciicsh.com</a>
          </dd>
        </dl>
      </section>
    </div>


  </div>
  </div>
</template>
<script>
export default {
  name: "PositionManage", //委托服务
  data() {
    return {
      resumeStatus: "",
    };
  },
  methods: {},
  mounted() {},
  created() {},
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.entrust_service {
  @include bgImg("reg-bg.jpg");
  // @include df;
  // @include df-jc;
  padding-top: 30px;
  width: 100%;
  margin-top: -60px;

  .service-wrap {
    font-size: 16px;
    line-height: 1.75;
    width: 1040px;
    margin: 30px auto 35px auto;
    background-color: #fff;
    @include shadow();
    padding: 45px 50px;
    box-sizing: border-box;
    .tip {
      background-color: $blue;
      color: #fff;
      padding: 30px 35px;
      margin-bottom: 30px;
    }
    section {
      margin: 30px 0;

      & + section {
        margin-top: 50px;
      }

      h4 {
        font-size: 16px;
        margin-bottom: 15px;
        span {
          color: $blue;
        }
      }

      p + h4,
      dl {
        margin-top: 40px;
      }
      dt {
        font-weight: bold;
      }
      dd {
        margin: 5px 0;
        span {
          display: inline-block;
          width: 4em;
        }
        a {
          color: #428dde;
          text-decoration: none;
        }
      }
      .do {
        @include clearfix();
        margin-top: 35px;
        li {
          font-size: 18px;
          line-height: 24px;
          text-align: center;
          float: left;
          width: 25%;
          img {
            display: block;
            width: 72px;
            margin: 0 auto 20px;
          }
        }
      }
    }
    h2.title {
      font-size: 18px;
      line-height: 1;
      padding-left: 20px;
      position: relative;
      margin-bottom: 25px;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 18px;
        background-color: $blue-hover;
      }
    }
  }

  .path_header {
    margin-top: 24px;
    @include wh(1180px, 160px);
    @include bgImg("intro.png");
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #c6c6ca;
    line-height: 36px;
    @include boxSd(0px 0px 8px rgba(14, 14, 18, 0.5));
    padding: 30px 52px;
    border-radius: 13px;
  }
  .service_item {
    width: 1100px;
    // height: 300px;
    background: #fff;
    padding-top: 1px;
    margin-left: 40px;
    border-radius: 0 0 13px 13px;
    @include boxSd(0px 0px 12px 0px rgba(120, 175, 204, 0.5));
    padding: 40px 70px;
    margin-bottom: 20px;
    h3 {
      font-size: 32px;
      font-weight: 400;
      margin: 0;
    }
    > .el-row {
      &.one {
        border: 1px dashed #ddd;
        margin-top: 30px;
        > .el-col {
          height: 171px;
          padding-left: 103px;
          > img {
            margin-top: 28px;
          }
          > span {
            display: block;
            color: #245570;
            margin-top: 20px;
            font-size: 18px;
          }
          &.line {
            border-top: 1px dashed #ddd;
          }
        }
      }
      &.tow {
        margin-top: 40px;
        // @include df;
        display: -webkit-box;
        font-size: 16px;
        color: #666;
        .line {
          color: #fff0;
          @include wh(6px, 80px);
          background: #2a5082;
          @include boxSd(4px 5px 0px 0px rgba(252, 124, 20, 0.5));
        }
        .content {
          padding: 9px 28px;
          div:nth-child(2) {
            margin-top: 31px;
          }
        }
        img {
          margin-top: -64px;
          margin-left: 74px;
        }
      }
    }
    &.my_server {
      border-radius: 13px;
      .my_server_item {
        border-bottom: 1px dashed #ddd;
        .el-row {
          margin-top: 35px;
          @include df;
          span {
            display: block;
            line-height: 40px;
            color: #2a5082;
            &.but {
              font-size: 18px;
              text-align: center;
              border-radius: 4px;
              @include wh(172px, 40px);
              font-size: 18px;
              @include boxSd(4px 5px 0px 0px rgba(252, 124, 20, 0.5));
              border: 2px solid rgba(42, 80, 130, 1);
            }
            &.title {
              margin-left: 30px;
              font-size: 16px;
            }
          }
          &.item_content {
            margin-top: 29px;
            color: #888;
            font-size: 16px;
            line-height: 28px;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>
