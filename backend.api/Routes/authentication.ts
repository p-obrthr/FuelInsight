import express from "express";
import { userController }  from '../Controllers/authenticationController';

const router = express.Router();

router.post('/register', userController.createUser);

export default router;