import express from 'express';
import { createShortUrl, getUrlById, openShortUrl } from '../controllers/urlController.js';
import { validateToken } from '../middlewares/validateToken.js';
import {validateUrl} from '../middlewares/validateUrl.js'

const router = express.Router();

/* router.get("/teste", validateToken, createShortUrl); */
router.post("/urls/shorten", validateToken, validateUrl, createShortUrl);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", openShortUrl)

export default router;