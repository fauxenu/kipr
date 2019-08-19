import DraftTransaction from '../../models/DraftTransaction';
import { hasAuth } from '../auth';
import Team from '../../models/Team';
import Player from '../../models/Player';

export default {
  Query: {
    async draftTransaction(root, { id }, user) {
      await hasAuth(user);
      return DraftTransaction.findById(id).exec();
    },

    async draftTransactions(root, { draftId, teamId }, user) {
      await hasAuth(user);
      const conditions = {
        ...draftId && { draftId },
        ...teamId && { teamId },
      };
      return DraftTransaction.find(conditions).exec();
    },
  },
  DraftTransaction: {
    team({ teamId }) {
      return Team.findById(teamId).exec();
    },

    player({ playerId }) {
      return Player.findById(playerId).exec();
    },
  },
};
