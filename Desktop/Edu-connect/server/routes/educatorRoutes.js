// import express from 'express';
// import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from '../controllers/educatorController.js';

// const educatorRouter = express.Router();


// // Add Educator Role
// educatorRouter.get('/update-role', updateRoleToEducator)
// educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse)
// educatorRouter.get('/courses', protectEducator, getEducatorCourses)
// educatorRouter.get('/dashboard', protectEducator, educatorDashboardData)
// educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData)

// export default educatorRouter;


///

// import express from 'express';
// import {
//     addCourse,
//     educatorDashboardData,
//     getEducatorCourses,
//     getEnrolledStudentsData,
//     updateRoleToEducator
// } from '../controllers/educatorController.js';

// // import { protectEducator } from '../middlewares/authMiddleware.js'; // Ensure this middleware is imported
// // import upload from '../middlewares/uploadMiddleware.js'; // Ensure upload middleware is properly set up

// const educatorRouter = express.Router();

// // Update user role to Educator (Use PATCH instead of GET)
// educatorRouter.patch('/update-role', protectEducator, updateRoleToEducator);

// // Add a new course (Ensure 'image' upload works)
// // educatorRouter.post('/add-course', protectEducator, upload.single('image'), addCourse);
// // educatorRouter.post('/add-course', upload.single('image'), addCourse);
// educatorRouter.post('/add-course', protectEducator, addCourse);



// // Get all courses created by the educator
// educatorRouter.get('/courses', protectEducator, getEducatorCourses);

// // Get educator dashboard data
// educatorRouter.get('/dashboard', protectEducator, educatorDashboardData);

// // Get enrolled students data for an educator
// educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData);

// export default educatorRouter;


import express from 'express';
import {
    addCourse,
    educatorDashboardData,
    getEducatorCourses,
    getEnrolledStudentsData,
    updateRoleToEducator
} from '../controllers/educatorController.js';

const educatorRouter = express.Router();

// Update user role to Educator
educatorRouter.patch('/update-role', updateRoleToEducator);

// Add a new course
educatorRouter.post('/add-course', addCourse);

// Get all courses created by the educator
educatorRouter.get('/courses', getEducatorCourses);

// Get educator dashboard data
educatorRouter.get('/dashboard', educatorDashboardData);

// Get enrolled students data for an educator
educatorRouter.get('/enrolled-students', getEnrolledStudentsData);

export default educatorRouter;

