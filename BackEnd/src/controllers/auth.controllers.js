const bcrypt = require("bcryptjs");
const sendResponse = require("../utils/response");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const tokenBlacklistModel = require("../models/blacklist.model");
/**
 * @name registerUserController
 * @description register a new user ,expects name,email,password in the request body
 * @access public
 * @route POST /api/auth/register
 * @param {*} req
 * @param {*} res
 */

async function registerUserController(req, res) {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  // Basic validation of name email and password
  if (!username || !email || !password) {
    return sendResponse(
      res,
      400,
      "Name, email and password are required",
      null,
    );
  }
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  // Check if a user with the same email or username already exists
  if (isUserAlreadyExists) {
    return sendResponse(
      res,
      400,
      "User with the same email or username already exists",
      null,
    );
  }

  const hash = await bcrypt.hash(password, 16);
  const user = await userModel.create({
    username,
    password: hash,
    email,
  });
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.cookie("token", token);
  return sendResponse(res, 201, "User registered successfully", {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
}

/**
 * @name loginUserController
 * @description login user with email and password, expects email and password in the request body
 * @access public
 * @route POST /api/auth/login
 * @param {*} req
 * @param {*} res
 */
async function loginUserController(req, res) {
  // 1️⃣ Get email and password from request body
  const { email, password } = req.body;

  /**
   * 2️⃣ Validate required fields
   * Prevent empty request body
   */
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  /**
   * 3️⃣ Validate email format
   * Basic regex validation for email
   */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email format", 400);
  }

  /**
   * 4️⃣ Validate password length
   * Prevent extremely short passwords
   */
  if (password.length < 6) {
    throw new AppError("Password must be at least 6 characters long", 400);
  }

  /**
   * 5️⃣ Find user by email
   */
  const user = await userModel.findOne({
    email,
  });

  /**
   * If user does not exist
   */
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  /**
   * 6️⃣ Compare hashed password with provided password
   */
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  /**
   * 7️⃣ Generate JWT token
   * Only store minimal data in token
   */
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  /**
   * 8️⃣ Cookie options for security
   * httpOnly  → prevents JS access (XSS protection)
   * secure    → HTTPS only in production
   * sameSite  → helps prevent CSRF
   */
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  /**
   * 9️⃣ Set token in cookie
   */
  res.cookie("token", token, cookieOptions);

  /**
   * 🔟 Send successful response using sendResponse utility
   */
  return sendResponse(res, 200, "Login successful", {
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
/**
 * @name logoutUserController
 * @description clear token  from user cookies and add the token to blacklist
 * @route GET /api/auth/logout
 * @access public
 * @param {} req
 * @param {*} res
 * @returns
 */
async function logoutUserController(req, res) {
  const token = req.cookies.token;
  if (token) {
    await tokenBlacklistModel.create({ token });
  }
  res.clearCookie("token");
  return sendResponse(res, 200, "Logout successful", null);
}
/**
 * @name getMeController
 * @description get the details of the logged in user, expects token in the cookies
 * @route GET /api/auth/get-me
 * @access private
 * @param {*} req
 * @param {*} res
 */
async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id).select("-password");
  console.log(user);
  return sendResponse(res, 200, "User details fetched successfully", {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
