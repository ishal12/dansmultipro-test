const express = require('express');

const app = express();

const authRouter = require('./auth');
const jobRouter = require('./job');

app.use('/auth/', authRouter);
app.use('/job/', jobRouter);

module.exports = app;
