const express = require('express');
require('dotenv').config();

const app = express();

// Show public folder
app.use(express.static('public'));

//Routes
// app.get('/', (req, res) => {
//   res.json({
//     ok: true
//   })
// });

app.listen(process.env.PORT, () => {
  console.log(`Servier listening on port ${process.env.PORT}`);
});