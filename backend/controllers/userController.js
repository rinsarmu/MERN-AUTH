import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateTokens.js";
//@desc     Auth users/set tokens
//route     POST /api/users/auth
//@access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    return res.status(200).json({ message: "Auth User", data: { user } });
  } else {
    res.status(400);
    throw new Error("Email or password is incorrect.");
  }
});

//@desc     Register user
//route     POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User is already exist");
  }

  const user = await User.create({ name, email, password });
  if (!user) {
    res.status(400);
    throw new Error("Invalid in user data");
  }

  generateToken(res, user._id);
  return res.status(200).json({ message: "Registered User", data: { user } });
});

//@desc     Logout user
//route     POST /api/users/logout
//@access   Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", " ", {
    httpOnly: true,
    expires: new Date(),
  });
  return res.status(200).json({ message: "User is logged out User" });
});

//@desc     GEt user aprofile
//route     Get /api/users/profile
//@access   Private

const getUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user);
  const { _id, name, email } = req.user;
  return res
    .status(200)
    .json({ message: "  User  Profile", data: { _id, name, email } });
});

//@desc     GEt user profile
//route     Get /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // console.log(req.user);
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.name;

    if (req.body.password && (await user.matchPassword(req.body.password))) {
      user.password = req.body.newPassword;
    }

    user.save();
    return res.status(200).json({
      message: "Update User  Profile",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
