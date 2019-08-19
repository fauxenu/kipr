import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  logo: { type: String, trim: true },
  introTheme: { type: String, trim: true },
  playerIds: [{ type: ObjectId, ref: 'Player', unique: true }],
  favoritePlayerIds: [{ type: ObjectId, ref: 'Player', unique: true }],
  draftId: [{ type: ObjectId, ref: 'Draft', unique: true }],
  ownerId: { type: ObjectId, ref: 'User' },
}, { timestamps: true });

const Team = mongoose.model('Team', TeamSchema);
export default Team;
