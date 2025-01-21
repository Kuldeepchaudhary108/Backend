import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({
    
  title: { 
     type: String,
     required: true 
    },
  image:{
    type:String,
    required: true
  },
  description: { 
    type: String
  },
  date: { 
    type: Date, 
    required: true },
  teams: [{ 
    type: String, 
   ref: 'Team'
    }]

}, { timestamps: true });

const Hackathon = mongoose.model('Hackathon', hackathonSchema);
export default Hackathon