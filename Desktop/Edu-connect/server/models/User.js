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
import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../configs/pdatabase.js'; // Database connection

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Fixed this line
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

export default User;


