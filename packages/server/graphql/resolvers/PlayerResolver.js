import { isAdmin } from '../auth';
import Player from '../../models/Player';

export default {
  Query: {
    async player(root, args) {
      return Player.findOne(args).exec();
    },

    async players(root, { name, position }) {
      const conditions = {
        ...name && { name: new RegExp(name, 'i') },
        ...position && { position },
      };
      return Player.find(conditions).exec();
    },
  },
  Mutation: {
    async addPlayer(root, { input }, { user }) {
      await isAdmin(user);
      const newPlayer = new Player(input);
      return newPlayer.save();
    },

    async editPlayer(root, { input }, { user }) {
      await isAdmin(user);
      return Player.findByIdAndUpdate(input.id, { $set: input }).exec();
    },

    async deletePlayer(root, { id }, { user }) {
      await isAdmin(user);
      return Player.findByIdAndRemove(id).exec();
    },

    async importPlayers(root, { input = [] }, { user }) {
      await isAdmin(user);

      const payload = input.map(player => ({
        updateOne: {
          filter: { externalId: player.externalId },
          update: { $set: player },
          upsert: true,
        },
      }));

      const updated = Player.collection.bulkWrite(payload);
      return updated;
    },
  },
};
