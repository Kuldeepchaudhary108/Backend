// 
import Leaderboard from '../models/Leaderboard.js'; // Make sure the path is correct
import Hackathon from '../models/Hackathon.js';
import Team from '../models/Team.js';

// Create a new leaderboard entry
export const createLeaderboard = async (req, res) => {
    try {
        const { hackathon, team, rank, score } = req.body;

        // Validate hackathon and team existence
        const hackathonId = await Hackathon.findById(hackathon);
        const teamId = await Team.findById(team);

        if (!hackathonId || !teamId) {
            return res.status(404).json({ message: 'Hackathon or Team not found' });
        }

        // Create a new leaderboard entry
        const newLeaderboard = new Leaderboard({
            hackathon,// store the input ID directly
            team     ,    // store the input ID directly
            rank,
            score
        });

        await newLeaderboard.save();
        res.status(201).json({ message: 'Leaderboard entry created successfully', leaderboard: newLeaderboard });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
