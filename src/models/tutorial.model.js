const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tutorialSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  published: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = tutorials = mongoose.model('tutorials', tutorialSchema);