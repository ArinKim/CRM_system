import express from "express";

const firebaseAuthController = require("../controllers/firebase-auth");
const salesInfoController = require("../controllers/sales");
const authMiddleware = require("../middleware/auth");

const salesRoute = express.Router();

salesRoute.get(
  "/api/sales/get-info/",
  // authMiddleware,
  salesInfoController.getAllInformation
);

salesRoute.get(
  "/api/sales/get-info/:id",
  // authMiddleware,
  salesInfoController.getInformation
);

salesRoute.post(
  "/api/sales/create-info/",
  // authMiddleware,
  salesInfoController.createInformation
);

salesRoute.post(
  "/api/sales/update-info/:id",
  // authMiddleware,
  salesInfoController.updateInformation
);

salesRoute.delete(
  "/api/sales/delete-info/:id",
  // authMiddleware,
  salesInfoController.deleteInformation
);

export { salesRoute };
