const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({

  hackathon:
   {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Hackathon', 
     required: true
     },
  team: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Team', 
     required: true 
    },
  rank: {
     type: Number,
      required: true }, 
       // Rank of the team
  score: { 
    type: Number, 
    default: 0 }  // Score (optional field)
}, { timestamps: true });

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
module.exports = Leaderboard;
