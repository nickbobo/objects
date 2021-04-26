<template>
  <div class="layout_content">
    <!-- 选择框 -->
    <div class="top_menu_select">
      <div
        :class="{
          top_menu_select_select: pagerType == 0,
          top_menu_select_unselect: pagerType != 0
        }"
        @click="changePagerType(0)"
        v-if="user_info.UserType == 2"
      >
        <span>企业信息维护</span>
      </div>
      <div
        :class="{
          top_menu_select_select: pagerType == 1,
          top_menu_select_unselect: pagerType != 1
        }"
        @click="changePagerType(1)"
        style="margin-left: 10px"
      >
        <span>用户管理</span>
      </div>
    </div>
    <!-- 分割线 -->
    <!-- <div class="line"></div> -->
    <!-- 企业信息维护 -->
    <div v-if="pagerType == 0" class="content">
      <el-row>
        <div class="left_menu">
          <div
          class="w-btn"
            :class="{
              'btn-left-select': choiceType == 0,
              'btn-left-unselect': choiceType != 0
            }"
            @click="choiceTabType(0)"
          >
            公司信息
          </div>
          <div
          class="w-btn"
            :class="{
              'btn-left-select': choiceType == 1,
              'btn-left-unselect': choiceType != 1
            }"
            style="margin-top: 15px"
            @click="choiceTabType(1)"
          >
            证明材料
          </div>
          <div
          class="w-btn"
            :class="{
              'btn-left-select': choiceType == 4,
              'btn-left-unselect': choiceType != 4
            }"
            style="margin-top: 15px"
            @click="choiceTabType(4)"
          >
            邮箱配置
          </div>
          <div
          class="w-btn"
            :class="{
              'btn-left-select': choiceType == 2,
              'btn-left-unselect': choiceType != 2
            }"
            style="margin-top: 15px"
            @click="choiceTabType(2)"
          >
            开票信息
          </div>
          <div
          class="w-btn"
            :class="{
              'btn-left-select': choiceType == 3,
              'btn-left-unselect': choiceType != 3
            }"
            style="margin-top: 15px"
            @click="choiceTabType(3)"
          >
            修改密码
          </div>
        </div>

        <div class="right_content" v-if="choiceType == 0">
          <!-- 公司信息显示布局 -->
          <!-- AduitState: false, // 信息未通过审核，或者审核中
      IsPerfect: false, // 信息未完善 -->
          <el-row>
            <span style="font-size: 15px; color: #999; " v-if="!AduitState" >待完善信息提交后，平台将尽快进行审核哦～</span>
            <span style="font-size: 15px; color: #07AA17; " v-if="AduitState" >贵司已经通过企业资质审核啦~现在就开始来畅享"人才拼图"平台的体验吧—</span>
          </el-row>
          <div>
            <div class="choice-type-layout" style="margin-top:37px">
              <el-form
                :model="formData"
                :rules="rulesFormLeft"
                ref="formData"
                :disabled="!editCompanyInfo"
              > 
               <div class="choice-tag-div">
                    <span class="choice-type-layout-tag-text">公司名称*</span>
                    <el-form-item prop="CompanyName">
                    <el-input
                        v-model="formData.CompanyName"
                        placeholder="请输入公司名称"
                        class="form_input"
                        maxlength="30"
                    ></el-input>
                    </el-form-item> 
               </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text">所属行业*</span>
                  <el-form-item prop="Industry">
                    <el-select
                        v-model="formData.Industry"
                        placeholder="请选择所属行业"
                        class="form_input"
                    >
                        <el-option-group
                        v-for="industryItem in $store.getters.industry_item_list"
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
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text">公司规模*</span>
                  <el-form-item prop="CompanyScale">
                    <el-select
                        v-model="formData.CompanyScale"
                        placeholder="请选择公司规模"
                        class="form_input"
                    >
                        <el-option
                        v-for="dd_staff_size in $store.getters.dd_staff_size"
                        :key="dd_staff_size.ItemName"
                        :label="dd_staff_size.ItemName"
                        :value="dd_staff_size.ItemCode"
                        ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text">　联系人*</span>
                  <el-form-item prop="ContactPerson">
                    <el-input
                        v-model="formData.ContactPerson"
                        placeholder="请输入联系人"
                        class="form_input"
                        maxlength="30"
                    ></el-input>
                  </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text">招聘负责人</span>
                  <el-form-item prop="RecruitPerson">
                    <el-input
                        v-model="formData.RecruitPerson"
                        placeholder="请输入招聘负责人"
                        class="form_input"
                        maxlength="30"
                    ></el-input>
                    </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text">公司网址*</span>
                  <el-form-item prop="WebUrl">
                    <el-input
                        v-model="formData.WebUrl"
                        placeholder="请输入公司网址"
                        class="form_input"
                        maxlength="50"
                    ></el-input>
                  </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text">公司介绍*</span>
                  <el-form-item prop="Description">
                    <el-input
                        type="textarea"
                        v-model="formData.Description"
                        placeholder="请输入公司介绍"
                        class="form_input"
                        maxlength="500"
                    ></el-input>
                  </el-form-item>
                </div>
                
              </el-form>
            </div>
          </div>
          <div>
            <div class="choice-type-layout two" style="margin-top:37px">
              <el-form
                :model="formData2"
                :rules="rulesFormRight"
                ref="formData2"
                :disabled="!editCompanyInfo"
                style="width:440px"
              >
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text">所在城市*</span>
                  <el-form-item prop="City">
                  <!-- <el-select v-model="area" placeholder="请选择所在城市"  style="margin-top: 25px;  width: 500px">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>    -->

                    <el-cascader
                        :options="$store.getters.city_item"
                        :props="optionProps"
                        v-model="formData2.City"
                        placeholder="请选择所在城市"
                        :show-all-levels="false"
                        filterable
                        class="form_input"
                    >
                    </el-cascader>
                  </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text">公司性质*</span>
                  <el-form-item prop="CompanyStockType">
                    <el-select
                        v-model="formData2.CompanyStockType"
                        placeholder="请选择公司性质"
                        class="form_input"
                    >
                        <!-- "ItemName": "中外合资(合资/合资)", "ItemCode": "2 -->
                        <el-option
                        v-for="company_stock in $store.getters.dd_company_stock"
                        :key="company_stock.ItemName"
                        :label="company_stock.ItemName"
                        :value="company_stock.ItemCode"
                        ></el-option>
                    </el-select>
                   </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text">成立时间</span>
                  <el-form-item prop="FoundedTime">
                    <el-date-picker
                        v-model="formData2.FoundedTime"
                        type="date"
                        placeholder="选择时间"
                        class="form_input"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text">联系人电话*</span>
                  <el-form-item prop="Phone">
                    <el-input
                        v-model="formData2.Phone"
                        placeholder="请输入联系人电话"
                        class="form_input"
                        maxlength="20"
                    ></el-input>
                  </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text"
                    >招聘负责人电话</span
                  >
                   <el-form-item prop="RecruitPersonTel">
                    <el-input
                        v-model="formData2.RecruitPersonTel"
                        placeholder="请输入招聘负责人电话"
                        class="form_input"
                        maxlength="20"
                    ></el-input>
                  </el-form-item>
                </div>
               
              </el-form>
            </div>
          </div>
        </div>
        <!-- 证明材料显示布局 -->
        <div class="right_content" v-if="choiceType == 1">
          <el-col :span="21">
            <div class="choice-type-layout">
              <div>
                <div class="qualification-materials-tag-font"
                  >企业资质材料</div
                >
                <div class="qualification-materials-information-font"
                  >上传企业工商管理登记证，待平台审核通过后，即可在平台公布发布职位进行招聘哦</div
                >
              </div>
              <div class="upload-layout">
                <!-- 文件预览删除 v-if="isUpload"-->
                <div
                  class="file-review-layout"
                  v-if="isUpload"
                  @click="downloadFile()"
                >
               
                <span class="iconfont icon-close_fill" style="position: absolute; margin-left: 70px; margin-top:-5px" @click="deleteUploadFile()"></span>
                 <img src="/static/img/upload-img.jpg" alt="">
                  <!-- <svg-icon icon-class="trash" @click="deleteUploadFile()" /> -->
                </div>
                <!-- 上传按钮 -->
                <!--data="{{uploadObj}}"  action="{{uploadUrl}}" -->
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :http-request="uploadFileMethod"
                  :action="fileUploadUrl"
                >
                  <div class="upload_but">
                    <el-button
                      plain
                      size="medium"
                      >{{ isUpload ? "重新上传" : "添加文件" }}</el-button
                    >
                    <div
                      style="color: #999999; font-size: 13px;text-align: left"
                      >支持word\pdf\jpg\png等, 文件不超过5M</div
                    >
                  </div>
                </el-upload>
              </div>
            </div>
          </el-col>
        </div>
        <!-- 开票信息显示布局 -->
        <div class="right_content billing_info" v-if="choiceType == 2">
          <div>
            <div class="choice-type-layout">
              <el-form
                :model="formDataTaxInfo"
                ref="formDataTaxInfo"
                :disabled="!editCompanyTaxInfo"
              >
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text" style="width:120px"
                    >公司注册登记名称</span
                  >
                  <el-form-item prop="TaxName">
                    <el-input
                        v-model="formDataTaxInfo.TaxName"
                        placeholder="请输入公司注册登记名称"
                        class="form_input"
                        maxlength="30"
                        style="width:294px"
                    ></el-input>
                  </el-form-item>
                </div>
               
                <div class="choice-tag-div">
                    <span class="choice-type-layout-tag-text" style="width:120px">地址</span>
                    <el-form-item prop="TaxAddress">
                        <el-input
                            v-model="formDataTaxInfo.TaxAddress"
                            placeholder="请输入地址"
                            class="form_input"
                            maxlength="50"
                            style="width:294px"
                        ></el-input>
                    </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text" style="width:120px">开户行</span>
                  <el-form-item prop="BankName">
                    <el-input
                        v-model="formDataTaxInfo.BankName"
                        placeholder="请输入开户行"
                        class="form_input"
                        maxlength="50"
                        style="width:294px"
                    ></el-input>
                  </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text" style="width:120px">发票邮寄地址</span>
                  <el-form-item prop="PostAddress">
                    <el-input
                        v-model="formDataTaxInfo.PostAddress"
                        placeholder="请输入发票邮寄地址"
                        class="form_input"
                        maxlength="50"
                        style="width:294px"
                    ></el-input>
                    </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text" style="width:120px">收件人电话</span>
                  <el-form-item prop="PostPhone">
                    <el-input
                        v-model="formDataTaxInfo.PostPhone"
                        placeholder="请输入收件人电话"
                        class="form_input"
                        maxlength="20"
                        style="width:294px"
                    ></el-input>
                  </el-form-item>
                </div>
                
              </el-form>
            </div>
          </div>
          <div>
            <div class="choice-type-layout two">
              <el-form
                :model="formDataTaxInfo2"
                ref="formDataTaxInfo2"
                :disabled="!editCompanyTaxInfo"
              >
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text" style="width:120px">纳税人识别号</span>
                  <el-form-item prop="TaxNumber">
                    <el-input
                        v-model="formDataTaxInfo2.TaxNumber"
                        placeholder="请输入纳税人识别号"
                        class="form_input"
                        maxlength="30"
                        style="width:294px"
                    ></el-input>
                  </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                    <span class="choice-type-layout-tag-text" style="width:120px">电话</span>
                    <el-form-item prop="TaxPhone">
                        <el-input
                            v-model="formDataTaxInfo2.TaxPhone"
                            placeholder="请输入电话"
                            class="form_input"
                            maxlength="20"
                            style="width:294px"
                        ></el-input>
                    </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                    <span class="choice-type-layout-tag-text" style="width:120px">账号</span>
                    <el-form-item prop="AccountNumber">
                        <el-input
                            v-model="formDataTaxInfo2.AccountNumber"
                            placeholder="请输入账号"
                            class="form_input"
                            maxlength="30"
                            style="width:294px"
                        ></el-input>
                    </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text" style="width:120px">收件人</span>
                  <el-form-item prop="PostRecipient">
                    <el-input
                        v-model="formDataTaxInfo2.PostRecipient"
                        placeholder="请输入收件人"
                        class="form_input"
                        maxlength="20"
                        style="width:294px"
                    ></el-input>
                  </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                    <span class="choice-type-layout-tag-text" style="width:120px">邮编</span>
                    <el-form-item prop="ZipCode">
                    <el-input
                        v-model="formDataTaxInfo2.ZipCode"
                        placeholder="请输入邮编"
                        class="form_input"
                        maxlength="6"
                        style="width:294px"
                    ></el-input>
                    </el-form-item>
                </div>
                
              </el-form>
            </div>
          </div>
        </div>
        <!-- 修改密码显示布局 -->
        <div class="right_content billing_info" v-if="choiceType == 3">
          <div>
            <div class="choice-type-layout">
              <el-form :model="formPSW" :rules="rulesFormPSWLeft" ref="formPSW" style="width:440px">
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text">用户名</span>
                  <el-form-item prop="Username">
                    <el-input
                        class="form_input"
                        v-model="formPSW.Username"
                        placeholder="请输入用户名"
                        :disabled="true"
                    ></el-input>
                  </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text">新密码</span>
                  <el-form-item prop="NewPassword">
                    <el-input
                        v-model="formPSW.NewPassword"
                        placeholder="请输入新密码"
                        class="form_input"
                        maxlength="18"
                        show-password
                    ></el-input>
                  </el-form-item>
                </div>
                
              </el-form>
            </div>
          </div>
          <div>
            <div class="choice-type-layout two">
              <el-form
                :model="formPSW2"
                :rules="rulesFormPSWRight"
                ref="formPSW2"
                style="width:440px; margin-left:20px"
              >
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text">原密码</span>
                  <el-form-item prop="OldPassword">
                    <el-input
                        v-model="formPSW2.OldPassword"
                        placeholder="请输入原密码"
                        class="form_input"
                        maxlength="18"
                        show-password
                    ></el-input>
                   </el-form-item>
                </div>
                
                <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text">确认密码</span>
                   <el-form-item prop="RePassword">
                    <el-input
                        v-model="formPSW2.RePassword"
                        placeholder="请输入新密码"
                        class="form_input"
                        maxlength="18"
                        show-password
                    ></el-input>
                   </el-form-item>
                </div>
               
              </el-form>
            </div>
          </div>
        </div>
        <div class="right_content billing_info" style="min-height: 300px" v-if="choiceType == 4">
          <email-config v-if="choiceType == 4"></email-config>
        </div>
      </el-row>
      <el-row class="but_list_layout" v-if="choiceType != 4" style="">
        <div class="submit-btn-layout but_list" v-if="choiceType == 0">
          <button
            class="w-btn btn-md-w btn-cancel"
            v-if="editCompanyInfo"
            @click="editCompanyInfo = false"
            >取消</button
          >
          <button style="margin-left: 20px" class="w-btn btn-md-w" type='button'  @click="submitCompanyInfo('formData')">{{
            editCompanyInfo ? "保存" : "编辑"
          }}</button>
        </div>

        <div class="submit-btn-layout-2" v-if="choiceType == 1">
          <button class="w-btn btn-md-w btn-cancel" type='button' v-if="isUpload"
            >取消</button
          >
          <button style="margin-left: 20px" class="w-btn btn-md-w" type='button' @click="submitUploadFile()" v-if="isUpload"
            >提交</button
          >
        </div>

        <div class="submit-btn-layout but_list" v-if="choiceType == 2">
          <button
           class="w-btn btn-md-w btn-cancel"
            v-if="editCompanyTaxInfo"
            @click="editCompanyTaxInfo = false"
            >取消</button
          >
          <button style="margin-left: 20px" type='button' class="w-btn btn-md-w" @click="submitCompanyTaxInfo()">{{
            editCompanyTaxInfo ? "保存" : "编辑"
          }}</button>
        </div>

        <div class="submit-btn-layout but_list" v-if="choiceType == 3">
          <button class="w-btn btn-md-w btn-cancel"
            >取消</button
          >
          <button style="margin-left: 20px" type='button' class="w-btn btn-md-w"@click="resetPsw()">保存</button>
        </div>
      </el-row>
    </div>

    <!-- 用户管理 -->
    <div class="user_manager" v-if="pagerType == 1">
      <!-- 初始密码和新增用户 -->
      <div class="user-manager-top" v-if="AduitState && IsPerfect">
        <span class="user-manager-top-font"
          >密码将以短信的方式发送到你手机</span
        >
        <el-button plain  @click="showaddUser()" v-if="user_info.UserType == 2"
          ><i class="iconfont icon-jia" style="color: #66b9ff; font-size: 14px; margin-right: 5px"></i>新增用户</el-button
        >
      </div>

      <!-- 信息未完善 -->
      <div class="user-manager-top-2" v-if="!IsPerfect">
        <span class="user-manager-top-font"
          >贵司未完成企业资质审核认证，还不能添加账号哦</span
        >
        <el-button
          plain
          @click="changePagerType(0)"
          style="margin-left: 20px; height: 40px"
          >立即去完善</el-button
        >
      </div>

      <!-- 审核中或者审核未通过 -->
      <div class="user-manager-top" v-if="!AduitState && IsPerfect">
        <span class="user-manager-top-font"
          >贵公司已提交企业资质审核认证信息资料，仍在审核中，暂时还不能添加用户哦！请耐心等待</span
        >
      </div>

      <div class="user-manager-top3">
        <el-table
          :data="tableData"
          border
          style=" border:0,margin-bottom: 20px;"
        >
          <el-table-column
            prop="Contract"
            label="姓名"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="Mobile"
            label="手机"
            width="110"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="Email"
            label="邮箱"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="Username"
            label="用户名"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="UserStateText"
            label="账号状态"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column label="添加日期" width="100" align="center">
            <template slot-scope="scope">{{
              scope.row.CreateTime | Format("yyyy-MM-dd")
            }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <button class="list-item-icon" v-if="scope.row.UserType == 3" type='button' @click="editUser(3, scope.row)">
                   <span class="iconfont icon-apply" ></span> 
              </button>
              <button class="list-item-icon"  v-if="scope.row.UserType == 3" type='button'  @click="showSetAdminDialog(scope.row)">
                  <span class="iconfont icon-admin" style=" margin-left: 10px" ></span> 
              </button>
               
               <button class="list-item-icon" v-if="scope.row.UserType == 3" type='button' @click="deleteCUser(scope.row)">
                  <span class="iconfont icon-del" style="margin-left: 10px" ></span> 
               </button>
               
               <button class="list-item-icon" v-if="scope.row.UserType == 2" type='button' @click="edit(scope.row)">
                  <span class="iconfont icon-apply" ></span> 
               </button>
               
               
              <!-- <el-popover
                placement="right"
                width="150"
                trigger="click"
                popper-class="arrow_container"
                v-if="scope.row.UserType == 3"
              >
                <el-row><div @click="editUser(3)">编辑</div> </el-row>
                <el-row><div @click="deleteCUser()">删除</div> </el-row>
                <el-row
                  ><div @click="showSetAdminDialog()">设置为新管理员</div>
                </el-row>
                <svg-icon
                  slot="reference"
                  icon-class="edit"
                  @click="edit(scope.row)"
                  style="width: 20px; height: 20px; color: #dddddd"
                />
              </el-popover>
              <svg-icon
                v-if="scope.row.UserType == 2"
                slot="reference"
                icon-class="edit"
                @click="edit(scope.row)"
                style="width: 20px; height: 20px; color: #dddddd"
              /> -->
              <!-- <el-button size="mini" @click="editUser()">编辑</el-button>
                            <el-button size="mini" @click="editUser()">删除</el-button>
                            <el-button size="mini" @click="showSetAdminDialog()">设置为新管理员</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          v-if="total > 10"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="PagerIndex"
          :page-size="PagerSize"
          layout="pager, jumper"
          :total="total"
          style="margin-top: 20px"
        >
        </el-pagination>
      </div>
      <!-- 编辑管理员信息的弹框 -->
      <el-dialog
        title="管理员信息"
        custom-class="user_info"
        :visible.sync="dialogFormForAdministrator"
        :before-close="handleClose"
      >
        <el-form
          :model="formDataForAdmin"
          :rules="rulesFormUser"
          ref="formDataForAdmin"
        >
          <div class="choice-tag-div">
              <span class="choice-type-layout-tag-text">姓名*</span>
              <el-form-item prop="Contract">
                <el-input
                v-model="formDataForAdmin.Contract"
                placeholder="请输入姓名"
                autocomplete="off"
                style="width: 400px"
                maxlength="30"
                ></el-input>
            </el-form-item>
          </div>
          
          <div class="choice-tag-div">
              <span class="choice-type-layout-tag-text">邮箱*</span>
              <el-form-item prop="Email">
                <el-input
                v-model="formDataForAdmin.Email"
                placeholder="请输入邮箱"
                autocomplete="off"
                style="width: 400px"
                maxlength="30"
                ></el-input>
            </el-form-item>
          </div>
          
          <div class="choice-tag-div">
              <span class="choice-type-layout-tag-text">用户名*</span>
              <el-form-item prop="Username">
                <el-input
                v-model="formDataForAdmin.Username"
                placeholder="请输入用户名"
                autocomplete="off"
                style="width: 400px"
                :disabled="true"
                maxlength="30"
                ></el-input>
            </el-form-item>  
          </div>
          
          <div class="choice-tag-div">
              <span class="choice-type-layout-tag-text">手机号*</span>
               <el-form-item prop="Mobile">
                    <el-input
                    v-model="formDataForAdmin.Mobile"
                    placeholder="请输入手机号"
                    autocomplete="off"
                    style="width: 400px"
                    :disabled="true"
                    maxlength="11"
                    ></el-input>
                </el-form-item>
          </div>
         
        </el-form>

        <div slot="footer" class="dialog-footer">
          <div class="dialog-btn-center">
            <el-row>
                <el-button
                type="info"
                class="cancle_but"
                @click="dialogFormForAdministrator = false"
                >取消</el-button
              >
              <el-button
                style="background-color: #428dde"
                type="primary"
                class="primary_but"
                @click="editAdminUserInfo()"
                >保存</el-button
              >
            </el-row>
          </div>
        </div>
      </el-dialog>

      <!-- 新增用户弹框 -->
      <el-dialog
        title="新增用户"
        custom-class="user_info"
        :visible.sync="dialogFormForAdduser"
        :before-close="handleClose"
      >
        <el-form
          ref="formDataForAddUser"
          :model="formDataForAddUser"
          :rules="rulesFormUser"
        >
          <div class="choice-tag-div">
              <span class="choice-type-layout-tag-text" style="width: 100px">姓名*</span>
              <el-form-item prop="Contract">
                <el-input
                v-model="formDataForAddUser.Contract"
                placeholder="请输入姓名"
                autocomplete="off"
                style="width: 400px"
                maxlength="30"
                ></el-input>
              </el-form-item>
          </div>
          
          <div class="choice-tag-div">
              <span class="choice-type-layout-tag-text" style="width: 100px">邮箱*</span>
              <el-form-item prop="Email">
                <el-input
                v-model="formDataForAddUser.Email"
                placeholder="请输入邮箱"
                autocomplete="off"
                style="width: 400px"
                maxlength="30"
                ></el-input>
            </el-form-item>
          </div>
          
          <div class="choice-tag-div">
              <span class="choice-type-layout-tag-text" style="width: 100px">用户名*</span>
              <el-form-item prop="Username">
                <el-input
                v-model="formDataForAddUser.Username"
                placeholder="请输入用户名"
                style="width: 400px"
                autocomplete="off"
                maxlength="30"
                ></el-input>
            </el-form-item>
          </div>
          
          <div class="choice-tag-div">
              <span class="choice-type-layout-tag-text" style="width: 100px">手机号*</span>
              <el-form-item prop="Mobile">
                <el-input
                v-model="formDataForAddUser.Mobile"
                placeholder="请输入手机号"
                autocomplete="off"
                style="width: 400px"
                maxlength="11"
                ></el-input>
            </el-form-item>
          </div>
          
          <div class="choice-tag-div">
              <span class="choice-type-layout-tag-text" style="width: 100px">账号状态* </span>
              <el-form-item>
                <div :class="{
                    active: formDataForAddUser.UserState == 1
                    }" class="form-switch" style=" margin-top:-5px" data-switch="启用|禁用" @click="changeAddUserAccountState(!formDataForAddUser.UserState)"><em>{{formDataForAddUser.UserState == 1 ? '启用':'禁用'}}</em><i></i></div>
                <!-- <el-switch
                    v-model="formDataForAddUser.UserState"
                    active-color="#CCCCCC"
                    inactive-color="#66b9ff"
                    active-text="禁用"
                    inactive-text="启用"
                    active-value="2"
                    inactive-value="1"
                >
                </el-switch>  -->
                  
                <!-- <el-row class="account-state-layout">
                <div
                    class="account_status_but"
                    :class="{
                    active: formDataForAddUser.UserState == 1
                    }"
                    @click="changeAddUserAccountState(1)"
                >
                    启用
                </div>
                <div
                    class="account_status_but"
                    :class="{
                    active: formDataForAddUser.UserState == 2
                    }"
                    style="margin-left: 20px"
                    @click="changeAddUserAccountState(2)"
                >
                    禁用
                </div>
                </el-row> -->
              </el-form-item>
          </div>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="dialog-btn-center">
            <el-row>
             <button
                class="w-btn btn-md-w btn-cancel"
                @click="dialogFormForAdduser = false" type='button'
                >取消</button>
              <button  style="margin-left: 20px" type='button' class="w-btn btn-md-w" @click="addUser()"
                >保存</button
              >


              
            </el-row>
          </div>
        </div>
      </el-dialog>

      <!-- 普通用户选择操作行为 -->
      <!-- <el-dialog title="请选择要进行的操作" :visible.sync="dialogOpera" width="250px" height="300px">
                <div class="dialogOpera-layout">
                  <div @click="editUser(3)">编辑</div>
                  <div @click="deleteCUser()" style="margin-top: 20px">删除</div>
                  <div @click="showSetAdminDialog()" style="margin-top: 20px">设置为新管理员</div>   
                </div>
                 
            </el-dialog> -->

      <!-- 普通用户的编辑弹框-->
      <el-dialog
        title="编辑用户"
        custom-class="user_info"
        :visible.sync="dialogFormForEdituser"
        :before-close="handleClose"
      >
        <el-form
          :model="formDataForCUser"
          ref="formDataForCUser"
          :rules="rulesFormUser"
        >
          <div class="choice-tag-div">
              <span class="choice-type-layout-tag-text">姓名*</span>
              <el-form-item prop="Contract">
                <el-input
                v-model="formDataForCUser.Contract"
                placeholder="请输入姓名"
                autocomplete="off"
                style="width: 400px;"
                maxlength="30"
                ></el-input>
            </el-form-item>
          </div>
          
          <div class="choice-tag-div">
              <span class="choice-type-layout-tag-text" >邮箱*</span>
              <el-form-item prop="Email">
                <el-input
                v-model="formDataForCUser.Email"
                placeholder="请输入邮箱"
                autocomplete="off"
                style="width: 400px"
                maxlength="30"
                ></el-input>
              </el-form-item>
          </div>
          
          <div class="choice-tag-div">
              <span class="choice-type-layout-tag-text" >用户名*</span>
              <el-form-item prop="Username">
                <el-input
                v-model="formDataForCUser.Username"
                placeholder="请输入用户名"
                autocomplete="off"
                style="width: 400px"
                maxlength="30"
                ></el-input>
              </el-form-item>
          </div>
         
          <div class="choice-tag-div">
              <span class="choice-type-layout-tag-text" >手机号*</span>
              <el-form-item prop="Mobile">
                <el-input
                v-model="formDataForCUser.Mobile"
                placeholder="请输入手机号"
                autocomplete="off"
                style="width: 400px"
                maxlength="11"
                ></el-input>
              </el-form-item>
          </div>
          <!-- <el-row type="flex" justify="start">
              <div class="choice-tag-div">
                  <span class="choice-type-layout-tag-text" style="width:70px;">账号状态*</span>
                  <el-form-item>
                      <el-switch
                        style="display: block; width: 130px; text-align:left"
                        v-model="formDataForCUser.UserState"
                        active-color="#CCCCCC"
                        inactive-color="#66b9ff"
                        active-text="禁用"
                        inactive-text="启用"
                        active-value="2"
                        inactive-value="1"
                    ></el-switch>
                  </el-form-item>
                  <span class="choice-type-layout-tag-text" style="width:70px;  margin-right: 0px">密码重置*</span>
                  <el-form-item>
                      <el-switch
                        style="display: block; width: 130px"
                        v-model="formDataForAddUser.UserState"
                        active-color="#CCCCCC"
                        inactive-color="#66b9ff"
                        active-text="否"
                        inactive-text="是"
                        active-value="2"
                        inactive-value="1"
                    ></el-switch>
                  </el-form-item>
              </div> 
          </el-row> -->
           
          <!-- <div><span class="choice-type-layout-tag-text">账号状态*</span></div>
          <el-form-item>
            <el-row class="account-state-layout">
              <div
                class="account_status_but"
                :class="{
                  active: formDataForCUser.isStatus
                }"
                @click="formDataForCUser.isStatus = true"
              >
                启用
              </div>
              <div
                class="account_status_but"
                :class="{
                  active: !formDataForCUser.isStatus
                }"
                style="margin-left: 20px"
                @click="formDataForCUser.isStatus = false"
              >
                禁用
              </div>
            </el-row>
          </el-form-item>

          <div>
            <span class="choice-type-layout-tag-text">重置密码？*</span>
          </div>
          <el-form-item>
            <el-row class="account-state-layout">
              <div
                class="account_status_but"
                :class="{
                  active: !formDataForCUser.isPwd
                }"
                @click="formDataForCUser.isPwd = false"
              >
                否
              </div>
              <div
                class="account_status_but"
                :class="{
                  active: formDataForCUser.isPwd
                }"
                style="margin-left: 20px"
                @click="formDataForCUser.isPwd = true"
              >
                是
              </div>
            </el-row>
          </el-form-item> -->


           <div class="choice-tag-div">
              <span class="choice-type-layout-tag-text" style="width: 100px;">账号状态* </span>
              <el-form-item>
                <div :class="{
                    active: formDataForCUser.UserState == 1
                    }" class="form-switch" style=" margin-top:-5px" data-switch="启用|禁用" @click="forbiddenAccount()"><em>{{formDataForCUser.UserState  == 1 ? '启用':'禁用'}}</em><i></i></div>
              </el-form-item>

              <span class="choice-type-layout-tag-text" style="width: 100px; margin-left: 50px">密码重置* </span>
              <el-form-item>
                <div  class="form-switch active" style="margin-left: -25px; margin-top:-5px" data-switch="启用|禁用" @click="cuserResetPsw()"><em>是</em><i></i></div>
              </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!-- <div class="dialog-btn-center">
            <el-button
              type="primary"
              @click="forbiddenAccount()"
              style="width: 160px"
              >{{
                formDataForCUser.UserState == 1 ? "禁用" : "启用"
              }}</el-button
            >
            <el-button
              type="primary"
              @click="cuserResetPsw()"
              style="width: 160px"
              >重置密码</el-button
            >
            <el-button
              type="primary"
              @click="editUserInfo()"
              style="width: 160px"
              >保存</el-button
            >
          </div> -->

          <div slot="footer" class="dialog-footer">
            <!-- <div class="dialog-btn-center">
              <el-row>
                <el-button
                  type="primary"
                  @click="forbiddenAccount()"
                  class="primary_but"
                  >{{
                    formDataForCUser.UserState == 1 ? "禁用" : "启用"
                  }}</el-button
                >
                <el-button
                  type="primary"
                  @click="cuserResetPsw()"
                  class="primary_but"
                  >重置密码</el-button
                >
                <el-button
                  type="primary"
                  class="primary_but"
                  @click="editUserInfo()"
                  >保存</el-button
                >
              </el-row>
              <el-row>
                <el-button
                  type=""
                  class="cancel_but"
                  @click="dialogFormForEdituser = false"
                  >取消</el-button
                >
              </el-row>
            </div> -->


            <div class="dialog-btn-center">
            <el-row>
             <el-button
                type="info"
                class="cancle_but"
                @click="dialogFormForEdituser = false"
                >取消</el-button>
              <el-button  style="background-color: #428dde" type="primary" class="primary_but" @click="editUserInfo()"
                >保存</el-button
              >
            </el-row>
          </div>
          </div>
        </div>
      </el-dialog>

      <!-- 设置为管理员的弹框 -->
      <el-dialog
        :title="setUserForAdmin"
        custom-class="edit_admin"
        :visible.sync="dialogFormForSetAdmin"
        center
      >
        <div>
          <span class="dialog-set-admin-info-txt"
            >请输入管理员账号密码并确认</span
          >
          <el-input
            v-model="adminpassword"
            placeholder="请输入管理员账号密码"
            style="margin-top: 16px;"
            show-password
            maxlength="18"
          ></el-input>
        </div>

        <div slot="footer" class="dialog-footer">
          <div class="dialog-btn-center">
            <el-row>
              <el-button
                type="info"
                class="cancle_but"
                @click="dialogFormForSetAdmin = false"
                >取消</el-button
              >  
              <el-button
               style="background-color: #428dde"
                type="primary"
                class="primary_but"
                @click="giveAdminTo()"
                >确定</el-button
              >
            </el-row>
          </div>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormForSetAdmin = false">取 消</el-button>
          <el-button type="primary" @click="giveAdminTo()">确 认</el-button>
        </span> -->
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  GetCompanyState,
  GetCompanyBasic,
  UpdateCompanyBasic,
  CompanyAttachmentUpload,
  GetCompanyAttachment,
  DelCompanyAttr,
  GetCompanyTaxInfo,
  UpdateCompanyTaxInfo,
  EdtPassword,
  GetUserInfoList,
  AddChildUser,
  UpdateChildUser,
  RestUserPassWord,
  DelUser,
  ForbidUser,
  TransferAdmin
} from "api/companyApi";
import EmailConfig from "views/company/EmailConfig";
export default {
  name: "CompanyInformationsUserMan", //企业信息维护和用户管理页面
  components: {
    EmailConfig
  },
  data() {
    return {
      isStatus: false,
      AduitState: false, // 信息未通过审核，或者审核中
      IsPerfect: false, // 信息未完善
      isUpload: false, // 是否已经上传文件
      editCompanyInfo: false, // 是否可以编辑公司信息页面
      editCompanyTaxInfo: false, // 是否可以编辑发票信息页面
      pagerType: 0, //0: 企业信息维护  1: 用户管理
      choiceType: 0, //0: 公司信息  1： 证明材料  2：开票信息  3：修改密码
      companyName: "", // 公司名称
      area: "", //所属区域
      dialogOpera: false, // 是否显示操作行为
      dialogFormForAdministrator: false, // 是否显示编辑管理员的弹框
      dialogFormForAdduser: false, // 是否显示新增用户的弹框
      dialogFormForEdituser: false, // 用户信息弹框
      dialogFormForSetAdmin: false, // 用户信息弹框
      setUserForAdmin: "", // 设置管理员名称
      uploadLoadingDialog: false,
      uploadOkDialog: false,
      fileUploadUrl: "",
      PagerIndex: 1,
      PagerSize: 10,
      Offset: 0, // 当前第几页
      Limit: 10, // 每页返回数量
      total: 0, //一共多少条数据
      adminpassword: "", // 管理员密码
      formData: {
        Id: "",
        CompanyName: "",
        Industry: "",
        City: "",
        CompanyStockType: 0,
        ContactPerson: "",
        TelUserName: "",
        Email: "",
        Phone: "",
        RecruitPerson: "",
        RecruitPersonTel: "",
        CompanyScale: "",
        SalesScale: "",
        FoundedTime: "",
        MainProducts: "",
        MajorClient: "",
        Competitor: "",
        WebUrl: "",
        Description: "",
        Remark: ""
      },
      formData2: {
        Id: "",
        City: "",
        CompanyStockType: 0,
        Phone: "",
        RecruitPersonTel: "",
        FoundedTime: ""
      },
      formDataTaxInfo: {
        AccountNumber: "", // 纳税人识别号
        BankName: "", // 开户行
        Id: "", // ID
        PostAddress: "", // 地址
        PostPhone: "", // 电话
        PostRecipient: "", //
        TaxAddress: "", // 发票地址
        TaxName: "", //
        TaxNumber: "", // 发票账号
        TaxPhone: "",
        ZipCode: ""
      },
      formDataTaxInfo2: {
        AccountNumber: "", // 纳税人识别号
        Id: "", // ID
        PostRecipient: "", //
        TaxNumber: "", // 发票账号
        TaxPhone: "",
        ZipCode: ""
      },
      formPSW: {
        Username: "",
        OldPassword: "",
        NewPassword: "",
        RePassword: ""
      },
      formPSW2: {
        OldPassword: "",
        RePassword: ""
      },
      file: "", // 上传的文件
      fileId: "", // 已上传文件的id
      fileName: "", // 已上传文件名
      tableData: [
        {
          CompanyId: "",
          Contract: "",
          CreateTime: null,
          CreateUserId: null,
          Email: "",
          Enable: false,
          GroupId: "",
          Id: "",
          IsDelete: false,
          Mobile: "",
          UpdateTime: "",
          UpdateUserId: "",
          UserState: 1,
          UserStateText: "",
          UserType: 2,
          UserTypeText: "",
          Username: ""
        }
      ],
      formDataForAddUser: {
        Contract: "",
        Email: "",
        Username: "",
        Mobile: "",
        UserState: 1,
        GroupId: ""
      },
      formDataForAdmin: {
        Id: "",
        Username: "",
        Contract: "",
        Mobile: "",
        Email: ""
      },
      formDataForCUser: {
        Id: "",
        Username: "",
        Contract: "",
        Mobile: "",
        Email: "",
        UserState: 1,
        isPwd: false,
        isStatus: true
      },
      rulesFormUser: {
        Contract: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        Email: [
          {
            trigger: "blur",
            required: true,
            validator: this.$formValidate(this).Email
          }
        ],
        Username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        Mobile: [
          {
            required: true,
            trigger: "blur",
            validator: this.$formValidate(this).Mobile
          }
        ]
      },
      optionProps: {
        value: "ItemCode",
        label: "ItemName",
        children: "Childs"
      },
      rulesFormPSWLeft: {
        Username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        NewPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ]
      },
      rulesFormPSWRight: {
        OldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        RePassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" }
        ]
      },
      rulesFormLeft: {
        CompanyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        Industry: [
          {
            required: true,
            message: "请选择所属行业",
            trigger: "blur"
          }
        ],
        CompanyScale: [
          { required: true, message: "请选择公司规模", trigger: "blur" }
        ],
        ContactPerson: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        Description: [
          { required: true, message: "请输入公司简介", trigger: "blur" }
        ]
      },
      rulesFormRight: {
        City: [{ required: true, message: "请选择所在城市", trigger: "blur" }],
        CompanyStockType: [
          { required: true, message: "请选择公司性质", trigger: "blur" }
        ],
        Phone: [
          { required: true, message: "请输入联系人电话", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["user_info"])
  },
  methods: {
    onUploadResume() {
      this.uploadLoadingDialog = true;
      setTimeout(() => {
        this.uploadLoadingDialog = false;
        this.uploadOkDialog = true;
      }, 1000);
    },

    // 获取公司的状态
    getCompanyState() {
      var that = this;
      GetCompanyState({ CompangyId: this.user_info.CompanyId }).then(res => {
        if (res.data.Success) {
          that.AduitState = res.data.Data.AduitState;
          that.IsPerfect = res.data.Data.IsPerfect;
        }
      });
    },

    getCompanyInfo() {
      //console.log(this.user_info)
      GetCompanyBasic({ CompangyId: this.user_info.CompanyId }).then(res => {
        if (res.data.Success) {
          let data = res.data.Data;
          //console.log(data);
          this.formData = data;
          if(data.City.length != 1)
          {
              this.formData2.City = data.City;
          }
          this.formData2.CompanyStockType = data.CompanyStockType + "";
          this.formData2.FoundedTime = data.FoundedTime;
          this.formData2.Phone = data.Phone;
          this.formData2.RecruitPersonTel = data.RecruitPersonTel;

          //console.log(this.getIndustryName(this.formData.Industry))
          // 相关转化操作
          //this.getIndustryName(this.formData.Industry);
          //this.getStaffSize(this.formData.CompanyScale);
          //this.getCityName(this.formData.City);
          // this.formData.CompanyName = data.CompanyName;
          // this.formData.Industry = data.Email;
          // this.formData.Phone = data.Phone;
          // this.formData.ContactPerson = data.ContactPerson;
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },
    choiceTabType(choicetype) {
      var that = this;
      that.choiceType = choicetype;
    },
    changePagerType(pagertype) {
      this.pagerType = pagertype;
      if (pagertype == 1) {
        // 获取公司状态
        this.getCompanyState();
      }
    },
    submitCompanyInfo(ruleForm) {
      var that = this;
      if (!this.editCompanyInfo) {
        this.editCompanyInfo = !this.editCompanyInfo;
        return;
      }
      //console.log(this.$store.getters.city_item);
      let list = [];
      list.push(
        this.checkCompanyInfoForm("formData"),
        this.checkCompanyInfoForm("formData2")
      );

      Promise.all(list)
        .then(() => {
          // 校验成功
          that.formData.City = "";
          if(this.formData2.City.length == 2)
          {
            that.formData.City = this.formData2.City[1];
          }else
          {
            that.formData.City = this.formData2.City;
          }
          
          that.formData.CompanyStockType = this.formData2.CompanyStockType;
          that.formData.FoundedTime = this.formData2.FoundedTime;
          that.formData.Phone = this.formData2.Phone;
          that.formData.RecruitPersonTel = this.formData2.RecruitPersonTel;

          console.log(this.formData2.City);
          UpdateCompanyBasic(that.formData).then(res => {
            if (res.data.Success) {
              that.editCompanyInfo = false;
            } else {
              this.$message.error(res.data.Message);
            }
          });
        })
        .catch(() => {
          // 校验失败
        });
    },
    checkCompanyInfoForm(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject();
          }
        });
      });
    },

    // 提交公司发票信息
    submitCompanyTaxInfo() {
      var that = this;
      if (!this.editCompanyTaxInfo) {
        this.editCompanyTaxInfo = !this.editCompanyTaxInfo;
        return;
      }

      that.formDataTaxInfo.TaxNumber = that.formDataTaxInfo2.TaxNumber;
      that.formDataTaxInfo.TaxPhone = that.formDataTaxInfo2.TaxPhone;
      that.formDataTaxInfo.AccountNumber = that.formDataTaxInfo2.AccountNumber;
      that.formDataTaxInfo.PostRecipient = that.formDataTaxInfo2.PostRecipient;
      that.formDataTaxInfo.ZipCode = that.formDataTaxInfo2.ZipCode;
      UpdateCompanyTaxInfo(that.formDataTaxInfo).then(res => {
        //consoleconsole.log(res.data)
        if (res.data.Success) {
          that.editCompanyTaxInfo = false;
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },

    // 重置密码
    resetPsw() {
      var that = this;

      let list = [];
      list.push(
        this.checkCompanyInfoForm("formPSW"),
        this.checkCompanyInfoForm("formPSW2")
      );

      Promise.all(list)
        .then(() => {
          // 校验成功
          if (that.formPSW.NewPassword != that.formPSW2.RePassword) {
            this.$message.error("两次密码输入不一致，请重新输入!");
            return;
          }
          that.formPSW.OldPassword = this.formPSW2.OldPassword;
          that.formPSW.RePassword = this.formPSW2.RePassword;

          EdtPassword(that.formPSW).then(res => {
            if (res.data.Success) {
              this.$message.success("修改成功");
            } else {
              this.$message.error(res.data.Message);
            }
          });
        })
        .catch(() => {
          // 校验失败
        });
    },

    // 证明材料的相关方法
    // 获取已上传文件列表
    getUpLoadFile() {
      var that = this;
      GetCompanyAttachment().then(res => {
        if (res.data.Success && res.data.Data) {
          that.isUpload = true;
          that.fileId = res.data.Data.Id;
          that.fileName = res.data.Data.FileName;
        }
      });
    },

    submitUploadFile() {
      if (this.file == "") {
        this.$message.error("请添加文件");
        return;
      }
      // 这个地方是真正提交
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("companyId", this.user_info.CompanyId);
      formData.append("name", this.file.name);
      this.uploadLoadingDialog = true;
      CompanyAttachmentUpload(formData).then(res => {
        if (res.data.Code == 0) {
          this.$message({
            showClose: true,
            message: "上传成功",
            type: "success"
          });
          // this.resumeData = res.data;
          this.isUpload = true;
          this.uploadLoadingDialog = false;
          this.getUpLoadFile();
          // this.uploadOkDialog = true;
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },

    uploadFileMethod(param) {
      let fileObject = param.file;
      var FileExt = param.file.name.replace(/.+\./, "");
      // console.log(FileExt);
      if (
        ["doc", "docx", "png", "jpeg", "jpg", "pdf"].indexOf(
          FileExt.toLowerCase()
        ) === -1
      ) {
        this.$message({
          type: "warning",
          message: "请上传后缀名为doc,docx,png,jpg,pdf的附件！"
        });
        return false;
      }
      this.isUpload = true;
      // <<<<<<< HEAD
      let size = fileObject.size;
      if (size / (1024 * 1024) > 5) {
        this.$message.error("文件大小不能超过5M");
      }

      this.file = fileObject;
      this.$message({
        showClose: true,
        message: "已添加文件，点击提交按钮进行提交",
        type: "success"
      });
      //this.submitUploadFile();
    },
    // 删除已上传文件
    deleteUploadFile() {
      event.stopPropagation();
      var that = this;
      that
        .$confirm("确认删除上传的文件？")
        .then(_ => {
          //done();
          that.isUpload = false;
          if (that.fileId && that.fileId != "") {
            DelCompanyAttr({ Id: that.fileId }).then(res => {
              that.isUpload = false;
            });
          }
        })
        .catch(error => {
          //   console.log(error);
        });
    },

    // 下载文件
    downloadFile() {
      var that = this;
      if (that.fileId == "") {
        return;
      }
      // http://localhost:62117/api/Common/GetFile?file=4ca93de6-566b-46cb-9650-6e1bab6b8113&GroupId=FB9FD860-859E-47C2-9968-BC02BA3D237B
      var url =
        process.env.BASE_COMPANY_API +
        "/api/Common/GetFile?file=" +
        that.fileId +
        "&GroupId=" +
        process.env.GroupId;
      window.open(url);
      //     GetFile({file: that.fileId}).then(res =>{
      // //          let url = window.URL.createObjectURL(new Blob([res.data])) //创建下载链接
      // // 　　　　　let link = document.createElement('a') //创建a标签
      // // 　　　　　link.style.display = 'none'  //将a标签隐藏
      // // 　　　　　link.href = url  //给a标签添加下载链接
      // // 　　　　　link.setAttribute('download', that.fileName) // 此处注意，要给a标签添加一个download属性，属性值就是文件名称 否则下载出来的文件是没有属性的，空白白
      // // 　　　　　document.body.appendChild(link)
      // // 　　　　　link.click()  //执行a标签
      //             console.log(res)
      //             let blob = new Blob([res.data]);

      //             let elink = document.createElement('a');
      //             elink.download = that.fileName;
      //             elink.style.display = 'none';
      //             elink.target = "_blank";
      //             elink.href = URL.createObjectURL(blob);

      //             document.body.appendChild(elink);
      //             elink.click();
      //             URL.revokeObjectURL(elink.href); // 释放URL对象
      //             document.body.removeChild(elink);
      //     });
    },

    // 开票信息
    getCompanyTaxInfo() {
      GetCompanyTaxInfo().then(res => {
        //console.log(res);
        if (res.data.Success) {
          let data = res.data.Data;
          this.formDataTaxInfo = data;
          this.formDataTaxInfo2.TaxNumber = this.formDataTaxInfo.TaxNumber;
          this.formDataTaxInfo2.TaxPhone = this.formDataTaxInfo.TaxPhone;
          this.formDataTaxInfo2.AccountNumber = this.formDataTaxInfo.AccountNumber;
          this.formDataTaxInfo2.PostRecipient = this.formDataTaxInfo.PostRecipient;
          this.formDataTaxInfo2.ZipCode = this.formDataTaxInfo.ZipCode;
        }
      });
    },

    // 用户管理的相关方法
    // 编辑管理员
    editUser(type,row) {
      var that = this;
      // 如果是管理员
      if (type == 2) {
        that.dialogFormForAdministrator = true;
      } else if (type == 3) {
        // 如果是普通用户
        that.dialogFormForEdituser = true;
      }
      //
      that.dialogOpera = false;
      that.edit(row); 
    },
    // 新增用户弹框显示
    showaddUser() {
      var that = this;
      that.dialogFormForAdduser = true;
    },
    // 点击保存新增用户
    addUser() {
      // AddChildUser
      var that = this;
      this.$refs["formDataForAddUser"].validate(valid => {
        if (valid) {
          AddChildUser(that.formDataForAddUser).then(res => {
            //console.log(res);
            if (res.data.Success) {
              that.dialogFormForAdduser = false;
              // 重新获取用户列表
              that.getUserInfoList();
            } else {
              that.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 改变新增用户的账号状态
    changeAddUserAccountState(state) {
      this.formDataForAddUser.UserState = state;
    },

    // 点击列表上的编辑icon
    edit(row) {
      // 如果是管理员 直接弹出管理员信息弹框
      if (row.UserType == 2) {
        Object.assign(this.formDataForAdmin, row);
        this.editUser(2);
      } else if (row.UserType == 3) {
        // 普通用户弹出选择框
        Object.assign(this.formDataForCUser, row);
        this.formDataForCUser.isStatus =
          this.formDataForCUser.UserState == 2 ? false : true;
        this.setUserForAdmin = "确定设置“" + row.Contract + "”为新的管理员？";
      }
    },

    // 保存修改管理员用户信息
    editAdminUserInfo() {
      var that = this;
      this.$refs["formDataForAdmin"].validate(valid => {
        if (valid) {
          UpdateChildUser(that.formDataForAdmin).then(res => {
            if (res.data.Success) {
              that.dialogFormForAdministrator = false;
              this.$store.dispatch("updateUserInfo", that.formDataForAdmin);
              that.getUserInfoList();
            } else {
              that.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 保存修改普通用户信息
    editUserInfo() {
      var that = this;
      this.$refs["formDataForCUser"].validate(valid => {
        if (valid) {
          //   if (this.formDataForCUser.isPwd) {
          //     this.cuserResetPsw();
          //   }
          //   if (
          //     this.formDataForCUser.isStatus !=
          //     (this.formDataForCUser.UserState == 2 ? false : true)
          //   ) {
          //     this.forbiddenAccount();
          //   }
          UpdateChildUser(that.formDataForCUser).then(res => {
            if (res.data.Success) {
              that.dialogFormForEdituser = false;
              // 重新获取用户列表
              that.getUserInfoList();
            } else {
              that.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 禁用或者启用账号
    forbiddenAccount() {
      var that = this;
      ForbidUser({
        Id: that.formDataForCUser.Id,
        UserState: that.formDataForCUser.UserState == 1 ? 2 : 1
      }).then(res => {
        if (res.data.Success) {
          that.dialogFormForEdituser = false;
          that.$message.success(res.data.Message);
          // 重新获取用户列表
          that.getUserInfoList();
        } else {
          that.$message.error(res.data.Message);
        }
      });
    },

    //普通用户 重置密码
    cuserResetPsw() {
      var that = this;
      RestUserPassWord({ Id: that.formDataForCUser.Id }).then(res => {
        // console.log(res);
        if (res.data.Success) {
          that.dialogFormForEdituser = false;
          that.$message.success(res.data.Message);
          // // 重新获取用户列表
          // that.getUserInfoList();
        } else {
          that.$message.error(res.data.Message);
        }
      });
    },

    // 删除普通用户
    deleteCUser(row) {
      var that = this;
      that.edit(row);
      that
        .$confirm("确认删除？")
        .then(_ => {
          DelUser({ Id: that.formDataForCUser.Id }).then(res => {
            if (res.data.Success) {
              that.dialogOpera = false;
              that.$message.success(res.data.Message);
              // 重新获取用户列表
              that.getUserInfoList();
            } else {
              that.$message.error(res.data.Message);
            }
          });
        })
        .catch(error => {
          //   console.log(error);
        });
    },

    // 转让管理员
    giveAdminTo() {
      var that = this;
      if (that.adminpassword == "") {
        that.$message.error("请输入管理员密码");
      } else {
        TransferAdmin({
          Id: that.formDataForCUser.Id,
          Password: that.adminpassword
        }).then(res => {
          if (res.data.Success) {
            that.dialogFormForSetAdmin = false;
            that.$message.success(res.data.Message);
            // 重新获取用户列表
            that.getUserInfoList();
          } else {
            that.$message.error(res.data.Message);
          }
        });
      }
    },

    // 设置管理员
    showSetAdminDialog(row) {
      var that = this;
      that.edit(row);
      that.dialogFormForSetAdmin = true;
      that.dialogOpera = false;
    },
    handleClose(done) {
      var that = this;
      that
        .$confirm("确认关闭？")
        .then(_ => {
          done();
          that.dialogFormForAdduser = false;
          that.dialogFormForAdministrator = false;
          that.dialogFormForEdituser = false;
          that.dialogFormForSetAdmin = false;
          that.dialogOpera = false;
        })
        .catch(_ => {});
    },
    // 获取用户信息列表
    getUserInfoList() {
      var that = this;
      GetUserInfoList({
        Username: "",
        CompanyId: this.user_info.CompanyId,
        Offset: that.Offset,
        Limit: that.Limit
      }).then(res => {
        // console.log(res);
        if (res.data.Success) {
          that.total = Number.parseInt(res.data.Data.Total);
          that.tableData = res.data.Data.Items;
          that.formDataForAddUser.GroupId = process.env.GroupId;
        } else {
          that.$message.error(res.data.Message);
        }
      });
    },

    handleCurrentChange() {
      // 获取用户列表
      this.Offset = (this.PagerIndex - 1) * this.PagerSize;
      this.getUserInfoList();
    },
    handleSizeChange() {}
  },

  created() {
    this.pagerType = this.$route.query.pType; // 获取点击进入的类型
    this.$store.dispatch("getCityItem"); //地图
    this.$store.dispatch("getIndustryItemList"); // 行业
    this.$store.dispatch("GetCompanyStockList"); //"企业性质
    this.$store.dispatch("getAllDD"); // 获取所有信息
    this.getCompanyInfo(); // 获取公司基本信息
    this.getUpLoadFile(); // 获取上传文件的信息
    this.getCompanyTaxInfo(); // 获取开票信息
    this.getUserInfoList(); // 获取用户信息列表
    this.getCompanyState(); // 获取公司状态
    this.formPSW.Username = this.user_info.Username; // 设置修改密码时用户名的值
    //console.log(this.user_info)
  }
};
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";
.layout_content {
  .choice-type-layout {
    .el-form-item {
      // width: 340px;
      margin-bottom: 23px;
    }
    .el-form-item__content {
      line-height: 36px;
      // width: 340px;
    }
    .el-cascader,
    .el-input,
    .el-select {
      &.form_input {
        // width: 343px;
        height: 38px;
      }
    }
    .form_input {
      .el-input__inner {
        height: 36px;
      }
    }
    .el-textarea {
      &.form_input {
            width: 792px;
    height: 224px;
        textarea {
          width: 821px;
          height: 200px;
        }
      }
    }
    .el-input.is-disabled .el-input__inner {
      background-color: #fdfdfd;
    }
  }
  .choice-type-layout-tag-text {
    font-family: "ArialMT", "Arial";
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #999999;
    display: block;
    // margin-right: 10px;
    // margin-bottom: 15px;
    line-height: 36px;
    width: 110px;
  }
  .content {
    .billing_info {
      .choice-type-layout {
        .el-form-item {
          // width: 340px;
          margin-bottom: 23px;
        }
        .el-form-item__content {
          line-height: 36px;
          // width: 340px;
        }
        .el-cascader,
        .el-input,
        .el-select {
          &.form_input {
            // width: 340px;
            height: 36px;
          }
        }
      }
    }
    > .el-row {
      display: flex;
    }
    .left_menu {
      display: block;
      width: 140px;
    }
    .right_content {
      // width: 800px;
      background: #fff;
      display: block;
      padding: 0px 30px 12px 50px;
      position: relative;
      display: flex;
      > .el-row {
        color: #aaaaaa;
        font-size: 12px;
        position: absolute;
      }
    }
    .but_list_layout {
      margin-left: 132px;
      display: flex;
      justify-content: center;
      background: #fff;
      padding-bottom: 30px;
      margin-bottom: 10px;

      .but_list {
        text-align: center;
        .el-button {
          @include wh(100px, 32px);
          padding: 0;
          font-size: 12px;
          border-radius: 3px;
        }
        .el-button + .el-button {
          margin-left: 20px;
        }
      }
    }
    .file-review-layout {
      width: 80px;
      height: 80px;
      position: relative;
      background-color: #f5f5f5;
      float: left;
      margin-right: 20px;  
    }
    .el-upload {
      // position: absolute;
      // width: 257px;
      // height: 100px;

      .el-button {
        @include wh(100px, 32px);
        padding: 0;
        font-size: 12px;
        border-radius: 3px;
        margin-bottom: 12px;
      }
      .upload_but {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }
      .choice-type-layout-tag-text {
        margin-bottom: 0px;
      }
    }
  }
  .user_manager {
    background: #fff;
    padding: 24px 40px;
    background: #fff;
    margin-bottom: 30px;
    box-shadow: 0 -5px 15px rgba(6, 6, 6, 0.1);
    .el-button {
      &.primary_but {
        @include wh(100px, 32px);
        padding: 0;
        font-size: 12px;
        font-weight: 400;
      }
      &.cancle_but {
              @include wh(100px, 32px);
        padding: 0;
        font-size: 12px;
        font-weight: 400;
      }
    }

    .el-table {
      thead {
        .cell {
          text-align: center; // table 表头 左对齐
        }
      }
      .delete-row {
        color: #d8d8d8;
      }

      .el-table__expand-icon {
        //修改 el-tabel 折叠按钮的位置
        float: right;
      }
      // border: 0;border-bottom: 1px dashed #E9E9E9;
      // 去掉table的border start----------------------------
      border: 0;
      th,
      tr,
      td {
        border: 0;
        background-color: #fff;
        border-bottom: 1px dashed #E9E9E9;
      }
      &::before {
        height: 0px;
      }
      &::after {
        width: 0;
      }

      .el-table__fixed:before {
        height: 0;
      }
    }
    .el-dialog {
      &.user_info {
        width: 600px;
        .el-dialog__header {
          text-align: left;
          padding-left: 30px;
        }
        .el-dialog__body {
          padding: 30px 30px 0;
        }
        .el-dialog__footer {
          margin-top: 36px;
          padding-bottom: 50px;
          padding-top: 0;
          .dialog-btn-center {
            .el-row {
              text-align: center;
            }
          }
        }
        .account_status_but {
          width: 80px;
          height: 32px;
          color: #333;
          border: 1px solid #ddd;
          background: inherit;
          background-color: rgba(255, 255, 255, 1);
          border-radius: 4px;
          font-family: "STHeitiSC-Light", "Heiti SC Light", "Heiti SC";
          font-style: normal;
          text-align: center;
          line-height: 32px;
          cursor: pointer;
          &.active {
            color: #44a9e1;
            border: 1px solid #44a9e1;
          }
        }
      }
      &.edit_admin {
        width: 480px;
        padding-top: 30px;
        padding-left: 60px;
        padding-right: 60px;
        .el-dialog__body {
          padding: 20px 0 36px 0;
        }
        .el-dialog__footer {
          padding-top: 0;
          padding-bottom: 30px;
        }
        .cancel_but {
          margin-top: 18px;
        }
      }
    }
  }
}
/////////////////////样式重写///////////
.el-popover {
  &.el-popper {
    &.arrow_container {
      font-size: 14px;
      padding: 16px 10px 0 10px;
      text-align: center;
      color: #666;
      font-weight: 500;
      .el-row {
        margin-bottom: 10px;
        &:hover {
          cursor: pointer;
          color: #44a8e1;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.layout_content {
  width: 1200px;
  margin: 0 auto;
}
.top_menu_select {
  margin-top: 35px;
  display: flex;
  font-family: "Arial-BoldMT", "Arial Bold", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
}
.top_menu_select_select {
  width: 148px;
  height: 50px;
  background: #ffffff;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  color: black;
  cursor: pointer;
  box-shadow: 0 -5px 15px rgba(6, 6, 6, 0.1);
}
.top_menu_select_unselect {
  width: 148px;
  height: 40px;
  background: #dddddd;
  margin-top: 10px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  color: black;
  cursor: pointer;
  box-shadow: 0 -5px 15px rgba(6, 6, 6, 0.1);
}
.line {
  background: #fff;
  width: 1032px;
  height: 2px;
}
.content {
  padding-top: 40px;
  padding-left: 40px;
  margin-bottom: 40px;
  background-color: white;
  box-shadow: 0 -5px 15px rgba(6, 6, 6, 0.1);
}
.btn-left-unselect {
  background: inherit;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #428dde;
  border-radius: 5px;
  box-shadow: none;
  font-family: "ArialMT", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #428dde;
  text-align: center;
  line-height: normal;
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  width: 140px;
  height: 36px;
  cursor: pointer;
}


// background-color: #44a8e1;
.btn-left-select {
  background: inherit;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #66b9ff;
  background-color: #66b9ff;
  border-radius: 5px;
  box-shadow: none;
  font-family: "ArialMT", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: normal;
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  width: 140px;
  height: 36px;
  cursor: pointer;
}
.btn-left-select:hover
{
  background-color: #66b9ff;
  border-color: #66b9ff;
  color: white;
}
.btn-left-unselect:hover
{
  background-color: #66b9ff;
  border-color: #66b9ff;
  color: white;
}

.choice-layout {
  background: white;
}
.choice-type-layout {
  margin-top: 10px;
  &.two {
    margin-left: 32px;
  }
}

.submit-btn-layout {
  display: flex;
  justify-content: center;
  //   margin-top: 30px;
}
.submit-btn-layout-2{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  //   margin-top: 30px;
}
.qualification-materials-tag-font {
  font-family: "Arial-BoldMT", "Arial Bold", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 15px;
  color: #333333;
}
.qualification-materials-information-font {
  font-family: "STHeitiSC-Light", "Heiti SC Light", "Heiti SC";
  font-weight: 200;
  font-style: normal;
  font-size: 15px;
  color: #999999;
  margin-top: 10px;
}

.upload-layout {
  display: flex;
  margin-top: 20px;
}
.user-manager-top {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  background: white;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
}
.user-manager-top3 {
  display: flex;
  flex-direction: column;
  background: white;
}
.user-manager-top-2 {
  display: flex;
  background: white;
}
.user-manager-top-font {
  font-family: "ArialMT", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
  color: #888888;
}
// .dialog-btn-center {
//   display: flex;
//   justify-content: center;
//   justify-items: center;
// }
.dialog-set-admin-info-txt {
  font-family: "ArialMT", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  color: #999999;
}
.account-state-layout {
  display: flex;
}

.dialogOpera-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
}
.choice-tag-div{
    display: flex;
    // justify-content: center;
    // align-items: center;
}
.form-switch{
  display: inline-block;
  vertical-align: middle;
  position: relative;
  height: 27px;
  line-height: 26px;
  min-width: 35px;
  padding: 0 5px;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  background-color: white;
  text-align: center;
}

.form-switch.active{
  border-color: #66b9ff;
  background-color: #66b9ff;
  padding-left: 5px;
  padding-right: 5px;
}

.list-item-icon{
 color: #333
}
.list-item-icon:hover{
  color: #428dde;
}
// i:hover{
//   color: #428dde;
// }
</style>
