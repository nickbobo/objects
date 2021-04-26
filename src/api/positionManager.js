import fetch from 'utils/fetchCompany'

/// 包含所有职位管理相关的接口
/// userinfo
// CompanyId: "88cc03e9-7169-4fb5-80b4-1f8ffd215801"
// CompanyName: (...)
// Contract: (...)
// Email: (...)
// Mobile: (...)
// Token: (...)
// UserTitle: (...)
// UserType: (...)
// Username: (...)
/**
 * 获取所有职位列表
 * PublicState：1=草稿，2=待审核，3=审核未通过，4=发布中，5=暂停，6=已结束，0=所有
 * IsEntrust为true的时候为委托列表
 * @param {
        "PositionName": "string",
        "CreateUserId": "string",
        "PublicStartTime": "2020-06-18T01:54:45.638Z",
        "PublicEndTime": "2020-06-18T01:54:45.638Z",
        "PublicState": 1,
        "CompanyId": "string",
        "IsEntrust": true,
        "Offset": 0,
        "Limit": 0
} params 
   */

/*
City: null
CityTxt: ""
CompanyId: "f47abca6-c101-4907-b5a3-4f15dc15f8bf"
Contract: "bobobo"
CreateTime: "2020-06-17T19:42:41.317"
CreateUserId: "5581ffd3-ca64-4143-bd08-fe8c02789e79"
DeliveryCnt: 1
DeliveryFailCnt: 0
DeliveryPassCnt: 0
EndTime: null
Id: "13e8be01-9fed-4905-0f28-08d812b38b05"
IsPublic: true
PositionName: "软件鼓励师"
PublicState: 4
PublicStateTxt: null
PublicTime: null
PublishChannel: "人才拼图;人才拼图微招聘;"
StartTime: null
UpdateTime: "2020-06-17T19:44:05.297"
*/
export const GetPositionList = params => {
    return fetch.post(`/api/PositionManage/GetPositionPager`,
      params
    );
};

/**
 * 新增职位 - 保存为草稿
 * {
  "PositionName": "string",
  "RecruitNum": 0,
  "CompanyName": "string",
  "ContactPerson": "string",
  "Phone": "string",
  "Tel": "string",
  "Email": "string",
  "Gender": "string",
  "Industry": "string",
  "JobCategory": "string",
  "City": "string",
  "WorkYear": "string",
  "Degree": "string",
  "Salary": "string",
  "AgeFrom": 0,
  "AgeTo": 0,
  "PositionDes": "string",
  "CompanyDes": "string",
  "Remark": "string",
  "PublishStartTime": "2020-06-15T07:52:40.808Z",
  "PublishEndTime": "2020-06-15T07:52:40.808Z",
  "IsPublic": true,
  "Scope": "string",
  "Address": "string",
  "Duty": "string",
  "PublishChannel": [
    "string"
  ]
}
 */
export const SaveAddPosition = params => {
  return fetch.post(`/api/PositionManage/SaveAddPosition`,
    params
  );
};

/** 编辑职位 - 保存为草稿 */
export const SaveEditPosition = params => {
  return fetch.post(`/api/PositionManage/SaveEditPosition`,
    params
  );
};



/** 编辑职位 - 提交审核 */
export const PublishEditPosition = params => {
  return fetch.post(`/api/PositionManage/PublishEditPosition`,
    params
  );
};
/**
 * 新增职位 - 提交审核
 *{
  "PositionName": "string",
  "RecruitNum": 0,
  "CompanyName": "string",
  "ContactPerson": "string",
  "Phone": "string",
  "Tel": "string",
  "Email": "string",
  "Gender": "string",
  "Industry": "string",
  "JobCategory": "string",
  "City": "string",
  "WorkYear": "string",
  "Degree": "string",
  "Salary": "string",
  "AgeFrom": 0,
  "AgeTo": 0,
  "PositionDes": "string",
  "CompanyDes": "string",
  "Remark": "string",
  "PublishStartTime": "2020-06-15T07:52:27.805Z",
  "PublishEndTime": "2020-06-15T07:52:27.805Z",
  "IsPublic": true,
  "Scope": "string",
  "Address": "string",
  "Duty": "string",
  "PublishChannel": [
    "string"
  ]
}
 */
