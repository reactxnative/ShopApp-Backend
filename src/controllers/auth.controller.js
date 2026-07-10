const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const authService = require("../services/auth.service");

// users.json ka path
const usersFilePath = path.join(__dirname, "../data/users.json");
const asyncHandler = require("express-async-handler");

// Signup Controller
// const signup = (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Basic Validation
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, Email and Password are required.",
//       });
//     }

//     // Read users.json
//     const usersData = fs.readFileSync(usersFilePath, "utf-8");

//     // Convert JSON string to Array
//     const users = JSON.parse(usersData);

//     // Check Email Exists
//     const userExists = users.find(
//       (user) => user.email.toLowerCase() === email.toLowerCase()
//     );

//     if (userExists) {
//       return res.status(409).json({
//         success: false,
//         message: "Email already exists.",
//       });
//     }

//     const hashedPassword =  bcrypt.hashSync(password, 10);
//     // New User Object
//     const newUser = {
//       id: uuidv4(),
//       name,
//       email,
//       password: hashedPassword,
//       createdAt: new Date().toISOString(),
//     };

//     // Add User
//     users.push(newUser);

//     // Save File
//     fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully.",
//       data: newUser,
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
const signup = asyncHandler(async (req, res) => {
  const newUser = await authService.signup(req.body);
 
  return res.status(201).json({
    success: true,
    message: "User registered successfully.",
    data: newUser,
  });

})

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validation
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and Password are required.",
//       });
//     }

//     // Read users.json
//     const usersData = fs.readFileSync(usersFilePath, "utf8");
//     const users = JSON.parse(usersData);

//     // Find user
//     const user = users.find(
//       (item) => item.email.toLowerCase() === email.toLowerCase()
//     );

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // Generate JWT
//     const accessToken = jwt.sign(
//       {
//         id: user.id,
//         email: user.email,
//       },
//       process.env.AccESS_TOKEN_SECRET,
//       {
//         expiresIn: "7d",
//       }
//     );

//     const refreshToken = jwt.sign(
//       {
//         id: user.id,
//         email: user.email,
//       },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//         expiresIn: "30d",
//       }
//     );

//     // Remove password
//     const { password: _, ...userWithoutPassword } = user;

//     return res.status(200).json({
//       success: true,
//       message: "Login Successful",
//       accessToken,
//       refreshToken,
//       user: userWithoutPassword,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

const login = asyncHandler(async (req, res) => {
   const loginResponse = await authService.login(req.body);

   return res.status(200).json(loginResponse);

})

/**
 * Refresh Token Controller
 */
// const refreshToken = (req, res) => {
//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) {
//       return res.status(400).json({
//         success: false,
//         message: "Token is required.",
//       });
//     }

//     // Verify Token
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({
//           success: false,
//           message: "Invalid Token",
//         });
//       }

//       // Generate New Token
//       const newToken = jwt.sign(
//         {
//           id: decoded.id,
//           email: decoded.email,
//         },
//         process.env.ACCESS_TOKEN_SECRET,  
//         {
//           expiresIn: "7d",
//         }
//       );

//       return res.status(200).json({
//         success: true,
//         message: "Token refreshed successfully.",
//         accessToken: newToken,
//       });
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

const refreshToken = asyncHandler(async (req, res) => {

  const { refreshToken } = req.body;

  // Validation
  if (!refreshToken) {
    const error = new Error("Refresh token is required.");
    error.statusCode = 400;
    throw error;
  }

  // Check Refresh Token in Database
  const storedToken = await RefreshToken.findOne({
    token: refreshToken,
  });

  if (!storedToken) {


    const error = new Error("Invalid refresh token.");
    error.statusCode = 401;
    throw error;
  }

  // Check Token Expiry from Database
  if (storedToken.expiresAt < new Date()) {
    await RefreshToken.deleteOne({
      _id: storedToken._id,
    });

    const error = new Error("Refresh token expired.");
    error.statusCode = 401;
    throw error;
  }

  // Verify JWT
  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  // Check User Exists
  const user = await User.findById(decoded.id);

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  // Generate New Access Token
  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );

  return res.status(200).json({
    success: true,
    message: "Access token generated successfully.",
    accessToken,
  });


})

/**
 * Logout Controller
 */
const logout = asyncHandler(async (req, res) => {
  const response = await authService.logout(req.body);
  return res.status(200).json(response);
})

module.exports = {
  signup,
  login,
  refreshToken,
  logout
};