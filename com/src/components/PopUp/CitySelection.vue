<template>
  <div class="city_selection">
    <el-dialog
      :title="'选择' + selectionTitle"
      :visible.sync="isShowDialog"
      width="400"
      class="pop_up_dialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <el-row>
        <el-col :span="24" class="selection_but">
          <el-button
            size="mini"
            round
            @click="onUnlimited"
            :class="{ checked_unlimited: !checkedVal }"
            >不限</el-button
          >
          <el-button size="mini" class="active" round v-if="checkedVal">{{
            checkedVal
          }}</el-button>
        </el-col>
      </el-row>
      <el-radio-group v-model="checkedVal">
        <el-row
          class="selection_list"
          v-if="item.Childs.length > 0"
          v-for="(item, index) in selectionList"
          :key="index"
        >
          <el-row class="selection_title">{{ item.ItemName }}</el-row>
          <el-row class="selection_item">
            <div v-for="(childs, i) in item.Childs" :key="i">
              <el-radio-button :label="childs.ItemName"></el-radio-button>
            </div>
          </el-row>
        </el-row>
      </el-radio-group>
      <el-row class="button_content">
        <div>
          <el-button class="but_cancel" @click="isShowDialog = false"
            >取消</el-button
          >
          <el-button type="primary" class="but_save" @click="onSave"
            >确认</el-button
          >
        </div>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { deepCopyTwo } from "@/utils/index";
import { isWscnEmail, isMobile } from "@/utils/validate";
import { Login, SendMessage } from "@/api/api";
export default {
  name: "CitySelection",
  computed: {
    ...mapGetters(["city_item", "search_data"])
  },
  props: ["selectionTitle", "selectionType", "selectionList"],
  data() {
    return {
      checkedVal: "",
      isShowDialog: false,
      mobileMsg: "",
      mobileCodeMsg: ""
    };
  },
  created() {},
  methods: {
    isShow(val) {
      this.checkedVal = val;

      this.isShowDialog = true;
    },
    onUnlimited() {
      this.checkedVal = "";
    },
    onSave() {
      this.$emit("selectionVal", this.selectionType, this.checkedVal);
      this.isShowDialog = false;
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.pop_up_dialog {
  .el-dialog {
    width: 900px;
    .el-dialog__header {
      padding: 20px 30px 15px;
    }
    .el-dialog__body {
      padding: 0 30px 54px 30px;
      .el-radio-group {
        height: 400px;
        // overflow: overlay;  ie 不支持
        overflow: auto;
        margin-bottom: 20px;
      }
      .selection_but {
        margin-bottom: 19px;
        .el-button {
          height: 24px;
          background: rgba(187, 187, 187, 1);
          color: #fff;
          margin: 0;

          border: 0;
          padding: 5px 12px;
          border-radius: 12px;

          &.active {
            margin-left: 20px;
            background: #44a9e1;
          }
          &.checked_unlimited {
            background: #44a9e1;
          }
        }
      }
    }
    .selection_list {
      .selection_title {
        font-size: 14px;
        font-weight: bold;
      }
      .selection_item {
        border-bottom: 1px solid #ddd;
        padding: 0 0 20px 0;
        margin-bottom: 24px;
        display: -webkit-flex;
        flex-wrap: wrap;
        margin-left: 26px;
        span {
          margin-right: 47px;
          margin-top: 20px;
          padding: 0;
          border: 0;
        }
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
          color: #44a9e1;
          background-color: #fff;
        }
        .el-radio-button {
          box-shadow: -1px 0 0 0 #409eff00 !important;
        }
      }
    }
    .button_content {
      .el-button {
        height:32px;
        padding: 0;
        &.but_save{
          margin-left:20px;
        }
      }
    }
  }
}

.edit-mobile_dialog {
  .el-dialog__body {
    width: 80%;
    margin-left: 10%;
  }
  .edit_mobile_dialog .el-col {
    text-align: center;
  }
  button.el-button.get_code.el-button--default {
    position: absolute;
    margin-left: -78px;
    margin-top: 2px;
    font-size: 14px;
    width: 70px;
    color: #44a9e1;
    padding: 0;
    height: 36px;
    background: #fff;
    border: 0;
    border-radius: 4px;
  }
  .affirm_edit {
    width: 100%;
    // margin-left: 10%;
    background: #44a8e1;
    margin-top: 30px;
  }

  span.el-dialog__title {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
  i.el-dialog__close.el-icon.el-icon-close {
    color: #44a8e1;
    font-size: 20px;
    font-weight: bold;
  }
}

.edit-mobile_dialog_con {
  .el-dialog {
    width: 400px;
    height: 500px;
  }
}
</style>
<style lang="scss" scoped>
.edit-mobile_dialog {
  span {
    width: 100%;
    text-align: center;
  }
}
.dialog_title {
  color: #888888;
  font-size: 14px;
}
.user_mobile_title {
  margin-top: 10px;
  span {
    font-weight: bold;
    color: #000;
    font-size: 18px;
  }
}
</style>
