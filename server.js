require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = require('./server');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected'))
  .catch((err) => console.error('Database Connection Error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
