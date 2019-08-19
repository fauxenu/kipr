import mongoose from 'mongoose';
import draftStates from '../enums/draftStates';
import draftTypes from '../enums/draftTypes';

const { ObjectId } = mongoose.Schema.Types;

const PositionLimitsSchema = new mongoose.Schema({
  quarterBack: { type: Number, default: 2 },
  runningBack: { type: Number, default: 4 },
  wideReciever: { type: Number, default: 5 },
  tightEnd: { type: Number, default: 3 },
  defense: { type: Number, default: 2 },
  kicker: { type: Number, default: 2 },
  headCoach: { type: Number, default: 0 },
});

const DraftSchema = new mongoose.Schema({
  positionLimits: PositionLimitsSchema,
  ownerId: { type: ObjectId, ref: 'User', required: true },
  leagueId: { type: ObjectId, ref: 'League' },
  skippedTeamIds: [{ type: ObjectId, ref: 'Team' }],
  currentRound: { type: Number, default: 1 },
  currentTurn: { type: Number, default: 0 },
  turnStart: { type: Date },
  turnEnd: { type: Date },
  pausedAt: { type: Date },
  secondsPerTurn: { type: Number, default: 90 },
  secondsLeftInTurn: { type: Number },
  status: { type: String, enum: Object.values(draftStates), default: draftStates.NOT_STARTED },
  type: { type: String, enum: Object.values(draftTypes), default: draftTypes.MANUAL_DRAFT },
}, { timestamps: true });

const Draft = mongoose.model('Draft', DraftSchema);
export default Draft;
