require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (_req, res) => res.send('Hello World!'));

module.exports = app;