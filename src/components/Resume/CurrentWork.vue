<template>
  <div class="current_work" v-if="!resume_status">
    <div class="r-purpose">
      <div class="r-title">当前公司</div>
      <ul class="purpose-list">
        <li>
          <span class="name">公司名称：</span>
          <span class="val">{{ showData.CurCompany | IsNull }}</span>
        </li>
        <li>
          <span class="name">公司职位：</span>
          <span class="val">{{ showData.CurPositionTxt | IsNull }}</span>
        </li>
        <li>
          <span class="name">公司行业：</span>
          <span class="val">{{ showData.CurIndustryTxt | IsNull }}</span>
        </li>
        <li>
          <span class="name">公司地点：</span>
          <span class="val">{{ showData.CurWorkPlaceTxt | IsNull }}</span>
        </li>
        <li>
          <span class="name">公司薪资：</span>
          <span class="val">{{ showData.CurSalaryTxt | IsNull }}</span>
        </li>
      </ul>
      <button
        v-if="resume_status && add_resume_id"
        class="r-fun r-edit" type="button"
        @click="onEditShow"
      >
        <span class="iconfont icon-apply"></span>
      </button>
    </div>

    <el-row v-if="false">
      <el-col :span="24">
        <el-row class="basic-info">
          <el-col :span="23" class="user-headimg title_font_mix18"
            >当前公司</el-col
          >
          <el-col :span="1" v-if="resume_status">
            <svg-icon
              icon-class="edit"
              class="icon-edit icon-svg-but"
              @click="onEditShow"
            />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="24" class="info-content">
        <el-row>
          <el-col :span="colKey" class="title_sty">公司名称</el-col>
          <el-col :span="colVal1">{{ showData.CurCompany | IsNull }}</el-col>
          <el-col :span="colKey" class="title_sty tow">公司职位</el-col>
          <el-col :span="colVal">{{ showData.CurPositionTxt | IsNull }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="colKey" class="title_sty">公司行业</el-col>
          <el-col :span="colVal">{{ showData.CurIndustry | IsNull }}</el-col>
          <!-- <el-col :span="colKey" class="title_sty tow">期望行业</el-col>
          <el-col :span="colVal">{{
            intention.ExpectIndustry | IsNull
          }}</el-col> -->
        </el-row>
      </el-col>
    </el-row>

    <el-dialog
      title="当前公司"
      :visible.sync="editIntentionDialog"
      class="edit_dialog intention_dialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="$reset('formRef')"
    >
      <el-form
        ref="formRef"
        label-position="top"
        :rules="rulesIntention"
        label-width="80px"
        :model="intention"
        :hide-required-asterisk="false"
        size="small"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="公司名称" prop="CurCompany">
              <el-input
                v-model="fromData.CurCompany"
                filterable
                placeholder="公司名称"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="期望薪资" prop="Mobile">
              <el-row class="input_mini">
                <el-col :span="11">
                  <el-input
                    v-model.number="showData.ExpectSalary1"
                    @change="common.selectChange"
                    size="mini"
                  ></el-input>
                </el-col>
                <el-col :span="2">X</el-col>
                <el-col :span="11">
                  <el-input
                    v-model.number="showData.ExpectSalary2"
                    @change="common.selectChange"
                    size="mini"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司地点" prop="CurWorkPlace">
              <el-select
                placeholder="请选公司地点"
                filterable
                v-model="fromData.CurWorkPlace"
              >
                <el-option-group
                  v-for="items in city_item"
                  :key="items.ItemName"
                  :label="items.ItemName"
                >
                  <el-option
                    v-for="item in items.Childs"
                    :key="item.ItemCode"
                    :label="item.ItemName"
                    :value="item.ItemCode"
                  ></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="公司职位" prop="CurPosition">
              <!-- <el-input
                v-model="fromData.CurPosition"
                placeholder="请输入目前职位"
                size="small"
              ></el-input> -->
              <el-select
                placeholder="公司职位"
                allow-create
                filterable
                v-model="fromData.CurPosition"
              >
                <el-option-group
                  v-for="items in dictitem_job_category_list"
                  :key="items.ItemCode"
                  :label="items.ItemName"
                >
                  <el-option
                    v-for="item in items.Childs"
                    :key="item.ItemCode"
                    :label="item.ItemName"
                    :value="item.ItemCode"
                  ></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="薪资" prop="CurSalary">
              <el-select
                v-model="fromData.CurSalary"
                label="当前薪资"
                placeholder="当前薪资"
                prop="ExpectSalary"
              >
                <el-option
                  :label="item.ItemName"
                  :value="item.ItemCode"
                  v-for="(item, index) in dd_salary_list"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" class="form_one_row">
            <el-form-item label="公司行业" prop="CurIndustry">
              <el-select
                filterable
                allow-create
                default-first-option
                collapse-tags
                placeholder="公司行业"
                v-model="fromData.CurIndustry"
                @change="selectChange"
              >
                <el-option-group
                  v-for="industryItem in industry_item_list"
                  :key="industryItem.ItemName"
                  :label="industryItem.ItemName"
                >
                  <el-option
                    v-for="item in industryItem.Childs"
                    :key="item.ItemCode"
                    :label="item.ItemName"
                    :value="item.ItemCode"
                  ></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="modal-footer">
          <button
            type="button"
            class="w-btn w-bt-xl btn-primary"
            @click="editIntentionDialog = false"
          >
            取消
          </button>
          <button
            type="button"
            @click="onSave('formRef')"
            class="w-btn w-bt-xl"
          >
            保存
          </button>
        </div>
        <!-- <el-form-item class="button_content">
          <el-button
            size="medium"
            class="but_cancel"
            @click="onCancel('formRef')"
            >取消</el-button
          >
          <el-button
            type="primary"
            size="medium"
            class="but_save"
            @click="onSave('formRef')"
            >保存</el-button
          >
        </el-form-item> -->
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { deepCopyTwo } from "utils/index";
import { GetCurrentInfo, EditCurrentInfo } from "@/api/myResume";
export default {
  name: "CurrentWork",
  computed: {
    ...mapGetters([
      "dd_salary_list",
      "resume_status",
      "add_resume_id",
      "dictitem_job_category_list",
      "industry_item_list",
      "city_item"
    ])
  },
  data() {
    return {
      rulesIntention: {
        CurCompany: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        CurWorkPlace: [
          { required: true, message: "请选择公司地点", trigger: "blur" }
        ],
        CurPosition: [
          { required: true, message: "请选择公司职位", trigger: "blur" }
        ],
        CurIndustry: [
          { required: true, message: "请选择公司行业", trigger: "blur" }
        ]
      },
      editIntentionDialog: false,
      intention: {
        ExpectIndustry: "", //期望行业
        ExpectJobCategory: "", //期望工作类型
        ExpectArrivalTime: "ArrivalTime_05", //预计到达时间
        ExpectCity: "",
        ExpectSalary: "", //期望的薪水
        ExpectWorkNature: "WorkType_01", //期望的工作性质
        ExpectSalary1: 0,
        ExpectSalary2: 0,
        ExpectIndustryList: [],

        CurCompany: "string", //公司名
        CurWorkPlace: "string", //公司地点
        CurPosition: "string", //公司职位
        CurIndustry: "string", //公司行业
        CurSalary: "string" //薪资
      },
      showData: {
        CurCompany: "", //公司名
        CurWorkPlace: "", //公司地点
        CurPosition: "", //公司职位
        CurPositionTxt: "",
        CurIndustry: "", //公司行业
        CurSalary: "" //薪资
      },
      fromData: {
        CurCompany: "", //公司名
        CurWorkPlace: "", //公司地点
        CurPosition: "", //公司职位
        CurIndustry: "", //公司行业
        CurSalary: "" //薪资
      },
      colKey: 4,
      colVal: 8,
      colVal1: 5,
      msg: "",
      percentage: 20,
      customColor: "#409eff",

      customColors: [
        { color: "#5296DB", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ]
    };
  },
  methods: {
    selectChange() {
      this.$forceUpdate(); //外部js无效  只对当前组件有效
    },
    onEditShow() {
      if (this.add_resume_id === "" && !this.add_resume_id) {
        this.$message({
          message: "请先添加基本信息",
          type: "warning"
        });
        return;
      }
      this.editIntentionDialog = true;
      this.fromData = deepCopyTwo(this.showData);
    },
    GetCurrentInfo() {
      GetCurrentInfo({ ResumeId: this.add_resume_id }).then(res => {
        if (res.data.Success) {
          let data = res.data.Data;
          if (res.data.Data) {
            data.CurPositionTxt = this.common.getItemNameByItemCode(
              this.dictitem_job_category_list,
              data.CurPosition
            );
            data.EducationTxt = this.common.getItemNameByItemCode(
              this.industry_item_list,
              data.Education
            );

            data.CurSalaryTxt = this.common.getItemNameByItemCode(
              this.dd_salary_list,
              data.CurSalary
            );

            data.CurIndustryTxt = this.common.getItemNameByItemCode(
              this.industry_item_list,
              data.CurIndustry
            );
            data.CurWorkPlaceTxt = this.common.getItemNameByItemCode(
              this.city_item,
              data.CurWorkPlace
            );

            this.showData = deepCopyTwo(data);
            this.fromData = data;
          }
        } else {
        }
      });
    },

    onCancel() {
      this.editIntentionDialog = false;
    },
    onSave() {
      this.$refs["formRef"].validate(valid => {
        if (valid) {
          let expect = this.fromData.CurIndustry;
          this.fromData.ResumeId = this.add_resume_id;
          EditCurrentInfo(this.fromData).then(res => {
            if (res.data.Success) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.onCancel();
              this.GetCurrentInfo();
              this.$Bus.$emit("getBaseInfo");
            } else {
              this.$message.error(res.data.Message);
            }
          });
        }
      });
    }
  },
  created() {
    this._navbar = true;
    if (this.add_resume_id) this.GetCurrentInfo();
  }
};
</script>
<style lang="scss">
.intention_dialog {
  .form_input_mobile {
    button {
      position: absolute;
      height: 18px;
      width: 48px;
      padding: 0px;
      margin-left: -52px;
      margin-top: 8px;
      background: #eeeeee;
      color: #333;
      border: 0;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.current_work {
  // margin-top: 20px;
  background: #fff;
  font-size: 14px;
  color: #333333;
  .basic-info {
    // border-top: 1px solid #dddddd;
    padding-top: 30px;
    img {
      @include wh(150px, 150px);
    }
    .user-info {
      padding-left: 20px;
      .el-col {
        @include lineH(40px);
      }
    }
  }
  .info-content {
    .el-row {
      @include lineH(40px);
    }
    .title_sty {
      text-align: right;
      padding-right: 25px;
    }
  }
}
</style>
