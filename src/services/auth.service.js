const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");



const signup = async ({ name, email, password }) => {

    // Basic Validation
    if (!name || !email || !password) {


        throw new AppError("Name, Email and Password are required.", 400);

    }


    // Check Email Exists
    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {

        throw new AppError("Email already exists.", 409);

    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    // New User Object


    // Create User in Database
    const createdUser = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
    });


    return await User.findById(createdUser._id);
}

const login = async ({ email, password }) => {

      // Validation
      if (!email || !password) {
        throw new AppError("Email and Password are required.", 400);
      }
    
      // Read user from database
      const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    
    
      if (!user) {   
        throw new AppError("Invalid email or password", 401);
      }
    
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
    
      if (!isMatch) {
    
        throw new AppError("Invalid email or password", 401);
      }
    
      // Generate JWT
      const accessToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );
    
      const refreshToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "30d",
        }
      );
    
      // Save Refresh Token
      await RefreshToken.create({
        userId: user._id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    
      // Remove password
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
    
      return {
        success: true,
        message: "Login Successful",
        accessToken,
        refreshToken,
        user: userWithoutPassword,
      };
}

const logout = async ({refreshToken}) => {

  if (!refreshToken) {
    throw new AppError("Refresh token is required.", 400);
  }

  await RefreshToken.deleteOne({
    token: refreshToken,
  });

  return {
    success: true,
    message: "Logout successful.",
  }
}

module.exports = {
    signup,
    login,
    logout  
};