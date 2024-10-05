const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({

  name: { 
    type: String, 
    required: true 
},
  hackathon: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Hackathon', 
    required: true 
},
  members: [{ 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User' 
    }],  // List of users who are team members



  submittedProject: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Project' }
     
     // Team's submitted project (optional)
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
