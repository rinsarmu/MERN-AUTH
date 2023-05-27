import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/logout", logoutUser);
router.post("/auth", authUser);
router.route("/profile").get(getUserProfile).patch(updateUserProfile);

export default router;
