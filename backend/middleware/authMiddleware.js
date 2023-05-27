import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";

const protect = asyncHandler(async function (req, res, next) {
  console.log("cookie", req.cookies);
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, Please log in");
  }
});

export { protect };
