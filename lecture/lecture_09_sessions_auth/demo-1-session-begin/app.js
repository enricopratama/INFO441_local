<<<<<<< HEAD
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';
import usersRouter from './routes/users.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "this is some secret key that should be stored in a .env file 09291nji322081",
    saveUninitialized: true,
    cookie: { maxAge: oneDay }, // how long I want the session to last
    resave: false   // save the session even if it wasn't modified
}))

app.use('/users', usersRouter);

export default app;
||||||| 1ea6190
=======
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import usersRouter from './routes/users.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

export default app;
>>>>>>> 9a62a48d4693cd43b7923e7c728d54c98eb6129c
