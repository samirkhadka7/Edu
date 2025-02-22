// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import sequelize from "./configs/pdatabase.js";
// import courseRouter from "./routes/courseRoute.js";
// import educatorRouter from "./routes/educatorRoutes.js";
// import connectCloudinary from "./configs/cloudinary.js";
// import userRouter from "./routes/userRoute.js";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();

// const app = express();

// Ensure Cloudinary connects before starting the server
// await connectCloudinary();

// middleware
// app.use(cors())

// const port = process.env.PORT || 5001;

// CORS Configuration
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Update with your frontend URL
//     credentials: true,
//   })
// );

// app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf.toString(); } })); // Clerk Webhooks need raw body

// Routes
// app.get("/", (req, res) => res.send("API Working"));
// app.use("/api/educator", educatorRouter);
// app.use("/api/course", courseRouter);
// app.use("/api/user", userRouter);
// app.use("/api/auth", authRoutes); // Auth Routes

// Sync database after successful connection
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Database synced");
//     app.listen(port, () => console.log(`Server running on port ${port}`));
//   })
//   .catch((err) => console.error("Error syncing database:", err));




// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import sequelize from "./configs/pdatabase.js";
// import courseRouter from "./routes/courseRoute.js";
// import educatorRouter from "./routes/educatorRoutes.js";
// import connectCloudinary from "./configs/cloudinary.js";
// import userRouter from "./routes/userRoute.js";
// import authRoutes from "./routes/authRoutes.js";

// const authRoutes = require('./routes/authRoutes');

// // import { clerkWebhooks } from "./controllers/webhooks.js";

// dotenv.config();

// const app = express();
// await connectCloudinary ()
// app.use(cors());

// const port=process.env.port

// app.use(cors({
//   origin: 'http://localhost:5173', // Update with your frontend URL
//   credentials: true
// }));

// app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf.toString(); } })); // Clerk Webhooks need raw body

// //Routes
// app.get('/', (req, res)=> req.send("API Working"))
// app.use('/api/educator', express.json(), educatorRouter)
// app.use('/api/course', express.json(), courseRouter)
// app.use('/api/user', express.json(), userRouter)
// app.use('/api/auth', authRoutes); // Added Auth Routes
// // app.post("/clerk-webhook", clerkWebhooks);

// // Sync database after successful connection
// sequelize
//   .sync()
//   .then(() => console.log(" Database synced"))
//   .catch((err) => console.error("Error syncing database:", err));

// app.listen(5001, () => console.log("Server running on port 5001"));








// import express from "express";
// import multer from "multer";
// import path from "path";
// import dotenv from "dotenv";
// import sequelize from "./configs/pdatabase.js"; // Database connection
// import { DataTypes } from "sequelize";

// dotenv.config();

// const app = express();
// app.use(express.json());

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads/"); // File will be stored in the 'uploads' directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp to name the file
//   },
// });

// const upload = multer({ storage });

// // Define a model for storing file paths in PostgreSQL
// const File = sequelize.define("File", {
//   filename: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   fileType: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   filePath: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// // Create an endpoint to upload files
// app.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     const { filename, path: filePath } = req.file;
//     const fileType = req.file.mimetype; // e.g., 'image/jpeg', 'video/mp4'

//     // Save the file information to the database
//     await File.create({
//       filename,
//       fileType,
//       filePath,
//     });

//     res.status(200).send("File uploaded successfully!");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error uploading file.");
//   }
// });

// // Sync database
// sequelize.sync().then(() => {
//   console.log("Database connected and synced!");
// });

// // Start the server
// app.listen(5001, () => {
//   console.log("Server running on port 5001");
// });



// import express from "express";
// import cors from "cors";
// import 'dotenv/config'


// const app = express();


// app.use(cors())

// const PORT = process.env.PORT || 5003;

// app.get("/", (req, res) => res.send("API Working"));

// app.listen(PORT, ()=>{
//   console.log(`server is running on port ${PORT}`)
// })


import express from "express";
import cors from "cors";
import 'dotenv/config';
import sequelize from "./configs/pdatabase.js"; // Import database connection
import { clerkWebhooks } from "./controllers/webhooks.js";


const app = express();

app.use(cors());

const PORT = process.env.PORT || 5003;

app.get("/", (req, res) => res.send("API Working"));
app.post('/clerk', express.json(), clerkWebhooks)

// Connect to the database
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
