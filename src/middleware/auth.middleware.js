const jwt = require("jsonwebtoken");

function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError("Unauthorized, token is missing", 401);
  }



  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user,'from auth middle')
    next();
  } catch (error) {
    throw new AppError("Unauthorized, invalid token", 401);
  }
}

module.exports = { authUser };
