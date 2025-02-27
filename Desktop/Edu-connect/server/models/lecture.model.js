// /server/models/lecture.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";


const Lecture = sequelize.define(
  "Lecture",
  {
    lectureTitle: { type: DataTypes.STRING, allowNull: false },
    videoUrl: { type: DataTypes.STRING, allowNull: true },
    publicId: { type: DataTypes.STRING, allowNull: true },
    isPreviewFree: { type: DataTypes.BOOLEAN, allowNull: true },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default Lecture;
