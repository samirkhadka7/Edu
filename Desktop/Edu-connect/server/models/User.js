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



// postgress code
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../configs/pdatabase'); // Database connection

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = User;

