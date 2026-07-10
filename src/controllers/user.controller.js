const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const userService = require("../services/user.service");

/**
 * Get User Profile
 */
// const getProfile = (req, res) => {
//   try {
//     // Logged in user id from JWT
//     const userId = req.user.id;

//     // Read users.json
//     const usersData = fs.readFileSync(usersFilePath, "utf8");
//     const users = JSON.parse(usersData);

//     // Find user
//     const user = users.find((item) => item.id === userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found.",
//       });
//     }

//     // Remove password
//     const { password, ...userProfile } = user;

//     return res.status(200).json({
//       success: true,
//       data: userProfile,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

const getProfile = asyncHandler(async (req, res) => {
  const response = await userService.getProfile(req.user.id);

  return res.status(200).json(response);


})

/**
 * Update User Profile
 */
// const updateProfile = (req, res) => {
//   try {
//     const userId = req.user.id;

//     const { name, mobile, address } = req.body;

//     // Read users.json
//     const usersData = fs.readFileSync(usersFilePath, "utf8");
//     const users = JSON.parse(usersData);

//     // Find user index
//     const userIndex = users.findIndex((item) => item.id === userId);

//     if (userIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found.",
//       });
//     }

//     // Update only provided fields
//     users[userIndex] = {
//       ...users[userIndex],
//       name: name ?? users[userIndex].name,
//       mobile: mobile ?? users[userIndex].mobile,
//       address: address ?? users[userIndex].address,
//     };

//     // Save file
//     fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

//     // Remove password
//     const { password, ...updatedUser } = users[userIndex];

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully.",
//       data: updatedUser,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

const updateProfile = asyncHandler(async (req, res) => {
  const response = await userService.updateProfile(req.user.id, req.body.name, req.body.mobile, req.body.address);

  return res.status(200).json(response);

})

module.exports = {
  getProfile,
  updateProfile,
};