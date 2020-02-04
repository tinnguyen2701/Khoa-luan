const mongoose = require('mongoose');

const { Schema } = mongoose;

const overviewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
  },
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

module.exports = mongoose.model('Overview', overviewSchema);