export const PublishAddPosition = params => {
  return fetch.post(`/api/PositionManage/PublishAddPosition`,
    params
  );
};

//获取职位发布人列表
export const GetPositionPublisherList = params => {
    return fetch.post(`/api/PositionManage/GetPublishUserList`,
      params
    );
};

//获取当前公司职位不同状态的数量
/* response
获取当前公司职位不同状态的数量 PassCout:正在招聘数量,DraftCount:草稿职位数量,EntrustCount: 委托职位数量,PauseCount:已暂停数量,EndCount:已结束数量,全部数量：AllCount
*/
export const getPositionStateCount = params => {
  return fetch.get(`/api/PositionManage/GetPositionStateCount`,
    {params:params}
  );
};



/**
 * 处理投递简历
 * @param {*} params 
 * {
  "PositionId": "string",
  "ResumeIds": [
    "string"
  ],
  "Operation": 0 //	 不通过（0）/已筛选（1）/未处理（2）
}
 */
export const ProcessDelivery = params => {
  return fetch.post(`/api/PositionManage/ProcessDelivery`,
    params
  )}
/*
  "Id": "string"
  获取职位详情
*/
export const GetPositionDetail = params => {
  return fetch.get(`/api/PositionManage/GetPositionDetail`,
  {params:params}
  );
};

/*
{
  "DeliveryStatus": 0,
  "DeliveryPositionId": "string",
  "DataRange": 0,
  "Offset": 0
  
  DataRange：1=一月内，2=半月内，3=一周内
  DeliveryStatus：0=不合格，1=已筛选，2=未处理
}
*/
// Operation：不通过（0）/已筛选（1）/未处理（2）
export const GetPositionDetailList = params => {
  return fetch.post(`/api/ResumeManage/GetResumeForPositionPager`,
    params
  );
};


/*
关联职位时返回职位列表（排除该简历已关联过的职位）
  {
  "PositionId": "string",
  "ResumeId": "string"
}
*/
export const GetResumeJoinPositionList = params => {
  return fetch.post(`/api/PositionManage/GetResumeJoinPositionList`,
    params
  );
};


//获取状态列表
/* 
获取职位状态列表
*/
export const GetPositionStateList = params => {
  return fetch.get(`/api/PositionManage/GetPublicStateList`,
    {params:params}
  );
};


/*
删除职位
{
  "Id": "string"
}
*/
export const DeletePosition = params => {
  return fetch.post(`/api/PositionManage/DeletePosition`,
    params
  );
};

/*
修改职位状态
{
  "PositionId": "string",
  "State": 1
}
State：审核不通过（3）/审核通过（4）/结束（7）/暂停（8）/恢复（9）
*/
export const ChangePositionStatus = params => {
  return fetch.post(`/api/PositionManage/ChangePositionStatus`,
    params
  );
};


/*
获取当前用户获取当前企业职位列表
{
  "PositionName": "ios"
}
*/
export const GetCurCompanyPositionListByCurUser = params => {
  return fetch.post(`/api/PositionManage/GetCurCompanyPositionListByCurUser`,
    params
  );
};

/*
委托职位处理状态
{
  "PositionId": "string",
  "State": 1
}
*/
export const EntrustPositionProcess = params => {
  return fetch.post(`/api/PositionManage/EntrustPositionProcess`,
    params
  );
};


/*
取消职位关联
{
  Id
}
*/
export const CancelFromPosition = params => {
  return fetch.post(`/api/ResumeManage/CancelFromPosition`,
    params
  );
};


/*
申请职位置顶
{
  Id
}
*/
export const ApplyPositionTop = params => {
  return fetch.post(`/api/PositionManage/ApplyPositionTop`,
    params
  );
};

/*
获取渠道申请审核状态及职位置顶申请审核状态
{
  Id
}
*/
export const GetChannelPositionApplyStatus = params => {
  return fetch.post(`/api/PositionManage/GetChannelPositionApplyStatus`,
    params
  );
};
/*
新增职位渠道审核
{
  Id
}
*/
export const AddPositionChannelAudit = params => {
  return fetch.post(`/api/PositionManage/AddPositionChannelAudit`,
    params
  );
};

