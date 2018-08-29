import Vue from 'vue';
import {
  DRAFTS_SET,
  DRAFTS_ADD,
  DRAFTS_REPLACE,
  DRAFTS_REMOVE,
  DRAFTS_SET_ACTIVE,
} from 'store/mutation-types';

export default {
  [DRAFTS_SET](state, draft) {
    Vue.set(state, 'drafts', draft);
  },

  [DRAFTS_ADD](state, draft) {
    const { drafts } = state;
    Vue.set(state, 'drafts', [...drafts, draft]);
  },

  [DRAFTS_REPLACE](state, draft) {
    const { drafts } = state;
    Vue.set(state, 'drafts', drafts.map(item => (item.slug === draft.slug ? draft : item)));
  },

  [DRAFTS_REMOVE](state, draft) {
    const { drafts } = state;
    Vue.set(state, 'drafts', drafts.filter(({ slug }) => slug !== draft.slug));
  },

  [DRAFTS_SET_ACTIVE](state, slug) {
    Vue.set(state, 'active', slug);
  },
};
