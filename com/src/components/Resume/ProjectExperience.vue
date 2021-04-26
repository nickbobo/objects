<template>
  <div class="project-experience">
    <el-row class="basic-info r-title">
      <el-col :span="23" class="user-headimg title_font_mix18">项目经历</el-col>

      <button class="r-fun" v-if="isListNull" type="button">
        <span
          v-if="resume_status"
          @click="onAdd"
          class="iconfont icon-add"
        ></span>
      </button>
    </el-row>
    <span
      v-if="!isListNull && resume_status && add_resume_id"
      class="add-line"
      @click="onAdd"
    >
      <span>添加项目经历</span>
    </span>

    <el-row class="work-exp-list" v-if="isListNull">
      <div class="r-item" v-for="item in datalist" :key="item.Id">
        <dl class="r-item-info">
          <dt>
            <b>{{ item.ProjectName | IsNull }}</b
            >（{{ item.StartTime | Format("yyyy-MM") }} -
            {{ item.IsToNow ? "至今" : $Format(item.EndTime, "yyyy-MM") }}）
          </dt>
          <dd>
            <span class="name">职位名：</span>
            <span class="val"></span>{{ item.Position | IsNull}}
          </dd>
          <dd>
            <span class="name">所在公司：</span>
            <span class="val"></span>{{ item.Company | IsNull}}
          </dd>
          <dd>
            <span class="name">项目业绩：</span>
            <span
              class="val"
              v-html="
                common.encodeTextAreaString(item.Result ? item.Result : '')
              "
            ></span>
          </dd>
          <dd>
            <span class="name">项目描述：</span>
            <span
              class="val"
              v-html="common.encodeTextAreaString(item.Description)"
            ></span>
          </dd>
          <dd>
            <span class="name">项目职责：</span>
            <span
              class="val"
              v-html="common.encodeTextAreaString(item.Duty)"
            ></span>
          </dd>
        </dl>
        <button
          v-if="resume_status"
          type="button"
          class="r-fun r-edit"
          @click="onEdit(item)"
        >
          <span class="iconfont icon-apply"></span>
        </button>

        <button
          v-if="resume_status"
          class="r-fun r-del"
          type="button"
          @click="$refs.isDelDialogPE.showIsDel(item)"
        >
          <span class="iconfont icon-del"></span>
        </button>
      </div>
    </el-row>
    <is-del-dialog
      ref="isDelDialogPE"
      :titles="'项目经历'"
      @callbackFun="onDel"
    ></is-del-dialog>
    <el-dialog
      title="项目经历"
      :visible.sync="isShowdialog"
      class="edit_dialog project_experience"
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
        :hide-required-asterisk="false"
        size="small"
      >
        <el-row>
          <el-form-item label="项目名称" prop="ProjectName">
            <el-input
              maxlength="20"
              show-word-limit
              v-model="fromData.ProjectName"
              placeholder="请输入项目名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="项目时间"
            prop="StartTime"
            class="start-end-time"
          >
            <!-- <reset-date-picker
                type="month"
                value-format="yyyy-MM-dd"
                :startTime.sync="fromData.StartTime"
                :endTime.sync="fromData.EndTime"
                @validata="validata"
                :key="new Date().getTime()"
              ></reset-date-picker> -->

            <el-date-picker
              v-model="fromData.StartTime"
              type="month"
              value-format="yyyy-MM-dd"
              placeholder="开始日期"
              :picker-options="common.startTime(fromData.EndTime)"
            >
            </el-date-picker>
            -
            <el-date-picker
              v-model="fromData.EndTime"
              type="month"
              value-format="yyyy-MM-dd"
              :disabled="fromData.IsToNow"
              placeholder="结束日期"
              :picker-options="common.endTime(fromData.StartTime)"
              :default-value="new Date()"
            >
            </el-date-picker>

            <el-checkbox v-model="fromData.IsToNow" @change="onToNow"
              >至今</el-checkbox
            >

            <!-- <el-input v-model="workExpData.CompanyName" placeholder="开始时间"></el-input> -->
          </el-form-item>
          <el-form-item label="职位名" prop="Position">
            <el-input
              maxlength="20"
              show-word-limit
              v-model="fromData.Position"
              placeholder="请输入职位名"
            ></el-input>
          </el-form-item>

          <el-form-item label="所在公司" prop="Company">
            <el-input
              maxlength="20"
              show-word-limit
              v-model="fromData.Company"
              placeholder="请输入所在公司"
            ></el-input>
          </el-form-item>

          <el-form-item label="项目业绩" prop="Result" class="col-full">
            <el-input
              type="textarea"
              maxlength="3000"
              show-word-limit
              placeholder="请输入项目业绩"
              v-model="fromData.Result"
            ></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="项目描述" prop="Birthday" class="col-full">
            <el-input
              type="textarea"
              maxlength="3000"
              show-word-limit
              v-model="fromData.Description"
            ></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="项目职责" prop="Birthday" class="col-full">
            <el-input
              type="textarea"
              maxlength="3000"
              show-word-limit
              v-model="fromData.Duty"
            ></el-input>
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
import { GetProj, EditProj, DelProj } from "@/api/myResume";
import { deepCopyTwo } from "utils/index";
import IsDelDialog from "components/IsDelDialog";
import { mapGetters } from "vuex";
export default {
  name: "ProjectExperience",
  components: {
    IsDelDialog
  },
  computed: {
    ...mapGetters(["add_resume_id", "resume_status"])
  },
  data() {
    // var checkFinalPayTime = (rule, value, callback) => {
    //   if (this.fromData.EndTime == "") {
    //     return callback(new Error("请选择在职时间"));
    //   } else {
    //     callback();
    //   }
    // };
    var checkFinalPayTime = (rule, value, callback) => {
      if (this.fromData.StartTime == "" || this.fromData.StartTime == null) {
        return callback(new Error("请选择项目时间"));
      } else if (this.fromData.EndTime == "" || this.fromData.EndTime == null) {
        return callback(new Error("请选择项目时间"));
      } else {
        callback();
      }
    };
    return {
      isListNull: false,
      datalist: [],
      ruleValidate: {
        ProjectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        StartTime: [{ validator: checkFinalPayTime, trigger: "blur" }]
      },
      fromData: {
        ResumeId: "bff5da61-7f30-4a7b-a04a-358eeb6ac45e",
        ProjectName: "",
        StartTime: "",
        EndTime: new Date(),
        IsToNow: true,
        Position: "",
        Company: "",
        Result: "",
        Duty: "",
        Id: "bff5da61-7f30-4a7b-a04a-358eeb6ac45e",
        Description: ""
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
        ProjectName: "",
        StartTime: "",
        EndTime: new Date(),
        IsToNow: false,
        Duty: "",
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
      GetProj({ ResumeId: this.add_resume_id }).then(res => {
        if (res.data.Success) {
          this.datalist = res.data.Data;
        } else {
        }
      });
    },
    editAction(data) {
      this.$refs["fromData"].validate(valid => {
        if (valid) {
          this.fromData.ResumeId = this.add_resume_id;
          let data = {
            proj: this.fromData,
            type: this.saveStatus //1 新增   2 修改
          };
          EditProj(data).then(res => {
            if (res.data.Success) {
              this.isShowdialog = false;
              this.$message({
                message: "保存成功",
                type: "success"
              });
              // if (this.saveStatus == 2) {
              //   this.datalist.forEach((val, index, arr) => {
              //     if (val.Id == this.fromData.Id) {
              //       this.datalist[index] = this.fromData;
              //     }
              //   });
              // } else {

              // }
              this.getList();
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
    onSave() {
      this.editAction();
    },
    onEdit(item) {
      this.isShowdialog = true;
      this.saveStatus = 2;
      this.fromData = deepCopyTwo(item);
    },
    onDel(item) {
      DelProj({ Id: item.Id }).then(res => {
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
    }
  },
  created() {
    this._navbar = true;
    if (this.add_resume_id) this.getList();
  },
  watch: {
    //监听input框的变化情况
    //在input框每次输入内容的时候,这一行在后台都会打印值:改变后的数据---改变前的数据
    datalist: {
      //定义在watch里的conten代表监控数据conten
      handler: function(newVal, oldVal) {
        //操作者

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
<style lang="scss">
.edit_dialog.project_experience {
  .data_picker {
    &.el-input__inner {
      width: 240px;
    }
  }
  .el-textarea {
    height: 136px;
    > textarea {
      height: 136px;
    }
  }
}
</style>

<style lang="scss" scoped>
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
@import "~@/styles/mixin.scss";
.project-experience {
  background: #fff;
  font-size: 14px;
  color: #333333;
  .basic-info {
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

  .work-exp-list {
    .work-exp-item {
      margin-top: 10px;

      .el-row {
        margin-top: 18px;
        &.job_duties {
          margin-top: 0px;
        }
        &.company_profile {
          color: #888888;
        }
        .icon-edit {
          margin-left: -10px;
        }
      }
    }
  }
}
</style>
