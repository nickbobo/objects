<template>
  <div>
    <el-row
      class="issue_position"
      v-if="!isShowPreviewPosition"
      v-loading="loadingStatus"
    >
      <el-form
        :model="formData"
        ref="addPosition"
        :rules="rulesFrom"
        :key="'addPosition'"
      >
        <span class="unreviewed" v-show="!isShowAuditPass"
          >贵司尚未通过企业资质审核 ,所发布职位还不能进行审核对外发布哦</span
        >
        <div class="w-title">
          <h2>职位信息</h2>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="职位名称" prop="PositionName">
              <el-input
                type="text"
                v-model="formData.PositionName"
                :disabled="isEdit"
                maxlength="30"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="readonly-tip" v-if="isEdit">
            职位名称不可修改哦～如有更改需求请重新发布新职位！</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工作地点" prop="City">
              <el-select
                placeholder="请选工作地点"
                filterable
                v-model="formData.City"
              >
                <el-option-group
                  v-for="items in $store.getters.city_item"
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

              <!-- <el-cascader
                :options="$store.getters.city_item"
                :props="optionProps"
                placeholder="请选工作地点"
                v-model="formData.City"
                :show-all-levels="false"
                filterable
              >
              </el-cascader> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详细地址" prop="Address">
              <el-input
                type="text"
                v-model="formData.Address"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位职能" prop="JobCategory">
              <el-select
                placeholder="请选择期望职能"
                filterable
                v-model="formData.JobCategory"
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
                    :value="item.ItemCode"
                  ></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招聘人数" prop="RecruitNum">
              <el-input
                type="number"
                v-model="formData.RecruitNum"
                maxlength="10"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="薪资范围" prop="Salary">
              <el-select placeholder="薪资范围" v-model="formData.Salary">
                <el-option
                  v-for="items in dd_salary_list"
                  :key="items.ItemName"
                  :label="items.ItemName"
                  :value="items.ItemCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招聘结束时间" prop="PublishEndTime">
              <el-date-picker
                v-model="formData.PublishEndTime"
                type="date"
                placeholder="招聘结束时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="w-title">
          <h2>职位需求</h2>
        </div>

        <el-row>
          <el-col :span="12">
            <el-row class="age_select">
              <el-form-item label="年龄要求" prop="AgeFrom">
                <el-col :span="12">
                  <el-input
                    type="number"
                    min="16"
                    max="100"
                    v-model="formData.AgeFrom"
                  ></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input
                    type="number"
                    min="16"
                    max="100"
                    v-model="formData.AgeTo"
                  ></el-input>
                </el-col>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属行业" prop="Industry">
              <el-select
                filterable
                allow-create
                default-first-option
                collapse-tags
                placeholder="所属行业"
                v-model="formData.Industry"
                @change="selectChange"
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
                    :value="item.ItemCode"
                  ></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工作年限" prop="WorkYear">
              <el-select placeholder="工作年限" v-model="formData.WorkYear">
                <el-option
                  v-for="items in dd_work_year"
                  :key="items.ItemName"
                  :label="items.ItemName"
                  :value="items.ItemCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历要求" prop="Degree">
              <el-select placeholder="学历要求" v-model="formData.Degree">
                <el-option
                  v-for="items in dd_degree"
                  :key="items.ItemCode"
                  :label="items.ItemName"
                  :value="items.ItemCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="工作内容" class="input_textarea" prop="Duty">
          <el-input
            type="textarea"
            v-model="formData.Duty"
            maxlength="3000"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item
          label="任职要求"
          class="input_textarea"
          prop="PositionDes"
        >
          <el-input
            type="textarea"
            v-model="formData.PositionDes"
            maxlength="3000"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="发布渠道" class="checkbox-publish">
          <span class="checkbox-title">付费</span>
          <el-checkbox-group
            v-model="formData.PublishChannel"
            v-if="PublishChannelStatus"
          >
          <!-- + (item.status ? item.status : '') -->
            <el-checkbox
              :label="item.ItemName + (item.status ? (item.status==='已通过'?'':item.status) : '')"
              v-for="(item, index) in dd_publish_channel"
              :disabled="
                disabledStores.includes(item.ItemName) ||
                  item.status === '申请中' ||
                  item.status === '未申请'
              "
              v-if="isPass ? true : isDisabledStores(item.ItemName)"
              :key="index"
              >{{ item.ItemName }}&nbsp;&nbsp;{{
                item.status === "已通过" ? "" : item.status
              }}<button type='button'
                v-if="item.status === '未申请'"
                @click="onPublishApply(item)"
                class="publishApply w-btn"
              >
                申请
              </button></el-checkbox
            >
          </el-checkbox-group>
   
        </el-form-item>

        <el-form-item label="发布平台" class="checkbox-publish">
          <span class="checkbox-title">免费</span>
          <el-checkbox-group v-model="formData.PublishGroupIds">
            <el-checkbox
              :label="item.GroupName"
              v-for="(item, index) in platformList"
              :disabled="item.active"
              :key="item.Id"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- <el-form-item label="职位置顶" class="checkbox-publish" v-if="isEdit">
          <span class="checkbox-title">是否置顶</span>
          <el-checkbox-group v-model="isApplyPositionTop">
            <el-checkbox label=""></el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->

        <div class="w-title">
          <h2>委托公司信息</h2>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="CompanyName">
              <el-input
                type="text"
                v-model="formData.CompanyName"
                maxlength="50"
                show-word-limit
                :disabled="companyStatus"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人" prop="ContactPerson">
              <el-input
                type="text"
                v-model="formData.ContactPerson"
                maxlength="50"
                show-word-limit
                :disabled="companyStatus"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="Phone">
              <el-input
                type="text"
                v-model="formData.Phone"
                :disabled="companyStatus"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="Email">
              <el-input
                type="text"
                v-model="formData.Email"
                :disabled="companyStatus"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="委托企业简介">
          <el-input
            type="textarea"
            v-model="formData.CompanyDes"
            maxlength="500"
            show-word-limit
            :disabled="companyStatus"
          ></el-input>
        </el-form-item>
        <el-row class="but_list">
          <button class="w-btn btn-cancel" type='button' @click="onPreviewPosition">
            预览职位
          </button>
          <button class="w-btn btn-cancel" type='button' @click="formDataValidate(true)">
            保存草稿
          </button>
          <button type="" class="w-btn " type='button' @click="formDataValidate(false)">
            发布职位
          </button>
        </el-row>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import { GetCompanyState } from "api/companyApi";
