<template>
  <div class="resume-basic-info">
    <image-cropper-upload ref="imageCropperUpload"></image-cropper-upload>
    <div class="w-title" v-if="resume_status">
      <h2 v-if="resume_status == 1">新增简历</h2>
      <h2 v-if="resume_status == 2">编辑简历</h2>
    </div>
    <div class="r-intro" v-if="!resume_status">
      <ul class="r-source">
        <li><span>简历来源</span>： {{ showData.ResumeSource }}</li>
        <li>
          <span>更新时间</span>：
          {{ showData.ResumeUpdateTime | Format("yyyy-MM-dd")  }}
        </li>
      </ul>
      <div class="r-version" v-if="versionsList.length > 1">
        <div class="extend bottom">
          <el-popover
            placement="bottom"
            popper-class="resume_version_popover"
            width="100"
            trigger="click"
          >
            <ul class="submenu">
              <li
                :class="{ active: items.Id == showData.Id }"
                v-for="(items, index) in versionsList"
                :key="index"
                @click="onResumeVersion(items)"
              >
                <a>{{ items.Version }}</a>
              </li>
            </ul>

            <span slot="reference"
              ><i class="iconfont icon-date"></i>简历历史：{{
                showData.version
              }}</span
            >
          </el-popover>
        </div>
      </div>
    </div>

    <el-row class="r-user">
      <div class="user-info">
        <div class="photo">
          <!-- 没有上传图片时，显示默认的icon -->
          <img
            @click="onEditHeadImg"
            :src="my_portrait_url"
            @error="defHeadImg()"
          />
        </div>
        <div class="upload" v-if="!add_resume_id">
          <a class="w-btn btn-border" href="#/ResumeManage/ImportResumeManager"
            >导入简历</a
          >
          <span>导入操作更便捷哦</span>
        </div>
        <div class="is-show-basicinfo" v-if="add_resume_id">
          <div class="name">
            {{ showData.Name | IsNull(true) }}
            <span
              class="iconfont "
              v-if="showData.Gender"
              :class="{
                'icon-male': showData.Gender == 'SEX_01',
                'icon-female': showData.Gender == 'SEX_02'
              }"
            ></span>
          </div>
          <!-- 有数据 -->
          <ul class="spec split">
            <li>
              {{ showData.CurIndustryTxt ? showData.CurIndustryTxt : "N/A" }}
            </li>
            <li>
              {{ showData.CurPositionTxt ? showData.CurPositionTxt : "N/A" }}
            </li>
            <br />
            <li>{{ showData.Age + "岁" }}</li>
            <li>{{ `${showData.WorkYear}年工作经验` }}</li>
            <li>{{ showData.EducationTxt | IsNull(true) }}</li>
            <li>{{ showData.CityTxt | IsNull(true) }}</li>
          </ul>
        </div>
      </div>

      <div class="u-sepc">
        <h3 class="r-title">基本信息</h3>
        <ul class="u-base">
          <li>
            <span class="name">生日：</span>
            <span class="val">{{ showData.Birthday | Format("yyyy-MM") }}</span>
          </li>
          <li>
            <span class="name">当前城市：</span>
            <span class="val">{{ showData.CityTxt | IsNull }}</span>
          </li>
          <li>
            <span class="name">婚姻状况：</span>
            <span class="val">{{ showData.MaritalTxt | IsNull }}</span>
          </li>
          <li>
            <span class="name">手机：</span>
            <span class="val">
              {{ showData.Mobile | IsNull }}
              <!-- <label class="label">已验证</label> -->
            </span>
          </li>
          <li>
            <span class="name">邮箱：</span>
            <span class="val">{{ showData.Email | IsNull }}</span>
          </li>
          <li>
            <span class="name">政治面貌：</span>
            <span class="val">{{ showData.PoliticalTxt | IsNull }}</span>
          </li>
          <li>
            <span class="name">海外经历：</span>
            <span class="val">{{ showData.OverseasStudyTxt | IsNull }}</span>
          </li>
        </ul>
        <button
          v-if="$store.getters.resume_status"
          class="r-fun r-edit"
          type="button"
          @click="onShowEdit"
        >
          <span class="iconfont icon-apply"></span>
        </button>
      </div>
    </el-row>
    <el-dialog
      title="基本信息"
      :visible.sync="editBasicInfoDialog"
      class="basic-info-dialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="$reset('formData')"
    >
      <el-form
        ref="formData"
        label-position="top"
        :rules="rulesBasicInfo"
        label-width="80px"
        :model="formData"
        :hide-required-asterisk="true"
        size="small"
        v-if="editBasicInfoDialog"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="姓名" prop="Name">
              <el-input
                maxlength="20"
                show-word-limit
                v-model="formData.Name"
                placeholder="请输入姓名"
                :readonly="!(add_resume_id == '')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="Gender">
              <el-select
                v-model="formData.Gender"
                label="性别"
                placeholder="性别"
                prop="Gender"
              >
                <el-option
                  :label="item.ItemName"
                  :value="item.ItemCode"
                  v-for="(item, index) in dd_sex"
                  :key="item.ItemCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11" class="data_time">
            <el-form-item label="生日" prop="Birthday">
              <el-date-picker
                v-model="formData.Birthday"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前城市" prop="City">
              <!-- <el-cascader
                :options="city_item"
                :props="optionProps"
                placeholder="请选择当前城市"
                v-model="formData.City"
                :show-all-levels="false"
                filterable
              >
              </el-cascader> -->
              <el-select
                placeholder="请选择当前城市"
                filterable
                v-model="formData.City"
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
          <el-col :span="11" class="data_time">
            <el-form-item label="开始工作时间">
              <el-date-picker
                v-model="formData.StartWorkTime"
                type="date"
                value-format="yyyy-MM-dd"
                @validata="validata"
                placeholder="开始工作时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="婚姻状况" prop="Marital">
              <el-select
                placeholder="请选择婚姻状况"
                v-model="formData.Marital"
                @change="common.selectChange"
              >
                <el-option
                  v-for="items in dd_marital"
                  :key="items.ItemCode"
                  :label="items.ItemName"
                  :value="items.ItemCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="手机" prop="Mobile" class="form_input_mobile">
              <el-input
                v-model="formData.Mobile"
                placeholder="请输入手机号"
                :readonly="!(add_resume_id == '')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="Email">
              <el-input
                v-model="formData.Email"
                placeholder="请输入邮箱"
                :readonly="!(add_resume_id == '')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="政治面貌">
              <el-select
                placeholder="请选择政治面貌"
                v-model="formData.Political"
                @change="common.selectChange"
              >
                <el-option
                  v-for="items in dd_political"
                  :key="items.ItemCode"
                  :label="items.ItemName"
                  :value="items.ItemCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="海外留学">
              <el-select
                placeholder="请选择海外留学"
                v-model="formData.OverseasStudy"
                @change="common.selectChange"
              >
                <el-option
                  v-for="items in dd_overseas_study"
                  :key="items.ItemCode"
                  :label="items.ItemName"
                  :value="items.ItemCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="modal-footer">
          <button
            type="button"
            class="w-btn w-bt-xl btn-primary"
            @click="onCancel('formData')"
          >
            取消
          </button>
          <button type="button" @click="onSave()" class="w-btn w-bt-xl">
            保存
          </button>
        </div>
      </el-form>
    </el-dialog>
    <edit-mobile ref="editMobile"></edit-mobile>

    <el-dialog
      title="疑似重复"
      :visible.sync="isShowResumeReuse"
      class="resume_reuse"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="$reset('formRef')"
    >
      <el-table :data="reuseResumeList">
        <el-table-column prop="Name" label="姓名" width="180"></el-table-column>
        <el-table-column
          prop="Mobile"
          label="手机号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="Email"
          label="邮箱"
          width="180"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="table_operation_but">
              <el-button
                @click="onResumeReuseDetail(scope.row)"
                type="text"
                size="small"
                >详情</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="addResumeVersions(scope.row)"
                >新增版本</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import {
  EditBaseInfo,
  MyPortrait,
  AddResumeSave,
  AddResumeVersion,
  GetResumeBasic,
  EditResumeBasic,
  GetResumeVersion
} from "api/myResume";
import { deepCopyTwo } from "utils/index";
import EditMobile from "components/EditMobile";
import { mapGetters } from "vuex";
import { isWscnEmail } from "@/utils/validate";
import ImageCropperUpload from "components/ImageCropperUpload";
import CustomerContactInfo from "views/components/CustomerContactInfo";
export default {
  name: "BasicInfo",
  components: {
    EditMobile,
    ImageCropperUpload,
    CustomerContactInfo
  },
  computed: {
    ...mapGetters([
      "dd_sex",
      "dd_marital",
      "dd_degree",
      "city_item",
      "my_portrait_url",
      "def_user_header",
      "my_info_data",
      "user_info",
      "industry_item_list",
      "add_resume_id",
      "resume_status",
      "dictitem_job_category_list",
      "dd_political",
      "dd_overseas_study"
    ])
  },

  data() {
    const validateEmail = (rule, value, callback) => {
      if (value) {
        if (!isWscnEmail(value)) {
          callback(new Error("请输入正确格式的邮箱地址"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      msg: "aaaa",
      optionProps: { value: "ItemCode", label: "ItemName", children: "Childs" },
      sexIcon: "sex1",
      editBasicInfoDialog: false,
      rulesBasicInfo: {
        Name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        Gender: [
          { required: true, message: "性别不能为空", trigger: "change" }
        ],

        Email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateEmail }
        ],
        Mobile: {
          required: true,
          trigger: "blur",
          validator: this.$formValidate(this).Mobile
        },
        City: [
          { required: true, message: "当前城市不能为空", trigger: "change" }
          // {
          //   type: "array",
          //   required: true,
          //   message: "请选择当前城市",
          //   trigger: "change"
          // }
        ]
      },
      colKey: 4,
      colVal: 8,
      colVal1: 5,
      maritalList: [],
      SEXList: [],
      percentage: 20,
      customColor: "#409eff",
      versionsList: [],

      showData: {
        Name: "",
        Gender: "",
        Mobile: "",
        Email: "",
        CurIndustry: "",
        CurPosition: "",
        CurPositionTxt: "",
        Age: 0,
        WorkYear: 0,
        Education: "",
        Hukou: "",
        HukouTxt: "",
        City: "",
        IsOwn: false,
        CityCode: "",
        Birthday: "",
        Marital: "",
        StartWorkDate: "",
        CurSalary: "",
        GenderTxt: "",
        Political: "",
        OverseasStudy: ""
      },

      formData: {
        StartWorkTime: "",
        // Hukou: "",
        Name: "",
        Gender: "",
        Mobile: "",
        Email: "",
        City: "",
        CityCode: "",
        Birthday: "",
        Marital: "",
        Political: "",
        OverseasStudy: ""
        // StartWorkDate: ""
      },
      addResumeId: "",
      // resumeId: this.add_resume_id,
      isShowResumeReuse: false,
      reuseResumeList: [
        {
          Email: "",
          Mobile: "",
          Name: ""
        }
      ],
      cityList: []
    };
  },
  created() {
    let that = this;
  },
  mounted() {
    // this.resumeId = this.add_resume_id;
    this.$Bus.$on("getBaseInfo", () => {
      this.getBaseInfo();
    });
    // this.addResumeId = this.add_resume_id.ResultList.Id;
  },
  methods: {
    getResumeVersionList() {
      GetResumeVersion({ ResumeId: this.add_resume_id }).then(res => {
        if (res.data.Success) {
          if (res.data.Data.length > 0) {
            for (let item of res.data.Data) {
              item.active = false;
            }
            res.data.Data[0].active = true;
            this.versionsList = res.data.Data;

            for (let items of res.data.Data) {
              if (items.Id === this.showData.Id) {
                this.showData.version = items.Version;
              }
            }
          }
        }
      });
    },
    onImportResume() {
      this.$router.push({ path: "/ResumeManage/ImportResume" });
    },
    /**
     * 版本跳转
     */
    onResumeVersion(items) {
      this.$router
        .push({
          path: `/ResumeDetail`,
          query: { ResumeId: items.Id }
        })
        .catch(err => {});
      this.$emit("reload");

      items.active = true;
      this.$store.dispatch("updateAddResumeId", items.Id);
    },

    validata() {
      this.$refs["formData"].validateField("StartWorkTime", valid => {});
    },

    onEditHeadImg() {
      if (this.resume_status == 2 || this.resume_status == 1)
        this.$refs.imageCropperUpload.isShowDialog = true;
    },

    /**
     * 获取个人信息数据
     */
    getBaseInfo() {
      let data = { ResumeId: this.add_resume_id };
      if (this.$route.query.PositionId) {
        data.PositionId = this.$route.query.PositionId;
      }

      GetResumeBasic(data).then(res => {
        if (res.data.Success) {
          let data = res.data.Data;
          // data.City = this.common.getItemNameByItemCode(
          //   this.city_item,
          //   data.CityCode
          // );
          data.City = data.CityCode;
          data.GenderTxt = this.common.getItemNameByItemCode(
            this.dd_sex,
            data.Gender
          );
          data.MaritalTxt = this.common.getItemNameByItemCode(
            this.dd_marital,
            data.Marital
          );

          data.CurIndustryTxt = this.common.getItemNameByItemCode(
            this.industry_item_list,
            data.CurIndustry
          );

          // res.data.Data.HukouTxt = this.common.getItemNameByItemCode(
          //   this.city_item,
          //   res.data.Data.Hukou
          // );

          data.EducationTxt = this.common.getItemNameByItemCode(
            this.dd_degree,
            data.Education
          );
          data.CurPositionTxt = this.common.getItemNameByItemCode(
            this.dictitem_job_category_list,
            data.CurPosition
          );
          data.StartWorkTime = data.StartWorkDate;
          this.showData = data;
          this.$emit("update:deliveryStatus", data.DeliveryStatus);
          this.$emit("update:isOwn", data.IsOwn);
          this.$emit("update:IsCollect", data.IsCollect);
        }
        if (!this.resume_status) {
          this.getResumeVersionList();
        }
      });
    },

    /**
     * 显示编辑
     */
    onShowEdit() {
      this.editBasicInfoDialog = true;
      if (this.resume_status == 2) {
        // this.showData.City = deepCopyTwo([undefined, this.showData.CityCode]);
        this.formData = { ...this.formData, ...this.showData };
      }
      // this.formData = deepCopyTwo(this.showData);
      // this.formData.Hukou = [undefined, this.formData.Hukou];

      // this.formData.Hukou = deepCopyTwo([undefined, this.formData.Hukou]);
    },

    /**
     * 取消保存
     */
    onCancel(from) {
      this.editBasicInfoDialog = false;
    },

    /**
     * 疑似重复详细信息   跳到预览页面
     */
    onResumeReuseDetail(data) {
      this.$store.dispatch("updateAddResumeId", data.Id);
      this.getBaseInfo();
      this.editBasicInfoDialog = false;
      this.isShowResumeReuse = false;
    },
    /**
     * 新增版本
     */
    addResumeVersions(data) {
      this.formData.PersonId = data.PersonId;
      this.onSave("add");
    },

    onSave(status) {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          let data = deepCopyTwo(this.formData);
          // if (data.City instanceof Array) {
          //   data.City = data.City[1];
          // }
          // if (data.Hukou instanceof Array) {
          //   data.Hukou = data.Hukou[1];
          // }
          // return
          this.$loading.show();
          // data.CompanyId = this.user_info.CompanyId;

          if (this.add_resume_id == "") {
            if (status === "add") {
              this.addResumeVersion(data); //新增简历版本
            } else {
              this.addResumeAction(data); //新增简历
            }
          } else {
            this.updateResume(data);
          }
        }
      });
    },

    /**添加简历版本 */
    addResumeVersion(data) {
      AddResumeVersion(data).then(res => {
        if (res.data.Success) {
          this.$store.dispatch("updateAddResumeId", res.data.Data);

          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.$store.dispatch("updateAddResumeId", res.data.Data);
          this.getBaseInfo(); //获取
          this.editBasicInfoDialog = false;
          this.isShowResumeReuse = false;
        } else {
          this.$message({
            message: res.data.Message,
            type: "error"
          });
        }
      });
    },

    /**新增简历 */
    addResumeAction(data) {
      AddResumeSave(data).then(res => {
        if (res.data.Success) {
          //重复简历
          if (res.data.Data.IsExist) {
            this.reuseResumeList = res.data.Data.ResumeList;
            this.isShowResumeReuse = true;
          } else {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.$store.dispatch("updateAddResumeId", res.data.Data);
            this.editBasicInfoDialog = false;
            this.isShowResumeReuse = false;
            this.getBaseInfo();
          }
        } else {
          this.$message({
            message: res.data.Message,
            type: "error"
          });
        }
      });
    },

    /**修改简历 */
    updateResume(data) {
      data.Id = this.add_resume_id;
      EditResumeBasic(data).then(res => {
        if (res.data.Success) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.getBaseInfo();
          this.editBasicInfoDialog = false;
        } else {
          this.$message({
            message: res.data.Message,
            type: "error"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.resume_version_popover {
  background: red;
  padding: 0;
  .submenu {
    // display: none;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 9;
    padding: 10px 0;
    border: 1px solid #eee;
    border-radius: 6px;
    @include shadow();

    li {
      padding: 8px 25px;
      white-space: nowrap;

      a {
        color: #333;
        font-weight: bold;

        &:hover {
          color: $blue;
        }
      }
      &.active {
        a {
          color: $blue;
        }
      }
    }
  }
}
>>> .basic-info-dialog {
  .data_time {
    input {
      &.el-input__inner {
        padding-left: 30px;
      }
    }
  }
  .el-dialog__body {
    padding: 10px 20px 50px 20px;
  }
  label.el-form-item__label {
    width: 100px;
    text-align: right;
    margin-right: 22px;
  }
  // .el-input__prefix {
  //   right: 5px;
  //   left: auto;
  // }

  .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--date {
    width: 240px;
  }
  .el-input {
    width: 240px;
  }
  .input_mini {
    width: 240px;
    .el-col {
      text-align: center;
    }
    .el-input {
      width: 100%;
    }
  }
  .el-dialog {
    width: 800px;
  }
  .el-form-item {
    margin-bottom: 14px;
  }

  .form_input_mobile {
    button {
      position: absolute;
      height: 18px;
      width: 48px;
      top: 0;
      right: 10px;
      padding: 0px;
      margin-left: -52px;
      margin-top: 8px;
      background: #eeeeee;
      color: #333;
      border: 0;
    }
  }
}

>>> .el-dialog {
  width: 800px;
  &.resume_reuse {
    .table_operation_but {
      @include df;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.add_resume_status {
  position: relative;
  font-size: 14px;
  color: #aaaaaa;

  .import_resume {
    position: absolute;
    right: 0;
    font-size: 12px;
    .el-button {
      margin-left: 15px;
      width: 80px;
      height: 26px;
      padding: 0;
    }
  }
}

.info_popover {
  text-align: center;
  color: #43a7e0;
  margin-bottom: 27px;
  .el-col {
    cursor: pointer;
    margin-top: 17px;
    &:hover {
      background: #ddd;
    }
  }
}
.resume_info_header {
  position: absolute;
  top: -10px;
  left: -10px;

  .update_date {
    height: 30px;
    display: grid;
    > span {
      margin-bottom: 10px;
      color: #878787;
      font-size: 12px;
    }
  }
  // .resume_versions {
  //   cursor: pointer;
  //   right: -10px;
  //   top: 0;
  //   position: absolute;
  //   color: #43a7e0;

  //   .icon-time {
  //     margin-right: 10px;
  //   }
  // }
}
.r-title {
  font-size: 18px;
  line-height: 20px;
  font-weight: bold;
  color: #000;
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
}

.resume-basic-info {
  background: #fff;
  font-size: 14px;
  color: #333333;
  .w-title {
    border-bottom: 0;
    padding: 0;
    margin-bottom: 35px;
  }
  .r-intro {
    margin-bottom: 20px;
    position: relative;

    .r-source {
      font-size: 13px;
      li {
        display: inline-block;
        margin-right: 20px;
        span {
          color: #999;
        }
      }
    }
    .r-version {
      position: absolute;
      top: 0;
      right: 0;
      .extend > span {
        color: #428dde;
      }
      .iconfont {
        color: #999;
        margin-right: 5px;
      }
    }
  }

  .r-user {
    @include clearfix();
    padding-bottom: 35px;
    .user-info {
      .photo {
        position: relative;
        @include wh(85px, 85px);
        background-color: #fff;
        border: 5px solid #f8f8f8;
        border-radius: 100%;
        margin: 10px auto;

        &:after {
          content: "\e681";
          @include iconfont;
          font-size: 70px;
          line-height: 1;
          color: #b2b2b2;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 9;
        }

        img {
          display: block;
          @include wh(75px, 75px);
          border-radius: 100%;
          position: relative;
          z-index: 11;
        }
      }
      .upload {
        min-height: 100px;
        span {
          display: block;
          font-size: 12px;
          color: #999;
          margin-top: 10px;
        }
      }
      .name {
        font-size: 16px;
        font-weight: bold;
      }

      .spec {
        font-size: 13px;
        margin: 20px 0;

        li {
          display: inline-block;
          margin-top: 4px;
          margin-bottom: 4px;

          & + li {
            padding-left: 8px;
            margin-left: 5px;
          }
        }
      }
    }
    .user-info {
      position: relative;
      text-align: center;
      float: left;
      width: 245px;
      border-right: 1px dashed #ccc;
      border-bottom: none;
      margin-bottom: 0;

      .name {
        .iconfont {
          font-size: 24px;
          line-height: 1;
          vertical-align: middle;
          font-weight: normal;
          color: $blue;

          &.icon-female {
            color: #f04288;
          }
        }
      }

      .spec {
        margin-top: 10px;
        margin-bottom: 0;
      }

      .r-edit {
        position: static;
        margin-top: 5px;
      }
    }
    .u-base {
      margin-top: 20px;
      overflow: auto;
    }
    .u-sepc {
      position: relative;
      margin-left: 245px;
      padding: 15px 20px 15px 50px;

      padding: 15px 20px 15px 50px;
      h3 {
        margin: 0;
      }
      li {
        float: left;
        width: 50%;
        @include list-line;
        .label {
          margin-left: 5px;
        }
      }
    }
  }

  .resume-basic_info {
    background: #fff;
    display: -webkit-flex;
    padding-bottom: 30px;
    border-bottom: 1px solid #ddd;
    > div {
      // margin-left: 30px;
      margin-bottom: 30px;
    }
    img {
      @include wh(178px, 188px);
    }
    .user-info {
      .el-col {
        margin-top: 30px;
      }
    }
    .icon-sex {
      font-size: 20px;
      margin-left: 20px;
      &.icon-sex1 {
        color: #44a8e1;
      }
      &.icon-sex2 {
        color: #ed5c7e;
      }
    }
    &.refresh_resume_style {
      display: block;
      border-bottom: 0;
      padding-bottom: 22px;
      border-bottom: 1px solid #ddd;
      > div {
        margin-bottom: 0px;
      }
      img {
        @include wh(80px, 80px);
        border-radius: 50px;
        margin-left: calc(50% - 40px);
      }
      .user-info {
        .el-col {
          text-align: center;
          margin-top: 24px;
        }
      }
    }
  }
  .basic-info {
    padding-top: 30px;
    img {
      @include wh(150px, 150px);
    }
    .user-info {
      margin-top: 10px;
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
    .ac_mobile {
      background: #44a8e1;
      position: absolute;
      font-size: 12px;
      height: 18px;
      line-height: 18px;
      width: 52px;
      margin-top: -29px;
      left: 270px;
      border-radius: 10px;
      text-align: center;
      font-weight: 400;
      color: #fff;
    }
  }

  .el-form-item {
    display: -webkit-flex;
  }
  // .button_content {
  //   width: 100%;
  //   display: -webkit-flex;
  //   justify-content: center;
  //   > div {
  //     display: -webkit-flex;
  //     justify-content: center;
  //     width: 100%;
  //     > button {
  //       width: 100px;
  //     }
  //   }
  // }
}
</style>
