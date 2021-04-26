<template>
  <div class="position_manager">
    <!-- 简历管理没有数据 -->
    <div v-if="allCount == 0 && isShowStatus" class="position_manager_empty">
      <div class="empty_content">
        <i class="iconfont icon-sad"></i>
        <div class="empty_desc">阿偶~空空如也，您还没有发布过职位哦 !</div>
        <el-button type="primary" size="medium" @click="jumpToPublishPage"
          >现在就开始来体验吧</el-button
        >
      </div>
    </div>
    <!-- 简历管理有数据 -->
    <div v-else class="position_manager_content">
      <!-- 侧边栏 -->

      <div class="right-job-fn" data-height>
        <ul class="fn-list">
          <li
            v-for="(item, index) in positionStateList"
            :class="{ active: isShowActive(index) }"
            @click="sideBarBtnEvent(index)"
          >
            <a class="w-btn">{{ item.content }}</a>
          </li>
        </ul>
      </div>
      <!--列表数据 -->
      <div class="tabs_content">
        <!-- 列表数据为空时如何显示-->
        <div
          v-if="currentCount == 0 && currentCountStatus"
          class="tabs_content_empty"
        >
          <i class="iconfont icon-sad"></i>
          <div class="tabs_content_empty_desc">该模块下还没有任何内容哦</div>
        </div>
        <div v-else>
          <!-- 显示列表页 -->
          <el-container v-if="!showDetailView">
            <!-- 职位状态非全部职位时 -->
            <el-header v-if="sideBarIndex != 5">
              <el-row :gutter="15">
                <el-col :span="6">
                  <div>
                    <el-input
                      v-model="positionName"
                      placeholder="职位名称"
                      size="small"
                      clearable
                      filterable
                    ></el-input>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <el-select
                      v-model="positionPublishUserId"
                      placeholder="职位发布人"
                      size="small"
                      clearable
                    >
                      <el-option
                        v-for="item in positionPublishUserList"
                        :key="item.Id"
                        :label="item.Contract"
                        :value="item.Id"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <el-date-picker
                      v-model="positionPublishTime"
                      type="date"
                      placeholder="选择日期"
                      size="small"
                    ></el-date-picker>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div>
                    <el-button
                      type="primary"
                      style="width: 120px; margin-left: 44px; height:35px; padding:0; background-color: #428dde"
                      @click="lookUpPositionList(true)"
                      class="w-btn btn-md-w"
                      >搜索</el-button
                    >
                  </div>
                </el-col>
              </el-row>
            </el-header>
            <el-header v-else>
              <el-row :gutter="15">
                <el-col :span="6">
                  <div>
                    <el-input
                      v-model="positionName"
                      placeholder="职位名称"
                      size="small"
                      clearable
                      filterable
                    ></el-input>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div>
                    <el-select
                      v-model="positionPublishUserId"
                      placeholder="职位发布人"
                      size="small"
                      clearable
                    >
                      <el-option
                        v-for="item in positionPublishUserList"
                        :key="item.Id"
                        :label="item.Contract"
                        :value="item.Id"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div>
                    <el-date-picker
                      v-model="positionPublishTime"
                      type="date"
                      placeholder="发布时间"
                      size="small"
                      style="width: 150px;"
                    ></el-date-picker>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div>
                    <el-select
                      v-model="positionPublishState"
                      placeholder="职位状态"
                      size="small"
                      style="margin-left: 14px"
                    >
                      <el-option
                        v-for="item in positionPublishStateList"
                        :key="item.Code"
                        :label="item.Name"
                        :value="item.Code"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="1">
                  <div>
                    <el-button
                      type="primary"
                      size="small"
                      style="width: 120px; margin-left: 20px;background: #3a8ee6;"
                      @click="lookUpPositionList(true)"
                      >搜索</el-button
                    >
                  </div>
                </el-col>
              </el-row>
            </el-header>
            <!-- 职位列表body -->
            <!-- 检索到数据时 -->
            <el-main v-if="positionTotal != 0">
              <div class="manager_list">
                <div
                  class="manager_list_item"
                  v-for="(item, index) in positionList"
                  :key="index"
                  @click="pushToListDetailPage(item, index)"
                >
                  <el-row>
                    <el-col :span="24">
                      <el-row class="manager_list_item_header">
                        <div class="list-title-div">
                          <div>{{ item.PositionName }}</div>
                          <div class="list-title-div-line">|</div>
                          <div>{{ item.CityTxt }}</div>
                          <div class="list-title-div-line">|</div>
                          <el-popover
                            placement="bottom-start"
                            width="100"
                            trigger="hover"
                            popper-class="delivery_arrow_container"
                          >
                            <el-row class="info_popover">
                              <el-col
                                :span="24"
                                @click.native="pushToDetailPage(item, 6)"
                                >候选简历{{ item.DeliveryCnt }}</el-col
                              >
                              <el-col
                                :span="24"
                                @click.native="pushToDetailPage(item, 7)"
                                >已推荐{{ item.DeliveryPassCnt }}</el-col
                              >
                              <el-col
                                :span="24"
                                @click.native="pushToDetailPage(item, 9)"
                                >已面试{{
                                  item.DeliveryInterviewCnt
                                    ? item.DeliveryInterviewCnt
                                    : 0
                                }}</el-col
                              >
                              <el-col
                                :span="24"
                                @click.native="pushToDetailPage(item, 8)"
                                >不合格{{ item.DeliveryFailCnt }}</el-col
                              >
                            </el-row>
                            <div slot="reference">
                              候选({{ item.DeliveryCnt }})
                            </div>
                          </el-popover>
                        </div>
                      </el-row>
                      <el-row class="manager_list_item_center">
                        <div class="list-content-div">
                          <div>职位发布人： {{ item.Contract }}</div>
                          <div
                            class="list-title-div-line"
                            style="margin-left: 15px; margin-right: 15px"
                          >
                            |
                          </div>
                          <div v-if="item.CreateTime != null">
                            发布日期:
                            {{ item.CreateTime | Format("yyyy-MM-dd") }}
                          </div>
                          <div
                            class="list-title-div-line"
                            style="margin-left: 15px; margin-right: 15px"
                          >
                            |
                          </div>
                          <div v-if="item.UpdateTime != null">
                            更新日期:
                            {{ item.UpdateTime | Format("yyyy-MM-dd") }}
                          </div>
                          <div
                            class="list-title-div-line"
                            style="margin-left: 15px; margin-right: 15px"
                          >
                            |
                          </div>
                          <div v-if="item.EndTime != null">
                            结束日期: {{ item.EndTime | Format("yyyy-MM-dd") }}
                          </div>
                        </div>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row>
                    <div
                      class="manager_list_item_bottom"
                      style="text-align: left"
                    >
                      发布渠道：<span style="color: #333333">{{
                        item.PublishChannel
                      }}</span>
                    </div>
                  </el-row>

                  <div class="position-list-popover">
                    <div
                      :class="{
                        'list_status-other':
                          item.PublicState == 2 || item.PublicState == 1,
                        list_status:
                          (item.PublicState != 2) & (item.PublicState != 1)
                      }"
                      style="margin-left: 40px"
                      slot="reference"
                      @click.stop
                    >
                      {{ item.PublicStateTxt }}
                    </div>
                    <!-- 列表数据 -->
                    <el-popover
                      placement="left-start"
                      trigger="hover"
                      popper-class="arrow_containers"
                    >
                      <!-- 状态统计: ,1:草稿职位，2：待审核，3：审批不通过，5：发布中，6：已过期，7：已撤回，8：已暂停  -->
                      <el-row class="info_popover">
                        <el-col
                          :span="24"
                          v-if="item.IsShowTop"
                          @click.native="ApplyPositionTop(item)"
                          >申请置顶</el-col
                        >
                        <!-- 可以编辑的: 草稿， 审核不通过, 已撤回 -->
                        <el-col
                          :span="24"
                          @click.native="editPosition(item)"
                          v-if="
                            item.PublicState == 1 ||
                              item.PublicState == 3 ||
                              item.PublicState == 7
                          "
                          >编辑职位</el-col
                        >
                        <!-- 委托的话 和 取消委托 所有的都可以 -->
                        <el-col
                          :span="24"
                          @click.native="entrustPosition(item)"
                          v-if="item.IsEntrust == false"
                          >委托职位</el-col
                        >
                        <el-col
                          :span="24"
                          @click.native="cancelEntrustPosition(item)"
                          v-if="item.IsEntrust == true"
                          >取消委托</el-col
                        >
                        <el-col
                          :span="24"
                          @click.native="pausePosition(item)"
                          v-if="item.PublicState == 5"
                          >暂停招聘</el-col
                        >
                        <el-col
                          :span="24"
                          @click.native="anewPosition(item)"
                          v-if="item.PublicState == 8"
                          >重新发布</el-col
                        >
                        <el-col
                          :span="24"
                          v-if="
                            item.PublicState == 5 ||
                              item.PublicState == 6 ||
                              item.PublicState == 8
                          "
                          @click.native="recallPosition(item)"
                        >
                          <a>结束</a>
                        </el-col>
                        <el-col
                          v-if="
                            item.PublicState == 1 ||
                              item.PublicState == 3 ||
                              item.PublicState == 6
                          "
                          :span="24"
                          @click.native="deletePosition(item)"
                          >删除职位</el-col
                        >
                      </el-row>

                      <div class="ser-head-img" slot="reference" @click.stop>
                        <svg-icon
                          icon-class="arrow"
                          class="icon-svg-but icon-add"
                        />
                      </div>
                    </el-popover>
                  </div>
                </div>
              </div>
              <div class="pager-index-layout">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="pageSize"
                  :total="total"
                  layout="pager, jumper"
                ></el-pagination>
              </div>
            </el-main>
            <!-- 未检索到数据时 -->
            <el-main
              v-if="currentCountStatus && positionTotal == 0"
              style="padding: 10px 0"
            >
              <div class="tabs_query_empty">
                <i class="iconfont icon-sad"></i>
                <div class="tabs_query_empty_desc">暂未检索到相关数据</div>
              </div>
            </el-main>
          </el-container>
          <!-- 显示列表详情页 -->
          <el-container v-else>
            <!-- 新增为空时的处理 v-if="detailDataList != null"-->

            <div class="jm-top">
              <div class="jm-position">
                <div class="view-channel">
                  <span>发布渠道：</span> {{ positionDetails.PublishChannel }}

                  <span
                    class="state"
                    :class="{
                      publish:
                        (positionDetails.PublicState != 2) &
                        (positionDetails.PublicState != 1)
                    }"
                    >{{ positionDetails.PublicStateTxt }}</span
                  >
                </div>
                <div class="job-item">
                  <div class="j-hd">
                    <el-popover
                      placement="top"
                      popper-class="name_popover"
                      width="70"
                      trigger="hover"
                    >
                      <div style="text-align: center;  ">
                        <a
                          class="w-btn popover"
                          type="button"
                          v-clipboard:copy="
                            positionDetails.PositionName +
                              '-' +
                              positionDetails.PositionCode
                          "
                          v-clipboard:success="onCopy"
                          v-clipboard:error="onError"
                        >
                          复制
                        </a>
                        <!-- <button ref="copy"
                          size="mini"
                          type="text"
                          :data-clipboard-text="positionDetails.PositionName"
                          @click="copy"
                          id="copy_text"
                          >复制</button
                        > -->
                      </div>
                      <div class="name" slot="reference">
                        {{ positionDetails.PositionName }}
                      </div>
                    </el-popover>

                    <!-- <div class="name">{{ positionDetails.PositionName }}</div> -->
                    <div
                      class="click-toggle"
                      :class="{ open: isExpand }"
                      @click="expandSearchDiv"
                    >
                      <span>{{ isExpand ? "收起详情" : "展开详情" }}</span
                      ><i class="iconfont icon-down"></i>
                    </div>
                    <div class="salary">{{ positionDetails.SalaryTxt }}</div>
                  </div>
                  <div class="j-bd">
                    <ul class="j-list split">
                      <li>{{ positionDetails.DegreeTxt }}</li>
                      <li>{{ positionDetails.WorkYearTxt }}</li>
                      <li>
                        {{ positionDetails.AgeFrom }} -
                        {{ positionDetails.AgeTo }}
                      </li>
                    </ul>
                    <ul class="j-list spec">
                      <li class="i-num" style="color: #999999">
                        招聘人数 {{ positionDetails.RecruitNum }}
                      </li>
                      <li class="i-addr" style="color: #999999">
                        {{ positionDetails.Address }}
                      </li>
                      <li class="i-date" style="color: #999999">
                        {{
                          positionDetails.PublishEndTime | Format("yyyy-MM-dd")
                        }}
                      </li>
                    </ul>
                    <div class="user-fn">
                      <div class="fn-btn">
                        <span class="iconfont icon-down"></span>
                        <ul class="submenu">
                          <li
                            class="active"
                            v-if="positionDetails.IsShowTop"
                            @click="ApplyPositionTop(positionDetails)"
                          >
                            <a>申请置顶</a>
                          </li>
                          <li
                            class="active"
                            @click="editPosition(positionDetails)"
                            v-if="
                              positionDetails.PublicState == 1 ||
                                positionDetails.PublicState == 3 ||
                                positionDetails.PublicState == 7
                            "
                          >
                            <a>编辑职位</a>
                          </li>
                          <li
                            @click="entrustPosition(positionDetails, true)"
                            v-if="positionDetails.HasEntrust == false"
                          >
                            <a>委托职位</a>
                          </li>

                          <li
                            @click="
                              cancelEntrustPosition(positionDetails, true)
                            "
                            v-if="positionDetails.HasEntrust == true"
                          >
                            <a>取消委托</a>
                          </li>
                          <li
                            @click="pausePosition(positionDetails)"
                            v-if="positionDetails.PublicState == 5"
                          >
                            <a>暂停招聘</a>
                          </li>
                          <li
                            @click="anewPosition(positionDetails)"
                            v-if="positionDetails.PublicState == 8"
                          >
                            <a>重新发布</a>
                          </li>
                          <li
                            :span="24"
                            v-if="
                              positionDetails.PublicState == 5 ||
                                positionDetails.PublicState == 6 ||
                                positionDetails.PublicState == 8
                            "
                            @click="recallPosition(positionDetails)"
                          >
                            <a>结束</a>
                          </li>
                          <li
                            v-if="
                              positionDetails.PublicState == 1 ||
                                positionDetails.PublicState == 6 ||
                                positionDetails.PublicState == 3
                            "
                            @click="deletePosition(positionDetails, true)"
                          >
                            <a>删除职位</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="isExpand" class="posdetails">
                      <span class="encode-text">工作内容</span>
                      <div
                        v-html="
                          common.encodeTextAreaString(positionDetails.Duty)
                        "
                      ></div>
                      <span class="encode-text">任职要求</span>
                      <div
                        v-html="
                          common.encodeTextAreaString(
                            positionDetails.PositionDes
                          )
                        "
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ul class="cv-tab" v-if="detailDataList != null">
                <li
                  :class="{ active: positionDetailIndex == 6 }"
                  @click="positionDetailEvent(6)"
                >
                  <a>候选简历 ({{ detailListInfo.DeliveryCount }})</a>
                </li>
                <li
                  :class="{ active: positionDetailIndex == 7 }"
                  @click="positionDetailEvent(7)"
                >
                  <a>已推荐（{{ detailListInfo.DeliveryPassCnt }})</a>
                </li>
                <li
                  :class="{ active: positionDetailIndex == 9 }"
                  @click="positionDetailEvent(9)"
                >
                  <a>已面试（{{ detailListInfo.DeliveryInterviewCnt }})</a>
                </li>

                <li
                  :class="{ active: positionDetailIndex == 8 }"
                  @click="positionDetailEvent(8)"
                >
                  <a>不合格人选（{{ detailListInfo.DeliveryFailCnt }})</a>
                </li>
                <li class="right">
                  <div class="select-time">
                    <el-select
                      v-model="positionDateStatus"
                      size="medium"
                      v-on:change="positionDateSelected"
                    >
                      <el-option
                        v-for="item in positionDateRange"
                        :key="item.dateStatus"
                        :label="item.lable"
                        :value="item.dateStatus"
                      ></el-option>
                    </el-select>
                  </div>
                </li>
              </ul>

              <div
                v-if="false"
                class="position_detail_desc"
                style="margin-top: 20px;"
              >
                <el-row>
                  <el-col :span="4">
                    <div
                      :class="{
                        'tab-select': positionDetailIndex == 6,
                        'tab-unselect': positionDetailIndex != 6
                      }"
                      @click="positionDetailEvent(6)"
                    >
                      候选简历({{ detailListInfo.DeliveryCount }})
                    </div>
                  </el-col>
                <el-col :span="4">
                    <div
                      :class="{
                        'tab-select': positionDetailIndex == 7,
                        'tab-unselect': positionDetailIndex != 7
                      }"
                      @click="positionDetailEvent(7)"
                    >
                      已推荐({{ detailListInfo.DeliveryPassCnt }})
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div
                      :class="{
                        'tab-select': positionDetailIndex == 9,
                        'tab-unselect': positionDetailIndex != 9
                      }"
                      @click="positionDetailEvent(9)"
                    >
                      已面试 ({{ detailListInfo.DeliveryInterviewCnt }})
                    </div>
                  </el-col>
  
                  <el-col :span="4">
                    <div
                      :class="{
                        'tab-select': positionDetailIndex == 8,
                        'tab-unselect': positionDetailIndex != 8
                      }"
                      @click="positionDetailEvent(8)"
                    >
                      不合格人选({{ detailListInfo.DeliveryFailCnt }})
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="position: absolute; right: 0">
                      <el-select
                        v-model="positionDateStatus"
                        size="medium"
                        v-on:change="positionDateSelected"
                      >
                        <el-option
                          v-for="item in positionDateRange"
                          :key="item.dateStatus"
                          :label="item.lable"
                          :value="item.dateStatus"
                        ></el-option>
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div
                style="padding: 10px;background-color: #fff"
                v-if="
                  detailDataList != null &&
                    positionDetailIndex == 6 &&
                    detailListInfo.DeliveryCount > 0
                "
              >
                <div
                  class="position_detail_desc"
                  style="margin-top: 10px; background-color: #fff"
                >
                  <el-row>
                    <el-col :span="2">
                      <el-checkbox
                        name="checkbox"
                        @click.stop.native="onCheckboxAll()"
                        v-model="allSelect"
                        style="margin-right: 20px; margin-top: 3px"
                        >全选</el-checkbox
                      >
                    </el-col>
                    <el-col :span="2">
                      <el-button
                        type
                        plain
                        size="mini"
                        style="height: 25px; line-height: 2px;"
                        @click.native="joinAllSelectEvent"
                        >加入筛选</el-button
                      >
                    </el-col>
                  </el-row>
                </div>
              </div>

              <!-- 简历列表详情 -->
              <el-main>
                <!-- <div class="resumeList" v-show="postionDetailListTotal != 0">
                    <resume-list
                      ref="resumeList"
                      @getList="getPostionDetailList"
                      :positionManager="true"
                      :isShowCheckbox="true"
                      :pageIndex.sync="detailOffset"
                    ></resume-list>
                  </div> -->

                <!-- 职位详情候选人列表有数据时 -->
                <div class="detail_list" v-if="postionDetailListTotal != 0">
                  <div
                    class="detail_list_item"
                    v-for="(item, index) in detailDataList"
                    :key="index"
                  >
                    <div
                      class="detail_content"
                      @click="goToResumeDetail(item.ResumeId)"
                    >
                      <div
                        class="detail_content_checkbox"
                        v-if="allSelect == true && positionDetailIndex == 6"
                      >
                        <el-checkbox
                          @click.stop.native="onCheckboxActive(item)"
                          v-model="item.checked"
                          name="checkbox"
                        ></el-checkbox>
                      </div>
                      <div class="user-info">
                        <div class="photo">
                          <!-- 没有上传图片时，显示默认的icon -->
                          <!-- <img src="img/user-img.jpg" alt=""> -->
                        </div>
                        <div class="name">
                          {{ item.Name }}
                        </div>
                      </div>
                      <div class="detail_content_info">
                        <ul class="cv-key">
                          <li>
                            <span>简历来源： </span
                            >{{
                              item.ResumeSourceTxt
                                ? item.ResumeSourceTxt
                                : item.ResumeSource
                                ? item.ResumeSource
                                : "未知"
                            }}
                          </li>
                          <li
                            style="position: absolute; margin-left: -20px ;    right: 20px;"
                          >
                            <span>加入候选时间： </span
                            >{{ item.DeliveryTime | Format("yyyy-MM-dd") }}
                          </li>
                        </ul>
                        <ul class="job-key split">
                          <li>
                            {{
                              item.CurPositionName
                                ? item.CurPositionName
                                : "N/A"
                            }}
                          </li>
                          <li>
                            {{
                              item.CurCompanyName ? item.CurCompanyName : "N/A"
                            }}
                          </li>
                          <li>
                            {{
                              item.StartWorkYear
                                ? `${item.StartWorkYear}年工作经验`
                                : "无工作经验"
                            }}
                          </li>
                        </ul>
                        <ul class="info-key split">
                          <li>{{ item.Gender }}</li>
                          <li>{{ item.Age ? item.Age : "N/A" }}</li>
                          <li>{{ item.Education ? item.Education : "N/A" }}</li>
                          <li>
                            {{ item.SchoolName ? item.SchoolName : "N/A" }}
                          </li>
                          <li>{{ item.City ? item.City : "N/A" }}</li>
                          <li>
                            {{
                              item.StartWorkYear
                                ? `${item.StartWorkYear}年工作经验`
                                : "N/A"
                            }}
                          </li>
                        </ul>
                      </div>

                      <div class="detail_arrow_container" @click.stop>
                        <el-popover
                          placement="left-start"
                          trigger="hover"
                          width="120"
                          popper-class="arrow_containers"
                        >
                          <el-row class="info_popover">
                            <!-- 不通过（0）/已推荐（1）/未处理（2） -->

                            <el-col
                              :span="24"
                              v-if="
                                positionDetailIndex == 7 ||
                                  positionDetailIndex == 8 ||
                                  positionDetailIndex == 9
                              "
                              @click.native="addToPositionState(item, 2)"
                              >加入候选简历</el-col
                            >

                                                        <el-col
                              :span="24"
                              v-if="
                                positionDetailIndex == 6 ||
                                  positionDetailIndex == 8 ||
                                  positionDetailIndex == 9
                              "
                              @click.native="addToPositionState(item, 1)"
                              >加入已推荐</el-col
                            >

                            <el-col
                              :span="24"
                              v-if="
                                positionDetailIndex == 6 ||
                                  positionDetailIndex == 7 ||
                                  positionDetailIndex == 8
                              "
                              @click.native="addToPositionState(item, 3)"
                              >加入已面试</el-col
                            >


                            <el-col
                              :span="24"
                              v-if="
                                positionDetailIndex == 6 ||
                                  positionDetailIndex == 7 ||
                                  positionDetailIndex == 9
                              "
                              @click.native="addToPositionState(item, 0)"
                              >人选不合格</el-col
                            >

                            <el-col
                              :span="24"
                              @click.native="editPosition(item, true)"
                              >编辑简历</el-col
                            >
                            <el-col
                              :span="24"
                              @click.native="cancelRelativeWithJob(item)"
                              >取消职位关联</el-col
                            >
                            <el-col
                              :span="24"
                              @click.native="collectResume(item)"
                              >收藏简历</el-col
                            >
                            <!-- <el-col :span="24" @click.native="downloadPDF(item)">下载简历</el-col> -->
                          </el-row>
                          <div
                            class="user-head-img"
                            slot="reference"
                            style="margin-top: 10px"
                          >
                            <svg-icon
                              icon-class="arrow"
                              class="icon-svg-but icon-add"
                            />
                          </div>
                        </el-popover>
                      </div>
                    </div>

                    <div>
                      <hr
                        style="border: 0;border-bottom: 1px dashed #E9E9E9;"
                      />
                    </div>
                  </div>
                  <div>
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleDetailCurrentChange"
                      :current-page.sync="detailCurrentPage"
                      :page-size="detailPageSize"
                      :total="postionDetailListTotal"
                      layout="pager, jumper"
                    ></el-pagination>
                  </div>
                </div>
                <!-- 职位详情候选人列表无数据 -->
                <div
                  v-else-if="
                    postionDetailListTotal == 0 && detailDataList != null
                  "
                  class="detail_list_empty"
                >
                  <i class="iconfont icon-sad"></i>
                  <div class="detail_list_empty_desc">暂未检索到相关内容</div>
                </div>
              </el-main>
            </div>
          </el-container>
        </div>
      </div>
    </div>

    <!-- 简历收藏 -->
    <resume-button-operation ref="resumeBO"></resume-button-operation>

    <el-dialog title="" :visible.sync="deleteVisiable" width="30%" center>
      <div style="text-align:center">
        <span style="color:#000; font-size: 16px">{{ deleteTxt }}</span>
      </div>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisiable = false">取 消</el-button>
        <el-button type="primary" @click="deleteVisiable = false" style="width: 100px; height: 32px">确 定</el-button>
        
      </span> -->

      <div slot="footer" class="dialog-footer">
        <div class="dialog-btn-center">
          <el-row>
            <el-button
              type="info"
              class="cancle_but"
              @click="deleteVisiable = false"
              >取消</el-button
            >
            <el-button
              style="background-color: #428dde"
              type="primary"
              class="primary_but"
              @click="deletePositionTrue(deleteitem)"
              >确定</el-button
            >
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ResumeList from "../components/ResumeList"; //简历搜索List
import ResumeButtonOperation from "views/components/ResumeButtonOperation";
import {
  getPositionStateCount,
  GetPositionPublisherList,
  GetPositionList,
  GetPositionDetail,
  GetPositionDetailList,
  GetPositionStateList,
  DeletePosition,
  ChangePositionStatus,
  ProcessDelivery,
  EntrustPositionProcess,
  CancelFromPosition,
  ApplyPositionTop
} from "api/positionManager";

