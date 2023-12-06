const express = require('express');
require('dotenv').config();

const app = express();

// Show public folder
app.use(express.static('public'));

// Body parser
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log(`Servier listening on port ${process.env.PORT}`);
});