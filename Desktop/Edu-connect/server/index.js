import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRoute from "./routes/course.route.js"
import { connectDB,sequelize } from "./database/db.js";
import userRoute from "./routes/user.route.js";
import mediaRoutes from "./routes/media.route.js";

const app = express();

const PORT = process.env.PORT || 5001;


// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


// Connect to Database
connectDB();

// apis
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute)


const startServer = async () => {
    try {
      await sequelize.sync({ alter: true }); // Sync models with the database
      console.log("Database synced successfully.");
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
      console.error("Error syncing database:", error);
    }
};
  
startServer();

