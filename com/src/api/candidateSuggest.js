import fetch from 'utils/fetchCompany';

/**
 * 体验反馈上传图片
 */
export const UploadPicture = params => {
  return fetch.post(`/api/CandidateSuggest/UploadPicture`,
    params,{headers: { 'Content-Type': 'multipart/form-data' }}
  );
};


/**
* 体验反馈信息
 * 
 * @param {
    "Name": "",
    "Mobile": "",
    "Email": "string"
    "Suggest":"string",
    "Picture": [
        "string"
    ],
    "Id": "string"
  } params 
  */
export const AddSuggest = params => {
  return fetch.post(`/api/CandidateSuggest/AddSuggest`,
    params
  );
};
