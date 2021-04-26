import fetch from 'utils/fetch';
import fetchc from 'utils/fetchCompany'

/**
 * 获取用户头像
 * token String
*/
export const MyPortrait = params => {
    return fetch.get(`/api/MyPortrait`,
      {params:params,responseType: 'arraybuffer'}
    );
  };
  
/**
 * 获取我的基本信息
*/
export const MyInformation = params => {
    return fetch.post(`/api/Candidate/MyInformation`,
        params
    );
};

/**
 * 更改我的基本信息
*/

export const UpdateMyInformation = params => {
    return fetch.post(`/api/Candidate/UpdateMyInformation`,
        params
    );
};


/**
 * 更改我的头像
*/

export const UpdateMyPortrait = params => {
    return fetch.post(`/api/Candidate/UpdateMyPortrait`,
        params
    );
};




/**
 * 获取我的收藏
*/

export const MyPosition = params => {
    return fetch.post(`/api/Candidate/MyPosition`,
        params
    );
};

/**
 * 新增我的收藏
 * {
  "PositionId": "string"
}
*/

export const AddCollection = params => {
    return fetch.post(`/api/Candidate/AddCollection`,
        params
    );
};




/**
 * 取消我的收藏
*/

export const DelCollection = params => {
    return fetch.post(`/api/Candidate/DelCollection`,
        params
    );
};





/**
 * 职位投递
 * {
  "PositionId": "string"
}
*/

export const Delivery = params => {
    return fetch.post(`/api/Candidate/Delivery`,
        params
    );
};




/**
 * 获取我的申请
*/

export const GetMyDeliveryList = params => {
    return fetch.post(`/api/Candidate/GetMyDeliveryList`,
        params
    );
};



/**
* 基本信息核准
 * 
 * @param {
    "Name": "",
    "Mobile": "",
    "Email": "string"
  } params 
  */
  export const ConfirmMyInformation = params => {
    return fetch.post(`/api/Candidate/ConfirmMyInformation`,
      params
    );
  };


  /**
* 基本信息核准
 * 
 * @param {
    "Name": "",
    "Mobile": "",
    "Email": "string"
  } params 
  */
  export const ConfirmMyInformations = params => {
    return fetchc.post(`/api/Candidate/ConfirmCandidateInformation`,
      params
    );
  };
  