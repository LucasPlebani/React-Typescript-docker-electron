import express from 'express';
import { signup, login } from '../controllers/userControllers';

const router = express.Router();

//Route des users
router.post('/signup', signup);
router.post('/login', login);

export default router; 