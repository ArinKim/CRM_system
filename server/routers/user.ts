import express from "express";
import verifyToken from "../middleware/auth";
const firebaseAuthController = require("../controllers/firebase-auth");
const userInfoController = require("../controllers/user-info");

const userRoute = express.Router();

// Authentication routes
userRoute.post("/auth/register", firebaseAuthController.registerUser);
userRoute.post("/auth/login", firebaseAuthController.loginUser);
userRoute.post("/auth/logout", firebaseAuthController.logoutUser);
userRoute.post("/auth/reset-password", firebaseAuthController.resetPassword);

// User management routes
userRoute.get(
  "/users",
  // verifyToken,
  userInfoController.getAllUser
);

userRoute.get(
  "/users/:uid",
  // verifyToken,
  userInfoController.getUser
);

userRoute.put(
  "/users/:uid",
  // verifyToken,
  userInfoController.updateUser
);

userRoute.delete(
  "/users/:uid",
  // verifyToken,
  userInfoController.deleteUser
);

export { userRoute };
