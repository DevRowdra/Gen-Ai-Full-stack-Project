const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError("Unauthorized, token is missing", 401);
  }
  if(token){
    // console.log(token,'middle eat')
    const isBlacklisted = await tokenBlacklistModel.findOne({ token });
    if (isBlacklisted) {
      throw new AppError("Unauthorized, token is invalid", 401);
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    throw new AppError("Unauthorized, invalid token", 401);
  }
}

module.exports = { authUser };
