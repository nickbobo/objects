<template>
  <div
    class="resume_button_operation"
    v-if="isShowFavoriteList || isShowPositionList"
  >
    <!-- 收藏 -->

    <el-dialog
      :visible.sync="isShowFavoriteList"
      :modal-append-to-body="false"
      :close-on-click-modal="true"
      custom-class="position_list"
      title="选择收藏组别"
      :show-close="false"
    >
      <div
        class="list_items"
        v-for="(items, index) in favoriteList"
        :key="index"
        @click="onCheckedFavorite(items)"
        :class="{ active: items.active }"
      >
        {{ items.FavoritesName }}
        <span class="el-icon-check" v-if="items.active"></span>
      </div>

      <div class="su_but modal-footer">
        <button
          @click="isShowFavoriteList = false"
          class="w-btn btn-sm btn-primary" type="button"
        >
          取消
        </button>
        <button @click="saveFavorite" type="button" class="w-btn btn-sm">
          保存
        </button>
      </div>
      <!-- <el-row class="but_list">
        <el-button
          type=""
          size="mini"
          @click="isShowFavoriteList = false"
          class="def_simple_but active"
          >取消</el-button
        >
        <el-button type="" size="mini" class="search_but" @click="saveFavorite"
          >保存</el-button
        >
      </el-row> -->
    </el-dialog>

    <!-- 职位关联 -->
    <el-dialog
      :visible.sync="isShowPositionList"
      :modal-append-to-body="false"
      :close-on-click-modal="true"
      custom-class="position_list"
      title="选择关联职位"
      :show-close="false"
    >
      <div class="select-con-wrap">
        <div class="sc-search">
          <div class="form-search">
            <el-input
              v-model="keyVal"
              class="relevance_position"
              @keyup.enter.native="onRelevancePosition"
            ></el-input>
            <!-- <input type="search" name="" placeholder="搜索关联职位" /> -->
            <span  class="iconfont icon-search" @click="onRelevancePosition"></span>
          </div>
          <div class="num" v-if="isShowSearchTotol">
            {{ positionList.length }}条搜索结果
          </div>
        </div>
        <ul class="wrap-list">
          <li
            v-for="(items, index) in positionList"
            :key="index"
            :class="{ active: items.active }"
            @click="onSelectItem(items)"
          >
            {{ items.PositionName }}
            <span class="el-icon-check" v-if="items.active"></span>
          </li>
        </ul>
      </div>
      <div class="su_but modal-footer">
        <button
          @click="isShowPositionList = false" type="button"
          class="w-btn btn-sm btn-primary"
        >
          取消
        </button>
        <button @click="saveRelevancePosition" type="button" class="w-btn btn-sm">
          保存
        </button>
      </div>
      <!-- <el-input
        v-model="keyVal"
        class="relevance_position"
        @keyup.enter.native="onRelevancePosition"
      ></el-input>

      <svg-icon
        iconClass="magnifier"
        @click="onRelevancePosition"
        class="icon-sex"
      />

      <el-row class="search_key" v-if="isShowSearchTotol">
        {{ positionList.length }}条搜索结果
      </el-row>
      <div
        class="list_items"
        v-for="(items, index) in positionList"
        :key="index"
        @click="onSelectItem(items)"
        :class="{ active: items.active }"
      >
        {{ items.PositionName }}
      </div> -->
      <!-- <el-row class="but_list">
        <el-button
          type=""
          size="mini"
          @click="isShowPositionList = false"
          class="def_simple_but active"
          >取消</el-button
        >
        <el-button
          type=""
          size="mini"
          class="search_but"
          @click="saveRelevancePosition"
          >保存</el-button
        >
      </el-row> -->
    </el-dialog>
  </div>
</template>

