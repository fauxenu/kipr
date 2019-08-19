import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = () => ({
  drafts: [],
  active: null,
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
