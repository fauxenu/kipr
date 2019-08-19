import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const DraftTransactionSchema = new mongoose.Schema({
  draftId: [{ type: ObjectId, ref: 'Draft', required: true }],
  teamId: { type: ObjectId, ref: 'Team', required: true },
  playerId: { type: ObjectId, ref: 'Player', required: true },
}, { timestamps: true });

const DraftTransaction = mongoose.model('DraftTransaction', DraftTransactionSchema);
export default DraftTransaction;
