# 人才拼图PC端
(按角色分为企业端、个人端）
原型：[蓝湖](https://lanhuapp.com/web/#/item/project/product?type=share_mark&pid=d825f6de-abd6-4d62-84e2-34447803c4cc&activeSectionId=&teamId=d38a43e5-99db-4542-a05d-de8b126be013&param=550bec02-f516-4316-bfc7-f3095b562cbc&docId=75839cfd-9789-4e50-addd-05c83b3729e9&docType=axure&pageId=cdf3e8e6ae6348ffa9ada574d417e2d8&image_id=75839cfd-9789-4e50-addd-05c83b3729e9)

[icons](https://www.iconfont.cn/)  @\icons\svg\iconfonts.svg

git clone -b Portal http://172.16.4.127:8089/zhaopin/zhaopin.git

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

路由配置

src\login.js    登录路由守卫
    store.dispatch('GetInfo').then(res => { // 拉取user_info 
        const roles = ['caller']   //权限角色管理   caller  访客角色     firms 企业角色    personage个人角色
        store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        next({ ...to }) // hack方法 确保addRoutes已完成
    })
    src\router\index.js  文件配置  meta: { role: ['firms'] }   // firms 企业角色
src\router\index.js  路由配置文件   meta: { role: ['admin2'] }
src\store\modules\permission.js  路由权限递归处理

config\prod.env.js  开发环境
config\prod.env.js  正式环境

src\router\_import_development.js   开发环境路径配置
src\router\_import_production.js  正式环境路径配置




src\api\api.js   接口定义配置

src\utils\fetch.js  axios拦截器统一处理



src\components\Headers.vue  页头
src\components\Footers.vue  页尾
src\containers\Full.vue  页面整合


src\store\modules  状态管理模块化配置文件
src\views   页面路径
src\utils   常用工具库
src\router   路由配置
static   静态文件



"axios": "^0.19.2",
"element-ui": "^2.13.1",
"js-cookie": "^2.2.1",
"nprogress": "^0.2.0",
"vue": "^2.5.2",
"vue-router": "^3.0.1",
"vuex": "^3.3.0",
"xlsx": "^0.16.0"


"sass": "^1.26.5",
"sass-loader": "^7.3.1",