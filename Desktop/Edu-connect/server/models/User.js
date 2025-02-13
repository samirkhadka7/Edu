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


import { DataTypes } from "sequelize";
import sequelize from "../configs/pdatabase.js"; // Correct import

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://example.com/default-avatar.png",
    },
  },
  {
    timestamps: true,
    freezeTableName: true, // Prevents table name from becoming "Users"
  }
);

export default User;
