const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
    
  title: { 
     type: String,
     required: true 
    },
  description: { 
    type: String
  },
  date: { 
    type: Date, 
    required: true },
  teams: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Team' }]

}, { timestamps: true });

const Hackathon = mongoose.model('Hackathon', hackathonSchema);
module.exports = Hackathon;
