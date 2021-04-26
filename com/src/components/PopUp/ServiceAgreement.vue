<template>
  <div class="service_agreement">
    <el-dialog :visible.sync="isShowDialog" width="925px" class="pop_up_dialog" :modal-append-to-body="false" :close-on-click-modal="false">
      <div class="top-title">「人才拼图网」用户服务协议</div>
      <div class="content first">
        <p>人才拼图网（以下简称“网站”）所有人及ICP备案人中智上海经济技术合作有限公司（以下简称“中智上海公司”）为网站注册用户（以下简称“用户）提供求职招聘及相关服务。</p>
      </div>
      <div class="sub-title">用户同意遵守以下服务协议：</div>
      <div class="sub-title first">1、网站信息的发布</div>
      <div class="content">
        <p>
          用户不得发布任何违反有关法律规定信息，如《广告法》、《不正当竞争法》等；
        </p>
        <p>
          用户不得发布任何与本网站求职、招聘目的不适信息；
        </p>
        <p>
          用户不得发布任何不完整、虚假的信息；
        </p>
        <p>
          用户不得拒绝提供的信息材料包括但不限于招聘单位的公司全称、营业执照盖章扫描件等
        </p>
        <p>
          用户对所发布的信息承担完全民事、刑事责任。
        </p>
        <p>
          如用户违反上述“网站信息的发布”条款，中智上海公司有权立即终止用户使用本网站并删除该用户发布的全部信息，造成中智上海公司经济损失的，用户应承担相应的赔偿责任。
        </p>
      </div>
      <div class="sub-title">2、网站信息的使用</div>
      <div class="content">
        <p>
          作为招聘单位的用户（以下简称“招聘单位用户”）仅可就招聘目的使用作为求职者的用户（以下简称“求职者用户”）的简历信息；
        </p>
        <p>
          求职者用户仅可因应聘某职位，使用招聘单位用户发布的招聘信息；
        </p>
        <p>
          本网站提供的其他信息，仅与其相应内容有关的目的而被使用；
        </p>
        <p>
          用户不得将任何本网站的信息用作任何商业目的。
        </p>
        <p>
          招聘单位用户可登录网站企业中心设置通过勾选同意把发布在人才拼图网的招聘信息，同时发布至与人才拼图网合作或中智人才顾问公司指定的招聘平台网站内；
        </p>
      </div>
      <div class="sub-title">3、免责条款</div>
      <div class="content">
        <p>
          本网站仅是用户发布求职招聘信息的平台，在用户享受本网站服务过程中，中智上海公司，不保证网站服务不会受中断，也不保证上述网站服务的及时性，安全性等。
        </p>
      </div>
      <div class="sub-title">4、责任限制条款</div>
      <div class="content">
        <p>
          如中智上海公司被法院判决或仲裁机构裁决需承担用户因使用本网站中所遭受到的任何经济损失，用户同意上述赔偿责任不应超过人民币500元。
        </p>
      </div>
      <div class="sub-title">5、用户账号，密码和安全性</div>
      <div class="content">
        <p>
          用户一旦注册成功，将得到唯一的用户账号及密码。用户将对用户账号及密码安全负全部责任。另外，每个用户都要对以其用户账号和密码进行的所有活动和事件负责。用户可随时根据指示改变密码。用户若发现任何非法使用用户账号或网站存在安全漏洞的情况，请立即通知人才拼图网（联系电话：54594545--6327 联系邮箱：anna@ciicsh.com）。
        </p>
        <p>
          本网站不公开用户的姓名、地址、电子邮箱等信息， 但以下情况除外：
        </p>
        <p>
          (1) 用户授权透露上述信息。
        </p>
        <p>
          (2) 法律规定要求提供用户的个人或企业资料。
        </p>
        <p>
          如果用户提供的资料包含有不正确的信息，人才拼图网保留终止用户使用此项服务资格的权利。本网站不会在未经合法会员授权时公开、编辑或透露其注册资料及保存在人才拼图网的非公开内容。
        </p>
      </div>
      <div class="sub-title">6、知识产权条款</div>
      <div class="content">
        <p>
          本网站知识产权（包括但不限于网站源代码、网站文章、网站图片等）归中智上海公司所有，未经中智上海公司同意，用户不得擅自使用上述知识产权，如造成中智上海公司经济损失的，用户应承担相应的赔偿责任。
        </p>
        <p>
          用户在使用本网站中所上传的信息资料（包括但不限于文章、图片、商标等）不得侵犯第三方知识产权或相关权益，如用户违反本条款造成中智上海公司经济损失或涉讼的，用户应承担相应的赔偿责任，包括但不限于中智上海公司向第三方支付的赔偿金、和解金、罚金等，涉讼引起的律师费、诉讼费等。
        </p>
      </div>
      <div class="sub-title">7、不可抗力条款</div>
      <div class="content">
        <p>
          不可抗力是指不能预见、不能避免并不能克服的客观情况，包括但不限于地震、火灾、政府行为、黑客行为等，如由于不可抗力导致本网站不能正常使用，中智上海公司不承担任何违约责任。
        </p>
        <p>
          因上述不可抗力导致本服务协议不能履行的，任一方均可解除本协议，双方均不承担违约责任。
        </p>
      </div>
      <div class="sub-title">8、违约条款</div>
      <div class="content">
        <p>
          如果用户违反了本了服务条款的规定，本网站有权中断或终止对其提供服务，如网站终止向用户提供服务，网站有权删除用户在本网站中发布、存储的全部信息。如由于用户违约行为造成中智上海公司经济损失或涉讼的，用户应承担相应的赔偿责任，包括但不限于中智上海公司向第三方支付的赔偿金、和解金、罚金等，涉讼引起的律师费、诉讼费等。
        </p>
      </div>
      <div class="sub-title">9、、争议管辖条款</div>
      <div class="content bottom">
        <p>
          凡因本协议引起的或与本协议有关的任何争议，均应提交上海仲裁委员会按照该会仲裁规则进行仲裁。仲裁裁决是终局的，对双方当事人均有约束力
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ServiceAgreement",
  props: {},
  components: {},
  data() {
    return {
      isShowDialog: false
    };
  },
  methods: {
    isShow() {
      this.isShowDialog = true;
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {}
};
</script>

<style scoped lang="scss">
.top-title {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  text-align: center;
}

.service_agreement {
  font-family: Microsoft YaHei;
  .title {
    margin-top: 10px;
    &.first {
      margin-top: 40px;
    }
  }
  .sub-title {
    margin: 30px 0 5px 0;
  }
  .title,
  .sub-title {
    margin-left: 30px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  .content {
    margin: 0 30px 0 30px;
    &.first{
      margin-top: 40px;
    }
    &.bottom{
      margin-bottom: 50px;
    }
    p {
      line-height: 30px;
      font-size: 16px;
      color: #666;
    }
    ul {
      padding: 0;
    }
    ul li {
      list-style: none;
      line-height: 30px;
      font-size: 16px;
      color: #666;
    }
  }
}
</style>
