// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'utils/localStorageExpire'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import '@/styles/index.scss' // global css

import "babel-polyfill"

import 'normalize.css/normalize.css'
Vue.config.productionTip = false;
//element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

//字体图标
import '@/icons' // icon
import common from "./utils/common"
Vue.prototype.common = common
Vue.prototype.$formValidate = common.formValidate

//状态管理
import store from './store';

//动画
import animate from 'animate.css'
Vue.use(animate)

import './login.js'
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)

//vue全局注册方法 可直接获取vue组件this和event
//html->转pdf  下载简历功能
import vueInstallTools from 'utils/vueInstallTools'
Vue.use(vueInstallTools)

//过滤封装
import global from 'utils/methods'
Object.keys(global).forEach(key => {
  Vue.prototype["$" + key] = global[key];
  Vue.filter(key, global[key])
})

//
import GlobalVariable from "api/globalVariable"
Vue.prototype.GLOBAL = GlobalVariable

import bus from "utils/bus"
Vue.prototype.$Bus = bus

Vue.prototype.$apiImgUrl = function (id) { //http://localhost:62117/api/Common/GetFile?file=799f7c83-4716-4e79-88bf-8b5d93e809af&GroupId=addc6f6a-1b4c-4d11-bca1-6c2ddcb68a01
  return `${process.env.BASE_COMPANY_API}/api/Company/GetEnterprisePicture?FileId=${id}`;
}

Vue.prototype.$apiGetFile = function (id) { //http://localhost:62117/api/Common/GetFile?file=799f7c83-4716-4e79-88bf-8b5d93e809af&GroupId=addc6f6a-1b4c-4d11-bca1-6c2ddcb68a01
  return `${process.env.BASE_COMPANY_API}/api/Common/GetFile?file=${id}`;
}

Vue.prototype.$apiCompnyImgUrl = function (id) {
  return `${process.env.BASE_COMPANY_API}/api/Company/GetCompanyLogo?CompanyId=${id}`;
}

let timestamp = new Date().valueOf();
Vue.prototype.$GetCompnyImgUrl = function (id) {
  return `${process.env.BASE_COMPANY_API}/api/CompanyBasic/GetCompanyLogo?companyId=${id}&t=${timestamp}`;
}


Vue.prototype.$getHeadImgUrl = function () {
  let token = localStorage.getExpire('Token');
  return `${process.env.BASE_API}/api/MyPortrait?token=${token.split(" ")[1]}`;;
}

//公共组件封装
import EnterprisePager from "components/EnterprisePager"
Vue.use(EnterprisePager);

import ResetDatePicker from "components/ResetDatePicker"
Vue.use(ResetDatePicker);
//重置表单，formRef为表单的ref值，excludeFields为要排除重新初始化值得属性

import loading from 'utils/loading' // 引入loading
Vue.use(loading) // 全局使用loading

Date.prototype.clone = function () {
  return new Date(this.valueOf());
}
RegExp.prototype.clone = function () {
  var pattern = this.valueOf();
  var flags = '';
  flags += pattern.global ? 'g' : '';
  flags += pattern.ignoreCase ? 'i' : '';
  flags += pattern.multiline ? 'm' : '';
  return new RegExp(pattern.source, flags);
}

Vue.prototype.$reset = function (formRef) {
  this.$refs[formRef].resetFields();
  // let obj1 = this.$data;
  // let obj2 = this.$options.data.call(this);
  // if (!excludeFields || excludeFields.length === 0) {
  //   excludeFields = ["ruleValidate"];
  // }
  // for (let attrName in obj1) {
  //   if (excludeFields && excludeFields.includes(attrName)) {
  //     continue;
  //   }
  //   obj1[attrName] = obj2[attrName];
  // }
};

Vue.prototype.$messages = function (msg) {
  this.$message({ message: msg, duration: 1000 })
}

var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
export default vm;
