import axios from 'axios';

import store from '../store'
import app from '../main'
//获取本地缓存token
// if (JSON.parse(localStorage.getExpire('userInfo'))) {
//   //header add token
//   axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getExpire('userInfo')).token;
// }

// axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
// axios.defaults.timeout = 5000;

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000, // 请求超时时间
  // withCredentials:true  //表示request携带cookie
});



// request interceptor
service.interceptors.request.use(
  config => {
    if (config.url) {
      if (!config.url.split("/").some((t) => {
        return t == "BasicData"
      })) {
        app.$loading.show();
      }
    } else {
      app.$loading.show();
    }
    if (config.data) {
      if (!config.data["GroupId"]) {
        config.data["GroupId"] = process.env.GroupId;
      }
    }

    if (config.method == "get") {
      if (config.params) {

        if (!config.params["GroupId"]) {
          config.params["GroupId"] = process.env.GroupId;
        }
      }
    }
    let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhNWRiNThiMy1lN2NjLTRmMzQtOGUwMC1mYmEyZDkyMmM0M2IiLCJNb2JpbGUiOiIxNzAxMTk2MDMyMSIsIm5iZiI6MTU4ODk4ODY4OSwiZXhwIjoxNjc1Mzg4Njg5LCJpc3MiOiJ0Y3AiLCJhdWQiOiJ0Y3AtYXBpIn0.W1456blYU-jBbj16hPpw10dQ6r0ZCBoS8AbalY5CI50"
    if (store.getters.token) {
      config.headers['Authorization'] = store.getters.token
    }
    if (localStorage.getExpire('Token')) {
      config.headers['Authorization'] = localStorage.getExpire('Token')
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
    // vue.$Message.error({
    //   message: error.message,
    //   duration: 5 * 1000,
    //   closable: true
    // });
    return Promise.reject(error);
  }
)

export default service;
