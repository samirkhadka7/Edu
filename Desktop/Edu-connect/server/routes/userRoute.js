// import express from 'express';
// import { getUserData, getEnrolledCourses, updateUserCourseProgress, getUserCourseProgress, addUserRating } from '../controllers/userController.js';

// const userRouter = express.Router();

// userRouter.get('/data', getUserData);
// userRouter.get('/enrolled-courses', getEnrolledCourses);

// userRouter.post('/update-course-progress', updateUserCourseProgress)
// userRouter.post('/get-course-progress', getUserCourseProgress)
// userRouter.post('/add-rating', addUserRating)

// export default userRouter;


// import express from 'express';
// import {
//     getUserData,
//     getEnrolledCourses,
//     updateUserCourseProgress,
//     getUserCourseProgress,
//     addUserRating
// } from '../controllers/userController.js';

// import { protectUser } from '../middlewares/authMiddleware.js'; // Ensure authentication is applied

// const userRouter = express.Router();

// // Get user data (Protected)
// userRouter.get('/data', protectUser, getUserData);

// // Get enrolled courses (Protected)
// userRouter.get('/enrolled-courses', protectUser, getEnrolledCourses);

// // Update course progress (Use PATCH)
// userRouter.patch('/update-course-progress', protectUser, updateUserCourseProgress);

// // Get course progress (Use GET with query params)
// userRouter.get('/course-progress', protectUser, getUserCourseProgress);

// // Add course rating (Protected)
// userRouter.post('/add-rating', protectUser, addUserRating);

// export default userRouter;



import express from 'express';
import {
    getUserData,
    getEnrolledCourses,
    updateUserCourseProgress,
    getUserCourseProgress,
    addUserRating
} from '../controllers/userController.js';

const userRouter = express.Router();

// User data
userRouter.get('/data', getUserData);

// Get enrolled courses
userRouter.get('/enrolled-courses', getEnrolledCourses);

// Update course progress
userRouter.post('/update-course-progress', updateUserCourseProgress);

// Get course progress
userRouter.post('/get-course-progress', getUserCourseProgress);

// Add user rating
userRouter.post('/add-rating', addUserRating);

export default userRouter;
