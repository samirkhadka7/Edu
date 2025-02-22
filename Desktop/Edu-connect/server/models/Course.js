// mango db database

// import mongoose from "mongoose";

// const lectureSchema = new mongoose.Schema({
//     lectureId: { type: String, required: true },
//     lectureTitle: { type: String, required: true },
//     lectureDuration: { type: Number, required: true },
//     lectureUrl: { type: String, required: true },
//     isPreviewFree: { type: Boolean, required: true },
//     lectureOrder: { type: Number, required: true }
//   }, { _id: false });

// const chapterSchema = new mongoose.Schema({
//     chapterId: { type: String, required: true },
//     chapterOrder: { type: Number, required: true },
//     chapterTitle: { type: String, required: true },
//     chapterContent: [lectureSchema]
//   }, { _id: false });

// const courseSchema = new mongoose.Schema({
//   courseTitle: { type: String, required: true },
//   courseDescription: { type: String, required: true },
//   courseThumbnail: { type: String },
//   coursePrice: { type: Number, required: true },
//   isPublished: { type: Boolean, default: true },
//   discount: { type: Number, required: true, min: 0, max: 100 },
//   courseContent: [chapterSchema ],
//   courseRatings: [
//     {
//       userId: { type: String },
//       rating: { type: Number, min: 1, max: 5 }
//     }
//   ],
//   educator: { type: String, ref: 'User', required: true },
//   enrolledStudents: [
//     { type: String, ref: 'User' }
//   ]
// }, { timestamps: true, minimize: false });

// const Course = mongoose.model ('Course', courseSchema)

// export default  courseSchema;



// Postgress database

// models/Lecture.js

// import { DataTypes } from 'sequelize';
// import sequelize from '../configs/pdatabase.js';

// import { DataTypes } from "sequelize";
// import sequelize from "../configs/pdatabase.js";
// import { User } from "../User.js";


// const Lecture = sequelize.define('Lecture', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   lectureId: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lectureTitle: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lectureDuration: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   lectureUrl: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   isPreviewFree: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false
//   },
//   lectureOrder: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   }
// });

// // models/Chapter.js
// const Chapter = sequelize.define('Chapter', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   chapterId: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   chapterOrder: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   chapterTitle: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// });

// // models/CourseRating.js
// const CourseRating = sequelize.define('CourseRating', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   rating: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     validate: {
//       min: 1,
//       max: 5
//     }
//   }
// });

// // models/Course.js (Updated - Removed Pricing)
// const Course = sequelize.define('Course', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   courseTitle: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   courseDescription: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   courseThumbnail: {
//     type: DataTypes.STRING
//   },
//   isPublished: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: true
//   }
// }, {
//   timestamps: true
// });

// // Define relationships
// Course.belongsTo(User, { 
//   as: 'educator',
//   foreignKey: {
//     name: 'educatorId',
//     allowNull: false
//   }
// });

// Course.belongsToMany(User, {
//   through: 'CourseEnrollments',  // Enrollments without purchase
//   as: 'enrolledStudents'
// });

// Course.hasMany(Chapter);
// Chapter.belongsTo(Course);

// Chapter.hasMany(Lecture);
// Lecture.belongsTo(Chapter);

// Course.hasMany(CourseRating);
// CourseRating.belongsTo(Course);
// User.hasMany(CourseRating);
// CourseRating.belongsTo(User);

// export {Course, CourseRating, Lecture, Chapter};