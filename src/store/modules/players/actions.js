import to from 'lib/async-to';
import playerService from 'api/playerService';
import { PLAYERS_FETCH } from 'store/action-types';
import { PLAYERS_SET } from 'store/mutation-types';

export default {
  async [PLAYERS_FETCH]({ commit }) {
    const [, result = []] = await to(playerService.getAllPlayers());
    commit(PLAYERS_SET, result);
    return result;
  },
};
