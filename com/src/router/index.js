
import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full'
// import Full2 from '@/containers/Full2'
// import Buttons from '@/views/components/Buttons'
// Views - Pages
// import Page404 from '@/views/errorPages/Page404'
// import Page500 from '@/views/errorPages/Page500'


/* login */
// const Login = _import('login/index');
Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/',
    // redirect: '/Home',
    name: '首页',
    component: Full,
    hidden: false,
    children: [
      { path: '/CompanyLogin', name: '登陆', component: _import('company/CompanyLogin'), hidden: true },
      { path: '/AboutUS', name: '关于我们', icon: 'speedometer', component: _import('home/AboutUs'), hidden: true },
      { path: '/PrivacyClause', name: '隐私条款', icon: 'speedometer', component: _import('home/PrivacyClause'), hidden: true },
      { path: '/ServiceAgreement', name: '服务协议', icon: 'speedometer', component: _import('home/ServiceAgreement'), hidden: true },
      { path: '/ExperienceFeedback', name: '体验反馈', icon: 'speedometer', component: _import('home/ExperienceFeedback'), hidden: true },
      { path: '/JoinUs', name: '加入我们', icon: 'speedometer', component: _import('home/JoinUs'), hidden: true },
      { path: '/CustomerLogin', name: "客服登录", component: _import('company/CustomerLogin'), hidden: true },
    ]
  }
  // { path: '/login', component: Login, hidden: true },
  // { path: '/test', name: 'Test', icon: 'speedometer', component: _import('Test') },
  // { path: '/home', name: '首页', icon: 'speedometer', component: _import('home') },
  // {
  //   path: '/pages', 
  //   redirect: '/pages/p404', 
  //   name: 'Pages',
  //   component: {
  //     render(c) { return c('router-view') }
  //     // Full,
  //   },

  //   children: [{ path: '404', name: 'Page404', component: _import('errorPages/Page404') },
  //   { path: '500', name: 'Page500', component: _import('errorPages/Page404') },
  //   ]
  // }
]

