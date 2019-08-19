import { hasAuth, canEdit } from '../auth';
import Team from '../../models/Team';
import Player from '../../models/Player';
import League from '../../models/League';
import Draft from '../../models/Draft';
import User from '../../models/User';

export default {
  Query: {
    async team(root, { id }, { user }) {
      await hasAuth(user);
      return Team.findById(id).exec();
    },

    async teams(root, { ownerId, name }, { user }) {
      await hasAuth(user);
      const conditions = {
        ...ownerId && { ownerId },
        ...name && { name },
      };
      return Team.find(conditions).exec();
    },
  },
  Team: {
    owner({ ownerId }) {
      return User.findById(ownerId).exec();
    },

    players({ playerIds }) {
      return Player.find({ _id: { $in: playerIds } }).exec();
    },

    favoritePlayers({ favoritePlayerIds }) {
      return Player.find({ _id: { $in: favoritePlayerIds } }).exec();
    },

    async draft({ draftId }) {
      return Draft.findById(draftId).exec();
    },

    async league({ draftId }) {
      const draft = await this.draft({ draftId });
      return draft ? League.findById(draft.leagueId).exec() : null;
    },
  },
  Mutation: {
    async addTeam(root, { input }, { user }) {
      await hasAuth(user);
      const team = new Team({ ownerId: user.id, ...input });
      return team.save();
    },

    async editTeam(root, { input }, { user }) {
      await canEdit(user, input.id, Team);
      return Team.findOneAndUpdate(input.id, { $set: { input } }).exec();
    },

    async deleteTeam(root, { id }, { user }) {
      await canEdit(user, id, Team);
      return Team.findByIdAndRemove(id).exec();
    },

    async addTeamPlayer(root, { id, playerId }, { user }) {
      await canEdit(user, id, Team);
      return Team.findByIdAndUpdate(id, { $addToSet: { playerIds: playerId } }).exec();
    },

    async removeTeamPlayer(root, { id, playerId }, { user }) {
      await canEdit(user, id, Team);
      return Team.findByIdAndUpdate(id, { $pull: { playerIds: playerId } }).exec();
    },

    async likePlayer(root, { id, playerId }, { user }) {
      await canEdit(user, id, Team);
      return Team.findByIdAndUpdate(id, { $addToSet: { favoritePlayerIds: playerId } }).exec();
    },

    async unlikePlayer(root, { id, playerId }, { user }) {
      await canEdit(user, id, Team);
      return Team.findByIdAndUpdate(id, { $pull: { favoritePlayerIds: playerId } }).exec();
    },
  },
};
