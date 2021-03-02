/**
 */


/**
* @param {string} path
* @returns {Boolean}
*/
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/* 是否是公司邮箱*/
export function isWscnEmail(str) {
  const reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
  return reg.test(str.trim());
}

/* 是否是手机号*/
export function isMobile(str) {
  return /^1[3456789]\d{9}$/.test(str);  //.trim()去掉两边空格
}

/* 账号验证 4到16位（字母，数字，下划线，减号） */
export function isAccount(str) {
  return /^[\u0391-\uFFE5A-Za-z0-9]{2,16}$/.test(str);
}

/* 密码验证 由数字和字母组成，并且要同时含有数字和字母，且长度要在8-16位之间*/
export function isPassword(str) {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(str);
}



/**
 * 中国大陆身份证验证
 * @param {*} str 
 */
export function isIdNo(str) {
  const utlregex = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  return utlregex.test(str);
}


/**
 * 判断是否为国内手机号
 * @param {*} str 
 */
export function isCMobile(str) {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 验证码 大小写数字 共4位 */
export function isCaptcha(str) {
  return /^[a-zA-Z0-9]{4}$/.test(str);
}

/* 手机验证码 数字 共6位 */
export function isMobileCode(str) {
  return /^[0-9]{6}$/.test(str);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 验证key*/
// export function validateKey(str) {
//     var reg = /^[a-z_\-:]+$/;
//     return reg.test(str);
// }

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}



