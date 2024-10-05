import express from 'express'
// import {   createLeaderboard } from '../controllers/Leaderboard.js';
import { createProject } from '../controllers/Project.js';
const ProjectRoutes = express.Router()
ProjectRoutes.post('/createproject',createProject)

export default ProjectRoutes