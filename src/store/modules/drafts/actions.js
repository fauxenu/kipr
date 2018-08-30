import draftService from 'api/draftService';
import {
  DRAFTS_SET,
  DRAFTS_ADD,
  DRAFTS_REPLACE,
  DRAFTS_SET_ACTIVE,
} from 'store/mutation-types';

import {
  DRAFTS_FETCH,
  DRAFTS_GET,
  DRAFTS_CREATE,
  DRAFTS_START,
  DRAFTS_PLAYERS_ADD,
  DRAFTS_PLAYERS_REMOVE,
  DRAFTS_ROSTER_ADD,
  DRAFTS_ROSTER_REMOVE,
  DRAFTS_FAVORITES_ADD,
  DRAFTS_FAVORITES_REMOVE,
} from 'store/action-types';

const managePlayer = async (commit, method, slug, playerId) => {
  const draft = await draftService[method](slug, playerId);
  commit(DRAFTS_REPLACE, draft);
  return draft;
};

export default {
  async [DRAFTS_FETCH]({ commit }) {
    const drafts = await draftService.getAllDrafts();
    if (drafts.length) {
      commit(DRAFTS_SET, drafts);
    }
    return drafts;
  },

  async [DRAFTS_GET]({ commit }, slug) {
    const draft = await draftService.getDraft(slug);
    if (draft) {
      commit(DRAFTS_ADD, draft);
      return draft;
    }
    throw new Error('Draft not found!');
  },

  async [DRAFTS_CREATE]({ commit }, name) {
    const draft = await draftService.createDraft(name);
    commit(DRAFTS_ADD, draft);
    return draft;
  },

  async [DRAFTS_START]({ dispatch, commit }, slug) {
    const draft = await dispatch(DRAFTS_GET, slug);
    commit(DRAFTS_SET_ACTIVE, slug);
    return draft;
  },

  async [DRAFTS_PLAYERS_ADD]({ commit }, { slug, playerId }) {
    return managePlayer(commit, 'addPlayer', slug, playerId);
  },

  async [DRAFTS_PLAYERS_REMOVE]({ commit }, { slug, playerId }) {
    return managePlayer(commit, 'removePlayer', slug, playerId);
  },

  async [DRAFTS_ROSTER_ADD]({ commit }, { slug, playerId }) {
    return managePlayer(commit, 'addToRoster', slug, playerId);
  },

  async [DRAFTS_ROSTER_REMOVE]({ commit }, { slug, playerId }) {
    return managePlayer(commit, 'removeFromRoster', slug, playerId);
  },

  async [DRAFTS_FAVORITES_ADD]({ commit }, { slug, playerId }) {
    return managePlayer(commit, 'addToFavorites', slug, playerId);
  },

  async [DRAFTS_FAVORITES_REMOVE]({ commit }, { slug, playerId }) {
    return managePlayer(commit, 'removeFromFavorites', slug, playerId);
  },
};
