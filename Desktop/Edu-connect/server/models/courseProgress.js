// import mongoose from 'mongoose';

// const courseProgressSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   courseId: { type: String, required: true },
//   completed: { type: Boolean, default: false },
//   lectureCompleted: []
// }, { minimize: false });

// export const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema);



import { DataTypes } from 'sequelize';
import sequelize from '../configs/pdatabase.js';

const CourseProgress = sequelize.define('CourseProgress', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users', // Ensure correct table name
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'courses', // Ensure correct table name
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  lectureCompleted: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Ensure lecture IDs are UUID if stored that way
    defaultValue: [],
  },
}, {
  tableName: 'course_progress',
  timestamps: true,
});

export default CourseProgress;


