const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Show public folder
app.use(express.static('public'));

// Body parser
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log(`Servier listening on port ${process.env.PORT}`);
});