// import fetch from 'utils/fetch';

import fetch from 'utils/fetchCompany'





// /**
// * 获取当前公司信息
//  * 
// */
// export const GetCurrentInfo = params => {
//   return fetch.post(`/api/Resume/GetCurrentInfo`,
//     params
//   );
// };

/**
* 简历上传
 * 
*/
export const ResumeUpload = params => {
  return fetch.post(`/api/ResumeUpload/Upload`,
    params, { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};


/**
* 单份简历上传
 * 
*/
export const SingleUpload = params => {
  return fetch.post(`/api/ResumeUpload/SingleUpload`,
    params, { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};






/**
* 基本信息核准
 * 
*/
export const ConfirmCandidateInformation = params => {
  return fetch.post(`/api/Candidate/ConfirmCandidateInformation`,
    params
  );
};
/**
* 简历检查
 * 
*/
export const CheckResume = params => {
  return fetch.post(`/api/Resume/CheckResume`,
    params
  );
};


/**
* 获取我的简历完整度
 * 
*/
export const GetMyResumeScore = params => {
  return fetch.post(`/api/Resume/GetMyResumeScore`,
    params
  );
};


/**
* 隐藏/开放简历
 * 
 * @param {
  "IsHide": true
} params 
*/
export const IsHideResume = params => {
  return fetch.post(`/api/Resume/IsHideResume`,
    params
  );
};

/**
* 刷新简历
 * 
*/
export const RefreshResume = params => {
  return fetch.post(`/api/Resume/RefreshResume`,
    params
  );
};




/**
 * 获取简历基本信息
*/
export const GetBaseInfo = params => {
  return fetch.post(`/api/Resume/GetBaseInfo`,
    params
  );
};

/**
 * 获取用户头像
 * token String
*/
export const MyPortrait = params => {
  return fetch.get(`/api/MyPortrait`,
    { params: params, responseType: 'arraybuffer' }
  );
};




/**
* 修改基本信息
*/
/**
 * 
 * @param {
  "Name": "string",
  "Gender": "string",
  "Email": "string",
  "StartWorkTime": "2020-05-14T07:44:19.746Z",
  "Education": "string",
  "Hukou": "string",
  "City": "string",
  "Birthday": "2020-05-14T07:44:19.746Z",
  "Marital": "string",
  "OverseasStudy": "string"
} params 
*/
export const EditBaseInfo = params => {
  return fetch.post(`/api/Resume/EditBaseInfo`,
    params
  );
};


/**
 * 获取求职意向
*/
export const GetIntention = params => {
  return fetch.post(`/api/Resume/GetIntention`,
    params
  );
};





/**
 * 修改求职意向
*/
export const EditIntention = params => {
  return fetch.post(`/api/Resume/EditIntention`,
    params
  );
};


/**
 * 获取当前公司信息
*/
export const GetCurrentInfo = params => {
  return fetch.post(`/api/Resume/GetCurrentInfo`,
    params
  );
};


/**
 * 修改当前公司信息
*/
export const EditCurrentInfo = params => {
  return fetch.post(`/api/Resume/EditCurrentInfo`,
    params
  );
};







/**
* 获取工作经历
*/
export const GetWorkExp = params => {
  return fetch.post(`/api/Resume/GetWorkExp`,
    params
  );
};





/**
* 修改/新增工作经验
*/
/**
 * 
 * @param {  
  "workexp": {
      "ResumeId": "string",  //随便传 格式要匹配
      "CompanyName": "string",
      "Industry": "string",
      "Position": "string",
      "PositionTxt": "string",
      "StartTime": "2020-05-13T02:28:43.765Z",
      "EndTime": "2020-05-13T02:28:43.765Z",
      "IsToNow": true,
      "Salary": "string",
      "SalaryTxt": "string",
      "Description": "string",
      "Id": "string"
   },
  "type": 1   //1 新增   2 修改
  } params 
 */
export const EditWorkExp = params => {
  return fetch.post(`/api/Resume/EditWorkExp`,
    params
  );
};




/**
 * 删除工作经验
 * @param {id} params 
 */
export const DelWorkExp = params => {
  return fetch.post(`/api/Resume/DelWorkExp`,
    params
  );
};


/**
 * 获取项目经历
 * @param {ResumeId} params 
 */
export const GetProj = params => {
  return fetch.post(`/api/Resume/GetProj`,
    params
  );
};

/**
 * 修改/新增项目经历
 * @param {{
  "proj": {
    "ResumeId": "string",
    "ProjectName": "string",
    "StartTime": "2020-05-13T09:47:53.432Z",
    "EndTime": "2020-05-13T09:47:53.432Z",
    "IsToNow": true,
    "Duty": "string",
    "Description": "string",
    "Id": "string"
  },
  "type": 0
}} params 
 */
export const EditProj = params => {
  return fetch.post(`/api/Resume/EditProj`,
    params
  );
};

/**
 * 删除项目经历
 * @param {ResumeId} params 
 */
export const DelProj = params => {
  return fetch.post(`/api/Resume/DelProj`,
    params
  );
};







/**
 * 获取教育经历
 * @param {ResumeId} params 
 */
export const GetEdu = params => {
  return fetch.post(`/api/Resume/GetEdu`,
    params
  );
};

/**
 * 修改/新增教育经历
 * @param {{
  "edu": {
    "ResumeId": "string",
    "SchoolName": "string",
    "StartTime": "2020-05-13T11:03:21.812Z",
    "EndTime": "2020-05-13T11:03:21.812Z",
    "IsToNow": true,
    "Major": "string",
    "Education": "string",
    "Description": "string",
    "Id": "string"
  },
  "type": 0
}} params 
 */
export const EditEdu = params => {
  return fetch.post(`/api/Resume/EditEdu`,
    params
  );
};

/**
 * 删除教育经历
 * @param {ResumeId} params 
 */
export const DelEdu = params => {
  return fetch.post(`/api/Resume/DelEdu`,
    params
  );
};






/**
 * 获取自我评价
 * @param {} params 
 */
export const GetSelfEvaluation = params => {
  return fetch.post(`/api/Resume/GetSelfEvaluation`,
    params
  );
};

/**
 * 修改自我评价
 * @param {{
  "edu": {
    "SelfEvaluation": "string"
  },
  "type": 0
}} params 
 */
export const EditSelfEvaluation = params => {
  return fetch.post(`/api/Resume/EditSelfEvaluation`,
    params
  );
};





/**
 * 获取技能证书
 * @param {"ResumeId": "bff5da61-7f30-4a7b-a04a-358eeb6ac45e"} params 
 */
export const GetSkill = params => {
  return fetch.get(`/api/Resume/GetSkill`,
    { params: params }
  );
};

/**
 * 修改/新增技能
 * @param {
 * "skill": {
    "ResumeId": "string",
    "SkillName": "string",
    "UseTime": "string",
    "MasteryLevel": "string",
    "Id": "string"
  },
  "type": 0
} params 
 */
export const EditSkill = params => {
  return fetch.post(`/api/Resume/EditSkill`,
    params
  );
};

/**
 * 删除技能
 * @param {"Id": "string"} params 
 */
export const DelSkill = params => {
  return fetch.post(`/api/Resume/DelSkill`,
    params
  );
};




/**
 * 新增简历-主表（会提示重复）
 * {
  "Id": "string",
  "PersonId": "string",
  "CompanyId": "string",
  "Name": "string",
  "Gender": "string",
  "Mobile": "string",
  "Email": "string",
  "City": "string",
  "Birthday": "2020-06-23T05:26:19.750Z",
  "Qq": "string",
  "Wechat": "string",
  "Address": "string",
  "Website": "string",
  "Marital": "string",
  "Political": "string",
  "Hukou": "string",
  "StartWorkTime": "2020-06-23T05:26:19.750Z",
  "OverseasStudy": "string",
  "CurWorkPlace": "string",
  "CurCompany": "string",
  "CurPosition": "string",
  "CurIndustry": "string",
  "CurSalary": "string",
  "ExpectWorkNature": "string",
  "ExpectCity": "string",
  "ExpectIndustry": "string",
  "ExpectJobCategory": "string",
  "ExpectSalary": "string",
  "ExpectArrivalTime": "string",
  "SelfEvaluation": "string",
  "ResumeUpdateTime": "2020-06-23T05:26:19.750Z",
  "Major": "string",
  "SchoolName": "string",
  "Education": "string",
  "UpdateTime": "2020-06-23T05:26:19.750Z",
  "IsExist": 0,
  "IsDelete": true,
  "ResumeSource": 1,
  "GroupId": "string"
}
 */
export const AddResumeSave = params => {
  return fetch.post(`/api/ResumeManage/AddResumeSave`,
    params
  );
};

/**
 * 简历关联职位
 * @param {
  "PositionId": "string",
  "ResumeId": "string",
  "Confirm": true,
  "PersonId": "string"
} params 
 */
export const JoinToPosition = params => {
  return fetch.post(`/api/ResumeManage/JoinToPosition`,
    params
  );
};

/**
 * 新增简历-主表（确认增加版本）
 * @param {
  "PersonId": "string",
  "Name": "string",
  "Gender": "string",
  "Mobile": "string",
  "Email": "string",
  "City": "string",
  "Birthday": "2020-06-24T05:52:28.336Z",
  "Marital": "string",
  "StartWorkTime": "2020-06-24T05:52:28.336Z"
} params 
 */
export const AddResumeVersion = params => {
  return fetch.post(`/api/ResumeManage/AddResumeVersion`,
    params
  );
};


/**
 * 获取简历基本信息
 * @param {
  "ResumeId": "49826c08-dea7-4363-b0cf-cf30d91a3714"
} params 
 */
export const GetResumeBasic = params => {
  return fetch.post(`/api/Resume/GetResumeBasic`,
    params
  );
};



/**
 * 修改简历基本信息
 * @param {
  "ResumeId": "49826c08-dea7-4363-b0cf-cf30d91a3714"
} params 
 */
export const EditResumeBasic = params => {
  return fetch.post(`/api/Resume/EditResumeBasic`,
    params
  );
};


/**
 * 获取简历版本
 * @param {
  "ResumeId": "string"
} params 
 */
export const GetResumeVersion = params => {
  return fetch.post(`/api/ResumeManage/GetResumeVersion`,
    params
  );
};

/**
 * 职位管理-简历分页列表
 * 	
DataRange：1=一月内，2=半月内，3=一周内
DeliveryStatus：0=不合格，1=已筛选，2=未处理
 * @param {
  "DeliveryStatus": 0,  //0=不合格，1=已筛选，2=未处理
  "DeliveryPositionId": "string",
  "DataRange": 0,   //1=一月内，2=半月内，3=一周内
  "Offset": 0
}
 */
export const GetResumeForPositionPager = params => {
  return fetch.post(`/api/ResumeManage/GetResumeForPositionPager`,
    params
  );
};


/**
 * 获取培训经历
 * @param {
  "ResumeId": "string"
} params 
 */
export const GetTrain = params => {
  return fetch.get(`/api/Resume/GetTrain`,
    {params:params}
  );
};


/**
 * 删除培训经历
 * @param {
  "ResumeId": "string"
} params 
 */
export const DelTrain = params => {
  return fetch.post(`/api/Resume/DelTrain`,
    params
  );
};

/**
 * 修改/新增培训经历
 * @param {
  "ResumeId": "string"
} params 
 */
export const EditTrain = params => {
  return fetch.post(`/api/Resume/EditTrain`,
    params
  );
};







/**
 * 获取获奖经历
 * @param {
  "ResumeId": "string"
} params 
 */
export const GetReward = params => {
  return fetch.get(`/api/Resume/GetReward`,
    {params:params}
  );
};


/**
 * 删除获奖经历
 * @param {
  "ResumeId": "string"
} params 
 */
export const DelReward = params => {
  return fetch.post(`/api/Resume/DelReward`,
    params
  );
};

/**
 * 修改/新增获奖经历
 * @param {
  "ResumeId": "string"
} params 
 */
export const EditReward = params => {
  return fetch.post(`/api/Resume/EditReward`,
    params
  );
};

/**
 * 获取语言
 * @param {
  "ResumeId": "string"
} params 
 */
export const GetLanguage = params => {
  return fetch.get(`/api/Resume/GetLanguage`,
    {params:params}
  );
};


/**
 * 删除语言
 * @param {
  "ResumeId": "string"
} params 
 */
export const DelLanguage = params => {
  return fetch.post(`/api/Resume/DelLanguage`,
    params
  );
};

/**
 * 修改/新增语言
 * @param {
  "ResumeId": "string"
} params 
 */
export const EditLanguage = params => {
  return fetch.post(`/api/Resume/EditLanguage`,
    params
  );
};

/**
 * 获取个人简历标签
 * @param {
 * "resumeId": "string" 简历id
 * } params 
 */
export const ResumeLableById = params => {
  //return fetch.get(`/api/Resume/GetResumeLableById`, {params: params});
  return fetch.get(`/api/Resume/GetResumeLableById`,
    {params:params}
  );
};

/**
 * 保存简历标签
 * @param {
  * } params 
  */
 export const SaveResumeLable = params => {
   return fetch.post(`/api/Resume/SaveResumeLable`, params);
 };


/**
 * 获取系统配置简历标签
 * @param {
  * "ResumeId": "string" 简历id
  * } params 
  */
 export const AllSysResumeLable = params => {
   return fetch.get(`/api/Resume/GetAllSysResumeLable`,  { params: params });
 };


 /**
 * 添加或更新个人简历备注
 * @param {
  * "ResumeId": "string" 简历id
  * "Remark": "string" 备注内容
  * } params 
  */
 export const AddOrUpdateResumeRemark = params => {
   return fetch.post(`/api/Resume/AddOrUpdateResumeRemark`, params);
 };

  /**
 * 获取个人简历备注
 * @param {
  * "ResumeId": "string" 简历id
  * "Remark": "string" 备注内容
  * } params 
  */
 export const GetResumeRemark= params => {
   return fetch.get(`/api/Resume/GetResumeRemark`, {params: params});
 };

