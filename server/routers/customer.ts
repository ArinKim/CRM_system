import express from "express";

const firebaseAuthController = require("../controllers/firebase-auth");
const customerInfoController = require("../controllers/customer");
const authMiddleware = require("../middleware/auth");

const customerRoute = express.Router();

customerRoute.get(
  "/api/customer/get-info/",
  // authMiddleware,
  customerInfoController.getAllInformation
);

customerRoute.get(
  "/api/customer/get-info/:id",
  // authMiddleware,
  customerInfoController.getInformation
);

customerRoute.post(
  "/api/customer/create-info/",
  // authMiddleware,
  customerInfoController.createInformation
);

customerRoute.post(
  "/api/customer/update-info/:id",
  // authMiddleware,
  customerInfoController.updateInformation
);

customerRoute.delete(
  "/api/customer/delete-info/:id",
  // authMiddleware,
  customerInfoController.deleteInformation
);

export { customerRoute };
