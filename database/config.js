const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('Database online ✅')
  } catch (error) {
    console.log(error);
    throw new Error('Error initializing the Database ❌');
  }
}

module.exports = {
  dbConnection
}