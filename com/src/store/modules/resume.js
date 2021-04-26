import {
  GetBaseInfo,
  CheckResume,
  GetMyResumeScore,
  RefreshResume
} from "api/myResume";
import {
  Message
} from 'element-ui';
const app = {
  state: {
    resume_status: 0,
    add_resume_id: '',
    // name:'',
    // gender:'',
    base_info: localStorage.getExpire("baseInfo") ? JSON.parse(localStorage.getExpire("baseInfo")) : {},
    my_resume_score: localStorage.getExpire("MY_RESUME_SCORE") ? localStorage.getExpire("MY_RESUME_SCORE") : "",

    // {
    //     Name: "张俊波",
    //     Gender: "SEX_01",
    //     Mobile: "17011960321",
    //     Email: "wb.zhangjb@ciicsh.com",
    //     CurIndustry: "影视、媒体、艺术",
    //     CurPosition: "学术专员(实习)(实习)",
    //     Age: 5,
    //     WorkYear: 0,
    //     Education: "博士",
    //     Hukou: "安顺",
    //     City: "上海1",
    //     Birthday: "2014-12-09T16:00:00",
    //     Marital: "未婚",
    //     IsHide: false
    // }

    // "Name": "张俊波",
    // "Gender": "SEX_01",
    // "Mobile": "17011960321",
    // "Email": "wb.zhangjb@ciicsh.com",
    // "CurIndustry": "影视、媒体、艺术",
    // "CurPosition": "学术专员(实习)(实习)",
    // "Age": 5,
    // "WorkYear": 0,
    // "Education": "博士",
    // "Hukou": "安顺",
    // "City": "上海1",
    // "Birthday": "2014-12-09T16:00:00",
    // "Marital": "未婚",
    // "IsHide": false
    // Degree:学历,Salary:薪资,StaffSize:企业规模
  },
  mutations: {
    SET_RESUME_STATUS: (state, item) => {
      state.resume_status = item;
    },
    SET_BASE_INFO: (state, item) => {
      state.base_info = item;
    },
    SET_MY_RESUME_SCORE: (state, item) => {
      state.my_resume_score = item;
    },
    SET_ADD_RESUME_ID: (state, item) => {
      state.add_resume_id = item;
    }
  },
  actions: {
    updateAddResumeId: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        commit('SET_ADD_RESUME_ID', id)
        resolve();
      })
    },
    editResumeStatus: ({
      commit
    }, status) => {
      return new Promise((resolve, reject) => {
        commit('SET_RESUME_STATUS', status)
        resolve();
      });
    },
    getBaseInfo: ({
      commit
    }, status) => { //获取用户简历信息
      return new Promise((resolve, reject) => {
        let baseInfo = localStorage.getExpire("baseInfo")
        if (baseInfo == null || status) {
          GetBaseInfo().then(response => {
            if (response.data.Success) {
              commit('SET_BASE_INFO', response.data.Data);
              localStorage.setExpire("baseInfo", JSON.stringify(response.data.Data));
              resolve(response)
            } else {
              reject(response)
            }
          }).catch(error => {
            reject(error);
          })

        } else {
          let data = JSON.parse(localStorage.getExpire("baseInfo"));
          let res = {
            data: {
              Success: true,
              Data: data
            }
          }
          commit('SET_BASE_INFO', data);
          resolve(res);
        }
      })
    },
    /**
     * 当前简历完成度
     */
    GetMyResumeScore: ({
      commit
    }, status) => { //获取用户简历信息
      return new Promise((resolve, reject) => {
        // if (localStorage.getExpire('MY_RESUME_SCORE')) {
        //   commit('SET_MY_RESUME_SCORE', localStorage.getExpire('MY_RESUME_SCORE'));
        //   resolve(localStorage.getExpire('MY_RESUME_SCORE'));
        // } else {
        GetMyResumeScore({}).then(response => {
          if (response.data.Success) {
            //   this.percentage = Number(res.data.Data.split('%')[0]);
            commit('SET_MY_RESUME_SCORE', response.data.Data);
            localStorage.setExpire("MY_RESUME_SCORE", response.data.Data);
          } else { }
          resolve(response)
        }).catch(error => {
          reject(error);
        })
        // }
      })
    },
    /**
     * {status:true}  强制更新简历状态  false或者为空从state里面获取状态
     */
    setCheckResume: ({
      commit,
      state
    }, status) => {
      return new Promise((resolve, reject) => {
        if (state.resume_status == 0 || status) {
          CheckResume().then(res => {
            if (res.data.Success) {
              commit('SET_RESUME_STATUS', 1)
            } else {
              commit('SET_RESUME_STATUS', 2)
            }
            resolve();
          }).catch(error => {
            reject(error);
          });
        }
      });
    },

    /**简历刷新 */
    RefreshResume: ({
      commit,
      state
    }, status) => {
      return new Promise((resolve, reject) => {
        RefreshResume().then(res => {
          if (res.data.Success) {
            Message({
              message: '简历刷新成功',
              type: 'success',
              duration: 1 * 1000,
            });
          }
          resolve();
        }).catch(error => {
          Message.error('简历刷新失败');
          reject(error);
        });
      });
    },
    // CheckResume() {
    //     CheckResume().then(res => {
    //       if (res.data.Success) {
    //         this.isResume = true;
    //       } else {
    //         this.isResume = false;
    //       }
    //     });
    //   },
  }
};

export default app;
