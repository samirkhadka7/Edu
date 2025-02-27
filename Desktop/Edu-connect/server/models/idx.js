// // /server/models/index.js
// import User from "./user.model.js";
// import Course from "./course.model.js";
// // import Lecture from "./lecture.model.js";

// // Many-to-Many: Courses ↔ Users (Enrolled Students)
// Course.belongsToMany(User, {
//   through: "CourseEnrollment",
//   as: "enrolledStudents",
//   foreignKey: "courseId",
// });
// User.belongsToMany(Course, {
//   through: "CourseEnrollment",
//   as: "enrolledCourses",
//   foreignKey: "userId",
// });

// // One-to-Many: Course → Lectures
// Course.hasMany(Lecture, {
//   foreignKey: "courseId",
//   as: "lectures",
// });
// Lecture.belongsTo(Course, {
//   foreignKey: "courseId",
//   as: "course",
// });

// // One-to-Many: User → Courses (Creator)
// Course.belongsTo(User, {
//   foreignKey: "creatorId",
//   as: "creator",
// });
// User.hasMany(Course, {
//   foreignKey: "creatorId",
//   as: "createdCourses",
// });

// export { User, Course, Lecture };
import User from "./user.model.js";
import Course from "./course.model.js";
import Lecture from "./lecture.model.js";


Course.belongsTo(User, {
    foreignKey: "creatorId", // This must match the field in Course model
    as: "creator",           // This alias must be used in your eager-loading query
});
  
  // Optional: Define reverse association if needed
User.hasMany(Course, {
    foreignKey: "creatorId",
    as: "createdCourses",
});

// Association between Course and Lecture (if needed)
Course.hasMany(Lecture, {
    foreignKey: "courseId",
    as: "lectures",
  });
  
  Lecture.belongsTo(Course, {
    foreignKey: "courseId",
    as: "course",
  });
  
export { User, Course, Lecture };
  
