const User = require("../models/User");
const AppError = require("../utils/AppError");

const getProfile = async (userId) => {

  // Read user from db
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  return {
    success: true,
    message: "User profile fetched successfully.",
    data: user,
  }
}

const updateProfile = async (userId, name, mobile, address) => {

  // Read user from mongoDB
  const user = await User.findById(userId);


  if (!user) {
    throw new AppError("User not found.", 404)
  }

  // Update only provided fields
  user.name = name ?? user.name;
  user.mobile = mobile ?? user.mobile;
  user.address = address ?? user.address;

  // Save updated user
  await user.save();


  return {
    success: true,
    message: "Profile updated successfully.",
    data: user,
  }
}

module.exports = {
  getProfile,
  updateProfile,
};