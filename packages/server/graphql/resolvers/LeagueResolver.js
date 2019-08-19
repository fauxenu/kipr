import { hasAuth, canEdit } from '../auth';
import League from '../../models/League';
import User from '../../models/User';

export default {
  Query: {
    async league(root, args) {
      return League.findOne(args).exec();
    },

    async leagues(root, { name, ownerId }) {
      const conditions = {
        ...name && { name: new RegExp(name, 'i') },
        ...ownerId && { ownerId },
      };
      return League.find(conditions).exec();
    },
  },
  League: {
    owner({ ownerId }) {
      return User.findById(ownerId).exec();
    },
  },
  Mutation: {
    async  addLeague(root, { input }, { user }) {
      await hasAuth(user);
      const league = new League({ ownerId: user.id, ...input });
      return league.save();
    },

    async editLeague(root, { input }, { user }) {
      const { id, ...data } = input;
      await canEdit(user, id, League);
      return League.findByIdAndUpdate(id, { $set: { data } }).exec();
    },

    async deleteLeague(root, { id }, { user }) {
      await canEdit(user, id, League);
      return League.findByIdAndRemove(id).exec();
    },
  },
};
