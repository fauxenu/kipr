import { canEdit, canEditAny, hasAuth } from '../auth';
import Draft from '../../models/Draft';
import DraftTransaction from '../../models/DraftTransaction';
import League from '../../models/League';
import Team from '../../models/Team';
import Player from '../../models/Player';

export default {
  Query: {
    async draft(root, { id }, { user }) {
      await hasAuth(user);
      return Draft.findById(id).exec();
    },

    async drafts(root, { leagueId, ownerId, teamId, type }, { user }) {
      await hasAuth(user);
      let id;
      if (teamId) {
        const team = await Team.findById(teamId).exec();
        id = team && team.draftId;
      }
      const conditions = {
        ...leagueId && { leagueId },
        ...ownerId && { ownerId },
        ...type && { type },
        ...id && { id },
      };
      return Draft.find(conditions).exec();
    },
  },
  Draft: {
    league({ id }) {
      return League.findOne({ draftIds: id }).exec();
    },

    teams({ teamIds }) {
      return Team.find({ _id: { $in: teamIds } }).exec();
    },

    skippedTeams({ skippedTeamIds }) {
      return Team.find({ _id: { $in: skippedTeamIds } }).exec();
    },

    transactions({ transactionIds }) {
      return DraftTransaction.find({ _id: { $in: transactionIds } }).exec();
    },

    async draftedPlayers({ transactionIds }) {
      const transactions = await DraftTransaction.find({ _id: { $in: transactionIds } }).exec();
      const playerIds = transactions.map(item => item.playerId);
      return Player.find({ _id: { $in: playerIds } }).exec();
    },
  },
  Mutation: {
    async addDraft(root, { input }, { user }) {
      let league;
      if (input.leagueId) {
        league = await canEdit(user, input.leagueId, League);
      }
      const ownerId = league ? league.ownerId : user.id;
      const draft = new Draft({ ownerId, ...input });
      return draft.save();
    },

    async editDraft(root, { input }, { user }) {
      await canEdit(user, input.id, Draft);
      return Draft.findOneAndUpdate(input.id, { $set: { input } }).exec();
    },

    async deleteDraft(root, { id }, { user }) {
      await canEdit(user, id, Draft);
      return Draft.findByIdAndRemove(id).exec();
    },

    async draftPlayer(root, { input }, { user }) {
      await canEditAny(user, [
        { id: input.teamId, model: Team },
        { id: input.draftId, model: Draft },
      ]);
      const draft = await Draft.findById(input.draftId);
      const transaction = await (new DraftTransaction(input)).save();
      await Draft.findByIdAndUpdate(draft.id, { $push: { transactionIds: transaction.id } }).exec();
      return transaction;
    },

    async undraftPlayer(root, { input }, { user }) {
      await canEdit(user, input.id, Draft);
      const transaction = await DraftTransaction.findByIdAndRemove(input.transactionId).exec();
      await Draft
        .findByIdAndUpdate(input.id, { $pull: { transactionIds: input.transactionId } })
        .exec();

      return transaction;
    },
  },
};
