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
  userInfoController.getAllInformation
);

userRoute.get(
  "/users/:uid",
  // verifyToken,
  userInfoController.getInformation
);

userRoute.put(
  "/users/:uid",
  // verifyToken,
  userInfoController.updateInformation
);

userRoute.delete(
  "/users/:uid",
  // verifyToken,
  userInfoController.deleteInformation
);

export { userRoute };
