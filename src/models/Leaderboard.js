import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hackathon',
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
export default Leaderboard;