import {
  GetUserFavoritePager,
  CollectResume,
  GetCollectResumePager,
  CollectResumeCancel,
  AddUserFavorite
} from "api/companyApi";

export default {
  name: "PositionManager", //简历管理
  computed: {
    ...mapGetters(["user_info"])
  },
  components: {
    ResumeButtonOperation,
    ResumeList
  },
  data() {
    return {
      message: "Copy These Text",
      // 删除弹框
      deleteTxt: "",
      deleteVisiable: false,
      deleteitem: null,
      /// 列表详情相关
      allSelect: false,
      defaultSeleted: true,
      positionDetails: "",
      positionDetailIndex: 6,
      positionDateStatus: 0,
      positionDateRange: [
        { lable: "全部", dateStatus: 0 },
        { lable: "一周内", dateStatus: 3 },
        { lable: "半月内", dateStatus: 2 },

        { lable: "一月内", dateStatus: 1 }
      ],
      detailDataList: null,
      detailListInfo: null,
      /// 列表数据相关
      showDetailView: false,
      // 用来控制是否显示模块有数据
      allCount: 0,
      isShowStatus: false,
      currentCount: 0,
      currentCountStatus: false,
      PassCout: 0,
      DraftCount: 0,
      EntrustCount: 0,
      PauseCount: 0,
      sideBarIndex: 0,
      EndCount: 0,
      positionStateList1: [
        {
          key: "entrust",
          val: "委托职位"
        }
      ],
      positionStateList: [
        {
          key: "pass",
          val: "正在招聘"
        },
        {
          key: "draft",
          val: "草稿职位"
        },
        {
          key: "entrust",
          val: "委托职位"
        },
        {
          key: "pause",
          val: "已暂停"
        },
        {
          key: "end",
          val: "结束"
        },
        {
          key: "all",
          val: "全部职位"
        }
      ],
      // positionStatePassCout: "正在招聘",
      // positionStateDraftCount: "草稿职位",
      // positionStateEntrustCount: "委托职位",
      // positionStatePauseCount: "已暂停",
      // positionStateEndCount: "结束",
      // positionStateAllCount: "全部职位",
      // 列表请求参数
      positionName: "",
      positionPublishUserId: "",
      positionPublishTime: "",
      positionPublishState: null,
      // 职位状态列表
      // 0: "全部" 1: "草稿职位" 2: "待审核" 3: "审核不通过" 4: "审核通过" 7: "已撤回" 8: "已暂停"
      positionPublishStateList: [],
      parameters: {
        PositionName: "",
        CreateUserId: "",
        PublicStartTime: "",
        PublicEndTime: "",
        PublicState: 0,
        CompanyId: "",
        IsEntrust: false,
        Offset: 0,
        Limit: 10,
        // 默认是0 当侧边栏选择全部时
        State: 0
      },
      /// 展示数据相关
      positionPublishUserList: [],
      /// 列表相关
      positionList: [],
      /// 列表数据总和
      positionTotal: 0,
      // 分页相关
      currentPage: 1, // 高亮第几页
      pageSize: 10, // 每页显示个数
      total: 0, // 一共多少数据

      detailCurrentPage: 1,
      detailPageSize: 10,
      detailOffset: 0,
      postionDetailListTotal: 0,
      isExpand: false
    };
  },
  methods: {
    onCopy: function(e) {
      this.$message({
        message: `复制”${e.text}“成功`,
        type: "success"
      });
    },
    onError: function(e) {},

    /**职位置顶 */
    ApplyPositionTop(item) {
      ApplyPositionTop({ Id: item.Id }).then(res => {
        if (res.data.Success) {
          this.$message({
            message: "申请置顶提交成功",
            type: "success"
          });
        } else {
          this.$message.error(res.data.Message);
        }
      });
    },
    // 展开职位详情
    expandSearchDiv() {
      this.isExpand = !this.isExpand;
    },
    onCheckboxActive(item) {
      for (let items of this.detailDataList) {
        if (items.Id === item.id) {
          if (item.checked) {
            this.$set(item, "checked", false);
          } else {
            this.$set(item, "checked", true);
          }
        }
      }
    },
    onCheckboxAll() {
      this.detailDataList.map(item => {
        this.$set(item, "checked", !this.allSelect); // 这里，给对象添加属性，用$set方法。
        return item;
      });
    },
    /// 是否高亮侧边栏按钮
    isShowActive(index) {
      if (index == this.sideBarIndex) {
        return true;
      }
      return false;
    },

    /// 职位详情候选简历，已推荐，不合格
    postionDetailIsShowActive(index) {
      if (index == this.positionDetailIndex) {
        return true;
      }
      return false;
    },

    goToResumeDetail(id) {
      let data = {
        ResumeId: id,
        PositionId: ""
      };
      // this.$router.push({
      //   path: `/ResumeDetail`,
      //   query: data
      // });
      let routeData = this.$router.resolve({
        path: "/ResumeDetail",
        query: data
      });
      window.open(routeData.href, "_blank");
    },
    /// 当没有发布过职位时, 跳转到发布职位页
    jumpToPublishPage() {
      this.$router.push({ path: "/IssuePosition" });
    },

    /// 侧边栏点击事件
    sideBarBtnEvent(index) {
      if (index == this.sideBarIndex && !this.showDetailView) {
        return;
      }
      this.showDetailView = false;
      this.sideBarIndex = index;
      this.clearDataWhenShowDetailData();
      this.whetherShowPositionList(index);
    },

    // 根据侧边栏不同状态下职位数量判断是否显示职位列表
    whetherShowPositionList(index) {
      switch (index) {
        case 0:
          this.currentCount = this.PassCout;
          break;
        case 1:
          this.currentCount = this.DraftCount;
          break;
        case 2:
          this.currentCount = this.EntrustCount;
          break;
        case 3:
          this.currentCount = this.PauseCount;
          break;
        case 4:
          this.currentCount = this.EndCount;
          break;
        case 5:
          this.currentCount = this.allCount;
          break;
        default:
          break;
      }
      /// 发送请求
      /// 当前模块下对应有数据 才发送请求
      if (this.currentCount != 0) {
        this.getPositionLists();
      }
    },

    /// 当显示列表页时需要清空列表详情数据
    clearDataWhenShowDetailData() {
      this.showDetailView = false;
      this.detailDataList = null;
      this.detailListInfo = "";
      this.positionDetails = "";
      this.positionDetailIndex = 6;
      this.positionDateStatus = 0;
      this.postionDetailListTotal = 0;
      this.detailOffset = 0;
      this.detailCurrentPage = 1;
      this.allSelect = false;
      // 搜索条件清空
      this.positionName = "";
      this.positionPublishUserId = "";
      this.positionPublishTime = "";
      this.positionPublishState = null;

      // 清空分页数据
      this.emptyOffset();
    },

    // 分页清空
    emptyOffset() {
      this.currentPage = 1;
      this.parameters.offset = 0;
    },
    /// 职位详情点击筛选
    positionDetailEvent(index, refresh) {
      if (index == this.positionDetailIndex && refresh == undefined) {
        return;
      }
      this.positionDetailIndex = index;
      /// 请求列表数据
      this.detailOffset = 0;
      this.getPostionDetailList();
    },

    /// 职位详情加入到候选 ，筛选， 不合格
    joinAllSelectEvent() {
      if (this.postionDetailListTotal == 0) {
        return;
      }
      let idArray = [];
      for (let item of this.detailDataList) {
        if (item.checked) {
          idArray.push(item.Id);
        }
      }
      if (idArray.length == 0) {
        this.$message({
          type: "info",
          message: "请先勾选全选按钮!"
        });
      } else {
        // 遍历列表数据， 加入候选
        let detailParams = {
          Operation: 1,
          Ids: idArray
        };
        ProcessDelivery(detailParams).then(res => {
          if (res.data.Success) {
            this.positionDetailEvent(7);
            this.allSelect = false;
            this.$message({
              type: "info",
              message: "已加入筛选"
            });
          }
        });
      }
    },

    // 取消职位关联
    cancelRelativeWithJob(item) {
      CancelFromPosition({ Id: item.Id }).then(res => {
        if (res.data.Success) {
          this.positionDetailEvent(this.sideBarIndex);
          this.$message({
            type: "info",
            message: "已取消职位关联"
          });
        }
      });
    },

    // 单独的处理加入到某种状态
    // 不通过（0）/已推荐（1）/未处理（2）
    addToPositionState(item, index) {
      var detailParams = {
        Operation: index,
        Ids: [item.Id]
      };

      ProcessDelivery(detailParams).then(res => {
        if (res.data.Success) {
          var message;
          switch (index) {
            case 0:
              message = "不通过";
              break;
            case 3:
              message = "已加入面试";
              break;
            case 1:
              message = "已加入到筛选";
              break;
            case 2:
              message = "已加入到候选";
              break;
          }
          this.positionDetailEvent(this.positionDetailIndex, true);
          this.$message({
            type: "info",
            message: message
          });
        }
      });
    },

    /// 职位详情添加日期筛选
    positionDateSelected() {
      this.getPostionDetailList();
    },

    /// 根据条件检索列表数据
    lookUpPositionList(empty) {
      // 当侧边拦选择全部时 职位状态单独处理
      if (this.sideBarIndex == 5 && this.positionPublishState != null) {
        this.parameters.State = this.positionPublishState;
      } else {
        this.parameters.State = 0;
      }
      // 是否清空分页数据
      if (empty) {
        this.emptyOffset();
      }
      this.getPositionLists();
    },
    /////////////////////////////////列表操作相关//////////////////////////

    // 收藏简历
    collectResume(item) {
      GetUserFavoritePager().then(res => {
        if (res.data.Success) {
          if (res.data.Data.length == 0) {
            this.$prompt("您还没有收藏夹，请先创建收藏夹", "温馨提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消"
            })
              .then(({ value }) => {
                var formData = {
                  UserId: this.user_info.UserId,
                  FavoritesName: value
                };
                AddUserFavorite(formData).then(res => {
                  if (res.data.Success) {
                    this.$message({
                      message: "收藏夹创建成功",
                      type: "success"
                    });
                    this.$refs.resumeBO.isShowFavorite(item.ResumeId);
                  } else {
                    this.$message.error(res.data.Message);
                  }
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "取消创建收藏夹"
                });
              });
          } else {
            this.$refs.resumeBO.isShowFavorite(item.ResumeId);
          }
        }
      });
    },

    /// 编辑职位, 编辑简历
    editPosition(item, editResume) {
      if (editResume == undefined) {
        this.$router
          .push({ path: "/IssuePosition", query: { positionId: item.Id } })
          .catch(err => {});
      } else {
        this.$router
          .push({
            path: "ResumeManage/AddResume",
            query: { ResumeId: item.ResumeId }
          })
          .catch(err => {});
      }
    },

    // 暂停招聘 8
    pausePosition(item) {
      ChangePositionStatus({ PositionId: item.Id, State: 8 }).then(res => {
        if (res.data.Success) {
          this.emptyOffset();
          this.getPositionStateCountList(false);
          this.whetherShowPositionList(this.sideBarIndex);
          this.$message({
            type: "success",
            message: "该职位已暂停招聘!"
          });
        }
      });
    },
    /// 删除职位
    deletePosition(item, refresh) {
      this.deleteitem = item;
      var positionName = item.PositionName;
      this.deleteTxt = '确定要删除职位 "' + positionName + '" ?';
      this.deleteVisiable = true;
    },

    deletePositionTrue(item, refresh) {
      DeletePosition({
        Id: item.Id
      }).then(res => {
        this.deleteVisiable = false;
        if (res.data.Success) {
          if (refresh == undefined) {
            // 重新请求列表数据和修改侧边栏数据
            this.currentCount =
              this.currentCount - 1 > 0 ? this.currentCount - 1 : 0;
            if (this.currentCount > 0) {
              this.lookUpPositionList(true);
            }
            this.getPositionStateCountList(false);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            // 职位详情删除
            this.getPositionStateCountList(false);
            this.sideBarBtnEvent(this.sideBarIndex);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        } else {
          this.$message({
            type: "info",
            message: res.data.Message
          });
        }
      });
    },
    /// 结束招聘 7
    endPosition(item) {
      ChangePositionStatus({ PositionId: item.Id, State: 7 }).then(res => {
        if (res.data.Success) {
          this.emptyOffset();
          this.getPositionStateCountList(false);
          this.whetherShowPositionList(this.sideBarIndex);
          this.$message({
            type: "success",
            message: "该职位结束招聘!"
          });
        }
      });
    },
    /// 继续招聘 9
    continuePosition(item) {
      ChangePositionStatus({ PositionId: item.Id, State: 9 }).then(res => {
        if (res.data.Success) {
          this.emptyOffset();
          this.getPositionStateCountList(false);
          this.whetherShowPositionList(this.sideBarIndex);
          this.$message({
            type: "success",
            message: "该职位已恢复招聘!"
          });
        }
      });
    },
    /// 委托职位
    entrustPosition(item, refresh) {
      EntrustPositionProcess({ PositionId: item.Id, Status: 1 }).then(res => {
        if (res.data.Success) {
          if (refresh != undefined) {
            this.positionDetails.HasEntrust = true;
            this.getPositionStateCountList(false);
          } else {
            this.emptyOffset();
            this.getPositionStateCountList(false);
            this.whetherShowPositionList(this.sideBarIndex);
          }
          this.$message({
            type: "success",
            message: "该职位已委托!"
          });
        }
      });
    },
    /// 取消委托
    cancelEntrustPosition(item, refresh) {
      EntrustPositionProcess({ PositionId: item.Id, Status: 2 }).then(res => {
        if (res.data.Success) {
          // 职位详情里的操作
          if (refresh != undefined) {
            this.positionDetails.HasEntrust = false;
            this.getPositionStateCountList(false);
          } else {
            this.emptyOffset();
            this.getPositionStateCountList(false);
            this.whetherShowPositionList(this.sideBarIndex);
          }
          this.$message({
            type: "success",
            message: "该职位已取消委托!"
          });
        }
      });
    },
    /// 撤回发布
    recallPosition(item) {
      ChangePositionStatus({ PositionId: item.Id, State: 7 }).then(res => {
        if (res.data.Success) {
          this.emptyOffset();
          this.getPositionStateCountList(false);
          this.whetherShowPositionList(this.sideBarIndex);
          this.$message({
            type: "success",
            message: "该职位已撤回"
          });
        }
      });
    },
    /// 重新发布 9
    anewPosition(item) {
      ChangePositionStatus({ PositionId: item.Id, State: 9 }).then(res => {
        if (res.data.Success) {
          this.emptyOffset();
          this.getPositionStateCountList(false);
          this.whetherShowPositionList(this.sideBarIndex);
          this.$message({
            type: "success",
            message: "该职位已重新发布!"
          });
        }
      });
    },
    // 每次编辑职位后 都进行刷操作
    reloadData() {},
    /////////////////////////////////分页相关//////////////////////////
    handleSizeChange() {},

    handleCurrentChange(val) {
      let offset = (val - 1 != 0 ? val - 1 : 0) * this.pageSize;
      this.parameters.offset = offset;
      this.lookUpPositionList(false);
    },

    handleDetailCurrentChange(val) {
      let offset = (val - 1 != 0 ? val - 1 : 0) * this.detailPageSize;
      this.detailOffset = offset;
      this.getPostionDetailList();
    },

    /////////////////////////////////初始化参数//////////////////////////
    /// 初始化列表请求参数
    init() {
      this.parameters.CompanyId = this.user_info.CompanyId;
    },

    /////////////////////////////////网络请求的方法//////////////////////

    /// 获取职位详情页
    pushToListDetailPage(item, index) {
      this.showDetailView = true;
      this.detailDataList = null;
      this.postionDetailListTotal = 0;
      this.detailOffset = 0;
      GetPositionDetail({ Id: item.Id }).then(res => {
        if (res.data.Success) {
          this.positionDetails = res.data.Data;
          this.getPostionDetailList();
        }
      });
    },

    // 跳转到职位详情同时关联上候选，筛选，不合格
    pushToDetailPage(item, index) {
      this.showDetailView = true;
      this.detailDataList = null;
      this.postionDetailListTotal = 0;
      this.detailOffset = 0;
      GetPositionDetail({ Id: item.Id }).then(res => {
        if (res.data.Success) {
          this.positionDetails = res.data.Data;
          this.positionDetailEvent(index, true);
        }
      });
    },

    // 获取职位发布人列表
    getPostionPublisherList() {
      GetPositionPublisherList().then(res => {
        if (res.data.Success) {
          this.positionPublishUserList = res.data.Data;
        }
      });
    },

    /// 获取职位详情候选人列表页数据
    /*
       DataRange：1=一月内，2=半月内，3=一周内
       DeliveryStatus：0=不合格，1=已推荐，2=未处理
       {
            "DeliveryStatus": 0,
            "DeliveryPositionId": "string",
            "DataRange": 0,
            "Offset": 0
        }
    */
    getPostionDetailList() {
      var deliveryStatus;
      switch (this.positionDetailIndex) {
        case 9:
          deliveryStatus = 3;
          break;
        case 6:
          deliveryStatus = 2;
          break;
        case 7:
          deliveryStatus = 1;
          break;
        default:
          deliveryStatus = 0;
      }
      var params = {
        PositionId: this.positionDetails.Id,
        State: deliveryStatus,
        DataRange: this.positionDateStatus,
        Offset: this.detailOffset
      };
      GetPositionDetailList(params).then(res => {
        if (res.status == 200) {
          this.detailListInfo = res.data.Data;
          let data = res.data.Data.ResumeList.Items;
          data.map(item => {
            this.$set(item, "checked", false); // 这里，给对象添加属性，用$set方法。
            return item;
          });
          this.detailDataList = data;
          //           this.detailDataList = [
          // 	{
          // 	  "GroupName": "人才拼图",
          // 	  "ResumeSource": "个人来源",
          //           "DeliveryTime": null,
          //           "Name": "Micky",
          //           "CurPositionName" : "网站运营经理",
          //           "CurCompanyName": "HRoot",
          //           "Gender": "女",
          // 	},
          // 	{
          //            "GroupName": "人才拼图",
          // 	  "ResumeSource": "个人来源",
          //           "DeliveryTime": null,
          //           "Name": "Micky",
          //           "CurPositionName" : "网站运营经理",
          //           "CurCompanyName": "HRoot",
          //           "Gender": "女",
          // 	}
          // ];
          // this.$refs.resumeList.init(res.data.Data.ResumeList);
          this.postionDetailListTotal = res.data.Data.ResumeList.Total;
          // this.postionDetailListTotal = 2;
        }
      });
    },

    /// 获取不同状态下职位数量
    getPositionStateCountList(setDefaultCurrentCount) {
      getPositionStateCount().then(res => {
        if (res.data.Success) {
          this.allCount = res.data.Data.AllCount;

          this.PassCout = res.data.Data.PassCout;
          this.DraftCount = res.data.Data.DraftCount;
          this.EntrustCount = res.data.Data.EntrustCount;
          this.PauseCount = res.data.Data.PauseCount;
          this.PassCout = res.data.Data.PassCout;
          this.EndCount = res.data.Data.EndCount;

          // 默认让当前列表是否显示正在招聘, 第一次进入是当有删除职位操作时不是
          if (setDefaultCurrentCount) {
            this.currentCount = res.data.Data.PassCout;
          }
          // 侧边栏赋值
          let data = res.data.Data;
          for (let item of this.positionStateList) {
            switch (item.key) {
              case "pass":
                item.content = `${item.val}(${data.PassCout})`;
                break;
              case "draft":
                item.content = `${item.val}(${data.DraftCount})`;
                break;
              case "entrust":
                item.content = `${item.val}(${data.EntrustCount})`;
                break;
              case "pause":
                item.content = `${item.val}(${data.PauseCount})`;
                break;
              case "end":
                item.content = `${item.val}(${data.EndCount})`;
                break;
              case "all":
                item.content = `${item.val}(${data.AllCount})`;
                break;
            }
          }
          this.isShowStatus = true;
        }
      });
    },

    // 获取职位状态列表数据
    getPostionStateList() {
      GetPositionStateList().then(res => {
        if (res.data.Success) {
          this.positionPublishStateList = res.data.Data;
        }
      });
    },

    /// 获取职位列表数据，这里统一管理参数
    getPositionLists() {
      this.parameters.PositionName = this.positionName;
      this.parameters.CreateUserId = this.positionPublishUserId;
      this.parameters.PublicStartTime = this.positionPublishTime;
      // 状态传值，草稿职位（PublicState=1）
      // ,正在招聘：（PublicState=5）
      // 委托职位:（PublicState=0 and IsEntrust==true）
      // 已暂停：(PublicState=6),
      // 结束：（PublicState=7）
      // ,全部:(PublicState=0)
      //  待审核， 发布中, 审核未通过, 草稿职位, 委托中, 已暂停, 结束，
      switch (this.sideBarIndex) {
        case 0:
          // 正在招聘
          this.parameters.PublicState = 5;
          this.parameters.IsEntrust = false;
          break;
        case 1:
          // 草稿职位
          this.parameters.PublicState = 1;
          this.parameters.IsEntrust = false;
          break;
        case 2:
          // 委托职位
          this.parameters.PublicState = 0;
          this.parameters.IsEntrust = true;
          break;
        case 3:
          // 已暂停
          this.parameters.PublicState = 6;
          this.parameters.IsEntrust = false;
          break;
        // 结束
        case 4:
          this.parameters.PublicState = 7;
          this.parameters.IsEntrust = false;
          break;
        // 全部职位
        case 5:
          this.parameters.PublicState = 0;
          this.parameters.IsEntrust = false;
          break;
      }

      //　发送请求
      GetPositionList(this.parameters).then(res => {
        if (res.data.Success) {
          this.positionList = res.data.Data.Items;
          this.positionTotal = res.data.Data.Total;
          this.total = res.data.Data.Total;
        }
        this.currentCountStatus = true;
      });
    }
  },
  mounted() {},
  created() {
    this.init();
    if (this.$route.query.pageId) {
      this.sideBarBtnEvent(parseInt(this.$route.query.pageId));
      this.sideBarIndex = this.$route.query.pageId;
    }
    if (this.user_info.UserType == 4) {
      this.positionStateList = this.positionStateList1;
    }
    // 获取不同状态下职位数量
    this.getPositionStateCountList(true);
    // 获取职位状态列表
    this.getPostionStateList();
    // 获取职位发布人数据
    this.getPostionPublisherList();
    /// 请求列表数据
    this.getPositionLists();
  }
};
</script>
<style lang="scss">
/// 弹出选择框

