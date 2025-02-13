// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import sequelize from "./configs/pdatabase.js"; // Import sequelize

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Sync database
// sequelize
//   .sync()
//   .then(() => console.log(" Database synced"))
//   .catch((err) => console.error("⚠️ Error syncing database:", err));

// app.listen(5001, () => console.log("Server running on port 5001"));




import express from "express";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import sequelize from "./configs/pdatabase.js"; // Database connection
import { DataTypes } from "sequelize";

dotenv.config();

const app = express();
app.use(express.json());

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // File will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp to name the file
  },
});

const upload = multer({ storage });

// Define a model for storing file paths in PostgreSQL
const File = sequelize.define("File", {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Create an endpoint to upload files
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { filename, path: filePath } = req.file;
    const fileType = req.file.mimetype; // e.g., 'image/jpeg', 'video/mp4'

    // Save the file information to the database
    await File.create({
      filename,
      fileType,
      filePath,
    });

    res.status(200).send("File uploaded successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading file.");
  }
});

// Sync database
sequelize.sync().then(() => {
  console.log("Database connected and synced!");
});

// Start the server
app.listen(5001, () => {
  console.log("Server running on port 5001");
});

