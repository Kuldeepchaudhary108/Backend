import express from 'express'
import {  Register , Login , Logout } from '../controllers/User.js';
const UserRoutes = express.Router()
UserRoutes.post('/register',Register)
UserRoutes.post('/login',Login)
 UserRoutes.post('/logout',Logout)
export default UserRoutes