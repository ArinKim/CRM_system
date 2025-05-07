import express from "express";
import verifyToken from "../middleware/auth";
const firebaseAuthController = require("../controllers/firebase-auth");
const userInfoController = require("../controllers/user-info");

const userRoute = express.Router();

// Authentication routes
userRoute.post("/api/auth/register", firebaseAuthController.registerUser);
userRoute.post("/api/auth/login", firebaseAuthController.loginUser);
userRoute.post("/api/auth/logout", firebaseAuthController.logoutUser);
userRoute.post(
  "/api/auth/reset-password",
  firebaseAuthController.resetPassword
);

// User management routes
userRoute.get(
  "/api/users",
  // verifyToken,
  userInfoController.getAllInformation
);

userRoute.get(
  "/api/users/:uid",
  // verifyToken,
  userInfoController.getInformation
);

userRoute.put(
  "/api/users/:uid",
  // verifyToken,
  userInfoController.updateInformation
);

userRoute.delete(
  "/api/users/:uid",
  // verifyToken,
  userInfoController.deleteInformation
);

export { userRoute };
