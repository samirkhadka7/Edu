import jwt from "jsonwebtoken"

import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "User not authenticated", success: false });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      // Add these logs immediately after decoding the token:
      console.log("Decoded token:", decoded);       // <-- Insert this line
      console.log("Setting req.id to:", decoded.userId); // <-- Insert this line
      req.id = decoded.userId;
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({ message: "User not authenticated", success: false });
    }
};
  

