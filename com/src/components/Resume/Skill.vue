<template>
  <div class="skill">
    <el-row class="title_def_style  r-title">
      <el-col :span="23" class="user-headimg title_font_mix18">技能标签</el-col>
      <button class="r-fun" type="button" v-if="isListNull">
        <span
          v-if="resume_status"
          @click="onEdit"
          class="iconfont icon-add"
        ></span>
      </button>
      <!-- <el-col :span="1" v-if="isListNull">
          <svg-icon
            v-if="resume_status"
            icon-class="edit"
            class="icon-add icon-svg-but"
            @click.native="onEdit"
          />
        </el-col> -->
    </el-row>
    <span v-if="!isListNull && resume_status  && add_resume_id" class="add-line" @click="onAdd">
      <span>添加技能标签</span>
    </span>
    <!-- <el-row class="empty-info" v-if="!isListNull">
        <el-col
          v-if="resume_status"
          :span="23"
          @click.native="onAdd"
          >+添加技能标签</el-col
        >
      </el-row> -->
    <div class="r-bd">
      <div class="r-item">
        <div class="skill-box">
          <div class="s-item" :key="item.SkillName" v-for="item in datalist">
            {{ item.SkillName }}
            <span
              class="iconfont icon-close"
              v-if="resume_status"
              @click="onDel(item)"
            ></span>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-row class="liet_content">
        <el-tag :key="item.SkillName" v-for="item in datalist">{{
          item.SkillName
        }}</el-tag>
      </el-row> -->

    <el-dialog
      title=""
      :visible.sync="isShowdialog"
      custom-class="modal-overlay"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div id="skillTagsPop" class="modal-overlay">
        <div class="modal-box modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">技能标签</h4>
            </div>
            <div class="modal-body">
              <div class="jn-box">
                <div class="jn-hd">
                  <div class="title">
                    我的技能标签 (<b
                      ><span class="tags-num">{{ datalist.length }}</span
                      >/8</b
                    >)
                  </div>
                  <div class="jn-add">
                    <input
                      type="text"
                      v-model="skillVal"
                      maxlength="10"
                      show-word-limit
                      placeholder="请输入自定义标签..."
                      id="tagText"
                      class="w-input"
                    />
                    <!-- <el-input
                        v-model="skillVal"
                        type="text"
                        maxlength="10"
                        class="w-input"
                        show-word-limit
                        placeholder="请输入自定义标签..."
                      ></el-input> -->

                    <button
                      id="addTag"
                      class="btn-border" type="button"
                      @click="onAddSkill('')"
                    >
                      <span class="iconfont icon-jia"></span>
                      添加标签
                    </button>

                    <el-row :span="24" class="input_msg">{{
                      skillMessage
                    }}</el-row>
                  </div>
                </div>
                <div class="jn-bd">
                  <div class="skill-box" data-skill>
                    <div
                      class="s-item"
                      :key="item.SkillName"
                      v-for="item in datalist"
                    >
                      {{ item.SkillName }}
                      <span
                        class="iconfont icon-close"
                        @click="onDel(item)"
                      ></span>
                    </div>
                    <!-- <div class="s-item" data-delect>
                        技能1
                        <span class="iconfont icon-close"></span>
                      </div>
                      <div class="s-item" data-delect>
                        技能1
                        <span class="iconfont icon-close"></span>
                      </div> -->
                  </div>
                  <div class="hot-skill">
                    <div class="title">热门标签</div>
                    <div class="hot-list">
                      <span
                        v-for="(item, index) in hot_label"
                        @click="onAddSkill(item.HotKeyWordValue)"
                        >{{ item.HotKeyWordValue }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="w-btn w-bt-xl btn-primary"
                @click="isShowdialog = false"
              >
                取消
              </button>
              <button type="button" @click="onSave()" class="w-btn w-bt-xl">
                保存
              </button>
            </div>
          </div>
          <button class="close" type="button" @click="isShowdialog = false">
            <span class="iconfont icon-close"></span>
          </button>
        </div>
      </div>

      <el-form
        v-if="false"
        ref="fromData"
        label-position="top"
        :rules="rules"
        label-width="80px"
        :model="fromData"
        :hide-required-asterisk="true"
        size="small"
      >
        <el-col :span="24" class="title_font_mix14"
          >我的技能标签（{{ datalist.length }}/8）</el-col
        >
        <el-row>
          <el-col :span="24">
            <el-input
              v-model="skillVal"
              type="text"
              maxlength="10"
              show-word-limit
              placeholder="请输入自定义标签"
            ></el-input>
            <el-button
              class="button-new-tag add_skill"
              size="small"
              @click="onAddSkill('')"
              >+添加</el-button
            >
          </el-col>
          <el-col :span="24" class="input_msg">{{ skillMessage }}</el-col>
          <el-col :span="24" class="tag_list">
            <el-tag
              :key="item.SkillName"
              v-for="item in datalist"
              closable
              :disable-transitions="false"
              @close="onDel(item)"
              >{{ item.SkillName }}</el-tag
            >
          </el-col>
        </el-row>

        <el-form-item class="button_content">
          <el-button size="medium" class="but_cancel" @click="onCancel()"
            >取消</el-button
          >
          <el-button
            type="primary"
            size="medium"
            class="but_save"
            @click="onSave()"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { GetSkill, EditSkill, DelSkill } from "@/api/myResume";
import { mapGetters } from "vuex";

import { deepCopyTwo } from "utils/index";
export default {
  //hot_label
  name: "Skill",
  computed: {
    ...mapGetters(["hot_label", "add_resume_id", "resume_status"])
  },
  data() {
    return {
      isListNull: false,
      showList: [],
      datalist: [],
      skillVal: "",
      skillMessage: "",
      skillList: [],
      fromData: {
        ResumeId: "",
        SkillName: "string",
        UseTime: "",
        MasteryLevel: "",
        Id: "bff5da61-7f30-4a7b-a04a-358eeb6ac45e"
      },
      isShowdialog: false,
      rules: {},
      saveStatus: 1
    };
  },
  methods: {
    onAddSkill(val) {
      if (this.datalist.length > 7) {
        this.skillMessage = "标签不能超过8个";
        return;
      }

      if (val) {
        this.skillVal = val;
      } else {
        if (this.skillVal != "") {
          if (this.skillVal.length > 10) {
            return (this.skillMessage = "标签长度不能超过10位");
          }
        }
      }
      this.skillMessage = "";
      if (this.skillVal != "") {
        let isExist = this.datalist.some(item => {
          if (item.SkillName === this.skillVal) {
            return true;
          }
        });
        if (this.datalist.length > 7) {
          this.skillMessage = "标签不能超过8个";
        } else {
          if (isExist) {
            this.skillMessage = "标签已经存在";
          } else {
            this.datalist.push({
              ResumeId: "bff5da61-7f30-4a7b-a04a-358eeb6ac45e",
              SkillName: this.skillVal,
              UseTime: "",
              MasteryLevel: "",
              Id: "bff5da61-7f30-4a7b-a04a-358eeb6ac45e"
            });
            this.editAction();
            this.skillVal = "";
          }
        }
      } else {
        this.skillMessage = "标签内容不能为空";
      }
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
      this.isShowdialog = true;
    },
    getList() {
      // this.datalist = [];
      GetSkill({ ResumeId: this.add_resume_id }).then(res => {
        if (res.data.Success) {
          this.showList = res.data.Data;
          this.datalist = deepCopyTwo(res.data.Data);
        } else {
        }
      });
    },
    editAction() {
      EditSkill({
        skill: {
          ResumeId: this.add_resume_id,
          SkillName: this.skillVal,
          UseTime: "",
          MasteryLevel: "",
          Id: "bff5da61-7f30-4a7b-a04a-358eeb6ac45e"
        },
        type: 1 //1 新增   2 修改
      }).then(res => {
        if (res.data.Success) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.getList();
        } else {
          this.$message({
            message: res.data.Message,
            type: "error"
          });
        }
      });
    },
    onCancel() {
      this.isShowdialog = false;
    },
    onSave() {
      this.isShowdialog = false;
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    onEdit() {
      this.isShowdialog = true;
       this.skillMessage = "";
    },

    onDel(item) {
       this.skillMessage = "";
      DelSkill({ Id: item.Id }).then(res => {
        if (res.data.Success) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.datalist.some((items, i) => {
            if (items.SkillName == item.SkillName) {
              this.datalist.splice(i, 1); //在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
              return true;
            }
          });
          this.getList();
        } else {
        }
      });
    }
  },
  created() {
    if (this.add_resume_id) this.getList();
    this.$store.dispatch("getHotLabel");
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
.skill_content {
  &.edit_dialog {
    .el-dialog {
      width: 720px;
    }
  }

  .el-input {
    margin-top: 20px;
    width: 620px;
    .el-input__inner {
      width: 620px;
      width: 100%;
      border-top-width: 0px;
      border-left-width: 0px;
      border-right-width: 0px;
      border-bottom-width: 1px;
      font-size: 16px;
      color: #333;
      border-radius: 0;
    }
  }
  .add_skill {
    position: absolute;
    margin-left: -68px;
    margin-top: 20px;
    background: rgba(249, 249, 249, 1);
  }
  .tag_list {
    margin-top: 20px;
    margin-bottom: 30px;
    .el-tag {
      background: #374c58;
      font-size: 14px;
      color: #ffffff;
      margin-right: 10px;
      margin-bottom: 20px;
      .el-icon-close {
        font-size: 14px;
        color: #fff;
        font-weight: bold;
        height: 12px;
        width: 12px;
        // border-radius: 0;
        line-height: 12px;

        &:hover {
          background: #795e5e;
          opacity: 8;
        }
      }
    }
  }
  .input_msg {
    color: red;
    margin-top: 10px;
  }
}

.skill {
  .liet_content {
    .el-tag {
      background: rgba(238, 238, 238, 1);
      border-radius: 12px;
      color: rgba(0, 0, 0, 1);
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      height: 24px;
      line-height: 24px;
      margin-right: 12px;
      margin-bottom: 10px;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.input_msg {
  color: red;
}
.skill {
  background: #fff;
  font-size: 14px;
  color: #333333;

  .title_def_style {
    .icon-edit {
      @include icon-def-style(1);
    }
  }

  .jn-box {
    margin-top: 30px;
    margin-bottom: 30px;
    .title {
      font-size: 15px;
    }
    .hot-skill {
      margin-top: 20px;
      position: relative;
      padding-left: 80px;
      .title {
        position: absolute;
        left: 0;
        top: 0;
        line-height: 30px;
        color: #999;
        padding-left: 5px;
      }
    }
    .hot-list {
      margin-top: 10px;

      span {
        display: inline-block;
        background-color: #fff;
        padding-left: 5px;
        padding-right: 5px;
        min-width: 80px;
        height: 30px;
        cursor: pointer;
        line-height: 30px;
        border: 1px solid $blue-hover;
        text-align: center;
        margin-right: 15px;
        margin-bottom: 10px;
        &:hover {
          border-color: #008aff;
        }
      }
    }
  }
  .jn-hd {
    margin-bottom: 20px;
    .title {
      line-height: 34px;
    }
    position: relative;
    .jn-add {
      position: absolute;
      top: 0;
      right: 0;
      .w-input {
        float: left;
        width: 220px;
        margin-right: 8px;
        border-color: #ccc;
      }
      .btn-border {
        padding: 0 8px;
        line-height: 34px;
        height: 34px;
        border: 1px solid #ccc;
        background-color: transparent;
        color: #333;
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
        .iconfont {
          font-size: 12px;
          color: $blue;
        }
        &:hover {
          border-color: $blue-hover;
        }
      }
    }
  }
  .jn-bd {
    .skill-box {
      margin-top: 15px;
      background-color: #f6faff;
      border: 1px solid #f6f6f6;
      border-radius: 6px;
      padding: 7.5px 15px;
      .s-item {
        margin: 7.5px;
      }
    }
  }

  .liet_content {
    margin-top: 20px;
    .el-col {
      background: #eee;
      border-radius: 12px;
      padding: 4px 8px;
      font-size: 14px;
      text-align: center;
      margin-right: 24px;
      .el-tag {
        background: #374c58;
        font-size: 14px;
        color: #ffffff;
        margin-right: 10px;
      }
    }
  }

  .skill-box {
    @include clearfix();
    .s-item {
      cursor: pointer;
      float: left;
      border: 1px solid #ddd;
      height: 30px;
      line-height: 30px;
      padding: 0 25px 0 15px;
      margin-right: 10px;
      margin-bottom: 10px;
      position: relative;
      background-color: #fff;
      .iconfont {
        position: absolute;
        top: 50%;
        right: 8px;
        font-size: 12px;
        line-height: 1;
        margin-top: -6px;
        color: #afafaf;
        font-weight: bold;
      }
      &:hover {
        border-color: $blue;
        .iconfont {
          color: $blue;
        }
      }
    }
  }
}
</style>