import { mapGetters } from "vuex";
import { deepCopyTwo } from "@/utils/index";
import { GetCompanyBasic } from "api/companyApi";
import { GetPlatformList } from "api/api";
import {
  PublishAddPosition, //新增职位 - 提交审核
  SaveAddPosition, //新增职位 - 保存为草稿
  SaveEditPosition, //编辑职位 - 保存为草稿
  PublishEditPosition, //编辑职位 提交为审核
  GetPositionDetail, //企业端职位详情
  GetChannelPositionApplyStatus,
  AddPositionChannelAudit,
  ApplyPositionTop
} from "api/positionManager";
export default {
  name: "IssuePosition", //发布职位
  computed: {
    ...mapGetters([
      "dd_salary_list",
      "industry_item_list",
      "dd_work_year",
      "dd_degree",
      "dd_publish_channel",
      "dictitem_job_category_list",
      "user_info",
      "city_item"
    ])
  },
  data() {
    const isExitsAgeFrom = (rule, value, callback) => {
      if (this.formData.AgeFrom == "" || this.formData.AgeTo == "") {
        callback(new Error("请输入年龄要求"));
      } else if (
        this.formData.AgeFrom > 100 ||
        this.formData.AgeTo > 100 ||
        this.formData.AgeFrom < 16 ||
        this.formData.AgeTo < 16
      ) {
        callback(new Error("请输入正确的年龄范围"));
      } else if (this.formData.AgeFrom > this.formData.AgeTo) {
        callback(new Error("请输入正确的年龄范围"));
      } else {
        callback();
      }
    };

    const isExitsRecruitNum = (rule, value, callback) => {
      if (this.formData.RecruitNum > 100000 || this.formData.RecruitNum < 1) {
        callback(new Error("招聘人数范围(1~100000)"));
      } else {
        callback();
      }
    };

    // const isExitsCity = (rule, value, callback) => {
    //   if (this.formData.City.length == 0) {
    //     callback(new Error("请选择城市"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      isPass: true, //发布发布渠道是否审核通过
      // isApplyPositionTop: false, //是否置顶
      ApplyPositionTopStatus: false, //置顶申请状态
      companyStatus: true,
      loadingStatus: false,
      isShowPreviewPosition: false, //职位预览界面切换
      isShowAuditPass: true, //企业审核状态
      isEdit: false,
      PublishChannelStatus: false,
      optionProps: {
        value: "ItemCode",
        label: "ItemName",
        children: "Childs"
      },
      platformList: [],
      platformDefList: [],
      disabledStores: ["人才拼图", "人才拼图微招聘"], //发布渠道这个2个为必选,api在保存时默认带这2个渠道字符
      // formData: {
      //   PositionName: "软件工程师",
      //   RecruitNum: 100,
      //   CompanyName: "", //公司信息 公司名称
      //   ContactPerson: "", //公司信息 联系人
      //   Phone: "", //公司信息  联系手机
      //   Tel: "", //公司信息 联系电话
      //   Email: "", //公司信息  邮箱
      //   Gender: "",
      //   Industry: "电子技术/半导体/集成电路",
      //   JobCategory: "首席执行官/CEO/总裁/总经理",
      //   City: ["S", "上海"],
      //   WorkYear: "3-5年",
      //   Degree: "硕士",
      //   Salary: "8K-10K", //薪资范围
      //   AgeFrom: 16,
      //   AgeTo: 50,
      //   PositionDes: "任职要求PositionDes",
      //   CompanyDes: "", //公司信息 公司简介Description
      //   Remark: "",
      //   PublishStartTime: "2020-06-15T07:52:40.808Z",
      //   PublishEndTime: "2020-06-15T07:52:40.808Z",
      //   IsPublic: true,
      //   Scope: "", //公司信息  员工规模
      //   Address: "徐家汇",
      //   Duty: "工作内容11111111111111Duty",
      //   PublishChannel: ["人才拼图", "人才拼图微招聘"] //ItemCode   发布渠道
      // },
      formData: {
        Id: "",
        PositionName: "",
        RecruitNum: "",
        CompanyName: "", //公司信息 公司名称
        ContactPerson: "", //公司信息 联系人
        Phone: "", //公司信息  联系手机
        Tel: "", //公司信息 联系电话
        Email: "", //公司信息  邮箱
        Gender: "",
        Industry: "",
        JobCategory: "",
        City: "",
        WorkYear: "",
        Degree: "",
        Salary: "", //薪资范围
        AgeFrom: 18,
        AgeTo: 45,
        PositionDes: "",
        CompanyDes: "", //公司信息 公司简介Description
        Remark: "",
        PublishStartTime: "",
        PublishEndTime: "",
        IsPublic: true,
        Scope: "", //公司信息  员工规模
        Address: "",
        Duty: "",
        PublishGroupIds: [],
        PublishChannel: ["人才拼图", "人才拼图微招聘"] //ItemCode   发布渠道
      },
      rulesFrom: {
        PositionName: [
          { required: true, message: "请输入职位名称", trigger: "blur" }
        ],
        City: [
          { required: true, message: "请输入工作地点", trigger: "change" }
          // { required: false, trigger: "blur", validator: isExitsCity }
        ],
        Address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        JobCategory: [
          { required: true, message: "请输入岗位职能", trigger: "change" }
        ],
        RecruitNum: [
          { required: true, message: "请输入招聘人数", trigger: "blur" },
          { required: false, trigger: "blur", validator: isExitsRecruitNum }
        ],
        AgeFrom: [
          { required: true, message: "请输入年龄选择", trigger: "change" },
          { required: false, trigger: "blur", validator: isExitsAgeFrom }
        ],
        Salary: [
          { required: true, message: "请输入薪资范围", trigger: "change" }
        ],
        WorkYear: [
          { required: true, message: "请输入工作年限", trigger: "change" }
        ],
        Degree: [
          { required: true, message: "请输入学历要求", trigger: "change" }
        ],
        Duty: [{ required: true, message: "请输入工作内容", trigger: "blur" }],
        PositionDes: [
          { required: true, message: "请输入任职要求", trigger: "blur" }
        ],

        Phone: [
          {
            required: true,
            trigger: "blur",
            validator: this.$formValidate(this).Mobile
          }
        ],
        // Email: [
        //   {
        //     trigger: "blur",
        //     required: true,
        //     validator: this.$formValidate(this).Email
        //   }
        // ],
        CompanyName: [
          { required: true, message: "请输入公司名称", trigger: "change" }
        ],
        ContactPerson: [
          { required: true, message: "请输入联系人", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // ApplyPositionTop() {
    //   if (this.isApplyPositionTop) {
    //     if (
    //       this.ApplyPositionTopStatus === "" ||
    //       this.ApplyPositionTopStatus === "未申请"
    //     ) {
    //       ApplyPositionTop({ Id: this.formData.Id }).then(res => {
    //         if (res.data.Success) {
    //         } else {
    //           this.$message.error(res.data.Message);
    //         }
    //       });
    //     }
    //   }
    // },
    onPublishApply(item) {
      // console.info(item);
      AddPositionChannelAudit({ RelationId: item.Id }).then(res => {
        if (res.data.Success) {
          this.GetChannelPositionApplyStatus();
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },
    GetChannelPositionApplyStatus() {
      GetChannelPositionApplyStatus({ PositionId: "" }).then(res => {
        if (res.data.Success) {
          let data = res.data.Data;
          this.PublishChannelStatus = false;
          // this.formData.CompanyName = data.CompanyName;
          // this.formData.Email = data.Email;
          // this.formData.Phone = data.Phone;
          // this.formData.ContactPerson = data.ContactPerson;
          // console.info(res);
          for (let item of this.dd_publish_channel) {
            if (item.ItemName === "前程无忧") {
              item.status = data.QCWY;
            }
            if (item.ItemName === "智联招聘") {
              item.status = data.ZLZP;
            }
            if (item.ItemName === "猎聘") {
              item.status = data.LP;
            }
          }
          this.ApplyPositionTopStatus = data.Top;
          if (data.Top === "申请中" || data.Top === "已通过") {
            this.isApplyPositionTop = true;
          }
          this.PublishChannelStatus = true;
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },
    isDisabledStores(name) {
      let status = false;
      for (let item of this.disabledStores) {
        if (item === name) {
          status = true;
        }
      }
      return status;
    },
    //公司信息初始:公司名称,联系人,联系人电话,
    getCompanyInfo() {
      GetCompanyBasic().then(res => {
        if (res.data.Success) {
          let data = res.data.Data;
          this.formData.CompanyName = data.CompanyName;
          this.formData.Email = data.Email;
          this.formData.Phone = data.Phone;
          this.formData.ContactPerson = data.ContactPerson;
          this.formData.CanRepresent = data.CanRepresent;

          if(data.CanRepresent){
            this.companyStatus = false;
          }
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },
    selectChange() {
      this.$forceUpdate(); //外部js无效  只对当前组件有效
    },

    /**
     * 发布平台
     */
    GetPlatformList() {
      GetPlatformList({}).then(res => {
        if (res.data.Success) {
          let data = deepCopyTwo(res.data.Data);
          let defData = [];
          for (let item of data) {
            item.acives = [];

            //发布渠道添加默认值到当前服务数据并选中
            if (
              item.Id == process.env.GroupId ||
              item.GroupName == "人才拼图"
            ) {
              item.active = true;
              // if (this.formData.PublishGroupIds.length == 0) {
              //   this.formData.PublishGroupIds.push(item.GroupName);
              // }
              let status = false;
              for (let items of this.formData.PublishGroupIds) {
                if (items == item.GroupName) {
                  status = true;
                }
              }
              if (!status) {
                this.formData.PublishGroupIds.push(item.GroupName);
              }
            } else {
              item.active = false;
            }
          }
          this.platformList = data;
        }
      });
      this.platformList = [];
    },
    /**
     * 验证status=true 保存为草稿职位; status=false 发布职位
     */
    formDataValidate(status) {
      this.$refs["addPosition"].validate(valid => {
        if (valid) {
          let data = deepCopyTwo(this.formData);
          data.PublishEndTime = this.formData.publishEndTime;
          //console.info(data.PublishEndTime);
          // if (data.City.length == 2) {
          //   data.City = data.City[1];
          // }
          data.PublishEndTime = this.formData.PublishEndTime;
          let publishChannel = [];
          //因为api在保存时默认带这2个渠道字符,所以要去掉"人才拼图", "人才拼图微招聘"
          this.formData.PublishChannel.forEach((val, index, arr) => {
            if (val == "人才拼图" || val == "人才拼图微招聘" || val == "") {
            } else {
              publishChannel.unshift(val);
            }
          });

          //groupName数据 转id 转集合
          let activePlatForm = [];
          for (let i of this.platformList) {
            for (let item of this.formData.PublishGroupIds) {
              if (i.GroupName === item) {
                //过滤掉默认值，PublishGroupIds重新赋值
                // if (
                //   i.Id !== process.env.GroupId &&
                //   i.GroupName !== "人才拼图"
                // ) {
                activePlatForm.push(i.Id);
                // }
              }
            }
          }
          data.PublishGroupIds = activePlatForm;

          data.PublishChannel = publishChannel;
          
          // console.info(data)
          // this.loadingStatus = true;
          if (status) {
            this.onSaveDraftPosition(data);
          } else {
            this.onSave(data);
          }
        }
      });
    },
    /**
     * 新增职位 - 保存为草稿
     */
    onSaveDraftPosition(data) {
      this.loadingStatus = true;
      if (!this.isEdit) {
        SaveAddPosition(data).then(res => {
          if (res.data.Success) {
            let data = res.data.Data;

            this.$message({
              message: "保存草稿职位成功",
              type: "success"
            });
            this.$router.push({
              path: "/PositionManager",
              query: { pageId: 1 }
            });
          } else {
            this.$message.error(res.data.Message);
          }
          this.loadingStatus = false;
        });
      } else {
        SaveEditPosition(data).then(res => {
          //编辑职位
          if (res.data.Success) {
            let data = res.data.Data;
            this.$message({
              message: "保存草稿职位成功",
              type: "success"
            });
            this.$router.push({
              path: "/PositionManager",
              query: { pageId: 1 }
            });
            // this.ApplyPositionTop();
          } else {
            this.$message.error(res.data.Message);
          }
          this.loadingStatus = false;
        });
      }
    },

    /**
     * 保存并发布 新增职位 - 提交审核
     */
    onSave(data) {
      if (!this.isEdit) {
        PublishAddPosition(data).then(res => {
          if (res.data.Success) {
            this.$message({
              message: "职位保存成功",
              type: "success"
            });
            this.$router.push({
              path: "/PositionManager",
              query: { pageId: 0 }
            });
            // pageId
          } else {
            this.$message.error(res.data.Message);
          }
          this.loadingStatus = false;
        });
      } else {
        PublishEditPosition(data).then(res => {
          if (res.data.Success) {
            this.$message({
              message: "职位修改发布成功",
              type: "success"
            });
            this.$router.push({
              path: "/PositionManager",
              query: { pageId: 0 }
            });
            // this.ApplyPositionTop();
          } else {
            this.$message.error(res.data.Message);
          }
          this.loadingStatus = false;
        });
      }
    },
    /**
     * 预览职位
     */
    onPreviewPosition() {
      this.$refs["addPosition"].validate(valid => {
        if (valid) {
          this.isShowPreviewPosition = true;
          let data = deepCopyTwo(this.formData);
          data.PublishEndTime = this.formData.PublishEndTime;

          // if (data.City.length == 2) {
          //   data.City = data.City[1];
          // }
          data.CityTxt = this.common.getItemNameByItemCode(
            this.city_item,
            data.City
          );

          data.JobCategory = this.common.getItemNameByItemCode(
            this.dictitem_job_category_list,
            data.JobCategory
          );

          data.SalaryTxt = this.common.getItemNameByItemCode(
            this.dd_salary_list,
            data.Salary
          );
          data.WorkYearTxt = this.common.getItemNameByItemCode(
            this.dd_work_year,
            data.WorkYear
          );
          data.DegreeTxt = this.common.getItemNameByItemCode(
            this.dd_degree,
            data.Degree
          );
          this.$router.push({
            name: `PreviewPosition`,
            params: data,
            query: {
              positionId: this.$route.query.positionId
            }
          });
        }
      });
    },
    getCompanyState() {
      GetCompanyState({ CompangyId: this.user_info.CompanyId }).then(res => {
        if (res.data.Success) {
          if (res.data.Data.IsPerfect) {
            if (res.data.Data.AduitState) {
              this.isShowAuditPass = true; //审核通过
            } else {
              //this.uploadLoadingDialog = true;
            }
          } else {
            //this.isShowNotPerfectInfo = true;
          }
        }
      });
    },
    /**
     * 获取职位详情
     */
    GetPositionDetail(companyInfo) {
      GetPositionDetail({ Id: this.$route.query.positionId }).then(res => {
        if (res.data.Success) {
          // this.formData = res.data.Data;
          //res.data.Data.City = this.common.getCityIdByName(res.data.Data.City);
          //TODO 岗位职能
          // this.formData.JobCategory = this.common.getItemNameByItemCode(
          //   this.dictitem_job_category_list,
          //   res.data.Data.JobCategory
          // )
          //所属行业 Industry
          //发布渠道
          //console.log(res.data.Data.PublishChannel);
          let data = res.data.Data;

          //发布渠道解析：
          data.PublishChannel = data.PublishChannel.split(";");
          if (data.PublishGroupIds) {
            data.PublishGroupIds = data.PublishGroupIds.split(";");
            let publishGroupNameList = [];
            for (let i of data.PublishGroupIds) {
              for (let item of this.platformList) {
                if (i === item.Id) {
                  publishGroupNameList.push(item.GroupName);
                }
              }
            }
            data.PublishGroupIds = publishGroupNameList;
          } else {
            data.PublishGroupIds = [];
          }
          // data.push({'CityTxt':''});

          // data.City = [undefined, data.City];

          this.formData = { ...this.formData, ...data };

          this.GetPlatformList();
        } else {
        }
      });
    }
  },
  mounted() {
    if (JSON.stringify(this.$route.params) != "{}") {
      this.formData = { ...this.formData, ...this.$route.params };
    }
    this.GetPlatformList();
    if (
      this.$route.query.positionId == undefined ||
      this.$route.query.positionId == ""
    ) {
      this.isEdit = false;
      this.getCompanyInfo();
    } else {
      this.isEdit = true;
      if (JSON.stringify(this.$route.params) == "{}") {
        this.GetPositionDetail();
      }
    }

    this.$nextTick(() => {
      this.GetChannelPositionApplyStatus();
    });
  },
  created() {
    this.$store.dispatch("getAllDD");
    this.$store.dispatch("getCityItem"); //地图
    this.$store.dispatch("getIndustryItemList"); // 行业
    this.$store.dispatch("GetCompanyStockList"); //"企业性质
    this.$store.dispatch("GetDictItemJobCategoryList"); //职能

    this.getCompanyState(); //获取企业审核状态
    // let companName = this.user_info.CompanyName;

    // if (companName === "上海中智人才顾问咨询有限公司") {
    //   this.companyStatus = false;
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
$ItemH: 38px;
$ItemW: 100%;
$TxTH: 260px;
button {
  &.publishApply {
    // position: absolute;
    margin-left: 10px;
    top: 0;
    height: 30px;
    line-height: 30px;
    // background: red;
    z-index: 999;
    cursor: pointer;
    &.w-btn {
      min-width: auto !important;
      height: 30px;
      line-height: 30px;
    }
  }
}
.issue_position {
  @include shadow();
  width: 1200px;
  background: #fff;
  padding: 20px 195px 55px 55px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 35px;

  .readonly-tip {
    margin-left: -65px;
    color: #999;
    padding-left: 0;
    text-align: left;
    line-height: 34px;
  }
  .w-title {
    margin-left: -20px;
    border-bottom: none;
    margin-bottom: 10px;
  }
  form.el-form {
    margin: 0 auto;
    margin-bottom: 24px;
    > .el-row {
      margin-left: -44px;
      margin-right: -44px;
      > .el-col-12 {
        padding-left: 44px;
        padding-right: 44px;
      }
      &.but_list {
        text-align: left;
        margin-left: 140px;
        font-size: 0;
        button {
          margin-right: 8px;
        }
      }
    }
    .w-btn {
      min-width: 120px;
    }
  }

  .unreviewed {
    display: block;
    background-color: #f5f5f5;
    border: 1px solid #eee;
    font-weight: bold;
    margin: 15px -140px 15px 0;
    padding: 25px;
    text-align: left;
  }

  .el-form-item {
    position: relative;
    padding-left: 10em;
    width: $ItemW;
    // >>> .el-input__suffix:after{
    // content: ' ';
    // display: block;
    // position: absolute;
    // top: 50%;
    // right: 15px;
    // margin-top: -3px;
    // width: 0;
    // height: 0;
    // border-style: solid;
    // border-width: 5px 5px 0 5px;
    // border-color: #dddddd transparent transparent transparent;
    // }
    // >>> .el-input__suffix-inner{
    //   display: none;
    // }
    &.checkbox-publish {
      margin-bottom: 0;
      .pub-but-list {
        @include df();
        .pub-cha-but {
          margin-left: 20px;
          min-width: 60px;
          height: 30px;
          display: block;
          line-height: 30px;
          text-align: center;
        }
      }
    }
    >>> label {
      &.el-form-item__label {
        line-height: $ItemH;
        color: #999;
        width: 10em;
        position: absolute;
        font-size: 15px;
        font-weight: 400;
        text-align: left;
        left: 0;
        position: absolute;
      }
    }

    >>> .el-form-item__content {
      text-align: left;
      line-height: $ItemH;
      @include df();
      @include df-ai();
      .el-textarea {
        width: $ItemW;
        height: $TxTH;
        .el-textarea__inner {
          height: $TxTH;
          width: $ItemW;
        }
      }
      .el-select {
        width: $ItemW;
        height: $ItemH;
      }
      .el-input__icon {
        line-height: $ItemH;
      }
      .el-input__inner {
        height: $ItemH;
        width: $ItemW;
        border: 1px solid #eeeeee;
      }
      .el-date-editor {
        &.el-input__inner {
          width: $ItemW;
        }
        &.el-input {
          width: $ItemW;
        }
      }
      .el-cascader {
        line-height: $ItemH;
        width: $ItemW;
      }
      .el-input.is-disabled .el-input__inner {
        background-color: #fafafa;
      }
      .checkbox-title {
        float: left;
        margin-right: 19px;
        color: #999;
        font-size: 15px;
        line-height: 34px;
      }
      .el-checkbox-group {
        float: left;
      }
    }
  }

  .age_select {
    @include df;
    @include df-ai;
    >>> .el-form-item {
      @include df;
      .el-form-item__content {
        margin-left: 0 !important;
        text-align: center;
        @include df;
        width: $ItemW;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 12px;
          height: 1px;
          background-color: #ccc;
          margin-left: -6px;
          margin-top: 0;
        }
        .el-col-12 {
          margin-right: 15px;
        }
        .el-col-12 + .el-col-12 {
          margin-left: 15px;
          margin-right: 0px;
        }
        .el-input__inner {
          width: $ItemW;
          padding-right: 0;
        }
      }
    }
  }
}
</style>
