import express from "express";
const userRoute = express.Router();

const firebaseAuthController = require("../controllers/firebase-auth");
const userInfoController = require("../controllers/user-info");
const authMiddleware = require("../middleware/auth");

// Auth
userRoute.post("/api/register", firebaseAuthController.registerUser);
userRoute.post("/api/login", firebaseAuthController.loginUser);
userRoute.post("/api/logout", firebaseAuthController.logoutUser);
userRoute.post("/api/reset-password", firebaseAuthController.resetPassword);

// User Info
userRoute.get(
  "/api/user/get-info/",
  authMiddleware,
  userInfoController.getAllInformation
);
userRoute.get(
  "/api/user/get-info/:uid",
  authMiddleware,
  userInfoController.getInformation
);
userRoute.post(
  "/api/user/update-info/:uid",
  authMiddleware,

  userInfoController.updateInformation
);
userRoute.delete(
  "/api/user/delete-info/:uid",
  userInfoController.deleteInformation
);

export { userRoute };
