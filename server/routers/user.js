const express = require("express");
const userRoute = express.Router();

const firebaseAuthController = require("../controllers/firebase-auth-controller");
const userInfoController = require("../controllers/user-info-controller");
const authMiddleware = require("../middleware/auth-middleware");

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
  "/api/user/create-info/:uid",
  userInfoController.createInformation
);
userRoute.put(
  "/api/user/update-info/:uid",
  userInfoController.updateInformation
);
userRoute.delete(
  "/api/user/delete-info/:uid",
  userInfoController.deleteInformation
);

module.exports = userRoute;
