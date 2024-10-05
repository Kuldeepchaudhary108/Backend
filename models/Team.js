import mongoose from 'mongoose';

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
    }],
    submittedProject: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project' 
    }
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

// Ensure you have a default export
export default Team; 