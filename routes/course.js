const express = require('express');

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  //   CoursePhotoUpload,
} = require('../controllers/course');

const Courses = require('../models/Course');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');

// const {
//     ensureAuthenticated,
//     forwardAuthenticated,
//     roleAuthorization,
// } = require('../config/auth');

router
  .route('/')
  .get(
    advancedResults(Courses, {
      path: 'course',
      select: 'name description',
    }),

    getCourses
  )
  .post(createCourse);

router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

router;
//   .route('/:id/photo')
//   .put(
//       ensureAuthenticated,
//       roleAuthorization(['admin']),
//       CoursePhotoUpload);

module.exports = router;
