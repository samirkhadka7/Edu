// import mongoose from "mongoose";
// const userSchema = new mongoose.Schema (
//     {
//         _id: {type: String, required: true },
//         name: { type: String, required: true },
//         email: { type: String, required: true },
//         imageUrl:{ type: String, required: true },
//         enrolledCourses: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Course'
//             }
//         ],
    
// },{timestamps: true });

// const User = mongoose.model ('User', userSchema);

// export default User


import { DataTypes } from 'sequelize';
import sequelize from './database';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID, // Use UUID instead of MongoDB's ObjectId
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Define relationships (e.g., enrolledCourses)
User.associate = (models) => {
  User.belongsToMany(models.Course, {
    through: 'UserCourse', // Junction table for many-to-many
    foreignKey: 'userId',
  });
};

export default User;