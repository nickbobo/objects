// 'use strict'
// const merge = require('webpack-merge')
// const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   // NODE_ENV: '"development"' //这种写法 vue-loader 版本至少v13.0.0以下
//   NODE_ENV: '"production"' // 这种写法 vue-loader 版本至少v13.0.0以上
// })

//    "build:prod": "cross-env NODE_ENV=production node build/build.js",
module.exports = {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:62116"',  //个人端
  BASE_COMPANY_API:'"http://localhost:62117"', //企业端
  
  // BASE_COMPANY_API:'"http://172.16.112.36:8082"', //企业端测试环境
  
  // BASE_API:'"http://172.16.112.36:8080"',//个人端测试环境
  // BASE_COMPANY_API:'"http://localhost:5000"', //企业端
  // BASE_API: '"http://172.16.112.34:8088"',// 测试环境
  // GroupId: '"ADDC6F6A-1B4C-4D11-BCA1-6C2DDCB68A01"', //中智
  GroupId: '"addc6f6a-1b4c-4d11-bca1-6c2ddcb68a01"',//人才拼图
  // GroupId: '"fb9fd860-859e-47c2-9968-bc02ba3d237b"' //徐汇
  // GroupId:'"b97f07b6-345d-4535-a824-bc61f8ff8a8f"' // 退伍军人
}

