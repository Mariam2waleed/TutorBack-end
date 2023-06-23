const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1].trim()
 
   console.log("authorization: ", token);

  if (!token) {
    const error = new Error("Not authenticated1");
    error.statusCode = 401;
    console.log("Token is missing");
    return next(error);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SEC);

    if (!decodedToken) {
      const error = new Error("Not authenticated2");
      error.statusCode = 401;
      console.log("Decoded token is missing");
      return next(error);
    }

    req.userId = decodedToken.userId;
    req.role = decodedToken.role;
    console.log("Token is valid");
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      const error = new Error("Invalid token");
      error.statusCode = 401;
      console.log("Invalid token");
      return next(error);
    }

    if (!err.statusCode) {
      err.statusCode = 500;
    }
    console.log("Unexpected error occurred");
    next(err);
  }
};