<script>
import {
  GetUserFavoritePager,
  CollectResume,
  GetCollectResumePager,
  CollectResumeCancel
} from "api/companyApi";
import {
  GetPositionList,
  ProcessDelivery,
  GetResumeJoinPositionList
} from "api/positionManager";
import { JoinToPosition } from "api/myResume";
import { post, resumeManage } from "api/api";
export default {
  name: "resumeButtonOperation", //简历按键操作
  props: ["ResumeId", "editDeliveryStatusData"],
  data() {
    return {
      msg: "",
      isShowPositionList: false,
      positionList: [],
      positionActiveId: "",
      activeResume: { id: "" },

      isShowFavoriteList: false,
      favoriteList: [],
      favoriteActiveId: "",
      resumeId: "",
      keyVal: "",
      isShowSearchTotol: false
    };
  },

  methods: {
    isShowRelevancePosition(id) {
      this.resumeId = id;
      this.onRelevancePosition();
    },
    /**
     * 获取关联职位列表
     */
    onRelevancePosition() {
      if (this.keyVal) {
        this.isShowSearchTotol = true;
      } else {
        this.isShowSearchTotol = false;
      }
      let data = {
        ResumeId: this.resumeId,
        PositionName: this.keyVal
      };

      GetResumeJoinPositionList(data).then(res => {
        if (res.data.Success) {
          if (res.data.Data.length > 0) {
            this.positionList = res.data.Data;
            setTimeout(() => {
              this.isShowPositionList = true;
            }, 300);
          } else {
            this.$message({
              message: "暂无职位可以关联",
              type: "warning"
            });
          }
        }
      });
      // this.isShowPositionList = true;
    },

    /**
     * 选中某一职位
     */
    onSelectItem(items) {
      this.positionList = this.positionList.map(v => {
        if (v.Id === items.Id) {
          this.positionActiveId = items.Id;
          return Object.assign({}, v, { active: true });
        }
        return Object.assign({}, v, { active: false });
      });
    },

    /**
     *保存关联职位
     */
    saveRelevancePosition() {
      let data = {
        PositionId: this.positionActiveId,
        ResumeId: this.resumeId,
        // Confirm: true,
        PersonId: ""
      };
      JoinToPosition(data).then(res => {
        if (res.data.Success) {
          if (res.data.Data.Success) {
            this.isShowPositionList = false;
            this.$message({
              message: "职位关联成功",
              type: "success"
            });
          }
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },

    /**
     * 取消职位关联
     */

    async cancelRelevancePosition(id) {
      let res = await post(`${resumeManage}CancelFromPosition`, { id: id });
      if (res.Success) {
        this.$message({
          message: "取消职位关联成功",
          type: "success"
        });
        this.$emit("getList");
      }
    },

    /**s
     * 应聘人投递的职位状态修改
     */
    editDeliveryStatusAction(item, status) {
      let data = {
        // PositionId: item.PositionId,
        Ids: [item.Id],
        Operation: status
      };
      ProcessDelivery(data).then(res => {
        if (res.data.Success) {
          this.$message({
            message: "设置成功",
            type: "success"
          });
          this.$emit("getList");
        } else {
          that.$message.error(res.data.Message);
        }
      });
    },

    /**
     * 下载简历
     */
    onDownloadResume(name) {
      this.getPdf(`${name}的简历`);
    },

    isShowFavorite(id) {
      this.resumeId = id;
      this.getMyFavoriteList();
    },
    /**
     * 分组列表
     */
    getMyFavoriteList() {
      GetUserFavoritePager().then(res => {
        if (res.data.Success) {
          if (res.data.Data.length > 0) {
            this.favoriteList = res.data.Data;
            setTimeout(() => {
              this.isShowFavoriteList = true;
            }, 300);

           this.onCheckedFavorite(this.favoriteList[0])
            //
          } else {
            // this.$message({
            //   message: "暂无收藏夹可以收藏",
            //   type: "warning"
            // });
          }
        }
      });
    },

    /**
     * 选中收藏
     */
    onCheckedFavorite(items) {
      this.favoriteList = this.favoriteList.map(v => {
        if (v.Id === items.Id) {
          this.favoriteActiveId = items.Id;
          return Object.assign({}, v, { active: true });
        }
        return Object.assign({}, v, { active: false });
      });

    },

    /**
     * 保存收藏简历
     */
    saveFavorite() {
      CollectResume({
        FavoriteId: this.favoriteActiveId,
        ResumeId: this.resumeId
      }).then(res => {
        if (res.data.Success) {
          this.$message({
            message: "收藏成功",
            type: "success"
          });
          this.isShowFavoriteList = false;
          this.$emit("getList");
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },

    /**
     * 取消收藏
     */
    onDelFavorite(id) {
      CollectResumeCancel({
        ResumeId: id
      }).then(res => {
        if (res.data.Success) {
          this.$emit("getList");
        }
      });
    },

    /**
     * 编辑简历
     */
    onEditResume(id) {
      this.$store.dispatch("updateAddResumeId", id);
      // if (this.$route.path.split("/")[2] == "AddResume") {
      //   this.$Bus.$emit("isShowAdd");
      // } else {
      this.$Bus.$emit("isShowAdd");
      this.$router
        .push({
          path: `/ResumeManage/AddResume`,
          query: { ResumeId: id }
        })
        .catch(err => {});

      // }
      this.$store.dispatch("editResumeStatus", 2);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.select-con-wrap {
  .sc-search {
    margin-bottom: 5px;
    .num {
      font-size: 12px;
      color: $blue;
      margin: 5px;
    }
    .form-search {
      padding-left: 20px;
    }
    .form-search input,
    .form-search .icon-search {
      height: 32px;
      line-height: 32px;
    }
    .form-search {
      // width: 200px;
      position: relative;
      background-color: #eee;
      height: 42px;
      line-height: 42px;
      border-radius: 42px;
      padding-left: 25px;
      padding-right: 50px;
      // margin-left: 25px;
      >>> .el-input__inner {
        border: 0;
        background: transparent;
      }
      input {
        background-color: transparent;
        width: 100%;
        height: 42px;
        line-height: 42px;
      }
      .icon-search {
        font-size: 20px;
        line-height: 42px;
        width: 50px;
        position: absolute;
        top: 0;
        right: 0;
        text-align: center;
        cursor: pointer;
      }
    }
  }

  .wrap-list {
    max-height: 205px;
    overflow-y: auto;
    li {
      position: relative;
      cursor: pointer;
      display: block;
      padding: 6px 12px;
      line-height: 20px;
      font-size: 15px;
      color: #333;
      margin-bottom: 2px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span {
        &.el-icon-check {
          position: absolute;
          right: 10px;
          top: 0;
          line-height: 32px;
          color: #67c23a;
          font-size: 20px;
          font-weight: bold;
        }
      }
      &.active,
      &:hover {
        background-color: #e9f3fe;
        .a-fn {
          display: block;
        }
      }
      .a-fn {
        display: none;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -10px;
        a {
          color: #999;
          margin-right: 10px;
          .iconfont {
            font-size: 18px;
            line-height: 20px;
          }
          &:hover {
            color: $blue-hover;
          }
        }
      }
    }
  }
}
.resume_button_operation {
  >>> .el-dialog {
    &.position_list {
      width: 380px;
      display: table;
      text-align: left;
      .el-dialog__header {
        padding: 0;
        margin: 17px 30px;
        padding-top: 17px;
        // padding-bottom: 15px;
      }
      .el-dialog__body {
        position: relative;
        padding: 0 30px 55px 30px;
        .list_items {
          width: 320px;
          font-size: 14px;
          height: 32px;
          line-height: 32px;
          padding-left: 20px;
          color: #656565;
          &:hover {
            background: #ecf3f6;
            cursor: pointer;
          }
          &.active {
            color: #333333;
            background: #ecf3f6;
            position: relative;
            span {
              &.el-icon-check {
                position: absolute;
                right: 10px;
                top: 0;
                line-height: 32px;
                color: #67c23a;
                font-size: 20px;
                font-weight: bold;
              }
            }
          }
        }
        .but_list {
          text-align: center;
          margin-top: 30px;
          .el-button {
            @include wh(72px, 24px);
            padding: 0;
            font-size: 12px;
            border-radius: 3px;
          }
        }
      }
      // .relevance_position {
      //   width: 320px;
      //   height: 36px;

      //   margin-bottom: 10px;
      //   .el-input__inner {
      //     padding-left: 40px;
      //     @include wh(320px, 36px);
      //   }
      // }
      .search_key {
        color: #44a9e1;
        margin-left: 12px;
      }
      .svg-icon {
        font-size: 22px;
        color: #dddddd;
        position: absolute;
        top: 7px;
        left: 42px;
        cursor: pointer;
        &:hover {
          color: #999;
        }
      }
    }
  }
}
</style>
