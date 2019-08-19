import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  type: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  externalId: { type: String, unique: true, trim: true },
  teamCode: { type: String, trim: true },
  teamName: { type: String, trim: true },
  rank: Number,
  overallRank: Number,
  byeWeek: Number,
  status: { type: String, trim: true },
  externalUrl: { type: String, trim: true },
});

const Player = mongoose.model('Player', PlayerSchema);
export default Player;
