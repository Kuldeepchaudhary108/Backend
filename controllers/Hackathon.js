import Hackathon from '../models/Hackathon.js';

// Create a new Hackathon
export const create= async (req, res) => {
    try {
        const { title, description, date, teams } = req.body;

        if (!title || !date) {
            return res.status(400).json({ message: 'Title and date are required.' });
        }

        const newHackathon = new Hackathon({
            title,
            description,
            date,
            teams,
        });

        await newHackathon.save();
        res.status(201).json({ message: 'Hackathon created successfully', hackathon: newHackathon });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};
