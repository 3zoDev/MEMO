const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please insert course name.'],
  },
  CRN: {
    type: String,
    required: [true, 'Please insert course CRN.'],
    unique: [true, 'there is course with same CRN'],
  },
  level: {
    type: String,
    required: [true, 'please type the level of this course'],
  },
  days: [
    {
      type: String,
      enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      required: [true, 'you shoud at least select one day for the course.'],
    },
  ],
  time: {
    type: String,
    required: [true, 'you must add the time of the course.'],
    match: /^([0[0-9]|1[0-9]|2[0-4]):[0-5][0-9]$/,
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: 'Teacher',
    // required: [true, 'you have select the teacher of the course.'],
  },
  // students: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'Student',
  //   },
  // ],
  // presence: [{}],
  // absence: [{}],
  courseCeartedAt: {
    type: Date,
    default: Date.now(),
  },

  // createRQ: String,
  // RQExpire: Date,
});

module.exports = mongoose.model('Course', CourseSchema);
