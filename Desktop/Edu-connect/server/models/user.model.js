import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";// your sequelize instance
// import { User } from "../models/idx.js";
const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT, // Use TEXT if the description can be long
        // allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("instructor", "student"),
        allowNull: false,
        defaultValue: "student",  // This provides a default role if not provided

      },
      photoUrl: {
        type: DataTypes.STRING,
        defaultValue: "",
      }
    },
    {
      freezeTableName: true, // Prevents Sequelize from pluralizing table name
      timestamps: true, // Automatically adds createdAt and updatedAt
    }
);
export default User;