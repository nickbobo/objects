import Vue from 'vue';
let vue = new Vue();
import vm from "../main"
import store from '../store'
import {
  Form
} from 'element-ui';
import {
  isWscnEmail,
  isMobile,
  isPassword,
  isAccount,
  isCaptcha,
  isMobileCode
} from './validate'



const selectChange = (_this) => {
  vm.$forceUpdate();
}
/**
 * //All所有数据， 
 * Degree:学历,
 * Salary:薪资,
 * StaffSize:企业规模,
 * Marital:婚姻状态,
 * Turnover:年营业额,
 * ArrivalTime:到岗时间,
 * Political:政治面貌,
 * StudyAbroad:海外留学,
 * SEX:性别,
 * WorkType:工作性质,
 * WorkYear:工作年限
 */
const getDDByType = (type) => {
  let data = [];
  if (store.getters.dd_all.length > 0)
    store.getters.dd_all.forEach((item, i) => {
      if (item.ItemCode == type) {
        data = item.Childs
      }
    })
  return data;
}

/**
 * JSON.parse(localStorage.getExpire("CityList"))
 * @param {
 * } type 
 */
const getCityIdByName = (id) => {
  let name = ""
  let CityList = JSON.parse(localStorage.getExpire("CityList"));
  if (CityList) {
    for (let item of CityList) {
      if (item.Childs)
        for (let j of item.Childs) {
          if (id == j.ItemCode) {
            name = j.ItemName;
          }
        }
    }
  }
  return name;
}

/**
 * 根据字典ItemCode 获取ItemName
 * @param {*} that 
 * @param {*} formData 
 */

const getItemNameByItemCode = (list, id) => {
  let name = id
  if (list) {
    for (let item of list) {
      if (item.ItemCode == id) {
        name = item.ItemName
      }
      if (item.Childs) {
        for (let j of item.Childs) {
          if (id == j.ItemCode) {
            name = j.ItemName;
          }
        }
      }
    }
  }
  return name;
}
/**
 * 内容里的换行转换位 <br/>
 * @param {*} str 
 */
const encodeTextAreaString = (str) => {
  if (str == "") return 'N/A'
  var reg = new RegExp("\n", "g");
  str = str.replace(reg, "<br/>");
  var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
  str = str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
  return str;
}

const startTime = (endTime) => {
  return {
    disabledDate: time => {
      if (endTime) {
        return (
          time.getTime() > new Date(endTime).getTime()
        );
      } else {
        return time.getTime() > Date.now();
      }
    }
  }
}

const endTime = (startsTime) => {
  return {
    disabledDate: time => {
      if (startsTime) {
        return (
          time.getTime() > Date.now() ||
          time.getTime() < new Date(startsTime).getTime()
        );
      } else {
        return time.getTime() > Date.now();
      }
    }
  }
}
/**
 * 表单验证封装  
 *     const isExitsCity = (rule, value, callback) => {
      if (this.formData.City.length == 0) {
        callback(new Error("请选择城市"));
      } else {
        callback();
      }
    };
 * 使用方法 { trigger: "blur", validator: this.$formValidate(this).Mobile }
 */

const formValidate = (that, formData) => {
  return {
    CityArray: function (rule, value, callback) {
      if (this.fromData.CityArray.length > 0 && this.fromData.CityArray[1] != "") {
        callback(new Error("请选择城市"));
      } else {
        callback();
      }
    },
    Account: function (rule, value, callback) {
      if (!value) {
        return callback(new Error('用户名/手机号码不能为空'))
      }
      if (!isAccount(value)) {
        callback(new Error('请输入正确格式的用户名/手机号码!(4到16位(字母，数字，下划线，减号) )'))
      }
      if (that.userNameMsg) {
        return callback(new Error(that.userNameMsg))
      } else {
        callback()
      }
    },
    Accounts: function (rule, value, callback) {
      if (!value) {
        return callback(new Error('管理员用户名不能为空'))
      }
      if (!isAccount(value)) {
        callback(new Error('请输入正确格式的管理员用户名!(4到16位(字母，数字，下划线，减号) )'))
      }
      if (that.userNameMsg) {
        return callback(new Error(that.userNameMsg))
      } else {
        callback()
      }
    },
    Email: function (rule, value, callback) {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      if (!isWscnEmail(value)) {
        callback(new Error('请输入正确的邮箱!'))
      } else {
        callback()
      }
    },
    Password: function (rule, value, callback) {
      if (!value) {
        return callback(new Error('密码不能为空'))
      }
      if (!isPassword(value)) {
        callback(new Error('必须含有数字和字母，长度8-16位之间！'))
      } else {
        callback()
      }
    },
    Mobile: function (rule, value, callback) {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      if (!isMobile(value)) {
        callback(new Error("请输入正确格式的手机号"));
      }
      if (that.mobileMsg) {
        callback(new Error(that.mobileMsg));
      } else {
        callback();
      }
    },
    MobileCode: function (rule, value, callback) {
      if (!formData.MobileCode) {
        return callback(new Error('手机验证码不能为空！'))
      }
      if (!isMobileCode(formData.MobileCode)) {
        callback(new Error("请输入正确格式的手机验证码！"));
      }
      if (that.mobileCodeMsg) {
        callback(new Error(that.mobileCodeMsg));
      } else {
        callback();
      }
    },

    Captcha: function (rule, value, callback) {
      if (!value) {
        return callback(new Error('验证码不能为空！'))
      }
      if (that.codeMessage) {
        return callback(new Error(that.codeMessage))
      }
      if (!isCaptcha(value)) {
        callback(new Error('验证码格式错误'))
      } else {
        callback()
      }
    },
  }
}

export default {
  selectChange,
  getDDByType,
  getCityIdByName,
  formValidate,
  getItemNameByItemCode,
  encodeTextAreaString,
  startTime,
  endTime
}
