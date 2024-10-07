import express from 'express'
import {  create, getCardImage, getEvents, getFaceDetails, uploadEventImages } from '../controllers/Hackathon.js';
import multer from 'multer';
import path from 'path';


const HackathonRoutes = express.Router()

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + Math.ceil(Math.random() * 100) + path.extname(file.originalname)); // Save with a unique name
//     }
// });

const allowedExt = [".jpg", ".jpeg", ".png"]

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExt.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid File Type!"), false);
    }
}

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter
});

HackathonRoutes.post('/create',upload.single("image"),create)
HackathonRoutes.post('/events',getEvents)
HackathonRoutes.post('/cardimage',getCardImage)
HackathonRoutes.post("/face",upload.single("image"),getFaceDetails)
HackathonRoutes.post("/uploadimage",upload.array("images",12),uploadEventImages)


export default HackathonRoutes