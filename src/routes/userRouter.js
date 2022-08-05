import express from 'express';
import {getUserData} from '../controllers/userController.js'
import { validateToken } from '../middlewares/validateToken.js';

const router = express.Router();

router.get("/users/me", validateToken, getUserData)

export default router;