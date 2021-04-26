import {
  GetCityItemList,
  GetIndustryItemList,// 行业
  GetDictItemJobCategoryList,
  GetDictItemListByCode,
  GetHotKeyWordsList,
  GetCompanyStockList
} from "@/api/api";

import SecureLS from "secure-ls";

import common from "utils/common"
import { deepCopyTwo } from "utils/index"
var ls = new SecureLS({
  encodingType: "DES",
  isCompression: false,
  encryptionSecret: "local"
});
const app = {
  state: { //CityList
    city_item: localStorage.getExpire("CityList") ? JSON.parse(localStorage.getExpire("CityList")) : [],
    industry_item_list: localStorage.getExpire("IndustryList") ? JSON.parse(localStorage.getExpire("IndustryList")) : [],
    dictitem_job_category_list: localStorage.getExpire("PositionList") ? JSON.parse(localStorage.getExpire("PositionList")) : [],
    dict_item_list_by_code: [],
    dd_degree_list: [],
    dd_salary_list: [],
    dd_staff_size_list: [],
    dd_all: localStorage.getExpire("DDAll") ? JSON.parse(localStorage.getExpire("DDAll")) : [],
    hot_search: localStorage.getExpire("HOT_SEARCH") ? JSON.parse(localStorage.getExpire("HOT_SEARCH")) : [],  //热门搜索
    dd_company_stock: localStorage.getExpire("DD_COMPANY_STOCK") ? JSON.parse(localStorage.getExpire("DD_COMPANY_STOCK")) : [],
    dd_company_stock_search: [],


    dd_sex: [], //性别
    dd_work_type: [], //工作性质
    dd_degree: [], //学历
    dd_staff_size: [], //公司员工规模
    dd_staff_size_search: [],
    dd_work_year: [], //工作年限
    dd_marital: [], //婚姻状态
    // dd_study_abroad: [], // 海外留学
    dd_publish_time: [], //发布时间
    dd_publish_channel: [], //职位发布渠道


    dd_political: [],  //政治面貌
    dd_overseas_study: [],  //海外留学

    hot_label: localStorage.getExpire("HOT_LABEL") ? JSON.parse(localStorage.getExpire("HOT_LABEL")) : [],  //热门标签
    dd_update_date_time: [
      {
        id: 0,
        value: "所有"
      },
      {
        id: 1,
        value: "一月内"
      },
      {
        id: 2,
        value: "半月内"
      },
      {
        id: 3,
        value: "一周内"
      }
    ]
  },
  mutations: {

    SET_DD_OVERSEAS_STUDY:(state,item) =>{
      state.dd_overseas_study = item;
    },
    SET_DD_POLITICAL:(state,item) =>{
      state.dd_political = item;
    },
    SET_DD_PUBLISH_CHANNEL: (state, item) => {
      state.dd_publish_channel = item;
    },
    HOT_LABEL: (state, item) => {
      state.hot_label = item;
    },
    DD_SEX: (state, item) => {
      state.dd_sex = item;
    },
    DD_WORK_TYPE: (state, item) => {
      state.dd_work_type = item;
    },
    DD_DEGREE: (state, item) => {
      state.dd_degree = item;
    },
    DD_STAFF_SIZE: (state, item) => {
      state.dd_staff_size = item;
    },
    DD_STAFF_SIZE_SEARCH: (state, data) => {
      state.dd_staff_size_search = data;
    },
    DD_WORK_YEAR: (state, item) => {
      state.dd_work_year = item;
    },
    DD_MARITAL: (state, item) => {
      state.dd_marital = item;
    },
    // DD_STUDY_ABROAD: (state, item) => {
    //   state.dd_study_abroad = item;
    // },
    DD_PUBLISH_TIME: (state, item) => {
      state.dd_publish_time = item;
    },
    GET_CITY_ITEM: (state, CityItem) => {
      state.city_item = CityItem;
    },
    GET_INDUSTRY_ITEM_LIST: (state, item) => {
      state.industry_item_list = item;
    },
    SET_DICTITEM_JOB_CATEGORY: (state, item) => {
      state.dictitem_job_category_list = item
    },
    SET_DILBC: (state, item) => {
      state.dict_item_list_by_code = item
    },
    DD_DEGREE_LIST: (state, item) => {
      state.dd_degree_list = item
    },
    DD_SALARY_LIST: (state, item) => {
      state.dd_salary_list = item
    },
    DD_STAFF_SIZE_LIST: (state, item) => {
      state.dd_staff_size_list = item
    },
    SET_DD_ALL: (state, item) => {
      state.dd_all = item
    },
    HOT_SEARCH: (state, item) => {
      state.hot_search = itemdata
    },

    SET_DD_COMPANY_STOCK: (state, item) => {
      state.dd_company_stock = item
    },
    DD_COMPANY_STOCK_SEARCH: (state, data) => {
      state.dd_staff_size_search = data;
    }
  },
  actions: {
    /**
     * 获取城市字典和热门城市
     */
    getCityItem: ({
      commit
    }) => {
      return new Promise((resolve, reject) => {
        if (localStorage.getExpire('CityList')) {
          commit('GET_CITY_ITEM', JSON.parse(localStorage.getExpire("CityList")))
          resolve();
        } else {
          GetCityItemList({}).then((res) => {
            if (res.data.Success) {
              let data = [];
              for (let items in res.data.Data) {
                data.push({
                  Childs: res.data.Data[items],
                  ItemName: items
                });
              }
              localStorage.setExpire("CityList", JSON.stringify(data));
              commit('GET_CITY_ITEM', data)
              resolve();
            } else { }
          }).catch(error => {
            reject(error);
          });
        }
      });

    },
    /**
     * 获取行业数据字典
     */
    getIndustryItemList: ({
      commit
    }) => {
      return new Promise((resolve, reject) => {
        if (localStorage.getExpire('IndustryList')) {
          commit('GET_INDUSTRY_ITEM_LIST', JSON.parse(localStorage.getExpire("IndustryList")))
          resolve();
        } else {
          GetIndustryItemList({}).then((res) => {
            if (res.data.Success) {
              commit('GET_INDUSTRY_ITEM_LIST', res.data.Data)
              localStorage.setExpire("IndustryList", JSON.stringify(res.data.Data));
              resolve();
            } else { }
          }).catch(error => {
            reject(error);
          });
        }
      });
    },
    /**
     * 获取职位字典
     */
    GetDictItemJobCategoryList: ({
      commit
    }) => {
      return new Promise((resolve, reject) => {
        if (localStorage.getExpire('PositionList')) {
          commit('SET_DICTITEM_JOB_CATEGORY', JSON.parse(localStorage.getExpire("PositionList")))
          resolve();
        } else {
          GetDictItemJobCategoryList({}).then((res) => {
            if (res.data.Success) {
              commit('SET_DICTITEM_JOB_CATEGORY', res.data.Data)
              localStorage.setExpire("PositionList", JSON.stringify(res.data.Data));
              resolve();
            } else { }
          }).catch(error => {
            reject(error);
          });
        }
      });
    },

    /**
     * 全部数据字典装载
     */
    loadingDD: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        commit('DD_STAFF_SIZE', common.getDDByType("StaffSize"))
        commit('SET_DD_PUBLISH_CHANNEL', common.getDDByType("PublishChannel"))
        commit('DD_SEX', common.getDDByType("SEX"))
        commit('DD_WORK_TYPE', common.getDDByType("WorkType"))
        commit('DD_DEGREE', common.getDDByType("Degree"))
        commit('DD_SALARY_LIST', common.getDDByType("Salary"))
        let StaffSize = deepCopyTwo(common.getDDByType("StaffSize"));
        if (StaffSize.length > 0) {
          if (StaffSize[0].ItemName != "企业规模不限") {
            StaffSize.unshift({
              ItemCode: "",
              ItemName: "企业规模不限"
            });
          }
        }
        commit('DD_STAFF_SIZE_SEARCH', StaffSize);
        commit('DD_WORK_YEAR', common.getDDByType("WorkYear"))
        commit('DD_MARITAL', common.getDDByType("Marital"))
        // commit('DD_STUDY_ABROAD', common.getDDByType("StudyAbroad"))


        commit('SET_DD_OVERSEAS_STUDY', common.getDDByType("StudyAbroad"))
        commit('SET_DD_POLITICAL', common.getDDByType("Political"))

        let publishTime = common.getDDByType("PublishTime")
        if (publishTime.length > 0) {
          if (publishTime[0].ItemName)
            publishTime[0].ItemName =
              "刷新时间不限";
        }
        commit('DD_PUBLISH_TIME', publishTime);
        resolve();
      });
    },
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
    getAllDD: ({
      dispatch, commit
    }, type) => { //获取所有数据字典数据
      return new Promise((resolve, reject) => {
        if (localStorage.getExpire("DDAll")) {
          dispatch('loadingDD')
          resolve();
        } else {
          GetDictItemListByCode().then((res) => {
            if (res.data.Success) {
              commit('SET_DD_ALL', res.data.Data);
              localStorage.setExpire("DDAll", JSON.stringify(res.data.Data));
              dispatch('loadingDD');
              resolve();
            } else { }
          }).catch(error => {
            reject(error);
          });
        }
      })
    },


    /**
     * 热门搜索
     */
    getHoTSearch: ({
      commit
    }, type) => {
      return new Promise((resolve, reject) => {
        if (localStorage.getExpire('HOT_SEARCH')) {
          commit('HOT_SEARCH', JSON.parse(localStorage.getExpire("HOT_SEARCH")))
          resolve();
        } else {
          GetHotKeyWordsList({
            type: 1
          }).then((res) => {
            if (res.data.Success) {
              commit('HOT_SEARCH', res.data.Data)
              localStorage.setExpire("HOT_SEARCH", JSON.stringify(res.data.Data));
              resolve();
            } else { }
          }).catch(error => {
            reject(error);
          });
        }
      })
    },

    /**
     * 热门标签
     */
    getHotLabel: ({
      commit
    }, type) => {
      return new Promise((resolve, reject) => {
        if (localStorage.getExpire('HOT_LABEL')) {
          commit('HOT_LABEL', JSON.parse(localStorage.getExpire("HOT_LABEL")))
          resolve();
        } else {
          GetHotKeyWordsList({
            type: 2
          }).then((res) => {
            if (res.data.Success) {
              commit('HOT_LABEL', res.data.Data)
              localStorage.setExpire("HOT_LABEL", JSON.stringify(res.data.Data));
              resolve();
            } else { }
          }).catch(error => {
            reject(error);
          });
        }
      })
    },



    /**
     * 企业性质装载
     */

    CompanyStockLoadingDD: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        let companyStock = JSON.parse(localStorage.getExpire("DD_COMPANY_STOCK"));
        commit('SET_DD_COMPANY_STOCK', companyStock)

        let companyStocks = deepCopyTwo(companyStock);
        if (companyStocks.length > 0) {
          if (companyStocks[0].ItemName != "企业规模不限") {
            companyStocks.unshift({
              ItemCode: "",
              ItemName: "企业性质不限"
            });
          }
        }
        commit('DD_COMPANY_STOCK_SEARCH', companyStocks)

      })
    },

    /**
     * 企业性质
     */
    GetCompanyStockList: ({
      dispatch, commit
    }) => { //获取获取企业性质列表
      return new Promise((resolve, reject) => {
        if (localStorage.getExpire('DD_COMPANY_STOCK')) {
          dispatch("CompanyStockLoadingDD");
          resolve();
        } else {
          GetCompanyStockList().then((res) => {
            if (res.data.Success) {
              let data = [];
              for (let key in res.data.Data) {
                data.push({
                  ItemName: res.data.Data[key],
                  ItemCode: key,
                })
              }
              commit('SET_DD_COMPANY_STOCK', data)
              localStorage.setExpire("DD_COMPANY_STOCK", JSON.stringify(data));

              dispatch("CompanyStockLoadingDD");
              resolve();
            } else { }
          }).catch(error => {
            reject(error);
          });
        }
      })
    },
  }
};

export default app;
