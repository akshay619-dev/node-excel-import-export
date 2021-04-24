const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = process.env.DBURL;
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log(`Database server running.....`)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;
