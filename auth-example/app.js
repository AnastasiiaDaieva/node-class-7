const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

// also an option 2
// const routes = require('./routes/api');
const productsRouter = require('./routes/api/products');
const authRouter = require('./routes/api/auth');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// route is a group of requests to one entity; if we have a route, it means that we have a group of addresses/urls that are responsible for work with the items
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);

// also an option 2
// app.use('/api/auth', routes.auth);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
