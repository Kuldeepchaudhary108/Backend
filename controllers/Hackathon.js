import Hackathon from '../models/Hackathon.js';

// Event Card Image
export const getCardImage=async(req,res)=>{
    const { path } = req.body; 
    const imageUrl = `${req.protocol}://${req.get('host')}/${path}`;
    res.send({ url: imageUrl });
}

// Fetch all Events
export const getEvents= async(req,res)=>{
    try {
        let events=await Hackathon.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
}

// Create a new Hackathon
export const create= async (req, res) => {
    try {
        const { title, description, date, teams } = req.body;

        console.log(req.file)

        if (!req.file) {
            res.status(400).send("no file uploaded");
            return;
        }
        const imagePath = req.file.path;

        if (!title || !date) {
            return res.status(400).json({ message: 'Title and date are required.' });
        }

        const newHackathon = new Hackathon({
            title,
            description,
            date,
            teams,
            image: imagePath
        });

        await newHackathon.save();
        res.status(201).json({ message: 'Hackathon created successfully', hackathon: newHackathon });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};
