const mongoose = require('mongoose');

const { Schema } = mongoose;

const manualSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
  },
  homeWork: [
    {
      question: {
        type: String,
      },
      answer: {
        type: String,
      },
    },
  ],
  favorites: Array,
  comments: [
    {
      username: {
        type: String,
      },
      comment: {
        type: String,
      },
      updated_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Manual', manualSchema);
