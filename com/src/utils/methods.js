export default {
  GetSEX() {
    return "ahaha";
  },
  IsVal(val) {
    if (val == null || val == "") {
      return false
    } else {
      if (val.length > 0) {
        if (val[0] == "") {
          return false
        }
      }
      return true
    }
  },
  /**
  *  js中字符串超长作固定长度加省略号（...）处理
  * @param str 需要进行处理的字符串，可含汉字
  * @param len 需要显示多少个汉字，两个英文字母相当于一个汉字
  * @returns {string}
  */
  beautySub: function (str, len) {
    var reg = /[\u4e00-\u9fa5]/g,    //专业匹配中文
      slice = str.substring(0, len),
      chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length)),
      realen = slice.length * 2 - chineseCharNum;
    return str.substr(0, realen) + (realen < str.length ? "..." : "");
  },
  Format(date, fmt) { //author: meizz 
    if (date == "－－－－") {
      return date
    }
    if (date == null) {
      return "N/A"
    }
    if (date == "")
      return "N/A";
    try {
      date = new Date(date);
    } catch (e) {
      date = date;
    }
    fmt = fmt ? fmt : 'yyyy-MM-dd';
    var o = {
      "M+": date.getMonth() + 1, //月份 
      "d+": date.getDate(), //日 
      "H+": date.getHours(), //小时 
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
   formatDateTime(value) {
    if (typeof value == "undefined") {
      return "";
    } else {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  IsNull(data, fmt) { //author: meizz 
    if (data == "" || data == null) {
      if (fmt) {
        return "N/A";
      } else {
        return "N/A";
      }
    } else {
      return data;
    }
  },
  IsArrayChilds(data) {
    if (data) {
      if (data.length > 0) {
        return data[0].Childs
      } else {
        return [];
      }
    } else {
      return []
    }
  },
  IsNulls(data, fmt) { //author: meizz 
    if (data == "" || data == null) {
      return "N/A";
    } else {
      return data + fmt;
    }
  },
  IsNullItem(data, exp) {
    if (typeof (exp) == "undefined" || exp === null) {
      return '|--'
    }
    if (data) {
      return "|" + data;
    } else {
      return '|--'
    }
  },
  GetCitySelectData(data) {
    let list = [];
    if (!data) return [];
    else {
      if (data.length > 0) {
        data.forEach((item, i) => {
          let children = [];
          if (item.Childs) {
            if (item.Childs.length > 0) {
              for (let ch of item.Childs) {
                children.push({
                  value: ch.ItemName,
                  code: ch.ItemCode,
                  label: ch.ItemName
                });
              }
            }
          }
          list.push({
            value: item.ItemName,
            label: item.ItemName,
            children: children
          });
        });
      }
    }
    return list;
  }
}








// exports.Format = function (date, fmt) { //author: meizz 
//     try{
//         date = new Date(date);
//     }catch(e){
//         date = date;
//     }
//     if (date == null)
//       return null;

//     fmt = fmt ? fmt:'yyyy-MM-dd';
//     var o = {
//       "M+": date.getMonth() + 1, //月份 
//       "d+": date.getDate(), //日 
//       "H+": date.getHours(), //小时 
//       "m+": date.getMinutes(), //分
//       "s+": date.getSeconds(), //秒 
//       "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
//       "S": date.getMilliseconds() //毫秒 
//     };
//     if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
//     for (var k in o)
//       if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//     return fmt;
//   }

// exports.GetSEX = function() {
//   return "ahaha";
// }

// export function GetCitySelectData(){

// }

// exports.GetCitySelectData = ((data)=> {
//   let list = [];
//   if(!data) return [];
//   else{
//   if (data.length>0) {
//     data.forEach((item, i) => {
//       let children = [];
//       if (item.Childs){
//         if (item.Childs.length > 0) {
//           // for (let ch of item.Childs) {
//           //   children.push({
//           //     value: ch.ItemName,
//           //     label: ch.ItemName
//           //   });
//           // }
//         }
//       }

//       // list.push({
//       //   value: item.ItemName,
//       //   label: item.ItemName,
//       //   children: children
//       // });
//     });
//   }
// }
//   return list;
// })
