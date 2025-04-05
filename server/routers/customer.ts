import express from "express";

const firebaseAuthController = require("../controllers/firebase-auth");
const customerInfoController = require("../controllers/customer-info");
const authMiddleware = require("../middleware/auth");

const customerRoute = express.Router();

customerRoute.get(
  "/api/customer/get-info/",
  authMiddleware,
  customerInfoController.getAllInformation
);
customerRoute.get(
  "/api/customer/get-info/:uid",
  authMiddleware,
  customerInfoController.getInformation
);
customerRoute.post(
  "/api/customer/create-info/:uid",
  authMiddleware,
  customerInfoController.createInformation
);
customerRoute.post(
  "/api/customer/update-info/:uid",
  authMiddleware,
  customerInfoController.updateInformation
);
customerRoute.delete(
  "/api/customer/delete-info/:uid",
  authMiddleware,
  customerInfoController.deleteInformation
);

export { customerRoute };
