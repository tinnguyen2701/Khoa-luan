const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = new Schema({
  studentID: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
  },
  age: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Student', studentSchema);
