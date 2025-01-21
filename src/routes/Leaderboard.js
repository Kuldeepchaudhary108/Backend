import express from 'express'
import {   createLeaderboard } from '../controllers/Leaderboard.js';
const LeaderboardRoutes = express.Router()
LeaderboardRoutes.post('/createleaderboard',createLeaderboard)

export default LeaderboardRoutes