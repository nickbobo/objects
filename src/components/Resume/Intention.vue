<template>
  <div class="intention">
    <div class="r-purpose">
      <div class="r-title">求职意向</div>
      <ul class="purpose-list">
        <li>
          <span class="name">期望薪资：</span>
          <span class="val">{{ showData.ExpectSalaryTxt | IsNull }}</span>
        </li>
        <li>
          <span class="name">期望地点：</span>
          <span class="val">{{ showData.ExpectCityTxt | IsNull }}</span>
        </li>
        <li>
          <span class="name">期望职能：</span>
          <span class="val">{{ showData.ExpectJobCategory | IsNull }}</span>
        </li>
        <li>
          <span class="name">期望行业：</span>
          <span class="val">{{ showData.ExpectIndustry | IsNull }}</span>
        </li>
      </ul>
      <button
        v-if="resume_status && add_resume_id"
        type="button"
        class="r-fun r-edit"
        @click="onEditShow"
      >
        <span class="iconfont icon-apply"></span>
      </button>
    </div>
    <el-dialog
      title="求职意向"
      :visible.sync="editIntentionDialog"
      class="edit_dialog intention_dialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <el-form
        ref="basicInfo"
        label-position="top"
        :rules="rulesIntention"
        label-width="80px"
        :model="intention"
        :hide-required-asterisk="false"
        size="small"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="期望薪资" prop="Mobile">
              <el-select
                v-model="intention.ExpectSalary"
                label="期望薪资"
                placeholder="期望薪资"
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
          <el-col :span="12">
            <el-form-item label="期望地点" prop="Gender">
              <el-select
                placeholder="请选择期望地点"
                filterable
                v-model="intention.ExpectCity"
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
            <el-form-item label="期望职能" prop="Birthday">
              <el-select
                placeholder="请选择期望职能"
                filterable
                v-model="intention.ExpectJobCategory"
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
                    :value="item.ItemName"
                  ></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" class="form_one_row">
            <el-form-item label="期望行业" prop="Hukou">
              <el-select
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择期望行业"
                v-model="intention.ExpectIndustryList"
                @change="selectChange"
                :multiple-limit="3"
              >
                <el-option-group
                  v-for="industryItem in industry_item_list"
                  :key="industryItem.ItemName"
                  :label="industryItem.ItemName"
                >
                  <el-option
                    v-for="item in industryItem.Childs"
                    :key="item.ItemName"
                    :label="item.ItemName"
                    :value="item.ItemName"
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
            @click="onSave('intention')"
            class="w-btn w-bt-xl"
          >
            保存
          </button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { GetIntention, EditIntention } from "@/api/myResume";
import { deepCopyTwo } from "utils/index";
export default {
  name: "Intention",
  computed: {
    ...mapGetters([
      "dd_salary_list",
      "add_resume_id",
      "city_item",
      "resume_status",
      "dictitem_job_category_list",
      "industry_item_list"
    ])
  },
  data() {
    return {
      optionProps: { value: "ItemCode", label: "ItemName", children: "Childs" },
      rulesIntention: {
        // Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        // Gender: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      editIntentionDialog: false,
      showData: {
        ExpectSalary: "",
        ExpectCity: "",
        ExpectJobCategory: "",
        ExpectIndustry: ""
      },
      intention: {
        ExpectIndustry: "", //期望行业
        ExpectJobCategory: "", //期望工作类型
        ExpectArrivalTime: "ArrivalTime_05", //预计到达时间
        ExpectCity: "",
        ExpectSalary: "", //期望的薪水
        ExpectWorkNature: "WorkType_01", //期望的工作性质
        ExpectIndustryList: []
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
      this.intention = deepCopyTwo(this.showData);
      this.editIntentionDialog = true;
    },
    EditIntention() {},
    GetIntention() {
      let that = this;
      GetIntention({ ResumeId: this.add_resume_id }).then(res => {
        if (res.data.Success) {
          if (res.data.Data) {
            let data = res.data.Data;
            this.intention = res.data.Data;

            if (data.ExpectIndustry) {
              this.intention.ExpectIndustryList = data.ExpectIndustry.split(
                "|"
              );
            }
            // this.intention.ExpectCity = [undefined,this.intention.ExpectCity]
            this.showData = deepCopyTwo(this.intention);
          }
        } else {
        }
      });
    },

    onCancel() {
      this.editIntentionDialog = false;
    },
    onSave() {
      let expect = this.intention.ExpectIndustryList;
      let ex = "";
      if (expect) {
        for (let i = 0; i < expect.length; i++) {
          if (expect.length - 1 == i) {
            ex += expect[i];
          } else {
            ex += expect[i] + "|";
          }
        }
      }
      this.intention.ExpectIndustry = ex;
      this.intention.ResumeId = this.add_resume_id;
      let data = deepCopyTwo(this.intention);
      // data.ExpectCity = data.ExpectCity[1];
      EditIntention(data).then(res => {
        if (res.data.Success) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.onCancel();
          this.GetIntention();
        } else {
        }
      });
    }
  },
  created() {
    this._navbar = true;
    if (this.add_resume_id) this.GetIntention();
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
.intention {
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
