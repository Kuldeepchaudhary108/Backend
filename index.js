import express from 'express' 
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from "cookie-parser"
 import HackathonRoutes from './routes/Hackathon.js'
import LeaderboardRoutes from './routes/Leaderboard.js'
 import ProjectRoutes from './routes/Project.js'
import TeamRoutes from './routes/Team.js'
import path from 'path';
import { fileURLToPath } from 'url';



import UserRoutes from './routes/User.js'
dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()
app.get("/" , (req , res)=>{
    res.send("hello from backend")
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);


  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Here will be the hackathon routes
app.use('/hackathon' , HackathonRoutes)


// // Here will be the LeaderboardRoutes 
app.use('/leaderboard' , LeaderboardRoutes)

// Here will be the project routes
 app.use('/project' , ProjectRoutes)

// Here will be the team routes
 app.use('/team' , TeamRoutes)


// Here will be the user routes
app.use('/user' , UserRoutes)

app.listen(PORT , ()=>{
    console.log(`app is running on ${PORT}`)
})
