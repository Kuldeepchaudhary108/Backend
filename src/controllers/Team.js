import Hackathon from "../models/Hackathon.js";
import Team from "../models/Team.js";
import UserModel from "../models/User.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createTeam = async (req, res) => {
  try {
    const { name, hackathonId, memberIds, projectId } = req.body;

    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    const members = await UserModel.find({ _id: { $in: memberIds } });
    if (members.length !== memberIds.length) {
      return res.status(404).json({ message: "One or more members not found" });
    }

    const newTeam = await Team.create({
      name,
      hackathon: hackathonId,
      members: memberIds,
      submittedProject: projectId || null,
    });

    const teamDetails = await Team.findById(newTeam._id).select(
      "-password -refereshToken"
    );

    if (!teamDetails) {
      throw new ApiError(500, "Something went wrong while creating the team");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, teamDetails, "create team successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
