import Vue from 'vue';
import Vuex from 'vuex';
import players from './modules/players';
import drafts from './modules/drafts';
import users from './modules/usersStore';
import notifications from './modules/notificationStore';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    players,
    drafts,
    users,
    notifications,
  },
  strict: debug,
});
