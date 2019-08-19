import Vue from 'vue';
import GraphQLClient from '@/lib/GraphQLClient';
import { login, signup, getCurrent, changePassword } from '@/api/userService';

const STORAGE_KEY = 'kiper-jwt';

const defaultState = {
  currentUser: null,
  authToken: null,
};

const mutations = {
  setCurrentUser(state, user) {
    Vue.set(state, 'currentUser', user);
  },

  setAuthToken(state, token) {
    Vue.set(state, 'authToken', token);
    GraphQLClient.setBearerToken(token);
    if (token) {
      window.localStorage.setItem(STORAGE_KEY, token);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  },
};

const actions = {
  init({ commit }) {
    const token = window.localStorage.getItem(STORAGE_KEY);
    if (token) {
      commit('setAuthToken', token);
    }
  },

  async login({ commit }, { email, password }) {
    const { token, user } = await login(email, password);
    commit('setAuthToken', token);
    commit('setCurrentUser', user);
    return { token, user };
  },

  async signup({ commit }, input) {
    const { token, user } = await signup(input);
    commit('setAuthToken', token);
    commit('setCurrentUser', user);
    return { token, user };
  },

  async current({ commit, state }) {
    if (state.currentUser) {
      return state.currentUser;
    }
    const user = await getCurrent();
    commit('setCurrentUser', user);
    return user;
  },

  async changePassword({ commit }, input) {
    const user = await changePassword(input);
    commit('setCurrentUser', user);
    return user;
  },

  logout({ commit }) {
    commit('setCurrentUser', null);
    commit('setAuthToken', null);
  },
};

export default {
  state: defaultState,
  mutations,
  actions,
};
