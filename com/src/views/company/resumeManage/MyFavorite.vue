<template>
  <div class="my_resume_ravorite" v-show="!pageLoading">
    <div v-show="true">
      <div class="resume_search">
        <el-form :model="searchData">
          <div class="resume_search_items select-group">
            <el-form-item label="分组" class="input_long item-group">
              <el-select
                placeholder="选择分组"
                v-model="searchData.CollectId"
                class="select-group-input"
                size="small"
              >
                <el-option
                  v-for="items in myFavoriteList"
                  :key="items.FavoritesName"
                  :label="items.FavoritesName"
                  :value="items.Id"
                ></el-option>
              </el-select>
              <span @click="isShowGroup = true" class="group_manage"
                >管理分组</span
              >
              <!-- </el-popover> -->
            </el-form-item>
            <el-form-item label="姓名" class="input_long">
              <el-input
                v-model="searchData.Name"
                placeholder="请输入姓名"
                size="small"
              ></el-input>
            </el-form-item>
          </div>

          <div class="resume_search_items">
            <el-form-item label="目前公司" class="input_long">
              <el-input
                v-model="searchData.CurCompany"
                placeholder="请输入目前公司"
              ></el-input>
            </el-form-item>
            <el-form-item label="目前职位">
              <el-input
                v-model="searchData.CurPosition"
                placeholder="请输入目前职位"
              ></el-input>
            </el-form-item>
            <el-form-item label="更新时间">
              <el-select
                placeholder="更新时间"
                v-model="searchData.DataRange"
                size="small"
              >
                <el-option
                  v-for="items in dd_update_date_time"
                  :key="items.id"
                  :label="items.value"
                  :value="items.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="su_but">
            <button @click="closeData" type='button' class="w-btn btn-md-w btn-cancel">
              重置条件
            </button>
            <button @click="onSearch" type='button' class="w-btn btn-md-w">搜索简历</button>
          </div>
        </el-form>
      </div>
      <div class="resume_lists">
        <resume-list
          ref="resumeList"
          @getList="getList(true)"
          :myFavorite="true"
          :pageIndex.sync="searchData.Offset"
        ></resume-list>
      </div>
    </div>
    <!-- <null-resume-list
      v-if="isTheFirstTimeList"
      :showTitle="nullTitle"
    ></null-resume-list> -->
    <el-dialog
      :visible.sync="isShowGroup"
      custom-class="group-dialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <h3 slot="title" class="modal-title">
        分组管理（{{ myFavoriteList.length }}）<span
          class="iconfont icon-add"
          @click="onAddMyFavorite()"
        ></span>
      </h3>

      <div class="dialog-cont">
        <div class="select-con-wrap">
          <ul class="wrap-list">
            <li
              :class="{ active: index == 0 }"
              v-for="(item, index) in myFavoriteList"
              :key="index"
            >
              {{ item.FavoritesName }}
              <div class="a-fn">
                <a @click="onMyFavoriteEdit(item)"
                  ><span class="iconfont icon-apply"></span
                ></a>
                <a @click="isShowDelDialog(item)" v-if="myFavoriteList.length>1"
                  ><span class="iconfont icon-del"></span
                ></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div slot="footer">
        <div class="modal-footer">
          <button
            type="button"
            class="w-btn btn-sm btn-primary"
            @click="isShowGroup = false"
          >
            取消
          </button>
          <!-- <button type="button" class="w-btn btn-sm">确定</button> -->
        </div>
      </div>

      <el-dialog
        custom-class="group-edit-dialog"
        :visible.sync="isShowOperation"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        append-to-body
      >
        <h3
          slot="title"
          v-if="showMyFavoriteStatus && !isShowDel"
          class="modal-title"
        >
          新增组别
        </h3>
        <h3
          slot="title"
          v-if="!showMyFavoriteStatus && !isShowDel"
          class="modal-title"
        >
          修改组别
        </h3>
        <div class="select-con-wrap" v-if="!isShowDel">
          <el-input
            class="w-input"
            v-model="formData.FavoritesName"
            type="text"
            maxlength="20"
            show-word-limit
            placeholder="组别名称"
          />
        </div>
        <div class="del-tip" v-if="isShowDel">
          确定要删除组别“{{ delData.FavoritesName }}”？
        </div>
        <div slot="footer">
          <div class="modal-footer">
            <button
              type="button"
              class="w-btn btn-sm btn-primary"
              @click="isShowOperation = false"
            >
              取消
            </button>
            <button type="button" class="w-btn btn-sm" @click="AddUserFavorite">
              确定
            </button>
          </div>
        </div>
      </el-dialog>
      <!-- <el-row> 确定要删除组别“{{ delData.FavoritesName }}”？ </el-row>
      <el-row class="but_list">
        <el-button
          type=""
          size="mini"
          @click="isShowDel = false"
          class="def_simple_but active"
          >取消</el-button
        >
        <el-button
          type=""
          size="mini"
          class="search_but"
          @click="onMyFavoriteDel"
          >确定</el-button
        >
      </el-row> -->
    </el-dialog>
    <!-- <el-dialog
      :visible.sync="isShowDel"
      custom-class="is_del"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <el-row> 确定要删除组别“{{ delData.FavoritesName }}”？ </el-row>
      <el-row class="but_list">
        <el-button
          type=""
          size="mini"
          @click="isShowDel = false"
          class="def_simple_but active"
          >取消</el-button
        >
        <el-button
          type=""
          size="mini"
          class="search_but"
          @click="onMyFavoriteDel"
          >确定</el-button
        >
      </el-row>
    </el-dialog> -->
  </div>
