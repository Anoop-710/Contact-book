import express from "express";
import {
  registerUser,
  loginUser,
  currentUser,
} from "../controllers/userController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateToken, currentUser);

export default router;
