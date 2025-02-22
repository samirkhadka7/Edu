
// mangodb course

// //update role to educator
// export const updateRoleToEducator = async (req, res) => {
//   try {
//     const userId = req.auth.userId;
//     await clerkClient.users.updateUserMetadata(userId, {
//       publicMetadata: {
//         role: 'educator'
//       }
//     });
//     res.json({ success: true, message: 'You can publish a course now' });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };



// // Add new  course
// export const addCourse = async (req, res) => {
//     try {
//       const { courseData } = req.body;
//       const imageFile = req.file;
//       const educatorId = req.auth.userId;
  
//       if (!imageFile) {
//         return res.json({ success: false, message: 'Thumbnail Not Attached' });
//       }
  
//       const parsedCourseData = JSON.parse(courseData);
//       parsedCourseData.educator = educatorId;
  
//       const newCourse = await Course.create(parsedCourseData);
  
//       const imageUpload = await cloudinary.uploader.upload(imageFile.path);
//       newCourse.courseThumbnail = imageUpload.secure_url;
  
//       await newCourse.save();
  
//       res.json({ success: true, message: 'Course Added' });
//     } catch (error) {
//       res.json({ success: false, message: error.message });
//     }
// };

// // Get Educator Courses
// export const getEducatorCourses = async (req, res) => {
//     try {
//       const educator = req.auth.userId;
//       const courses = await Course.find({ educator });
//       res.json({ success: true, courses });
//     } catch (error) {
//       res.json({ success: false, message: error.message });
//     }
// };


// // Get Educator Dashboard Data ( Total Earning, Enrolled Students, No. of Courses)

// export const educatorDashboardData = async (req, res) => {
//     try {
//       const educator = req.auth.userId;
//       const courses = await Course.find({ educator });
//       const totalCourses = courses.length;
//       const courseIds = courses.map(course => course._id);
  
//       // Calculate total earnings from purchases
//       const purchases = await Purchase.find({
//         courseId: { $in: courseIds },
//         status: 'completed'
//       });
  
//       const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);
  
//       // Collect unique enrolled student IDs with their course titles
//       const enrolledStudentsData = [];
//       for (const course of courses) {
//       const students = await User.find({
//         _id: { $in: course.enrolledStudents }
//       }, 'name imageUrl');
      
//       students.forEach(student => {
//         enrolledStudentsData.push({
//           courseTitle: course.courseTitle,
//           student
//         });
//       });
//     }
    
//     res.json({success: true, dashboardData: {
//         totalEarnings, enrolledStudentsData,  totalCourses
//     }})

//     } catch (error) {
//       res.json({ success: false, message: error.message });
//     }
// };
  

// // Get Enrolled Students Data with Purchase Data
// export const getEnrolledStudentsData = async (req, res) => {
//     try {
//       const educator = req.auth.userId;
//       const courses = await Course.find({educator});
//       const courseIds = courses.map(course => course._id);
  
//       const purchases = await Purchase.find({
//         courseId: { $in: courseIds },
//         status: 'completed'
//       }).populate('userId', 'name imageUrl')
//         .populate('courseId', 'courseTitle');

//         const enrolledStudents = purchases.map(purchase => ({
//             student: purchase.userId,
//             courseTitle: purchase.courseId.courseTitle,
//             purchaseDate: purchase.createdAt
//         }));

//       res.json({ success: true, purchases });
//     } catch (error) {
//       res.json({ success: false, message: error.message });
//     }
// };


 

// // postgress code
  
// import { Course } from '../models/Course.js';
// import { User } from "../models/User.js"
// import { Op } from 'sequelize';
// import cloudinary from '../configs/cloudinary.js';


// // Update role to educator
// export const updateRoleToEducator = async (req, res) => {
//   try {
//     const userId = req.auth.userId;
//     await clerkClient.users.updateUserMetadata(userId, {
//       publicMetadata: { role: 'educator' }
//     });
//     res.json({ success: true, message: 'You can publish a course now' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Add new course
// export const addCourse = async (req, res) => {
//   try {
//     const { courseData } = req.body;
//     const imageFile = req.file;
//     const educatorId = req.auth.userId;

//     if (!imageFile) {
//       return res.status(400).json({ success: false, message: 'Thumbnail Not Attached' });
//     }

//     const parsedCourseData = JSON.parse(courseData);
//     parsedCourseData.educatorId = educatorId;

//     // Create course
//     const newCourse = await Course.create(parsedCourseData);

//     // Upload image to Cloudinary
//     const imageUpload = await cloudinary.uploader.upload(imageFile.path);

//     // Update course with thumbnail URL
//     await newCourse.update({ courseThumbnail: imageUpload.secure_url });

//     res.status(201).json({ success: true, message: 'Course Added' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get Educator Courses
// export const getEducatorCourses = async (req, res) => {
//   try {
//     const educatorId = req.auth.userId;
//     const courses = await Course.findAll({ where: { educatorId } });

//     res.status(200).json({ success: true, courses });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get Educator Dashboard Data (Without Purchases)
// export const educatorDashboardData = async (req, res) => {
//   try {
//     const educatorId = req.auth.userId;

//     // Get courses and count
//     const courses = await Course.findAll({
//       where: { educatorId },
//       attributes: ['id', 'courseTitle']
//     });

//     const totalCourses = courses.length;
//     const courseIds = courses.map(course => course.id);

//     // Get enrolled students data (if enrolled students are stored in Course model)
//     const enrolledStudentsData = await Course.findAll({
//       where: { id: { [Op.in]: courseIds } },
//       attributes: ['courseTitle'],
//       include: [{
//         model: User,
//         as: 'enrolledStudents',
//         attributes: ['name', 'imageUrl'],
//         through: { attributes: [] }
//       }]
//     });

//     // Format enrolled students data
//     const formattedStudentsData = enrolledStudentsData.flatMap(course =>
//       course.enrolledStudents.map(student => ({
//         courseTitle: course.courseTitle,
//         student: { name: student.name, imageUrl: student.imageUrl }
//       }))
//     );

//     res.status(200).json({
//       success: true,
//       dashboardData: { totalCourses, enrolledStudentsData: formattedStudentsData }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
