import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters';
import basicData from "./modules/basicData"
import resume from "./modules/resume"
import position from "./modules/position"
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    basicData,
    resume,
    position
  },
  getters
});

export default store
