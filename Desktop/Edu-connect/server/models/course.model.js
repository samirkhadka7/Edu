// /server/models/course.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";


const Course = sequelize.define(
  "Course",
  {
    courseTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseLevel: {
      type: DataTypes.ENUM("Beginner", "Medium", "Advance"),
      allowNull: true,
    },
    coursePrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    courseThumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // Convert "creator" to a foreign key field
    creatorId: {
      type: DataTypes.INTEGER, // Adjust the type (e.g., DataTypes.UUID) if needed
      allowNull: true,
    },
    // Note: "enrolledStudents" and "lectures" are associations and should be defined separately.
  },
  {
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
    timestamps: true,      // Automatically adds createdAt and updatedAt fields
  }
);

export default Course;
