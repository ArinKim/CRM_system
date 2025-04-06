import express from "express";

const firebaseAuthController = require("../controllers/firebase-auth-controller");
const salesInfoController = require("../controllers/sales");
const authMiddleware = require("../middleware/auth-middleware");

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
  "/api/sales/create-info/:id",
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
