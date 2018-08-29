import Vue from 'vue';
import Vuex from 'vuex';
import players from './modules/players';
import drafts from './modules/drafts';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: { players, drafts },
  strict: debug,
});
