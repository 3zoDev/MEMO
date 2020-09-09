const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');

// @desc      Get all Courses
// @route     GET /api/courses
// @access    private
exports.getCourses = asyncHandler(async (req, res, next) => {
  const course = await Course.find({})
    .populate({ path: 'teacher', select: 'name' })
    .populate({ path: 'students', select: 'name' })
    .exec();

  res
    .status(200)
    .json({
      status: true,
      data: course,
    })
    .exec();
});

// @desc      Get single Course
// @route     GET /api/courses/:id
// @access    private
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id)
    .populate({ path: 'teacher', select: 'name' })
    .populate({ path: 'students', select: 'name' })
    .exec();

  if (!course) {
    return next(new ErrorResponse(`This Course does not exist`));
  }
  res.status(200).json({ success: true, data: course });
});

// @desc      Create new Course
// @route     post /api/courses
// @access    private
exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc      Update Course
// @route     PUT /api/courses/:id
// @access    private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse(`This Course does not exist`));
  }
  course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: course });
});

// @desc      Delete Course
// @route     DELETE /api/courses/:id
// @access    private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse(`This Course does not exist`));
  }
  course.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Upload photo for course
// @route     PUT /api/course/:id/photo
// @access    Private
// exports.CoursePhotoUpload = asyncHandler(async (req, res, next) => {
//   const course = await Course.findById(req.params.id);

//   if (!course) {
//     return next(
//       new ErrorResponse(`course not found with id of ${req.params.id}`, 404)
//     );
//   }

//   // // Make sure user is course owner
//   // if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
//   //   return next(
//   //     new ErrorResponse(
//   //       `User ${req.params.id} is not authorized to update this course`,
//   //       401
//   //     )
//   //   );
//   // }

//   if (!req.files) {
//     return next(new ErrorResponse(`Please upload a file`, 400));
//   }

//   const file = req.files.file;

//   // Make sure the image is a photo
//   if (!file.mimetype.startsWith('image')) {
//     return next(new ErrorResponse(`Please upload an image file`, 400));
//   }
//   console.log(file);
//   // Check filesize
//   if (file.size > process.env.MAX_FILE_UPLOAD) {
//     return next(
//       new ErrorResponse(
//         `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
//         400
//       )
//     );
//   }

//   // Create custom filename
//   file.name = `photo_${course._id}${path.parse(file.name).ext}`;

//   file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
//     if (err) {
//       console.error(err);
//       return next(new ErrorResponse(`Problem with file upload`, 500));
//     }

//     await Courses.findByIdAndUpdate(req.params.id, { photo: file.name });

//     res.status(200).json({
//       success: true,
//       data: file.name,
//     });
//   });
// });
