import fetch from 'utils/fetchCompany'

/**
 * 职位API
 */





/**
 * 搜索简历:公司简历  获取公司自己的简历（搜索引擎）
 * @param {
 * 
 "Keyword": "string",
 "CurCompany": "string",
 "CurIndustry": "string",
 "CurPosition": "string",
 "City": "string",
 "ExpectCity": "string",
 "Education": "string",
 "UpdateTime": 0,
 "AgeFrom": 0,
 "AgeTo": 0,
 "StartWorkTime": 0,
 "EndWorkTime": 0,
 "Gender": "string",
 "Offset": 0,
 "Limit": 0
} params 
 */
export const CompanyResumeListFromEs = params => {
  return fetch.post(`/api/ResumeManage/GetCompanyResumeListFromEs`,
    params
  );
};

/**
 * 搜索简历:平台简历库  获取所有的简历（搜索引擎）
 * @param {
  * 
  "Keyword": "string",
  "CurCompany": "string",
  "CurIndustry": "string",
  "CurPosition": "string",
  "City": "string",
  "ExpectCity": "string",
  "Education": "string",
  "UpdateTime": 0,
  "AgeFrom": 0,
  "AgeTo": 0,
  "StartWorkTime": 0,
  "EndWorkTime": 0,
  "Gender": "string",
  "Offset": 0,
  "Limit": 0
 } params 
  */
export const AllResumeListFromEs = params => {
  return fetch.post(`/api/ResumeManage/GetAllResumeListFromEs`,
    params
  );
};


export const GetImportStatusList = params => {
  return fetch.get(`/api/CompanyImport/GetImportStatusList`,
    params
  );
};


export const GetPager = params => {
  return fetch.post(`/api/CompanyImport/GetPager`,
    params
  );
};


export const AddVersion = params => {
  return fetch.post(`/api/ResumeUpload/AddVersion`,
    params
  );
};

