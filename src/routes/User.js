import express from 'express'
import {  signup , Login , Logout } from '../controllers/user.controller.js';
const UserRoutes = express.Router()
UserRoutes.post('/signup',signup)
UserRoutes.post('/login',Login)
 UserRoutes.post('/logout',Logout)
export default UserRoutes