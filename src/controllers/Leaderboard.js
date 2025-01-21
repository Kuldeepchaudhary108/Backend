//
import Leaderboard from "../models/Leaderboard.js"; // Make sure the path is correct
import Hackathon from "../models/Hackathon.js";
import Team from "../models/Team.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Create a new leaderboard entry
export const createLeaderboard = async (req, res) => {
  try {
    const { hackathon, team, rank, score } = req.body;

    // Validate hackathon and team existence
    const hackathonId = await Hackathon.findById(hackathon);
    const teamId = await Team.findById(team);

    if (!hackathonId || !teamId) {
      throw new ApiError(404, "Hackathone or team not found ");
    }

    // Create a new leaderboard entry
    const newLeaderboard = await Leaderboard.create({
      hackathon, // store the input ID directly
      team, // store the input ID directly
      rank,
      score,
    });

    res.status(201).json(new ApiResponse(200, newLeaderboard, " "));
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
