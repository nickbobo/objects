import fetch from 'utils/fetch';

/**
 * 职位API
 */





/**
 * 搜索职位
 * @param {
  "Keywords": "",
  "Position": "",
  "Companyname": "",
  "Industry": "",
  "City": "",
  "Salary": "",
  "UpdateTime": "",
  "OpenId": "",
  "Offset": 0,
  "Limit": 10
} params 
 */
export const SearchPosition = params => {
  return fetch.post(`/api/EsSearch/SearchPosition`,
    params
  );
};

/**
 * 职位列表（搜索）
 * @param {
  "Keywords": "",
  "Position": "",
  "Companyname": "",
  "Industry": "",
  "City": "",
  "Salary": "",
  "UpdateTime": "",
  "OpenId": "",
  "Offset": 0,
  "Limit": 10
} params 
 */
export const PositionSearch = params => {
  return fetch.post(`/api/Position/PositionSearch`,
    params
  );
};

/**
 * 
 * @param {*} params 
 */
export const GetCurrentWeekPositionCount = params => {
  return fetch.get(`/api/Position/GetCurrentWeekPositionCount`, {
    params: params
  });
};





/**
 * 获取职位详情
 * @param {Id} params 
 */
export const GetPositionDetail = params => {
  return fetch.post(`/api/Position/GetPositionDetail`,
    params
  );
};




/**
 * 
 *  获取公司详情页面
 * @param {CompanyId} params 
 */
export const GetCompanyInfo = params => {
  return fetch.get(`/api/Company/GetCompanyInfo`, {
    params: params
  });
};






/**
 * 
 *  获取名企页面页表
 * @param {{
  "EnterpriseName": "",
  "Offset": 0,
  "Limit": 10
}} params 
 */
export const GetEnterprisePager = params => {
  return fetch.post(`/api/Company/GetEnterprisePager`, {
    params: params
  });
};


/**
 * 
 *  获取名企照片信息
 * @param {{
  FileId: ''
}} params 
 */
export const GetEnterprisePicture = params => {
  return fetch.get(`/api/Company/GetEnterprisePicture`, {
    params: params
  });
};


/**
 * 
 *  获取公司Logo
 * @param {{
  CompangyId: ''
}} params 
 */
export const GetCompanyLogo = params => {
  return fetch.get(`/api/Company/GetCompanyLogo`, {
    params: params
  });
};

// 
// //获取职位详情
// export function getPositionById(Id) {
//   const data = {
//     Id
//   }
//   return fetch({
//     url: '/Position/GetPositionDetail',
//     method: 'post',
//     data
//   });
// }
// //职位列表（搜索）
// export function getPositionSearch(keywords,city,position,companyId,companyname,industry,jobCateory,education,salary,updateTime,scope,companyStockType,offset,limit) {
//   const data = {
//     keywords,
//     city,
//     position,
//     companyId,
//     companyname,
//     industry,
//     jobCateory,
//     education,
//     salary,
//     updateTime,
//     scope,
//     companyStockType,
//     offset,
//     limit
//   };
//   return fetch({
//     url: '/Position/PositionSearch',
//     method: 'post',
//     data
//   });
// }
// //职位列表（搜索）
// export function getPositionSearchB(search,offset,limit) {
//   const data = {
//     keywords = search.keywords,
//     city = search.city,
//     position = search.position,
//     companyId = search.companyId,
//     companyname = search.companyname,
//     industry = search.industry,
//     jobCateory = search.jobCateory,
//     education = search.education,
//     salary = search.salary,
//     updateTime = search.updateTime,
//     scope = search.scope,
//     companyStockType = search.companyStockType,
//     offset = search.offset,
//     limit = search.limit
//   };
//   return fetch({
//     url: '/api/Position/PositionSearch',
//     method: 'post',
//     data
//   });
// }
