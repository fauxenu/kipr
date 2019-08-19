import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const LeagueSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  ownerId: { type: ObjectId, ref: 'User', required: true },
  logo: { type: String, trim: true },
  description: { type: String, trim: true },
}, { timestamps: true });

const League = mongoose.model('League', LeagueSchema);
export default League;
