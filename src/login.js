import router from './router'
import store from './store'
import vue from 'vue'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
// permissiom judge
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('company') >= 0) return true // admin权限 直接通过
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// register global progress.
const whiteList = ['/CompanyLogin', '/AboutUS','/CustomerLogin', '/PrivacyClause', '/ServiceAgreement', '/ExperienceFeedback', '/JoinUs'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  if (localStorage.getExpire('COMPANY_TOKEN')) { // 判断是否有token  有token登录后页面   无token游客模式     有servertoken服务商模式  
    if (to.path === '/') {  //这就是跳出循环的关键

      // if (localStorage.getExpire('COMPANY_TOKEN') != null) {
      if (to.path === "/CompanyHome") {
        next();
      } else {
        next({
          path: '/CompanyHome'
        })
      }
    } else {
      // //token过期 处白名单以外的都跳到 登录页面
      store.dispatch("AddCount");
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          let roles = store.getters.roles
          store.dispatch('GenerateRoutes', {
            roles
          }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({
              ...to
            }) // hack方法 确保addRoutes已完成
          })

        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/CompanyLogin' })
          })
        })
      } else {
        // to.meta.role = store.getters.roles
        store.dispatch('getNowRoutes', to);
        if (hasPermission(store.getters.roles, to.meta.role)) {
          next()
        } else {
          next({
            path: '/',
            query: {
              noGoBack: true
            }
          })
        }
      }
    }
  } else { //'/CompanyLogin'
    // store.dispatch('LogOut');
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {  //'/' 进入
      next('/CompanyLogin') // 否则全部重定向到登录页
      NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
