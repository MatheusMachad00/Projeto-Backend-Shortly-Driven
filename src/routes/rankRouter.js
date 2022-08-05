import express from 'express';
import { getRank } from '../controllers/rankController.js';

const router = express.Router();

router.get("/ranking", getRank)

export default router;