<template>
  <div class="reward">
    <el-row class="title_def_style r-title">
      <el-col :span="23" class="user-headimg title_font_mix18">获奖信息</el-col>
    </el-row>

    <span v-if="!isListNull && add_resume_id" class="add-line" @click="onAdd">
      <span v-if="resume_status">添加获奖信息</span>
    </span>
    <div class="r-bd" v-if="isListNull">
      <div class="row edu-row">
        <div class="col-2-1" v-for="item in dataList" :key="item.Id">
          <div class="edu-item">
            <h3>
              {{ item.Name | IsNull | beautySub(20) }}
              <!-- <label class="label">统招</label> -->
            </h3>
            <div class="info">
              <span class="major"> {{ item.Institutions | IsNull }} </span>
            </div>
            <div class="text-gray">{{ item.GetTime | Format("yyyy-MM")  }}</div>

            <button v-if="resume_status" class="r-fun r-edit" type="button" @click="onEdit(item)">
              <span class="iconfont icon-apply"></span>
            </button>

            <button v-if="resume_status" class="r-fun r-del" type="button" @click="$refs.isDelDialog.showIsDel(item)">
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
    <is-del-dialog ref="isDelDialog" :titles="'获奖信息'" @callbackFun="onDel"></is-del-dialog>
    <el-dialog title="获奖信息" :visible.sync="isShowdialog" class="edit_dialog education_experience" :modal-append-to-body="false" :close-on-click-modal="false" @close="$reset('fromData')">
      <el-form ref="fromData" label-position="top" :rules="ruleValidate" label-width="80px" :model="fromData" size="small">
        <el-row>
          <el-form-item label="获奖名称" prop="Name">
            <el-input type="text" maxlength="35" show-word-limit v-model="fromData.Name" placeholder="请输入获奖名称"></el-input>
          </el-form-item>
          <el-form-item label="获奖机构" prop="Institutions">
            <el-input type="text" maxlength="35" show-word-limit v-model="fromData.Institutions" placeholder="请输入获奖机构"></el-input>
          </el-form-item>
          <el-form-item label="获奖日期" class="start-end-time" prop="GetTime">
            <el-date-picker v-model="fromData.GetTime" type="month" value-format="yyyy-MM" placeholder="获奖日期" >
            </el-date-picker>
            <!-- <el-checkbox v-model="fromData.IsToNow" @change="onToNow">至今</el-checkbox> -->
          </el-form-item>
          </el-col>
        </el-row>
        <el-row>

        </el-row>

        <el-row>
          <el-form-item label="备注">
            <el-input type="textarea" maxlength="500" show-word-limit v-model="fromData.Description"></el-input>
          </el-form-item>
        </el-row>
        <el-row>

        </el-row>
        <div class="modal-footer">
          <button type="button" class="w-btn w-bt-xl btn-primary" @click="isShowdialog = false">
            取消
          </button>
          <button type="button" @click="onSave('fromData')" class="w-btn w-bt-xl">
            保存
          </button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { GetReward, DelReward, EditReward } from "@/api/myResume";
import { mapGetters } from "vuex";
import { deepCopyTwo } from "utils/index";
import IsDelDialog from "components/IsDelDialog";
export default {
  name: "reward",
  computed: {
    ...mapGetters(["add_resume_id", "resume_status"]),
  },
  components: {
    IsDelDialog,
  },
  data() {
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
      dataList: [],
      showData: {
        "Name": "string",
        "Institutions": "string",
        "GetTime": "2020-09-08T08:47:36.222Z",
        "Description": "string",

        // ResumeId: "",
        // StartTime: "",
        // EndTime: "",
        // Course: "",
        // Institutions: "",
        // Description: "",
      },
      ruleValidate: {
        Name: [
          { required: true, message: "请输入获奖名称", trigger: "blur" },
        ],
        Institutions: [ { required: true, message: "请输入获奖机构", trigger: "blur" },],
        GetTime: [{ required: true, message: "请选择获奖日期", trigger: "blur" }],
       
      },
      fromData: {
        Train: {
          ResumeId: "",
          StartTime: "",
          EndTime: "",
          Course: "",
          Institutions: "",
          Description: "",
          Id: "string",
        },
        type: 0,
      },
      saveStatus: 1,
      isShowdialog: false,
      rules: {},
    };
  },
  methods: {
    onToNow() {
      this.fromData.EndTime = new Date();
    },
    resetFields() {
      this.fromData = {
        SelfEvaluation: "",
      };
    },
    datePickerChange() {
      this.$forceUpdate(); //外部js无效  只对当前组件有效
    },
    onAdd() {
      if (this.add_resume_id === "" && !this.add_resume_id) {
        this.$message({
          message: "请先添加基本信息",
          type: "warning",
        });
        return;
      }
      this.saveStatus = 1;
      this.isShowdialog = true;
      this.resetFields();
    },
    dialogClose() {
      this.getList();
    },
    getList() {
      GetReward({ ResumeId: this.add_resume_id }).then((res) => {
        if (res.data.Success) {
          if (res.data.Data) this.dataList = res.data.Data;

          if (this.dataList.length > 0) {
            this.isListNull = true;
          } else {
            this.isListNull = false;
          }
        } else {
        }
      });
    },
    // setStartEndTime(item) {
    //   if (!this.$IsVal(item.StartTime)) {
    //     return "";
    //   } else
    //     return `${this.$Format(item.StartTime, "yyyy-MM")}  ${
    //       item.StartTime ? "-" : ""
    //     } ${item.IsToNow ? "至今" : this.$Format(item.EndTime, "yyyy-MM")}`;
    // },
    editAction() {
      this.$refs["fromData"].validate((valid) => {
        if (valid) {
          this.fromData.ResumeId = this.add_resume_id;
          let data = {
            Reward: this.fromData,
            type: this.saveStatus, //1 新增   2 修改
          };

          EditReward(data).then((res) => {
            if (res.data.Success) {
              this.isShowdialog = false;
              this.$message({
                message: "保存成功",
                type: "success",
              });
              this.getList();
              this.$Bus.$emit("getBaseInfo");
            } else {
              this.$message({
                message: res.data.Message,
                type: "error",
              });
            }
          });
        }
      });
    },
    onDel(item) {
      DelReward({ Id: item.Id }).then((res) => {
        if (res.data.Success) {
          this.$message({
            message: "删除成功",
            type: "success",
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
  },
  created() {
    if (this.add_resume_id) this.getList();
  },
  watch: {
    datalist: {
      handler: function (newVal, oldVal) {
        if (newVal.length > 0) {
          this.isListNull = true;
        } else {
          this.isListNull = false;
        }
      },
    },
  },
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
    // &.start-end-time {
    //   width: 100%;
    //   overflow: initial;
    //   .el-date-editor {
    //     width: 50% !important;
    //   }
    //   .el-date-editor {
    //     width: 20%;
    //   }
    //   .el-input__inner {
    //     width: 100%;
    //     padding-left: 25px;
    //     padding-right: 25px;
    //   }
    //   .el-input__prefix {
    //     right: auto;
    //     left: 0;
    //   }
    //   label {
    //     &.el-checkbox {
    //       margin-left: 10px;
    //     }
    //   }
    // }
  }
}
$row-h: 124px;
.reward {
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
            .magor {
              width: 200px;
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
