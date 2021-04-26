<template>
  <div class="education-experience">
    <el-row class="title_def_style r-title">
      <el-col :span="23" class="user-headimg title_font_mix18">教育经历</el-col>
    </el-row>

    <span v-if="!isListNull && add_resume_id" class="add-line" @click="onAdd">
      <span v-if="resume_status">添加教育经历</span>
    </span>
    <div class="r-bd" v-if="isListNull">
      <div class="row edu-row">
        <div class="col-2-1" v-for="item in datalist" :key="item.Id">
          <div class="edu-item">
            <h3>
              {{ item.SchoolName | IsNull | beautySub(20) }}
              <!-- <label class="label">统招</label> -->
            </h3>
            <div class="info">
             <span class="major"> {{ item.Major | IsNull | beautySub(13)}} </span>
              
              <span class="split">|</span>
              {{ item.EducationTxt | IsNull }}
            </div>
            <div class="text-gray">{{ setStartEndTime(item) }}</div>

            <button
              v-if="resume_status"
              class="r-fun r-edit"
              @click="onEdit(item)" type="button"
            >
              <span class="iconfont icon-apply"></span>
            </button>

            <button
              v-if="resume_status"
              class="r-fun r-del" type="button"
              @click="$refs.isDelDialog.showIsDel(item)"
            >
              <span class="iconfont icon-del"></span>
            </button>
            <!-- <button class="r-fun r-edit" data-modal="#eduExperiencePop">
                <span class="iconfont icon-apply"></span>
              </button>
              <button class="r-fun r-del" data-modal="#deletePop">
                <span class="iconfont icon-del"></span>
              </button> -->
          </div>
        </div>
        <div class="col-2-1" v-if="resume_status">
          <div class="edu-item edu-add" @click="onAdd">
            <span class="iconfont icon-jia"></span>
          </div>
        </div>
      </div>
    </div>
    <el-row class="list" v-if="false">
      <el-row class="item" v-if="isListNull">
        <el-col :span="10" v-for="item in datalist" :key="item.Id">
          <el-row>
            <el-col :span="20" class="title_font_mix16">{{
              item.SchoolName
            }}</el-col>
            <el-col :span="2" v-if="resume_status">
              <svg-icon
                icon-class="edit"
                class="icon-svg-but icon-edit"
                @click="onEdit(item)"
              />
            </el-col>
            <el-col :span="2" v-if="resume_status">
              <svg-icon
                icon-class="trash"
                class="icon-svg-but icon-trash"
                @click="$refs.isDelDialog.showIsDel(item)"
              />
            </el-col>
          </el-row>
          <el-row>{{ setStartEndTime(item) }}</el-row>
          <el-row>
            <el-col :span="18">{{ setMaEd(item) }}</el-col>
          </el-row>
        </el-col>

        <el-col :span="6" class="add" v-if="resume_status">
          <svg-icon
            icon-class="add2"
            @click.native="onAdd"
            class="icon-svg-but icon-add"
          />
        </el-col>
      </el-row>
    </el-row>
    <is-del-dialog
      ref="isDelDialog"
      :titles="'教育经历'"
      @callbackFun="onDel"
    ></is-del-dialog>
    <el-dialog
      title="教育经历"
      :visible.sync="isShowdialog"
      class="edit_dialog education_experience"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="$reset('fromData')"
    >
      <el-form
        ref="fromData"
        label-position="top"
        :rules="ruleValidate"
        label-width="80px"
        :model="fromData"
        size="small"
      >
        <el-row>
            <el-form-item label="学校名称" prop="SchoolName">
              <el-input
                type="text"
                maxlength="35"
                show-word-limit
                v-model="fromData.SchoolName"
                placeholder="请输入学校名称"
              ></el-input>
            </el-form-item>
                        <el-form-item label="专业名称" prop="Major">
              <el-input
                type="text"
                maxlength="20"
                show-word-limit
                v-model="fromData.Major"
                placeholder="请输入专业名称"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="就读时间" prop="StartTime">
              <reset-date-picker
                :startTime.sync="fromData.StartTime"
                :endTime.sync="fromData.EndTime"
                @validata="validata"
                :key="new Date().getTime()"
              ></reset-date-picker> -->
                        <el-form-item
            label="就读时间"
            class="start-end-time"
            prop="StartTime"
          >
            <!-- <reset-date-picker
                :startTime.sync="fromData.StartTime"
                :endTime.sync="fromData.EndTime"
                @validata="validata"
                :key="new Date().getTime()"
              ></reset-date-picker> -->

            <el-date-picker
              v-model="fromData.StartTime"
              type="month"
              value-format="yyyy-MM"
              placeholder="开始日期"
              :picker-options="common.startTime(fromData.EndTime)"
            >
            </el-date-picker>
            -
            <el-date-picker
              v-model="fromData.EndTime"
              type="month"
              value-format="yyyy-MM"
              :disabled="fromData.IsToNow"
              placeholder="结束日期"
              :picker-options="common.endTime(fromData.StartTime)"
              :default-value="new Date()"
            >
            </el-date-picker>
            <!-- 添加  回显  修改  -->
            <!-- <reset-date-picker
              :startTime.sync="workExpData.StartTime"
              :endTime.sync="workExpData.EndTime"
              :unlink-panels="true"
              @validata="validata"
              :end-placeholder="new Date().getTime()"
              :key="new Date().getTime()"
            ></reset-date-picker> -->
            <el-checkbox v-model="fromData.IsToNow" @change="onToNow"
              >至今</el-checkbox
            >
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>

            <el-form-item label="学历" prop="Education">
              <el-select
                placeholder="请选择学历"
                v-model="fromData.Education"
                @change="common.selectChange"
              >
                <el-option
                  v-for="items in degreeList"
                  :key="items.ItemCode"
                  :label="items.ItemName"
                  :value="items.ItemCode"
                ></el-option>
              </el-select>
            </el-form-item>
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
            @click="onSave('fromData')"
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
import { GetEdu, EditEdu, DelEdu } from "api/myResume";
import { deepCopyTwo } from "utils/index";
import { mapGetters } from "vuex";
import IsDelDialog from "components/IsDelDialog";
export default {
  name: "EducationExperience",
  computed: {
    ...mapGetters([
      "dd_salary_list",
      "resume_status",
      "add_resume_id",
      "industry_item_list",
      "dictitem_job_category_list"
    ])
  },
  components: {
    IsDelDialog
  },
  data() {
    // var checkFinalPayTime = (rule, value, callback) => {
    //   if (this.fromData.EndTime == "") {
    //     return callback(new Error("请输入就读时间"));
    //   } else {
    //     callback();
    //   }
    // };
    var checkFinalPayTime = (rule, value, callback) => {
      if (this.fromData.StartTime == "" || this.fromData.StartTime == null) {
        return callback(new Error("请选择就读时间"));
      } else if (this.fromData.EndTime == "" || this.fromData.EndTime == null) {
        return callback(new Error("请选择就读时间"));
      } else {
        callback();
      }
    };
    return {
      isListNull: false,
      datalist: [],
      MaEd: "",
      startEndTime: "",
      time: "",
      degreeList: [],
      ruleValidate: {
        SchoolName: [
          { required: true, message: "请输入学校名称", trigger: "blur" }
        ],
        StartTime: [{ validator: checkFinalPayTime, trigger: "blur" }],
        Major: [{ required: true, message: "请选择专业名称", trigger: "blur" }],
        Education: [
          { required: true, message: "请输入选择学历", trigger: "blur" }
        ]
      },
      fromData: {
        ResumeId: "bff5da61-7f30-4a7b-a04a-358eeb6ac45e",
        SchoolName: "",
        StartTime: "",
        EndTime: new Date(),
        IsToNow: false,
        Major: "",
        Education: "",
        Description: "",
        Id: "bff5da61-7f30-4a7b-a04a-358eeb6ac45e"
      },
      isShowdialog: false,
      rules: {},
      saveStatus: 1
    };
  },
  methods: {
    onToNow() {
      this.fromData.EndTime = new Date();
    },
    validata() {
      this.$refs["fromData"].validateField("StartTime", valid => {});
    },
    resetFields() {
      this.fromData = {
        ResumeId: "bff5da61-7f30-4a7b-a04a-358eeb6ac45e",
        SchoolName: "",
        StartTime: "",
        EndTime: new Date(),
        IsToNow: false,
        Major: "",
        Education: "",
        Description: "",
        Id: "bff5da61-7f30-4a7b-a04a-358eeb6ac45e"
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
    getList() {
      GetEdu({ ResumeId: this.add_resume_id }).then(res => {
        if (res.data.Success) {
          this.datalist = res.data.Data;
        } else {
        }
      });
    },
    editAction() {
      this.$refs["fromData"].validate(valid => {
        if (valid) {
          this.fromData.ResumeId = this.add_resume_id;
          let data = {
            edu: this.fromData,
            type: this.saveStatus //1 新增   2 修改
          };

          EditEdu(data).then(res => {
            if (res.data.Success) {
              this.isShowdialog = false;
              this.$message({
                message: "保存成功",
                type: "success"
              });
              if (this.saveStatus == 2) {
                this.datalist.forEach((val, index, arr) => {
                  if (val.Id == this.fromData.Id) {
                    this.datalist[index] = this.fromData;
                  }
                });
              }
              //else {
              this.getList();
              this.$Bus.$emit("getBaseInfo");
              // }
            } else {
              this.$message({
                message: res.data.Message,
                type: "error"
              });
            }
          });
        }
      });
    },
    onCancel() {
      this.isShowdialog = false;
    },
    onSave() {
      this.editAction();
    },
    onEdit(item) {
      this.isShowdialog = true;
      this.saveStatus = 2;
      this.fromData = deepCopyTwo(item);
    },

    onDel(item) {
      DelEdu({ Id: item.Id }).then(res => {
        if (res.data.Success) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.datalist.some((items, i) => {
            if (items.Id == item.Id) {
              this.datalist.splice(i, 1); //在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
              return true;
            }
          });
          this.$refs.isDelDialog.isShowDelDialog = false;
        } else {
        }
      });
    },
    setStartEndTime(item) {
      if (!this.$IsVal(item.StartTime)) {
        return "";
      } else
        return `${this.$Format(item.StartTime, "yyyy-MM")}  ${
          item.StartTime ? "-" : ""
        } ${item.IsToNow ? "至今" : this.$Format(item.EndTime, "yyyy-MM")}`;
    },
    setMaEd(item) {
      return `${item.Major} ${
        this.$IsVal(item.Major) && this.$IsVal(item.EducationTxt) ? "|" : ""
      } ${item.EducationTxt}`;
    }
  },
  created() {
    if (this.add_resume_id) this.getList();
  },
  mounted() {
    this.degreeList = this.common.getDDByType("Degree");
  },
  watch: {
    //监听input框的变化情况
    //在input框每次输入内容的时候,这一行在后台都会打印值:改变后的数据---改变前的数据
    datalist: {
      //定义在watch里的conten代表监控数据conten
      handler: function(newVal, oldVal) {
        //操作者

        //     this.startEndTime = `${this.$Format(newVal.StartTime,'yyyy-MM-dd')}  ${newVal.StartTime?'-':''} ${this.$Format(newVal.EndTime,'yyyy-MM-dd')}`
        //     this.MaEd = `${newVal.Major} ${this.$IsVal(newVal.Major) && this.$IsVal(newVal.EducationTxt) ?'|':''} ${newVal.EducationTxt}`

        if (newVal.length > 0) {
          this.isListNull = true;
        } else {
          this.isListNull = false;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
>>> .el-dialog__body {
  padding: 25px 35px 35px;
  .el-form-item {
    width: 50%;
    float: left;
    position: relative;
    padding-left: 7em;
    padding-right: 1em;
    .el-form-item__label {
      padding: 0;
      margin: 0;
      width: 6em;
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
      overflow: initial;
      .el-date-editor {
        width: 120px !important;
      }
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
  }
}
$row-h: 124px;
.education-experience {
  background: #fff;
  font-size: 14px;
  color: #333333;
  .r-bd {
    .edu-row {
      margin-bottom: 20px;
      &.row {
        margin-left: -15px;
        margin-right: -15px;
        &:after {
          display: table;
          content: " ";
          clear: both;
        }
        &:before {
          display: table;
          content: " ";
        }
      }

      .col-2-1 {
        width: 50%;
        box-sizing: border-box;

        .edu-item {
          position: relative;
          font-size: 16px;
          border: 1px solid #ddd;
          padding: 15px 20px;
          color: #000;
          height: 90px;
          margin: 10px 0;
          box-sizing: initial;
          h3 {
            .label {
              font-weight: normal;
              font-size: 13px;
            }
          }
          .info {
            margin: 15px 0 10px;
            .magor{
              width :200px;
            }
          }
          .r-fun {
            right: 15px;
          }
          .r-edit {
            top: 15px;
          }
          .r-del {
            top: 45px;
          }
        }
      }
      .edu-add {
        width: 90px;
        cursor: pointer;
        padding: 15px;

        .iconfont {
          position: absolute;
          top: 50%;
          left: 50%;
          color: $blue;
          font-size: 40px;
          line-height: 1;
          margin-top: -20px;
          margin-left: -20px;
        }

        &:hover {
          border-color: $blue;
        }
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

  .list {
    .item {
      margin-top: 10px;
      > .el-col {
        border: 1px solid rgba(221, 221, 221, 1);
        padding: 10px 15px 10px 15px;
        margin-right: 20px;
        margin-bottom: 20px;
        @include wh($right-w, $row-h);
        &.add {
          @include wh($row-h, $row-h);
          text-align: center;
          padding: 0;
          line-height: $row-h;
        }
        .el-row {
          margin-top: 10px;
          align-items: center;
          display: flex;
          .icon-edit {
            margin-left: -10px;
          }
          .school_type {
            padding: 5px 5px;
            text-align: center;
            background: rgba(68, 169, 225, 1);
            border-radius: 4px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
