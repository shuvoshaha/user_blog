import express from 'express';
import { registration, signIn } from '../controller/controller.js';

const router = express.Router();

router.post('/signup', registration);
router.post('/signin', signIn);


export default router;