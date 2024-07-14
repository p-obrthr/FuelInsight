import express from "express";
import { fetchData }  from '../Controllers/tankerkoenigController.js';

const router = express.Router();

router.get('/fetch', fetchData);

export default router;