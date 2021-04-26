import fetch from 'utils/fetchCompany'



/**
 * 公司logo上传
 *  {
  "Keyword": "上海"
}
 */
export const UploadCompanyLogo = params => {
  return fetch.post(`/api/Upload/UploadCompanyLogo`,
    params, { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};


/**
 * 根据关键字获取公司列表（Select2用，客服登录选择公司用）
 *  {
  "Keyword": "上海"
}
 */
export const GetCompanyByName = params => {
  return fetch.post(`/api/Login/GetCompanyByName`,
    params
  );
};





/**
 * 客服登录
 * {
  "Username": "string",
  "CompanyId": "string",
  "Password": "string",
  "Code": "string",
  "ReturnUrl": "string"
}
 */
export const CustomerLogin = params => {
  return fetch.post(`/api/Login/CustomerLogin`,
    params
  );
};

/**
 * 修改密码获取短信验证码
 *  "UserName": "string",
  "Mobile": "string",
  "Code": "string"
 */
export const SendMessage = params => {
  return fetch.post(`/api/SmsMessage/SendMessage`,
    params
  );
};

//发送短信信息（登录用）
/**
 * 
 * {
 "UserName": "string",
  "Mobile": "string",
  "Code": "string"
}
 */
export const SendMessageForLogin = params => {
  return fetch.post(`/api/SmsMessage/SendMessageForLogin`,
    params
  );
};


/**
 * 企业注册短信信息
 *{
 "UserName": "string",
  "Mobile": "string",
  "Code": "string"
}
 */
export const SendCompanyMessage = params => {
  return fetch.post(`/api/SmsMessage/SendCompanyMessage`,
    params
  );
};






/**
 * 管理员登录（用户名/手机，密码，图片验证码）
 *{
  "Username": "string",
  "Password": "string",
  "Code": "string",
  "ReturnUrl": "string"
}
 */
export const CompanyLogin = params => {
  return fetch.post(`/api/Login/Login`,
    params
  );
};





/**
 * 公司注册手机验证码判断
 *{
  "Mobile": "string",
  "Code": "string",
}
 */
export const CheckMobile = params => {
  return fetch.post(`/api/CompanyBasic/CheckMobile`,
    params
  );
};






/**
 * 新增公司注册
 *{
  "userAddDto": {
   // "CompanyId": "string",
   // "UserType": 1,
    "Username": "string",   //管理员用户名 
    "Contract": "string",   //管理员姓名
    "Mobile": "string",  //
    "Email": "string",
    "Password": "string",
   // "Enable": true,  //
   // "CreateTime": "2020-06-11T02:21:03.088Z",
   //"UserState": 1,
   // "GroupId": "string"
  },
  "companyRegisterDto": {
   // "Id": "string",
    "CompanyType": 1, //公司类型
    "CompanyName": "string",  //公司名称
    "Industry": "string",  //行业
    "City": "string",  //城市
    "CompanyStockType": 1, //公司性质
    "ContactPerson": "string", //联系人
    "TelUserName": "string", // 管理员用户姓名 = userAddDto.Username
    "Email": "string",  //邮箱
    "Phone": "string",  //联系人手机号
    "RecruitPerson": "string",  //招聘人
    "RecruitPersonTel": "string", //招聘人手机号

    "CompanyScale": "string", //公司规模
    "SalesScale": "string", // 销售规模

    "FoundedTime": "2020-06-11T02:21:03.088Z",  //公司成立时间
   // "MainProducts": "string",
   // "MajorClient": "string",
   // "Competitor": "string",
    "WebUrl": "string",
    "Description": "string", //公司简介
   // "Remark": "string",  
    "GroupId": "string"
  }
}
 */
export const AddCompanyRegister = params => {
  return fetch.post(`/api/CompanyBasic/AddCompanyRegister`,
    params
  );
};


/**
 * 忘记密码
 *{
  "Mobile": "string",
  "NewPassword": "string",
  "RePassword": "string",
  "PicCode": "string",
  "MobileCode": "string"
}
 */
export const FindPassword = params => {
  return fetch.post(`/api/Login/FindPassword`,
    params
  );
};


/**
 * 密码修改
 *{
  "OldPassword": "string",
  "NewPassword": "string",
  "RePassword": "string"
}
 */
export const EdtPassword = params => {
  return fetch.post(`/api/UserInfo/EdtPassword`,
    params
  );
};


/**
 * 获取公司审核状态和完善状态
 * CompangyId
 *返回信息 "Data": {
    "AduitState": false,  //信息未通过审核
    "IsPerfect": false  //信息未完善
  }
 */
export const GetCompanyState = params => {
  return fetch.get(`/api/CompanyBasic/GetCompanyState`,
    { params: params }
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

/**
 * 公司信息完善
 * {
  "Id": "string", //公司id
  "RecruitPerson": "string",
  "RecruitPersonTel": "string",
  "FoundedTime": "2020-06-16T02:23:09.128Z",
  "WebUrl": "string",
  "Description": "string"
}
 */
export const UpdateCompanySupply = params => {
  return fetch.post(`/api/CompanyBasic/UpdateCompanySupply`,
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


/**
 * 获取公司基本信息
 * 
 */
export const GetCompanyBasic = params => {
  return fetch.get(`/api/CompanyBasic/GetCompanyBasic`,
    params
  );
};



/**
 * 应聘简历分页列表
 * 
 * {
  "DeliveryPositionId": "string",
  "DeliveryStatus": 0,
  "DataRange": 0,
  "Degree": "string",
  "Gender": "string",
  "Name": "string",
  "City": "string",
  "AgeFrom": 0,
  "AgeTo": 0,
  "StartWorkFrom": 0,
  "StartWorkTo": 0,
  "CurCompany": "string",
  "CurPosition": "string",
  "Offset": 0
}
 */
export const GetDeliveryResumePager = params => {
  return fetch.post(`/api/ResumeManage/GetDeliveryResumePager`,
    params
  );
};


/**
 * 公司基本信息修改
 * "Id": "string",
  "CompanyName": "string",
  "Industry": "string",
  "City": "string",
  "CompanyStockType": 1,
  "ContactPerson": "string",
  "TelUserName": "string",
  "Email": "string",
  "Phone": "string",
  "RecruitPerson": "string",
  "RecruitPersonTel": "string",
  "CompanyScale": "string",
  "SalesScale": "string",
  "FoundedTime": "2020-06-18T06:15:11.794Z",
  "MainProducts": "string",
  "MajorClient": "string",
  "Competitor": "string",
  "WebUrl": "string",
  "Description": "string",
  "Remark": "string"
 * 
 */
export const UpdateCompanyBasic = params => {
  return fetch.post(`/api/CompanyBasic/UpdateCompanyBasic`,
    params
  );
};

/*
 * 获取收藏夹列表
 * 
 */
export const GetUserFavoritePager = params => {
  return fetch.post(`/api/Favorite/GetUserFavoritePager`,
    params
  );
};

/**
* 公司证明资料上传
 * 
*/
export const CompanyAttachmentUpload = params => {
  return fetch.post(`/api/Upload/CompanyAttachment`,
    params, { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

/*
 * 新增收藏夹
 * {
  "UserId": "string",
  "FavoritesName": "string",
}
 */
export const AddUserFavorite = params => {
  return fetch.post(`/api/Favorite/AddUserFavorite`,
    params
  );
};



/**
 *修改收藏夹
 * {
  "Id": "string",
  "FavoritesName": "string"
}
 */
export const EdtUserFavorite = params => {
  return fetch.post(`/api/Favorite/EdtUserFavorite`,
    params
  );
};

/**
 *删除收藏夹
 * {
  "Id": "string",
  "FavoritesName": "string"
}
 */
export const DelUserFavorite = params => {
  return fetch.post(`/api/Favorite/DelUserFavorite`,
    params
  );
};

/**
 *简历加入收藏
 * {
  "FavoriteId": "string",
  "ResumeId": "string"
}
 */
export const CollectResume = params => {
  return fetch.post(`/api/Favorite/CollectResume`,
    params
  );
};


/**
 *简历取消收藏
 * {
  "ResumeId": "string"
}
 */
export const CollectResumeCancel = params => {
  return fetch.post(`/api/Favorite/CollectResumeCancel`,
    params
  );
};

/**
 * 获取公司证明材料列表
 * {
    "CompanyId": "string",
    "Offset": 0,
    "Limit": 0
   }
 */
export const GetCompanyAttachment = params => {
  return fetch.get(`/api/CompanyBasic/GetCompanyAttachmentInfo`,
  );
};

/**
 * 删除公司证明文件
 * 
 */
export const DelCompanyAttr = params => {
  return fetch.post(`/api/CompanyBasic/DelCompanyAttr`,
    params
  );
};

/**
 *收藏简历分页列表
 * {
  "CollectId": "string",
  "DataRange": 0, //0=所有，1=一月内，2=半月内，3=一周内
  "Name": "string",
  "CurCompany": "string",
  "CurPosition": "string",
  "Offset": 0
}
 */
export const GetCollectResumePager = params => {
  return fetch.post(`/api/ResumeManage/GetCollectResumePager`,
    params
  );
};

/**
 * 获取公司Logo审核状态
 */

export const GetCompanyLogoState = params => {
  return fetch.get(`/api/CompanyBasic/GetCompanyLogoState`,
    params, { responseType: 'blob' }
  );
};
export const GetCompanyLogo = params => {
  return fetch.get(`/api/CompanyBasic/GetCompanyLogo`,
    {params:params}
  );
};

/**
 *简历上传
 */
export const ResumeUpload = (params, config) => {
  return fetch.post(`/api/ResumeUpload/Upload`,
    params, config, { timeout: 40000 }
  )
};
/**
 *  获取用户信息列表
 *  {
      "Username": "string",
      "CompanyId": "string",
      "Offset": 0,
      "Limit": 0
    }
 */
export const GetUserInfoList = params => {
  return fetch.post(`/api/UserInfo/GetUserInfoList`,
    params
  );
};

/**
<<<<<<< HEAD
 *  获取公司发票信息
 */
export const GetCompanyTaxInfo = params => {
  return fetch.get(`/api/CompanyBasic/GetCompanyTaxInfo`,
    params
  );
};

/**
 *  公司发票信息修改
 *  {
      "Id": "string",
      "TaxName": "string",
      "TaxNumber": "string",
      "TaxAddress": "string",
      "TaxPhone": "string",
      "BankName": "string",
      "AccountNumber": "string",
      "PostAddress": "string",
      "PostRecipient": "string",
      "PostPhone": "string",
      "ZipCode": "string"
    }
 */
export const UpdateCompanyTaxInfo = params => {
  return fetch.post(`/api/CompanyBasic/UpdateCompanyTaxInfo`,
    params
  );
};
/*
 *导入/新增/公司简历分页列表
 {
  "ResumeSource": 1, //ResumeSource：1=新增，2=导入，3=应聘，4=邮件解析，5=关联
  "Gender": "string",
  "Name": "string",
  "City": "string",
  "AgeFrom": 0,
  "AgeTo": 0,
  "StartWorkFrom": 0,
  "StartWorkTo": 0,
  "CurCompany": "string",
  "CurPosition": "string",
  "Offset": 0
}
 */
export const GetImportCreateCompanyResumePager = params => {
  return fetch.post(`/api/ResumeManage/GetImportCreateCompanyResumePager`,
    params
  );
};

/**
 * 新增子用户信息
 * {
    "Username": "string",
    "Contract": "string",
    "Mobile": "string",
    "Email": "string",
    "UserState": true,
    "GroupId": "string"
  }
 */
export const AddChildUser = params => {
  return fetch.post(`/api/UserInfo/AddChildUser`,
    params
  );
};

/**
 * 子用户信息修改
 */
export const UpdateChildUser = params => {
  return fetch.post(`/api/UserInfo/UpdateChildUser`,
    params
  );
};

/**
 * 子用户禁用
 * {
 *    "Id": "string"
 * }
 */
export const ForbidUser = params => {
  return fetch.post(`/api/UserInfo/ForbidUser`,
    params
  );
};

/**
 *  子用户删除
 * {
 *   "Id": "string"
 * }
 */
export const DelUser = params => {
  return fetch.post(`/api/UserInfo/DelUser`,
    params
  );
};

/**
 * 
 * 子用户密码重置
 * {
 *     "Id": "string"
 * }
 */
export const RestUserPassWord = params => {
  return fetch.post(`/api/UserInfo/RestUserPassWord`,
    params
  );
};


/**
 * 转让管理员
 * {
      "Id": "string",
      "Password": "string"
    }
 */
export const TransferAdmin = params => {
  return fetch.post(`/api/UserInfo/TransferAdmin`,
    params
  );
};