export default new Router({
  mode: 'hash', //'history'  
  // mode: 'history', //'hash'  
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

// export const asyncRouterMap = [{
//   path: '/',
//   redirect: '/home',
//   name: '首页',
//   component: Full,
//   hidden: false,
//   children: [
//       { path: '/home', name: '首页', icon: 'speedometer', component: _import('home') },
//   ]
// },
// { path: '*', redirect: '/pages/404', hidden: true }
// ]


export const asyncRouterMap = [{
  path: '/',
  // redirect: '/Home',
  name: '首页',
  component: Full,
  hidden: false,
  children: [
    { path: '/Home', name: '首页', icon: 'speedometer', component: _import('Home'), meta: { role: ['caller'] } },
    { path: '/CandidateHome', name: '首页', icon: 'speedometer', component: _import('CandidateHome'), meta: { role: ['personage'] } },
    { path: '/position', name: '职位', icon: 'speedometer', component: _import('Position'), meta: { role: ['personage', 'caller'] } },
    { path: '/positionDetail', name: '职位详情', icon: 'speedometer', component: _import('PositionDetail'), hidden: true },
    { path: '/companyDetail', name: '公司详情', icon: 'speedometer', component: _import('CompanyDetail'), hidden: true },
    { path: '/CompanyInformationsUserMan', name: '企业信息维护用户管理', component: _import('company/CompanyInformationsUserMan'), hidden: true },
    {
      path: '/resume',
      redirect: '/resume',
      name: '简历',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        { path: '/resume', name: '简历', component: _import('Resume'), meta: { role: ['personage'] } },
        { path: '/refreshResume', name: '简历预览', component: _import('RefreshResume'), meta: { role: ['personage'] } },
      ], meta: { role: ['personage'] }
    },

    { path: '/PersonalCenter', name: '个人中心', icon: 'ios-paper', component: _import('PersonalCenter'), meta: { role: ['personage'] }, hidden: true },
    { path: '/productService', name: '产品服务', icon: 'speedometer', component: _import('ProductService'), meta: { role: ['caller'] } },
    { path: '/SvgShowList', name: 'svg图标预览', icon: 'speedometer', component: _import('SvgShowList'), hidden: true, meta: { role: ["company"] } },
    { path: '/ImgTest', name: '图片上传剪切', icon: 'speedometer', component: _import('ImgTest'), hidden: true },


    { path: '/CompanyLogin', name: '登陆', component: _import('company/CompanyLogin'), hidden: true },
    { path: '/customerlogin', name: "客服登录", component: _import('company/CustomerLogin'), hidden: true },

    { path: '/CompanyHome', name: '首页', component: _import('company/CompanyHome'), meta: { role: ['company'] } },



    {
      path: '/IssuePosition', name: '发布职位', redirect: '/IssuePosition/IssuePosition', component: {
        render(c) { return c('router-view') }
      },
      children: [
        { path: "IssuePosition", name: "IssuePosition", component: _import("company/IssuePosition"), meta: { role: ["company"] } },
        { path: "PreviewPosition", paths: "PreviewPosition", name: "PreviewPosition", component: _import("company/PreviewPosition"), meta: { role: ["company"] } },
      ],
      meta: { role: ['company'] }
    },


    // { path: '/SearchResume', name: '搜索简历', component: _import('company/SearchResume'), meta: { role: ['company'] } },
    { path: '/PositionManager', name: '职位管理', component: _import('company/PositionManager'), meta: { role: ['company'] } },
    { path: '/ResumeDetail', name: '简历预览', component: _import('company/ResumeDetail'), hidden: true, meta: { role: ['company'] } },
    {
      path: "/ResumeManage",
      redirect: "/ResumeManage/ApplyResume",
      name: "简历管理",
      component: _import("company/ResumeManage"),
      children: [
        // { path: "/ResumeManage", name: "简历管理", component: _import("company/ResumeManage"), meta: { role: ["company"] } },  ResumeDetail.vue
        { path: "ApplyResume", paths: "ApplyResume", name: "应聘简历", component: _import("company/resumeManage/ApplyResume"), meta: { role: ["company"] } },
        { path: "MyFavorite", paths: "MyFavorite", name: "我的收藏", component: _import("company/resumeManage/MyFavorite"), meta: { role: ["company"] } },
        { path: "ImportResumeManager", paths: "ImportResumeManager", name: "导入简历", component: _import("company/resumeManage/ImportResumeManager"), meta: { role: ["company"] } },
        { path: "AddResume", paths: "AddResume", name: "新增简历", component: _import("company/resumeManage/AddResume"), meta: { role: ["company"] } },
        { path: "CompanyResumeLibrary", paths: "CompanyResumeLibrary", name: "公司简历库", component: _import("company/resumeManage/CompanyResumeLibrary"), meta: { role: ["company"] } },


      ],
      meta: { role: ["company"] }
    },


    { path: '/EntrustService', name: '委托服务', component: _import('company/EntrustService'), meta: { role: ['company'] } },

    { path: '/AboutUS', name: '关于我们', icon: 'speedometer', component: _import('home/AboutUs'), hidden: true },
    { path: '/PrivacyClause', name: '隐私条款', icon: 'speedometer', component: _import('home/PrivacyClause'), hidden: true },
    { path: '/ServiceAgreement', name: '服务协议', icon: 'speedometer', component: _import('home/ServiceAgreement'), hidden: true },
    { path: '/ExperienceFeedback', name: '体验反馈', icon: 'speedometer', component: _import('home/ExperienceFeedback'), hidden: true },
    { path: '/JoinUs', name: '加入我们', icon: 'speedometer', component: _import('home/JoinUs'), hidden: true }
  ]
}
  // { path: '*', redirect: '/pages/404', hidden: true }
]