import express from 'express';
import usersRouter from './controllers/users.js';

let router = express.Router();

router.use('/users', usersRouter); // use router.use if you want to use a sub-router

export default router;