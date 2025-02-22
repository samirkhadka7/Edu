// mango db database

// import Course from "../models/Course.js";

// // Get All Courses
// export const getAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.find({ isPublished: true })
//       .select(['-courseContent', '-enrolledStudents'])
//       .populate({ path: 'educator' });
//       res.json({ success: true, courses });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
// // Get Course by Id
// export const getCourseById = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const courseData = await Course.findById(id).populate({ path: 'educator' });
//       // Remove lectureUrl if isPreviewFree is false
//       courseData.courseContent.forEach(chapter => {
//         chapter.chapterContent.forEach(lecture => {
//           if (!lecture.isPreviewFree) {
//             lecture.lectureUrl = "";
//           }
//         });
//       });
//       res.json({ success: true, courseData });
//     } catch (error) {
//       res.json({ success: false, message: error.message });
//     }
// };
  







// postgress code


// import { Course, User } from "../models";
// import { Course } from '../models/Course.js';
// import { User } from "../models/User.js"

// // Get All Courses
// export const getAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.findAll({
//       where: { isPublished: true },
//       attributes: { exclude: ["courseContent", "enrolledStudents"] },
//       include: [
//         {
//           model: User,
//           as: "educator",
//           attributes: ["id", "name", "email"], // Ensure only necessary attributes are fetched
//         },
//       ],
//     });

//     if (!courses || courses.length === 0) {
//       return res.status(404).json({ success: false, message: "No courses found" });
//     }

//     res.status(200).json({ success: true, courses });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get Course by ID
// export const getCourseById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const courseData = await Course.findByPk(id, {
//       include: [
//         {
//           model: User,
//           as: "educator",
//           attributes: ["id", "name", "email"],
//         },
//       ],
//     });

//     if (!courseData) {
//       return res.status(404).json({ success: false, message: "Course not found" });
//     }

//     // Deep clone to avoid modifying the original data
//     const processedCourseData = JSON.parse(JSON.stringify(courseData));

//     // Safely process courseContent if it's in JSON format
//     if (processedCourseData.courseContent && Array.isArray(processedCourseData.courseContent)) {
//       processedCourseData.courseContent.forEach((chapter) => {
//         if (chapter.chapterContent && Array.isArray(chapter.chapterContent)) {
//           chapter.chapterContent.forEach((lecture) => {
//             if (!lecture.isPreviewFree) {
//               lecture.lectureUrl = ""; // Hide the lecture URL if it's not free
//             }
//           });
//         }
//       });
//     }

//     res.status(200).json({ success: true, courseData: processedCourseData });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
