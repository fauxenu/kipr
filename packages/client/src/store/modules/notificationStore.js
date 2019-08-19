import Vue from 'vue';

const BASE_ID = 'notifiy-';

const defaultState = {
  notifications: [],
  counter: 0,
};

const actions = {
  show({ commit, state }, { type, message, duration }) {
    const id = BASE_ID + state.counter;
    commit('addNotification', { id, type, message, duration });
    commit('increment');

    if (duration) {
      window.setTimeout(() => commit('deleteNotification', id), duration);
    }
  },

  dismiss({ commit }, { id }) {
    commit('deleteNotification', id);
  },
};

const mutations = {
  addNotification(state, notification) {
    Vue.set(state, 'notifications', [notification, ...state.notifications]);
  },

  deleteNotification(state, id) {
    const notifications = state.notifications.filter(item => item.id !== id);
    Vue.set(state, 'notifications', notifications);
  },

  increment(state) {
    Vue.set(state, 'counter', state.counter + 1);
  },
};

export default {
  namespaced: true,
  state: defaultState,
  actions,
  mutations,
};
