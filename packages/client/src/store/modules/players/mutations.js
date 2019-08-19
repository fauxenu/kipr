import Vue from 'vue';
import { PLAYERS_SET } from 'store/mutation-types';

export default {
  [PLAYERS_SET](state, players = []) {
    Vue.set(state, 'players', players);
  },
};
