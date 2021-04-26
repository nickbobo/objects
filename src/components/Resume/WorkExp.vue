<template>
  <div class="work-exp">
    <el-row class="basic-info  r-title">
      <el-col :span="23" class="user-headimg title_font_mix18">工作经历</el-col>
      <button class="r-fun" v-if="isWorkExpListNull">
        <span
          v-if="resume_status"
          @click="onAdd"
          type="button"
          class="iconfont icon-add"
        ></span>
      </button>
    </el-row>
    <span
      v-if="!isWorkExpListNull && resume_status && add_resume_id"
      class="add-line"
      @click="onAdd"
    >
      <span>添加工作经历</span>
    </span>

    <el-row class="work-exp-list" v-if="isWorkExpListNull">
      <div class="r-item" v-for="item in workExpList" :key="item.Id">
        <dl class="r-item-info">
          <dt>
            <b>{{ item.PositionTxt }}</b
            ><span class="split">|</span><b>{{ item.CompanyName | IsNull }}</b
            >（{{ item.StartTime | Format("yyyy-MM") }} -
            {{ item.IsToNow ? "至今" : $Format(item.EndTime, "yyyy-MM") }}）
          </dt>
          <dd>
            <span class="name">所在行业：</span>
            <span class="val">{{ item.Industry | IsNull }}</span>
          </dd>
          <dd>
            <span class="name">职位名称：</span>
            <span class="val">{{ item.PositionTxt | IsNull }}</span>
          </dd>
          <dd>
            <span class="name">薪资：</span>
            <span class="val">{{ item.SalaryTxt | IsNull }}</span>
          </dd>
          <dd>
            <span class="name">公司性质：</span>
            <span class="val">{{ item.CompanyType | IsNull }}</span>
          </dd>
          <dd>
            <span class="name">工作内容：</span>
            <span
              class="val"
              v-html="common.encodeTextAreaString(item.Description)"
            ></span>
          </dd>
        </dl>
        <button
          v-if="resume_status"
          class="r-fun r-edit"
          @click="onEditWorkExp(item)"
          type="button"
        >
          <span class="iconfont icon-apply"></span>
        </button>

        <button
          v-if="resume_status"
          class="r-fun r-del"
          type="button"
          @click="$refs.isDelDialog.showIsDel(item)"
        >
          <span class="iconfont icon-del"></span>
        </button>
      </div>
    </el-row>
    <is-del-dialog
      ref="isDelDialog"
      :titles="'工作经历'"
      @callbackFun="onDelWorkExp"
    ></is-del-dialog>
    <el-dialog
      title="工作经历"
      :visible.sync="isShowdialog"
      class="edit_dialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="$reset('fromData')"
    >
      <el-form
        ref="fromData"
        label-position="top"
        :rules="ruleValidate"
        label-width="80px"
        :model="workExpData"
        :hide-required-asterisk="false"
        size="small"
      >
        <el-row>
          <el-form-item label="公司名称" prop="CompanyName">
            <el-input
              v-model="workExpData.CompanyName"
              maxlength="100"
              show-word-limit
              placeholder="请输入公司名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属行业" prop="Industry">
            <el-select
              placeholder="请选择所属行业"
              allow-create
              filterable
              v-model="workExpData.Industry"
              @change="common.selectChange"
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
                  :value="item.ItemName"
                ></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item
            label="在职时间"
            prop="StartTime"
            class="start-end-time"
          >
            <!-- 添加  回显  修改  -->
            <!-- <reset-date-picker
                :startTime.sync="workExpData.StartTime"
                :endTime.sync="workExpData.EndTime"
                @validata="validata"
                :key="new Date().getTime()"
              ></reset-date-picker> -->

            <el-date-picker
              v-model="workExpData.StartTime"
              type="month"
              value-format="yyyy-MM"
              placeholder="开始日期"
              :picker-options="common.startTime(workExpData.EndTime)"
            >
            </el-date-picker>
            -
            <el-date-picker
              v-model="workExpData.EndTime"
              type="month"
              value-format="yyyy-MM"
              :disabled="workExpData.IsToNow"
              placeholder="结束日期"
              :picker-options="common.endTime(workExpData.StartTime)"
              :default-value="new Date()"
            >
            </el-date-picker>
            <el-checkbox v-model="workExpData.IsToNow" @change="onToNow"
              >至今</el-checkbox
            >
          </el-form-item>
          <el-form-item label="职位名称" prop="Position">
            <el-select
              placeholder="请选择职位名称"
              allow-create
              filterable
              v-model="workExpData.Position"
              @change="common.selectChange"
            >
              <el-option-group
                v-for="industryItem in dictitem_job_category_list"
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
          <el-form-item label="薪资" prop="Mobile">
            <el-select
              v-model="workExpData.Salary"
              label="薪资"
              placeholder="请选择薪资"
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

          <el-form-item label="公司性质" prop="Description">
            <el-select
              v-model="workExpData.CompanyType"
              placeholder="请选择公司性质"
              class="form_input"
            >
              <el-option
                v-for="item in dd_company_stock"
                :key="item.ItemName"
                :label="item.ItemName"
                :value="item.ItemName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>
          <el-col :span="24" class="form_one_row">
            <el-form-item
              label="工作内容/业绩"
              class="col-full"
              prop="Description"
            >
              <el-input
                type="textarea"
                maxlength="3000"
                show-word-limit
                v-model="workExpData.Description"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="modal-footer">
          <button
            type="button"
            class="w-btn w-bt-xl btn-primary"
            @click="isShowdialog = false"
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
import { GetWorkExp, EditWorkExp, DelWorkExp } from "@/api/myResume";
import { deepCopyTwo } from "utils/index";
import { mapGetters } from "vuex";
import IsDelDialog from "components/IsDelDialog";
export default {
  name: "WorkExp",
  computed: {
    ...mapGetters([
      "dd_salary_list",
      "resume_status",
      "add_resume_id",
      "industry_item_list",
      "dictitem_job_category_list",
      "dd_company_stock"
    ])
  },
  components: {
    IsDelDialog
  },
  data() {
    // var checkFinalPayTime = (rule, value, callback) => {
    //   if (this.workExpData.EndTime == "") {
    //     return callback(new Error("请选择在职时间"));
    //   } else {
    //     callback();
    //   }
    // };
    var checkFinalPayTime = (rule, value, callback) => {
      if (
        this.workExpData.StartTime == "" ||
        this.workExpData.StartTime == null
      ) {
        return callback(new Error("请选择就读时间"));
      } else if (
        this.workExpData.EndTime == "" ||
        this.workExpData.EndTime == null
      ) {
        return callback(new Error("请选择就读时间"));
      } else {
        callback();
      }
    };
    return {
      isWorkExpListNull: false,
      workExpList: [],

      ruleValidate: {
        CompanyName: [
          { required: true, message: "请输入工作名称", trigger: "blur" }
        ],
        Industry: [
          { required: true, message: "请选择工作行业", trigger: "blur" }
        ],
        StartTime: [
          { required: true, trigger: "blur", validator: checkFinalPayTime }
        ]
      },
      workExpData: {
        ResumeId: "bff5da61-7f30-4a7b-a04a-358eeb6ac45e",
        CompanyName: "",
        Industry: "",
        Position: "",
        PositionTxt: "",
        StartTime: "",
        EndTime: new Date(),
        IsToNow: false,
        Salary: "",
        SalaryTxt: "",
        Description: "",
        CompanyType: ""
      },
      pickerOptions0: {
        disabledDate(date) {
          var disabledDay = date.getFullYear();
          //取1950年至今的时间范围.
          return disabledDay <= 1949 || date.valueOf() > Date.now();
        }
      },
      isShowdialog: false,
      rules: {},
      saveStatus: 1
    };
  },
  methods: {
    onToNow() {
      this.workExpData.EndTime = new Date();
    },
    validata() {
      this.$refs["fromData"].validateField("StartTime", valid => {});
    },
    resetFields() {
      this.workExpData = {
        ResumeId: "bff5da61-7f30-4a7b-a04a-358eeb6ac45e",
        CompanyName: "",
        Industry: "",
        Position: "",
        PositionTxt: "",
        StartTime: "",
        EndTime: new Date(),
        IsToNow: false,
        Salary: "",
        SalaryTxt: "",
        CompanyType: "",
        Description: ""
      };
    },
    datePickerChange() {
      this.$forceUpdate(); //外部js无效  只对当前组件有效
    },
    onAdd() {
      if (this.add_resume_id === "" && !this.add_resume_id) {
        this.$message({
          message: "请先添加基本信息",
          type: "warning"
        });
        return;
      }
      this.saveStatus = 1;
      this.isShowdialog = true;
      this.resetFields();
    },
    GetWorkExp() {
      GetWorkExp({ ResumeId: this.add_resume_id }).then(res => {
        if (res.data.Success) {
          this.workExpList = res.data.Data;
        } else {
        }
      });
    },
    EditWorkExp(data) {
      this.$refs["fromData"].validate(valid => {
        if (valid) {
          this.workExpData.ResumeId = this.add_resume_id;
          let data = {
            workexp: this.workExpData,
            type: this.saveStatus //1 新增   2 修改
          };
          EditWorkExp(data).then(res => {
            if (res.data.Success) {
              this.isShowdialog = false;
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.GetWorkExp();
              if (this.saveStatus == 2) {
                this.workExpList.forEach((val, index, arr) => {
                  if (val.Id == this.workExpData.Id) {
                    this.workExpList[index] = this.workExpData;
                  }
                });
              } else {
                this.GetWorkExp();
              }
            } else {
            }
          });
        }
      });
    },
    onCancel() {},
    onSave() {
      this.EditWorkExp();
    },
    onEditWorkExp(item) {
      this.isShowdialog = true;
      this.saveStatus = 2;
      this.workExpData = deepCopyTwo(item);
    },

    onDelWorkExp(item) {
      DelWorkExp({ Id: item.Id }).then(res => {
        if (res.data.Success) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.workExpList.some((items, i) => {
            if (items.Id == item.Id) {
              this.workExpList.splice(i, 1); //在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
              return true;
            }
          });
          this.$refs.isDelDialog.isShowDelDialog = false;
        } else {
        }
      });
    }
  },
  created() {
    this._navbar = true;
    if (this.add_resume_id) this.GetWorkExp();
  },
  watch: {
    //监听input框的变化情况
    //在input框每次输入内容的时候,这一行在后台都会打印值:改变后的数据---改变前的数据
    workExpList: {
      //定义在watch里的conten代表监控数据conten
      handler: function(newVal, oldVal) {
        //操作者

        if (newVal.length > 0) {
          this.isWorkExpListNull = true;
        } else {
          this.isWorkExpListNull = false;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.edit_dialog {
  .data_picker {
    &.el-input__inner {
      width: 240px;
    }
  }
}
</style>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.work-exp {
  background: #fff;
  font-size: 14px;
  color: #333333;
  >>> .el-dialog__body {
    padding: 25px 35px 35px;
    .el-form-item {
      width: 50%;
      float: left;
      position: relative;
      padding-left: 8em;
      padding-right: 1em;
      .el-form-item__label {
        padding: 0;
        margin: 0;
        width: 7em;
        /* float: left; */
        font-size: 14px;
        font-weight: 100;
        position: absolute;
        left: 0;
        text-align: left;
        margin-left: 1em;
      }
      .el-form-item__content {
        width: 100%;
        .el-input {
          width: 100%;
        }
        .el-select {
          width: 100%;
        }
      }
      &.start-end-time {
        width: 100%;
        .el-date-editor {
          width: 20%;
        }
        .el-input__inner {
          width: 100%;
          padding-left: 25px;
          padding-right: 25px;
        }
        .el-input__prefix {
          right: auto;
          left: 0;
        }
        label {
          &.el-checkbox {
            margin-left: 10px;
          }
        }
      }

      &.col-full {
        width: 100%;
        .el-form-item__content {
          width: 100%;
        }
        .el-textarea {
          width: 100%;
          height: 200px;
          textarea {
            height: 200px;
          }
        }
      }
      &.start-end-time {
        width: 100%;
        .el-date-editor {
          width: 120px !important;
        }
        .el-input__inner {
          width: 100%;
          padding-left: 25px;
          padding-right: 25px;
        }
        .el-input__prefix {
          right: auto;
          left: 0;
        }
        label {
          &.el-checkbox {
            margin-left: 10px;
          }
        }
      }
    }
  }
  .basic-info {
    // border-top: 1px solid #dddddd;
    // padding-top: 30px;
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
      padding-right: 35px;
    }
  }
  .r-item {
    .r-item-info {
      dt {
        display: flex;
        b {
          max-width: 270px;
          display: block;
          text-overflow: ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
          white-space: nowrap; /*让文字不换行*/
          overflow: hidden; /*超出要隐藏*/
        }
      }
    }
  }
}
</style>
