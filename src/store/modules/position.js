import Cookies from 'js-cookie';

const position = {
  state: {
    searchData:{},
    position_list:{},
    favorite_total:0,
    delivered_record_total:0,
  },
  mutations: {
    UPDATE_SEARCH_DATA: (state, data) => {
      state.searchData=data
    },
    UPDATE_POSITION_LIST:(state, data) => {
      state.position_list=data
    },
    FAVORITE_TOTAL:(state, data) => {
      state.favorite_total=data
    },
    DELIVERED_RECORD_TOTAL:(state, data) => {
      state.delivered_record_total=data
    },
  },
  actions: {
    setSearchData: ({ commit }, data) => {
      commit('UPDATE_SEARCH_DATA', data)
    },
    editPositionList:({ commit }, data) => {
      commit('UPDATE_POSITION_LIST', data)
    },

    updateFavoriteTotal:({ commit }, data) => {
      commit('FAVORITE_TOTAL', data)
    },

    updateDeliveredRecordTotal:({ commit }, data) => {
      commit('DELIVERED_RECORD_TOTAL', data)
    },
  }
};

export default position;
