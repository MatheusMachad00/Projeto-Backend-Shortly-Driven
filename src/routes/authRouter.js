import express from 'express';
import { userSignup, userLogin } from '../controllers/authController.js';
import { validadeSignup } from '../middlewares/validateSignup.js';
import { validateLogin } from '../middlewares/validateLogin.js';

const router = express.Router();

router.post("/signup", validadeSignup, userSignup);
router.post("/login", validateLogin, userLogin);

export default router;