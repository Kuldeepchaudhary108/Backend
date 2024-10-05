import Hackathon from "../models/Hackathon.js";
import Team from "../models/Team.js";
import UserModel from "../models/User.js";

export const createTeam = async (req, res) => {
    try {
        const { name, hackathonId, memberIds, projectId } = req.body;

        const hackathon = await Hackathon.findById(hackathonId);
        if (!hackathon) {
            return res.status(404).json({ message: 'Hackathon not found' });
        }

        const members = await UserModel.find({ '_id': { $in: memberIds } });
        if (members.length !== memberIds.length) {
            return res.status(404).json({ message: 'One or more members not found' });
        }

        const newTeam = new Team({
            name,
            hackathon: hackathonId,
            members: memberIds,
            submittedProject: projectId || null
        });

        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

