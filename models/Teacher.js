const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add the Teacher name.'],
  },
  courses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Course',
      //minmum
    },
  ],
  role: 'teacher',
  // presence: [{}],
  // absence: [{}],
});

module.exports = mongoose.model('Teacher', TeacherSchema);
