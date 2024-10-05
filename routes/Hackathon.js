import express from 'express'
import {  create } from '../controllers/Hackathon.js';
const HackathonRoutes = express.Router()
HackathonRoutes.post('/create',create)

export default HackathonRoutes