const express = require("express");
// import express from "express";
const userRoute = express.Router();

const firebaseAuthController = require("../controllers/firebase-auth-controller");
// import firebaseAuthController from "../controllers/firebase-auth-controller.js";

userRoute.post("/api/register", firebaseAuthController.registerUser);
userRoute.post("/api/login", firebaseAuthController.loginUser);
userRoute.post("/api/logout", firebaseAuthController.logoutUser);
userRoute.post("/api/reset-password", firebaseAuthController.resetPassword);

module.exports = userRoute;
