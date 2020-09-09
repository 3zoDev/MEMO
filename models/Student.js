const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please insert your name.'],
  },
  courses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Course',
    },
  ],
  role: 'studend',
});

module.exports = mongoose.model('Student', StudentSchema);
