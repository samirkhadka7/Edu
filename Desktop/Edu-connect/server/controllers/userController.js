
// mangodb code

// import User from "./models/User.js";

// // Get User Data
// export const getUserData = async (req, res) => {
//   try {
//     const userId = req.auth.userId;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.json({ success: false, message: 'User Not Found' });
//     }
//     res.json({ success: true, user });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // Users Enrolled Courses With Lecture Links
// export const getEnrolledCourses = async (req, res) => {
//     try {
//       const userId = req.auth.userId;
//       const userData = await User.findById(userId).populate('enrolledCourses');
//       res.json({ success: true, enrolledCourses: userData.enrolledCourses });
//     } catch (error) {
//       res.json({ success: false, message: error.message });
//     }
// };

// // Update User Course Progress

// export const updateUserCourseProgress = async (req, res) => {
//   try {
//     const userId = req.auth.userId;
//     const { courseId, lectureId } = req.body;
//     const progressData = await CourseProgress.findOne({ userId, courseId });

//     if (progressData) {
//       if (progressData.lectureCompleted.includes(lectureId)) {
//         return res.json({ success: true, message: 'Lecture Already Completed' });
//       }
//       progressData.lectureCompleted.push(lectureId);
//       await progressData.save();
//     } else {
//       // If progressData does not exist, you might want to create it
//       await CourseProgress.create({
//         userId,
//         courseId,
//         lectureCompleted: [lectureId]
//       });
//     }

//     res.json({ success: true, message: 'Course Progress Updated' });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


// // get User Course Progress
// export const getUserCourseProgress = async (req, res) => {
//   try {
//     const userId = req.auth.userId;
//     const { courseId } = req.body;
//     const progressData = await CourseProgress.findOne({ userId, courseId });
//     res.json({ success: true, progressData });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // Add User Ratings to Course

// export const addUserRating = async (req, res) => {
//   const userId = req.auth.userId;
//   const { courseId, rating } = req.body;

//   if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
//     return res.json({ success: false, message: 'Invalid Details' });
//   }

//   try {
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.json({ success: false, message: 'Course not found' });
//     }

//     const user = await User.findById(userId);
//     if (!user || !user.enrolledCourses.includes(courseId)) {
//       return res.json({ success: false, message: 'User has not purchased this course.' });
//     }

//     const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId);

//     if (existingRatingIndex !== -1) {
//       // Update the existing rating
//       course.courseRatings[existingRatingIndex].rating = rating;
//     } else {
//       // Add a new rating
//       course.courseRatings.push({ userId, rating });
//     }

//     await course.save();

//     return res.json({ success: true, message: 'Rating Added' });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };





//Postgress code

// import { User, Course, CourseProgress, CourseRating } from '../models';
// import { Op } from 'sequelize';
// import { Course } from '../models/Course.js';
// import { User } from "../models/User.js"
// import { CourseProgress } from '../models/courseProgress.js';
// import { CourseRating } from "../models/Course.js"
// import { Op } from 'sequelize';




// // Get User Data
// export const getUserData = async (req, res) => {
//   try {
//     const userId = req.auth.userId;
//     const user = await User.findByPk(userId);
    
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User Not Found' });
//     }

//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Users Enrolled Courses (Without Purchases)
// export const getEnrolledCourses = async (req, res) => {
//   try {
//     const userId = req.auth.userId;
//     const userData = await User.findByPk(userId, {
//       include: [{
//         model: Course,
//         as: 'enrolledCourses',
//         through: 'UserCourses' // Many-to-Many relationship table
//       }]
//     });

//     res.status(200).json({ success: true, enrolledCourses: userData.enrolledCourses });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Update User Course Progress
// export const updateUserCourseProgress = async (req, res) => {
//   try {
//     const userId = req.auth.userId;
//     const { courseId, lectureId } = req.body;
    
//     const [progressData, created] = await CourseProgress.findOrCreate({
//       where: { userId, courseId },
//       defaults: { lectureCompleted: [lectureId] }
//     });

//     if (!created) {
//       if (progressData.lectureCompleted.includes(lectureId)) {
//         return res.status(200).json({ success: true, message: 'Lecture Already Completed' });
//       }
      
//       // Append lectureId to the list of completed lectures
//       await progressData.update({
//         lectureCompleted: [...progressData.lectureCompleted, lectureId]
//       });
//     }

//     res.status(200).json({ success: true, message: 'Course Progress Updated' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get User Course Progress
// export const getUserCourseProgress = async (req, res) => {
//   try {
//     const userId = req.auth.userId;
//     const { courseId } = req.body;
    
//     const progressData = await CourseProgress.findOne({ where: { userId, courseId } });

//     res.status(200).json({ success: true, progressData });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Add User Rating to Course (Without Purchases)
// export const addUserRating = async (req, res) => {
//   const userId = req.auth.userId;
//   const { courseId, rating } = req.body;

//   if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
//     return res.status(400).json({ success: false, message: 'Invalid Details' });
//   }

//   try {
//     const course = await Course.findByPk(courseId);
//     if (!course) {
//       return res.status(404).json({ success: false, message: 'Course not found' });
//     }

//     // Check if user is enrolled (instead of checking purchase)
//     const enrolled = await course.hasUser(userId);
//     if (!enrolled) {
//       return res.status(403).json({ success: false, message: 'User is not enrolled in this course.' });
//     }

//     // Update or create rating
//     const [courseRating, created] = await CourseRating.findOrCreate({
//       where: { userId, courseId },
//       defaults: { rating }
//     });

//     if (!created) {
//       await courseRating.update({ rating });
//     }

//     return res.status(200).json({ success: true, message: 'Rating Added' });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

  