/////////////////////分页样式重写/////////////////
// .el-pagination {
//   background: #fff0;
//   display: -webkit-flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 51px;
//   margin-bottom: 25px;
//   .btn-prev {
//     display: none;
//   }
//   .btn-next {
//     display: none;
//   }
//   .el-pager {
//     li {
//       height: 32px;
//       width: 32px;
//       line-height: 32px;
//       border-radius: 16px;
//       padding: 0px;
//       margin-right: 15px;
//       color: #9b9b9b;
//       min-width: 32px;
//       cursor: pointer;
//       &.active {
//         background: #409eff;
//         color: #fff;
//       }
//     }
//   }
// }
.el-popover {
  &.arrow_containers {
    padding: 6px 0;
    min-width: 120px;
    width: 120px;
    .info_popover {
      width: 100%;
      margin-bottom: 10px;
      div {
        text-align: center;
        margin-top: 10px;
        cursor: pointer;
      }
      > div:hover {
        color: #44a8e1;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.position-list-popover {
  position: absolute;
  top: 20px;
  right: 10px;
  > span {
    width: 100px;
    height: 100px;
    display: block;
  }
  .ser-head-img {
    height: 30px;
    width: 30px;
    float: right;
    margin-top: 5px;
    .icon-svg-but {
      font-size: 25px;
    }
  }
  .list_status {
    width: 77px;
    height: 25px;
    line-height: 25px;
    font-size: 13px;
    border-radius: 3px;
    text-align: center;
    right: 0;
    color: #fff;
    border: 1px solid #428dde;
    border-radius: 25px;
    background-color: #428dde;
  }
  .list_status-other {
    width: 77px;
    height: 25px;
    line-height: 25px;
    font-size: 13px;
    border-radius: 3px;
    text-align: center;
    right: 0;
    color: #fff;
    border: 1px solid #bbbbbb;
    background-color: #bbbbbb;
    border-radius: 25px;
  }
  .iconfont {
    cursor: pointer;
    font-size: 28px;
    line-height: 1;
    display: block;
    color: #ddd;
  }
}

>>> .el-pagination {
  background: #fff0;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  margin-top: 51px;
  margin-bottom: 25px;
  .btn-prev {
    display: none;
  }
  .btn-next {
    display: none;
  }
  .el-pager {
    li {
      padding: 0 5px;
      line-height: 24px;
      height: 24px;
      width: 40px;
      padding: 0px;
      margin-right: 15px;
      color: #9b9b9b;
      border: 1px solid #dedede;
      background: #ffffff;
      min-width: 32px;
      border-radius: 0;
      cursor: pointer;
      &.active {
        background: #80b4ee;
        border-color: #80b4ee;
        color: #fff;
      }
    }
  }
  .el-pagination__jump {
    .el-pagination__editor {
      background: #eee;
      border-radius: 5px;
      min-width: 60px;
      margin-left: 5px;
      margin-right: 5px;
      line-height: 26px;
      height: 26px;
      .el-input__inner {
        line-height: 26px;
        height: 26px;
        border-radius: 0;
        width: 100%;
        background: #eee;
        border: 0;
      }
    }
  }
}
.position_manager {
  width: 100%;
  text-align: center;
  @include df;
  @include df-jc;
  // 没有数据的时候显示
  .position_manager_empty {
    margin-top: 10px;
    width: 1200px;
    min-height: 100vh;
    background: white;
    .empty_content {
      margin-top: 100px;
      padding: 120px 0;
      text-align: center;
      .svg-folder {
        color: #ddd;
        font-size: 48px;
        margin: 90px auto 30px auto;
        display: block;
      }
      .iconfont {
        display: block;
        font-size: 100px;
        line-height: 1;
        color: #eaeaea;
        margin-right: 25px;
        margin-bottom: 35px;
      }
      .el-button {
        min-width: 275px;
        margin-top: 24px;
        background-color: #428dde;
        color: #fff;
        white-space: nowrap;
        font-size: 15px;
      }
      .empty_desc {
        font-size: 16px;
      }
    }
  }
  .cv-tab {
    margin-top: 20px;
    @include clearfix();
    li {
      float: left;
      min-width: 140px;
      text-align: center;
      a {
        display: block;
        background-color: #dddddd;
        font-size: 16px;
        color: #000;
        line-height: 20px;
        padding: 12px 20px;
        margin-right: 12px;
        margin-top: 6px;
        &:hover {
          background-color: $bgray-hover;
        }
      }
      &.active {
        a {
          cursor: default;
          margin-top: 0;
          padding-top: 18px;
          background-color: #fff;
          box-shadow: 0 -5px 15px rgba(6, 6, 6, 0.1);
        }
      }
    }
    .right {
      float: right;
      min-width: 160px;
      margin-right: 6px;
      margin-top: 6px;
    }
  }
  // 有数据时的显示
  .position_manager_content {
    // margin-top: 10px;
    // background: #fff;
    width: 1200px;
    // @include df;

    .right-job-fn {
      float: left;
      background-color: #fff;
      padding: 24px 20px;
      width: 280px;
      -webkit-box-shadow: 0 10px 16px rgba(6, 6, 6, 0.1);
      box-shadow: 0 10px 16px rgba(6, 6, 6, 0.1);
      .fn-list {
        > li {
          padding-left: 4px;
          padding-right: 4px;
          position: relative;
          margin-bottom: 10px;
          > a.w-btn {
            display: block;
            border: 1px solid #428dde;
            color: #428dde;
            line-height: 36px;
            height: 36px;
            font-size: 14px;
            background-color: #fff;
          }
          > a.w-btn:hover {
            -webkit-box-shadow: none;
            box-shadow: none;
            border: 1px solid #66b9ff;
            background-color: #66b9ff;
            color: #fff;
          }
        }
      }
    }

    .right-job-fn .fn-list > li.active > a.w-btn {
      -webkit-box-shadow: none;
      box-shadow: none;
      border: 1px solid #66b9ff;
      background-color: #66b9ff;
      color: #fff;
    }
    .right-job-fn .fn-list > li:hover .submenu {
      left: auto;
      right: 240px;
      display: block;
    }
    .right-job-fn .fn-list > li:hover .submenu li {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    .right-job-fn .fn-list > li:last-child {
      margin-bottom: 0;
    }

    // .position_manager_tabs {
    //   @include shadow();
    //   width: 280px;
    //   // height: 300px;
    //   padding-top: 20px;
    //   background: white;
    //   display: inline-table;
    //   .el-button + .el-button {
    //     margin-left: 0;
    //   }
    //   .el-button {
    //     width: 240px;
    //     height: 36px;
    //     margin-bottom: 8px;
    //     padding: 0;
    //     font-weight: 200;
    //   }
    // }
    .tabs_content {
      float: right;
      width: 900px;
      margin-left: 20px;
      .svg-folder {
        color: #ddd;
        font-size: 100px;
        padding-top: 60px;
        display: block;
      }
      /// 职位详情
      .position_detail_header {
        background: #fff;
        width: 900px;
        padding: 20px;
        .position_detail__icon {
          color: #999999;
          margin-right: 3px;
          margin-bottom: 0px;
          width: 14px;
          height: 16px;
        }
        .position_detail_poblisher {
          text-align: left;
          font-size: 14px;
          color: #888888;
          display: flex;
          align-items: center;
        }
        .list_status {
          width: 77px;
          height: 25px;
          line-height: 25px;
          font-size: 13px;
          border-radius: 3px;
          text-align: center;
          right: 0;
          color: #fff;
          border: 1px solid #428dde;
          border-radius: 25px;
          background-color: #428dde;
        }
        .list_status-other {
          width: 77px;
          height: 25px;
          line-height: 25px;
          font-size: 13px;
          border-radius: 3px;
          text-align: center;
          right: 0;
          color: #fff;
          border: 1px solid #bbbbbb;
          background-color: #bbbbbb;
          border-radius: 25px;
        }
      }
      /// 列表相关
      // padding: 0 16px 16px 16px;

      .tabs_query_empty {
        background: white;
        width: 900px;
        min-height: 100vh;
        padding: 120px 0;
        text-align: center;
        .iconfont {
          display: block;
          font-size: 70px;
          line-height: 1;
          color: #eaeaea;
          margin-right: 25px;
          margin-bottom: 35px;
        }
        .tabs_query_empty_desc {
          font-size: 15px;
          padding-top: 40px;
        }
      }
      .detail_list_empty {
        background: white;
        width: 900px;
        // min-height: 100vh;
        padding: 120px 0;
        text-align: center;
        .iconfont {
          display: block;
          font-size: 70px;
          line-height: 1;
          color: #eaeaea;
          margin-right: 25px;
          margin-bottom: 35px;
        }
        .detail_list_empty_desc {
          font-size: 15px;
          padding-top: 40px;
        }
      }
      .tabs_content_empty {
        background: white;
        width: 900px;
        min-height: 100vh;
        padding: 120px 0;
        text-align: center;
        .tabs_content_empty_desc {
          font-size: 15px;
          padding-top: 40px;
        }
        .iconfont {
          display: block;
          font-size: 100px;
          line-height: 1;
          color: #eaeaea;
          margin-right: 25px;
          margin-bottom: 35px;
        }
      }
      .el-header {
        overflow: hidden;
        @include shadow();
        height: 80px !important;
        line-height: 78px;
        margin-bottom: 15px;
        background: #fff;
        &.position_detail_header {
          height: auto !important;
          line-height: auto;
        }
        .el-row {
          &.pos-det {
            height: auto;
            line-height: initial;
          }
        }
      }
      .el-main {
        background: white;
        @include shadow();
        padding: 0;
        margin-bottom: 35px;
      }
      /// 列表详情相关
      .detail_list {
        // @include shadow();
        .detail_list_item {
          height: 100px;
          background: #fff;
          padding: 10px;
          position: relative;
          .detail_content {
            display: flex;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            .detail_content_checkbox {
              width: 30px;
              height: 30px;
              margin-top: 15px;
            }

            .detail_content_info {
              width: 600px;
              margin-left: 10px;
              > ul {
                overflow: hidden;
                & + ul {
                  margin-top: 10px;
                }
                li {
                  float: left;
                  text-align: left;
                }
              }
            }
            .cv-key {
              @include clearfix();
              li {
                width: 50%;
                font-size: 13px;
                span {
                  color: #999;
                }
                &:last-child {
                  text-align: right;
                }
              }
              &.my_favorite_header {
                li {
                  width: calc(100% / 3);
                }
              }
            }
            .job-key {
              font-size: 15px;
              font-weight: bold;
            }
            .split {
              li + li {
                padding-left: 10px;
                margin-left: 10px;
                &::after {
                  content: "";
                  position: absolute;
                  left: 0;
                  top: 50%;
                  height: 12px;
                  margin-top: -6px;
                  width: 1px;
                  background-color: #ccc;
                }
              }
              li {
                position: relative;
              }
            }

            .detail_arrow_container {
              margin-left: 120px;
              margin-top: 15px;
            }
            .user-info {
              float: left;
              border-bottom: none;
              margin: 0 30px 0 10px;
              .photo {
                width: 44px;
                height: 44px;
                border-width: 2px;
                margin: 0;
                &:after {
                  font-size: 30px;
                }
              }
              .name {
                margin-top: 10px;
                text-align: center;
                font-size: 14px;
                font-weight: normal;
              }
            }
          }
        }
      }
      .manager_list {
        padding: 30px;
        background: #fff;
        .manager_list_item {
          position: relative;
          padding: 20px 0 20px 0px;
          cursor: pointer;
          .manager_list_item_header {
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            font-weight: 600;
            .list_status {
              position: absolute;
              width: 80px;
              height: 25px;
              line-height: 25px;
              font-size: 13px;
              border-radius: 3px;
              text-align: center;
              top: 6px;
              right: 0;
              color: #fff;
              // border: 1px solid #44a9e1;
              border-radius: 25px;
              background-color: #66b9ff;
            }
            .list_status-other {
              position: absolute;
              width: 80px;
              height: 25px;
              line-height: 25px;
              font-size: 13px;
              border-radius: 3px;
              text-align: center;
              top: 6px;
              right: 0;
              color: #fff;
              border: 1px solid #bbbbbb;
              background-color: #bbbbbb;
              border-radius: 25px;
            }
            // 列表标题布局样式
            .list-title-div {
              display: flex;
              font-size: 15px;
              font-weight: bold;
              font-family: Arial, "Microsoft Yahei", "Helvetica Neue", Helvetica,
                sans-serif;
              color: #333;
              line-height: 1.4;
            }
            .list-title-div-line {
              color: #888888;
              margin-left: 20px;
              margin-right: 20px;
              height: 10px;
              width: 0.1px;
            }
          }
          // .arrow_containers {
          //   margin-left: 40px;
          //   margin-top: 16px;
          // }
          .manager_list_item_center {
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            color: #999999;

            .list-content-div {
              display: flex;
            }
          }

          .manager_list_item_bottom {
            // height: 32px;
            // line-height: 32px;
            font-size: 14px;
            color: #999999;
          }
        }
        .manager_list_item + .manager_list_item {
          border-top: 1px dotted #ccc;
        }
      }
    }
  }

  .jm-top {
    background-color: #fff;
    padding: 25px 30px;
    // margin-bottom: 15px;

    @include shadow();
    .label-form {
      margin-top: 0;
    }
    .posdetails {
      padding-top: 10px;
      font-size: 15px;
      line-height: 24px;
    }
    .jm-position {
      text-align: left;
      .view-channel {
        margin-bottom: 15px;
        span {
          color: #999;
        }
        .state {
          display: inline-block;
          background-color: #ccc;
          padding: 0 12px;
          text-align: center;
          line-height: 24px;
          color: #fff;
          border-radius: 24px;
          margin-left: 10px;
        }
        .state.publish {
          background-color: #66b9ff;
        }
      }
      .job-item {
        padding: 0;
      }
      .j-hd {
        @include clearfix();
        padding-bottom: 12px;
        border-bottom: 1px solid #ccc;
        display: flex;
        > div {
          float: left;
        }
        > span {
          display: block;
          width: auto;
        }
        .name {
          font-size: 18px;
          font-weight: bold;
          line-height: 22px;
        }
        .salary {
          text-align: right;
          color: $blue;
          font-size: 22px;
          font-weight: bold;
          line-height: 1;
          float: right;
        }
        .click-toggle {
          margin-left: 10px;
          font-size: 12px;
          color: #999999;
          line-height: 22px;
          text-align: center;
          display: flex;
          justify-content: center;
          cursor: pointer;
          .iconfont {
            color: #999999;
            margin-left: 4px;
            display: inline-block;
          }
          &.open {
            .iconfont:before {
              content: "\e74c";
            }
          }
          &:hover {
            color: #428dde;
          }
          &:hover {
            .iconfont {
              color: #428dde;
            }
          }
        }
      }
      .j-bd {
        position: relative;
        .user-fn {
          position: absolute;
          top: -5px;
          right: 15px;
          .fn-btn {
            position: relative;
          }
          .fn-btn {
            position: relative;
          }
          .fn-btn .iconfont {
            cursor: pointer;
            font-size: 28px;
            line-height: 1;
            display: block;
            color: #ddd;
          }
          .fn-btn:hover .iconfont {
            color: #428dde;
          }
          .fn-btn:hover .submenu {
            display: block;
            left: auto;
            right: 28px;
            z-index: 99;
          }
          .fn-btn:hover .submenu li {
            padding-left: 25px;
            padding-right: 25px;
          }
          .fn-btn:hover .submenu a {
            font-weight: normal;
          }
          .submenu {
            display: none;
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
      }
      .job-item .j-list {
        overflow: auto;
        margin-top: 15px;
        height: 20px;
        li {
          float: left;
        }
        &.spec li {
          margin-right: 25px;
          width: auto;
        }
      }
    }
  }
}

// .def_simple_but_pm {
//   border: 1px solid #44a9e1;
//   background: #fff;
//   color: #44a9e1;
//   @include boxSd(0px 0px 8px 0px rgba(127, 165, 195, 0.3));
//   border-radius: 4px;
//   font-weight: bold;
//   &.active {
//     border: 1px solid #44a9e1;
//     background: #44a9e1;
//     color: #fff;
//     border-radius: 4px;
//     &:hover {
//       color: #1c8dcb;
//       border: 1px solid #1c8dcb;
//       color: #fff;
//     }
//   }
//   &:hover {
//     background: #1c8dcb;
//     border: 1px solid #44a9e1;
//     color: #fff;
//   }
// }
.tab-select {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  color: #333;
  width: 140px;
  height: 50px;
}
.tab-unselect {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dddddd;
  color: #333;
  width: 140px;
  height: 50px;
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
.pager-index-layout {
  display: flex;
  justify-content: flex-start;
  padding-left: 30px;
}
.encode-text {
  font-size: 18px;
  color: #000;
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  margin-top: 10px;
}
.popover {
  width: 100px;
  &.w-btn {
    width: 100px;
    height: 30px;
    line-height: 30px;
  }
}
</style>
