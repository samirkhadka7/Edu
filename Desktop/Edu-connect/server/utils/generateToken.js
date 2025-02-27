import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  // Use user.id for Sequelize
  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({
      success: true,
      message,
      user,
    });
};
