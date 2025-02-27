import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

// import { generateToken } from "../utils/token.js"; // Assuming you have a token utility

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Sequelize: Use "where" clause to find a user by email
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: role ? role : "student",
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Sequelize: Use "where" clause to find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const logout = async(__, res)=>{
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to Logout"
        })
    }
}



export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name, description } = req.body;
    const file = req.file;

    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    // Find user by primary key and exclude password field
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    // Update fields if they are provided
    if (name) user.name = name;
    if (description) user.description = description;
    if (file && cloudResponse) user.photoUrl = cloudResponse.secure_url;

    // Save updated user
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile"
    });
  }
};
