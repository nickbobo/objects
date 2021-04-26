import fetch from 'utils/fetch'
import fetchCompany from 'utils/fetchCompany'

//获取手机验证码  
/**
 * "OpenId": "string",
 * Mobile : "17011960321"
 */
export const SendMessage = params => {
  return fetch.post(`/api/SmsMessage/SendMessage`,
    params
  );
};


/**
 * 用户注册登录/绑定手机号
 * request {
  "OpenId": "string",
  "UnionId": "string",
  "Mobile": "string",
  "Code": "string",
  "ReturnUrl": "string"
}
 */
export const Login = params => {
  return fetch.post(`/api/Login/Login`,
    params
  );
};



//
export const GetHomeUrl = params => {
  return fetchCompany.get(`/api/BasicData/GetHomeUrl`,
    params
  );
};


//期望行业字典
export const GetIndustryItemList = params => {
  return fetchCompany.get(`/api/BasicData/GetIndustryItemList`,
    params
  );
};

//期望城市字典
export const GetCityItemList = params => {
  return fetchCompany.get(`/api/BasicData/GetCityItemList`,
    params
  );
};

//获取职位字典
export const GetDictItemJobCategoryList = params => {
  return fetchCompany.get(`/api/BasicData/GetDictItemJobCategoryList`,
    params
  );
};

/**
 * 获取热门数据  
 * 
 *  integer  1：热门搜索,2:热门城市，3：热门技能标签，4：热门行业,5:热门职能
 */
export const GetHotKeyWordsList = params => {
  return fetchCompany.get(`/api/BasicData/GetHotKeyWordsList`,
    { params: params }
  );
};

/**
 * 根据编码获取对应的基础数据
 * @param {*} params {Type:Degree}  Degree:学历,Salary:薪资,StaffSize:企业规模 Marital:婚姻状态
 */
export const GetDictItemListByCode = params => {
  return fetchCompany.get(`/api/BasicData/GetDictItemListByCode`, { params: params }
  );
};

//获取企业性质列表
export const GetCompanyStockList = params => {
  return fetchCompany.get(`/api/BasicData/GetCompanyStockList`,
  );
};


//获取企业性质列表
/**
 * 
 * @param {{
	GroupId : ""
	Source : 1 
}} params 
 */
export const AddCount = params => {
  return fetchCompany.post(`/api/Common/AddCount`, params
  );
};


//生成验证码
export const GetCaptcha = params => {
  return fetch.get(`/api/Captcha/GetCaptcha`,
  );
};




//获取平台列表
/**
 * 
 * @param  params 
 */
export const GetPlatformList = params => {
  return fetchCompany.post(`/api/Common/GetPlatformList`, params
  );
};

export const resumeManage = '/api/ResumeManage/'
export const CompanyMail = '/api/CompanyMail/'  //邮箱


export const get = async (url, data) => {
  try {
    let res = await fetchCompany.get(url, { params: data })
    res = res.data
    return new Promise((resolve, reject) => {
      if (res.Success) {
        resolve(res)
      } else {
        reject(res)
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export const post = async (url, data) => {
  try {
    let res = await fetchCompany.post(url, data)
    res = res.data
    return new Promise((resolve, reject) => {
      if (res.Success) {
        resolve(res)
      }
      else {
        resolve(res)
      }
    })
  } catch (err) {
    console.log(err);
  }
}

// const api = {
//   async get (url, data) {
//     try {
//       let res = await axios.get(url, {params: data})
//       res = res.data
//       return new Promise((resolve) => {
//         if (res.code === 0) {
//           resolve(res)
//         } else {
//           resolve(res)
//         }
//       })
//     } catch (err) {
//       alert('服务器出错')
//       console.log(err)
//     }
//   },
//   async post (url, data) {
//     try {
//       let res = await axios.post(url, qs.stringify(data))
//       res = res.data
//       return new Promise((resolve, reject) => {
//         if (res.code === 0) {
//           resolve(res)
//         } else {
//           reject(res)
//         }
//       })
//     } catch (err) {
//       // return (e.message)
//       alert('服务器出错')
//       console.log(err)
//     }
//   },
// }