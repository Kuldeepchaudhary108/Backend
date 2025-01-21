import express from 'express'
import {  createTeam } from '../controllers/Team.js';
const TeamRoutes = express.Router()
TeamRoutes.post('/createteam',createTeam)

export default TeamRoutes