</template>
<script>
import { deepCopyTwo } from "utils/index";

import { mapGetters } from "vuex";
import ResumeList from "views/components/ResumeList";
import NullResumeList from "./NullResumeList";
import {
  GetUserFavoritePager,
  AddUserFavorite,
  EdtUserFavorite,
  DelUserFavorite,
  GetCollectResumePager
} from "api/companyApi";
export default {
  name: "MyFavorite", //我的收藏
  computed: {
    ...mapGetters([
      "user_info",
      "dd_salary_list",
      "industry_item_list",
      "dd_work_year",
      "dd_degree", // 学历要求
      "dd_sex",
      "dd_publish_channel",
      "dictitem_job_category_list",
      "dd_update_date_time"
    ])
  },
  components: {
    ResumeList,
    NullResumeList
  },
  data() {
    return {
      isShowDel: false,
      isShowGroup: false,
      isShowOperation: false,
      delData: {},
      pageLoading: true,
      isShowNullResumeList: false,
      isTheFirstTimeList: true, //首次加载是否为空
      nullTitle: "您还没有收藏任何简历哦!",
      resumeStatus: "",
      searchData: {
        CollectId: "",
        DataRange: 0,
        Name: "",
        CurCompany: "",
        CurPosition: "",
        Offset: 0
      },
      showMyFavoriteStatus: true,
      myFavoriteList: [{ FavoritesName: "嘿嘿" }, { FavoritesName: "哈哈" }],
      formData: {
        UserId: "",
        FavoritesName: ""
      }
    };
  },
  methods: {
    closeData() {
      this.searchData = {
        DeliveryPositionId: "",
        DeliveryStatus: "",
        DataRange: 0,
        Degree: "",
        Gender: "",
        Name: "",
        City: "",
        AgeFrom: 0,
        AgeTo: 0,
        StartWorkFrom: 0,
        StartWorkTo: 0,
        CurCompany: "",
        CurPosition: "",
        Offset: 0
      };
      this.onSearch();
    },
    onSearch() {
      this.searchData.Offset = 0;
      this.getList(true);
    },

    onAddMyFavorite() {
      this.showMyFavoriteStatus = true;

      this.formData = {
        UserId: "",
        FavoritesName: ""
      };
      this.isShowOperation = true;
    },
    AddUserFavorite(item) {
      this.formData.UserId = "";
      this.formData.UserId = this.user_info.UserId;

      if (this.isShowDel) {
        return this.onMyFavoriteDel(item);
      }
      if (this.showMyFavoriteStatus) {
        AddUserFavorite(this.formData).then(res => {
          if (res.data.Success) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.getMyFavoriteList();
            this.isShowOperation = false;
          } else {
            this.$message.error(res.data.Message);
          }
        });
      } else {
        EdtUserFavorite(this.formData).then(res => {
          if (res.data.Success) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.getMyFavoriteList();
            this.isShowOperation = false;
          } else {
            this.$message.error(res.data.Message);
          }
        });
      }
    },
    getMyFavoriteList() {
      GetUserFavoritePager().then(res => {
        if (res.data.Success) {
          this.myFavoriteList = res.data.Data;
        }
      });
    },
    onMyFavoriteEdit(item) {
      this.isShowOperation = true;
      // this.addMyFavorite = true;
      this.showMyFavoriteStatus = false;
      this.formData = deepCopyTwo(item);
    },
    isShowDelDialog(item) {
      this.isShowDel = true;
      this.isShowOperation = true;
      this.delData = item;
    },
    onMyFavoriteDel(item) {
      DelUserFavorite(this.delData).then(res => {
        if (res.data.Data) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getMyFavoriteList();
          this.isShowOperation = false;
          this.isShowDel = false;
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },
    getList(status) {
      GetCollectResumePager(this.searchData).then(res => {
        if (res.data.Success) {
          if (this.$refs.resumeList) {
            this.$refs.resumeList.init(res.data.Data);
          }

          this.isTheFirstTimeList = status ? false : true;
          if (res.data.Data.Items.length > 0) {
            this.isTheFirstTimeList = false;
          }
        }
        this.pageLoading = false;
      });
    }
  },
  mounted() {},
  created() {
    this.$store.dispatch("getAllDD");
    this.$store.dispatch("GetDictItemJobCategoryList"); //职能
    this.getMyFavoriteList();
    this.$nextTick(() => {
      this.getList();
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.my_resume_ravorite {
  .resume_search {
    >>> .resume_search_items {
      &.select-group {
        // background:red;
        .el-form-item {
          &.item-group {
            width: 100%;
            width: 66.666666%;
            .el-form-item__content {
              width: 100%;
              font-size: 0;
              .el-select{
                width: calc(100% - 90px);
              }
              > span {
                display: block;
                position: absolute;
                right: 0;
                padding-right: 20px;
                top: 0;
                line-height: 38px;
                z-index: 9;
                height: 38px;
                font-size: 14px;
                cursor: pointer;
                color: #45aae1;
              }
            }
          }
        }
      }
    }
  }
}

.del-tip {
  text-align: center;
  font-weight: bold;
  color: #000;
  font-size: 16px;
  margin-top: 30px;
}
.modal-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-bottom: 12px;
  .icon-add {
    font-size: 20px;
    color: #ddd;
    cursor: pointer;
    vertical-align: middle;
    margin-left: 5px;
    &:hover {
      color: $blue-hover;
    }
  }
}
// 弹窗
.select-con-wrap {
  >>> .el-input {
    margin: 0;
    padding: 0;
    border: 0;
    .el-input__inner {
      height: 34px;
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

.modal-footer {
  text-align: center;
  margin-top: 20px;
  .w-btn {
    & + .w-btn {
      margin-left: 8px;
    }
  }
  .w-bt-md {
    height: 30px;
    line-height: 30px;
    width: 100px;
  }
  .w-bt-xl {
    line-height: 42px;
    height: 42px;
    min-width: 150px;
    font-size: 15px;
  }
  .btn-primary {
    background-color: $bgray;
    border-color: $bgray;
    color: #fff;
    &:hover {
      background-color: $bgray-hover;
      border-color: $bgray-hover;
    }
  }
  .btn-sm {
    min-width: 95px;
    height: 30px;
    line-height: 30px;
  }
}

>>> .el-dialog {
  margin: 0 !important;
  top: 45%;
  left: 50%;
  @include transForm(translate(-50%, -50%));
  &.group-dialog {
    width: 360px;
  }
  &.group-edit-dialog {
    width: 360px;
  }
  .el-dialog__body {
    padding: 0 35px;
  }
}
//   &.my_favorite {
//     width: 200px;
//     position: relative;
//     height: 300px;
//     padding: 0;
//     .content_header {
//       @include df;
//       padding: 25px;
//       padding-bottom: 0;
//     }

//     .my_favorite_list {
//       margin-top: 10px;
//       height: 220px;
//       overflow: auto;
//       .my_favorite_list_item {
//         @include df;
//         margin-bottom: 10px;
//         position: relative;
//         height: 30px;
//         line-height: 30px;
//         cursor: pointer;
//         padding: 0 25px;
//         .svg_but {
//           position: absolute;
//           right: 25px;
//           .icon-svg-but {
//             margin-left: 10px;
//           }
//         }

//         &:hover {
//           background: #f4f4f4;
//         }
//       }
//     }
//     .icon-add {
//       position: absolute;
//       right: 25px;
//     }
//   }
//   &.add_my_favorites {
//     margin-left: 25px;
//     .el-input {
//       margin-top: 10px;
//     }
//     .el-button {
//       margin-top: 10px;
//     }

//     .but_list {
//       text-align: center;
//       margin-top: 0;
//       .el-button {
//         @include wh(72px, 24px);
//         padding: 0;
//         font-size: 12px;
//         border-radius: 3px;
//       }
//     }
//   }
// }
</style>
