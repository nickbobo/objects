const getters = {
  sidebar: state => state.app.sidebar,

  roles: state => state.user.roles,
  setting: state => state.user.setting,
  token: state => state.user.token,
  def_user_header: state => state.user.def_user_header,
  my_portrait_url: state => state.user.my_portrait_url,
  my_info_data: state => state.user.my_info_data,
  user_info: state => state.user.user_info,


  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  siderbar_routers: state => state.permission.siderbar_routers,

  company_token: state => state.user.company_token,

  //基础数据城市列表
  city_item: state => state.basicData.city_item,
  //所属行业 如电子/通信/硬件; 房地产/建筑/物业
  industry_item_list: state => state.basicData.industry_item_list,
  //职能
  dictitem_job_category_list: state => state.basicData.dictitem_job_category_list,

  dd_degree_list: state => state.basicData.dd_degree_list,
  dd_salary_list: state => state.basicData.dd_salary_list,
  dd_staff_size_list: state => state.basicData.dd_staff_size_list,

  resume_status: state => state.resume.resume_status,
  base_info: state => state.resume.base_info,
  dd_all: state => state.basicData.dd_all,
  my_resume_score: state => state.resume.my_resume_score,
  add_resume_id: state => state.resume.add_resume_id,

  hot_search: state => state.basicData.hot_search,

  dd_company_stock: state => state.basicData.dd_company_stock,

  dd_sex: state => state.basicData.dd_sex,
  dd_work_type: state => state.basicData.dd_work_type,
  dd_degree: state => state.basicData.dd_degree,
  dd_staff_size: state => state.basicData.dd_staff_size,
  dd_work_year: state => state.basicData.dd_work_year,
  dd_marital: state => state.basicData.dd_marital,

  dd_publish_time: state => state.basicData.dd_publish_time,//简历更新时间
  dd_publish_channel: state => state.basicData.dd_publish_channel,
  dd_update_date_time: state => state.basicData.dd_update_date_time,


  dd_political: state => state.basicData.dd_political,
  dd_overseas_study: state => state.basicData.dd_overseas_study,

  search_data: state => state.position.searchData,
  favorite_total: state => state.position.favorite_total,
  delivered_record_total: state => state.position.delivered_record_total,

  hot_label: state => state.basicData.hot_label,
};
export default getters
