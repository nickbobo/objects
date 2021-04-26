import axios from 'axios';
import store from '../store'
import app from '../main'
import router from '../router'
//获取本地缓存token
// if (JSON.parse(localStorage.getExpire('userInfo'))) {
//   //header add token
//   axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getExpire('userInfo')).token;
// }

// axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
// axios.defaults.timeout = 5000;
// axios.defaults.withCredentials = true
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_COMPANY_API, // api的base_url
  // baseURL: '', // api的base_url
  timeout: 1000*60*10, // 请求超时时间
  withCredentials: true  //表示request携带cookie

});


// request interceptor
service.interceptors.request.use(
  config => {
    if (config.url) {
      if (!config.url.split("/").some((t) => {
        return t == "BasicData"
      })) {
        // app.$loading.show();
      }
    } else {
      // app.$loading.show();
    }


    let GROUP_ID = localStorage.getExpire('GROUP_ID')
    if (config.data) {
      // if (config.data["GroupId"] != "") {
        if (GROUP_ID) {
          config.data["GroupId"] = GROUP_ID;
        }
      // }
    }
    if (config.method == "get") {
      if (config.params) {
        // config.params["GroupId"] = GROUP_ID;
        // if (config.data["GroupId"] == "") {
        //   // config.params["GroupId"] = process.env.GroupId;
        // }
        // if (config.params["GroupId"] != "") {
          if (GROUP_ID) {
            config.params["GroupId"] = GROUP_ID;
          }
        // }
      }
    }
    //  if (store.getters.token) {
    //     config.headers['Authorization'] = store.getters.token
    //   }
    if (localStorage.getExpire('COMPANY_TOKEN')) {
      config.headers['Authorization'] = localStorage.getExpire('COMPANY_TOKEN')
    } else {
      // const whiteList = ['/CompanyLogin', '/AboutUS', '/PrivacyClause', '/ServiceAgreement', '/ExperienceFeedback', '/JoinUs'] // 不重定向白名单
      // let path = router.history.current.path;
      // if (whiteList.indexOf(path) !== -1) { //这就是跳出循环的关键
      // } else {
      //   // location.reload();
      // }
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)



// respone拦截器
service.interceptors.response.use(
  response => {
    app.$loading.hide();
    if (response.data.Data) {
      // store.dispatch('FedLogOut').then(() => {
      //   next({ path: '/login' })
      // })
    }
    return response
  },
  error => {
    app.$loading.hide();
    // vue.$Message.error({
    //   message: error.message,
    //   duration: 5 * 1000,
    //   closable: true
    // });
    return Promise.reject(error);
  }
)

export default service;
