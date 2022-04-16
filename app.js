require('env2')('.env');
const express = require('express');
const compression = require('compression');
const router = require('./routes');
const connection = require('./database/connection');
console.log(connection);

const app = express();

app.set('PORT', process.env.PORT || 3000);
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.use(router);

module.exports = app;