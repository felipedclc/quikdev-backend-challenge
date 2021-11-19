require('dotenv').config();
const express = require('express');
const middlewares = require('../middlewares');
const router = require('../routes/router');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/ping', (_req, res) => res.send('pong!')); // rota teste

app.use('/user', router.userRouter);

app.use(middlewares.error);

module.exports = app;