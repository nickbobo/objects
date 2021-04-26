// import {loginByEmail, logout, getInfo} from 'api/login';
import {
  MyInformation,
  MyPortrait
} from 'api/candidate'
import {
  Login,
  AddCount
} from "../../api/api";

import {
  CompanyLogin,
  AddCompanyRegister,
  CustomerLogin
} from "api/companyApi"
import app from '../../main'
import Cookies from 'js-cookie';
import axios from 'axios';
import router from "../../router"
import crypto from "../../utils/crypto"
const user = {
  state: {
    token: localStorage.getExpire('Token'),
    user_info: localStorage.getExpire("USER_INFO") ? crypto.Decrypt(localStorage.getExpire("USER_INFO")) : {},
    roles: [],
    def_user_header: 'static/img/user_header_def.png',
    company_token: localStorage.getExpire('COMPANY_TOKEN') ? localStorage.getExpire("COMPANY_TOKEN") : '',
    // customer_token:localStorage.getExpire('COMPANY_TOKEN') ? localStorage.getExpire("COMPANY_TOKEN") : '',
    my_portrait_url: localStorage.getExpire("MY_PORTRAIT_URL") ? localStorage.getExpire("MY_PORTRAIT_URL") : '',
    my_info_data: localStorage.getExpire("MY_INFO_DATA") ? JSON.parse(localStorage.getExpire("MY_INFO_DATA")) : {},
  },

  mutations: {
    SET_MY_INFO_DATA: (state, data) => {
      state.my_info_data = data;
    },

    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_MY_PORTRAIT_URL: (state, url) => {
      state.my_portrait_url = url;
    },
    SET_COMPANY_TOKEN: (state, token) => {
      state.company_token = token;
    },
    // SET_CUSTOMER_TOKEN: (state,token)=>{
    //   state.customer_token = token
    // },
    SET_USER_INFO: (state, data) => {
      state.user_info = data;
    }
  },

  actions: {
    /**
        status:false  缓存获取
        status：true  强制更新
     */
    SetMyPortraitUrl({
      commit,
      state
    }, status) {
      return new Promise((resolve, reject) => {
        if (state.my_portrait_url == "" || status) {
          //   let timestamp = (new Date()).valueOf();
          let token = localStorage.getExpire('Token');
          if (token) {
            let tokens = token.split(" ")[1];
            MyPortrait({
              token: tokens
            }).then(res => {
              let url = "data:image/png;base64," + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ""));
              localStorage.setExpire("MY_PORTRAIT_URL", url);
              commit('SET_MY_PORTRAIT_URL', url);
            });
          }
        }
        resolve();
      });
    },


    // UserLogin({
    //   commit
    // }, userInfo) {
    //   const email = userInfo.email.trim();

    // },
    // 邮箱登录
    // LoginByEmail({
    //   commit
    // }, userInfo) {
    //   return new Promise((resolve, reject) => {});
    // },

    // localToken({
    //   commit,
    //   state
    // }, userInfo) {
    //   return new Promise((resolve, reject) => {

    //     if (localStorage.getExpire('Token')) {
    //       if (!state.token) {
    //         commit('SET_TOKEN', localStorage.getExpire('Token'));
    //       }
    //     }
    //   });
    // },

    /**
     * 企业用户登录
     * @param {} param0 
     * @param {*} userInfo 
     */
    companyLogin({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        localStorage.clear();
        CompanyLogin(data).then(response => {
          if (response.data.Success) {
            commit('SET_COMPANY_TOKEN', `Bearer ${response.data.Data.Token}`);
            localStorage.setExpire("COMPANY_TOKEN", `Bearer ${response.data.Data.Token}`);
            let groupId = response.data.Data.GroupId;
            console.info(groupId)
            localStorage.setExpire("GROUP_ID", groupId);
            let data = crypto.Encrypt(response.data.Data);
            localStorage.setExpire("USER_INFO", data);
            commit('SET_USER_INFO', response.data.Data);
          } else { }
          resolve(response)
        }).catch(error => {
          reject(error);
        })
      })
    },
    /**
     * 客服登录
     * @param {*} param0 
     * @param {*} data 
     */
    CustomerLogin({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        localStorage.clear();
        CustomerLogin(data).then(response => {
          if (response.data.Success) {
            commit('SET_COMPANY_TOKEN', `Bearer ${response.data.Data.Token}`);
            localStorage.setExpire("COMPANY_TOKEN", `Bearer ${response.data.Data.Token}`);
            // commit('SET_ROLES', ['company']);
            let GroupId = response.data.Data.GroupId;
            localStorage.setExpire("GROUP_ID", `${GroupId}`);
            let data = crypto.Encrypt(response.data.Data);
            localStorage.setExpire("USER_INFO", data);
            commit('SET_USER_INFO', response.data.Data);
          } else { }
          resolve(response)
        }).catch(error => {
          reject(error);
        })
      })
    },
    /**
     * 修改当前缓存userinfo
     * @param {} param0 
     * @param {*} data 
     */
    updateUserInfo({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        if (state.user_info) {
          let userInfo = Object.assign(state.user_info, data);
          commit('SET_USER_INFO', userInfo);
          let data = crypto.Encrypt(userInfo);
          localStorage.setExpire("USER_INFO", data);
          resolve();
        } else {
          reject();
        }
      })
    },

    /**
     * 
     * 注册保存后登陆
     * 
    */
    AddCompanyRegister({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        AddCompanyRegister(data).then(response => {
          if (response.data.Success) {
            // return;
            // commit('SET_COMPANY_TOKEN', `Bearer ${response.data.Data.Token}`);
            // localStorage.setExpire("COMPANY_TOKEN",`Bearer ${response.data.Data.Token}`);
            // commit('SET_ROLES', ['company']);
            // localStorage.setExpire("USER_INFO",response.data.Data,24*7);
            // commit('SET_USER_INFO', response.data.Data);
          } else { }
          resolve(response)
        }).catch(error => {
          reject(error);
        })
      })
    },

    //手机号登录
    LoginByPhone({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        Login(userInfo).then(response => {
          if (response.data.Success) {
            commit('SET_TOKEN', `Bearer ${response.data.Data.Token}`);
            localStorage.setExpire("Token", `Bearer ${response.data.Data.Token}`);
            commit('SET_ROLES', ['personage']);
            // dispatch('MyInformation');
          } else { }
          resolve(response)
        }).catch(error => {
          reject(error);
        })
      })
    },

    /**
     * 获取应聘者info
     * @param {} param0 
     * @param {*} userInfo 
     */
    MyInformation({
      commit
    }, status) {
      return new Promise((resolve, reject) => {
        if (localStorage.getExpire("MY_INFO_DATA") == null || status) {
          MyInformation({}).then(response => {
            if (response.data.Success) {
              localStorage.setExpire("MY_INFO_DATA", JSON.stringify(response.data.Data));
              commit('SET_MY_INFO_DATA', response.data.Data);
            } else { }
            resolve(response)
          }).catch(error => {
            reject(error);
          })
        } else {
          let data = JSON.parse(localStorage.getExpire("MY_INFO_DATA"));
          let res = {
            data: {
              Success: true,
              Data: data
            }
          }
          commit('SET_MY_INFO_DATA', data);
          resolve(res);
        }
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        if (state.company_token) {
          commit('SET_ROLES', ['company']);
        } else {
          // router.push({
          //   path: "/CompanyLogin"
          // });
          localStorage.clear();
          commit('SET_ROLES', ['caller']);
        }
        //const roles = ['personage']   //权限角色管理   caller  访客角色     company 企业角色    personage个人角色
        resolve();
      });
    },

    AddCount({ commit, state }) {
      return new Promise((resolve) => {
        AddCount({ Source: 1 }).then(response => {
          resolve();
        })
      })
    },


    getCaller({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        localStorage.clear();
        commit('SET_ROLES', ['caller']);
        // router.push({
        //   path: "/home"
        // });
        // this.$router.go(0);
        //const roles = ['personage']   //权限角色管理   caller  访客角色     company 企业角色    personage个人角色
        resolve();
      });
    },

    getCompanyLogin({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        if (state.company_token) {
          commit('SET_ROLES', ['company']);
          resolve(true);
        } else {
          localStorage.clear();
          commit('SET_ROLES', ['companyLogin']);
          resolve();
        }
        //const roles = ['personage']   //权限角色管理   caller  访客角色     company 企业角色    personage个人角色

      });
    },

    GetCompany({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        // commit('SET_COMPANY_TOKEN', `Bearer 111111`);
        // localStorage.setExpire("COMPANY_TOKEN", `Bearer 1111111`);
        // commit('SET_ROLES', ['company']);
        //const roles = ['personage']   //权限角色管理   caller  访客角色     company 企业角色    personage个人角色
        resolve();
      });
    },
    // 第三方验证登录
    // LoginByThirdparty({
    //   commit,
    //   state
    // }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code);
    //     loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
    //       commit('SET_TOKEN', response.data.token);
    //       Cookies.set('token', response.data.token);
    //       resolve();
    //     }).catch(error => {
    //       reject(error);
    //     });
    //   });
    // },


    // 登出
    LogOut({
      commit, state
    }, status) {
      return new Promise((resolve, reject) => {
        localStorage.clear();
        commit('SET_TOKEN', '');
        if (status) {
          // Object.key(state).foreach((k) => {
          //   console.info(k)
          // })
          commit('SET_COMPANY_TOKEN', '');
          commit("SET_USER_INFO", '')
          commit('SET_ROLES', ['companyLogin']);
        } else {
          commit('SET_ROLES', ['caller']);
        }
        resolve();
      });
    },

    // 前端 登出
    // FedLogOut({
    //   commit
    // }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '');
    //     Cookies.remove('token');
    //     // alert("has logout");
    //     resolve();
    //   });
    // },

    // 动态修改权限
    // ChangeRole({
    //   commit
    // }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_ROLES', [role]);
    //     commit('SET_TOKEN', role);
    //     Cookies.set('token', role);
    //     resolve();
    //   })
    // }
  }
};

export default user;
