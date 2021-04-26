<template>
  <div class="invoice-info">
    <div class="choice-type-layout">
      <el-form :model="formData" :rules="rulesFormLeft" ref="formData" :disabled="!editCompanyInfo">
        <div class="input-row">
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">公司注册登记名称</span>
            <el-form-item prop="TaxName">
              <el-input v-model="formData.TaxName" placeholder="请输入公司名称" class="form_input" maxlength="30"></el-input>
            </el-form-item>
          </div>
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">纳税人识别号</span>
            <el-form-item prop="TaxNumber">
              <el-input v-model="formData.TaxNumber" placeholder="请输入纳税人识别号" class="form_input" maxlength="30"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="input-row">
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">地址</span>
            <el-form-item prop="TaxAddress">
              <el-input v-model="formData.TaxAddress" placeholder="请输入地址" class="form_input" maxlength="30"></el-input>
            </el-form-item>
          </div>

          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">电话</span>
            <el-form-item prop="TaxPhone">
              <el-input v-model="formData.TaxPhone" placeholder="请输入电话" class="form_input" maxlength="30"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="input-row">
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">开户行</span>
            <el-form-item prop="BankName">
              <el-input v-model="formData.BankName" placeholder="请输入开户行" class="form_input" maxlength="30"></el-input>
            </el-form-item>
          </div>

          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">账号</span>
            <el-form-item prop="AccountNumber">
              <el-input v-model="formData.AccountNumber" placeholder="请输入账号" class="form_input" maxlength="30"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="input-row">
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text"> 发票邮寄地址</span>
            <el-form-item prop="PostAddress">
              <el-input v-model="formData.PostAddress" placeholder="请输入发票邮寄地址" class="form_input" maxlength="30"></el-input>
            </el-form-item>
          </div>
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">收件人</span>
            <el-form-item prop="PostRecipient">
              <el-input v-model="formData.PostRecipient" placeholder="请输入收件人" class="form_input" maxlength="20"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="input-row">
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">收件人电话</span>
            <el-form-item prop="PostPhone">
              <el-input v-model="formData.PostPhone" placeholder="请输入收件人电话" class="form_input" maxlength="30"></el-input>
            </el-form-item>
          </div>
          <div class="choice-tag-div">
            <span class="choice-type-layout-tag-text">邮编</span>
            <el-form-item prop="ZipCode">
              <el-input v-model="formData.ZipCode" placeholder="请输入邮编" class="form_input" maxlength="20"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>

    <div class="submit-btn-layout but_list">
      <button class="w-btn btn-md-w btn-cancel" type='button' v-if="editCompanyInfo" @click="editCompanyInfo = false">
        取消
      </button>
      <button class="w-btn btn-md-w" type='button' @click="submitCompanyTaxInfo('formData')">
        {{ editCompanyInfo ? "保存" : "编辑" }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { GetCompanyTaxInfo, UpdateCompanyTaxInfo } from "api/companyApi";
export default {
  name: "resume-preview", //公司信息
  computed: {
    ...mapGetters(["user_info"]),
  },
  data() {
    return {
      msg: "",
      editCompanyInfo: false,
      formData: {
        TaxName: "",
        TaxAddress: "",
        BankName: "",
        PostAddress: "",
        PostPhone: "",
        TaxNumber: "",
        TaxPhone: "",
        AccountNumber: "",
        PostRecipient: "",
        ZipCode: "",
      },
      rulesFormLeft: {},
    };
  },

  methods: {
    getCompanyTaxInfo() {
      GetCompanyTaxInfo().then((res) => {
        if (res.data.Success) {
          this.formData = res.data.Data;
        }
      });
    },
    // 提交公司发票信息
    submitCompanyTaxInfo() {
      var that = this;
      if (!this.editCompanyInfo) {
        this.editCompanyInfo = !this.editCompanyInfo;
        return;
      }
      UpdateCompanyTaxInfo(that.formData).then((res) => {
        if (res.data.Success) {
          that.editCompanyInfo = false;
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },
  },
  created() {
    this.getCompanyTaxInfo(); // 获取公司基本信息
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.invoice-info {
  width: 100%;
  margin-bottom: 10px;
  .choice-type-layout {
    margin-top: 15px;
    .input-row {
      display: flex;
      .choice-tag-div {
        position: relative;
        padding-left: 9em;
        padding-right: 25px;
        width: 50%;

        .choice-type-layout-tag-text {
          position: absolute;
          left: 5px;
          top: 0;
          line-height: 34px;
          color: #999;
          width: 8em;
        }
        .el-form-item {
          margin-bottom: 20px;
          /deep/ .el-input__inner {
            height: 38px;
          }
          /deep/ .el-form-item__content {
            line-height: 38px;
            height: 38px;
          }
          width: 100%;
          /deep/ .el-cascader {
            width: 100%;
          }
          /deep/ .el-select {
            width: 100%;
          }
          /deep/ .el-date-editor {
            width: 100%;
          }
        }
        &.input-rows {
          height: 200px;
          width: 100%;
          /deep/ .el-textarea {
            height: 200px;
            .el-textarea__inner {
              height: 200px;
            }
          }
        }
      }
      .choice-tag-div + .choice-tag-div {
        padding-right: 0;
        padding-left: 8em;
      }
    }
    .input-rows {
      display: flex;
    }
  }
  .submit-btn-layout {
    margin-top: 40px;
    text-align: center;
    width: 100%;
  }
}
</style>
