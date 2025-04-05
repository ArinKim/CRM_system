import express from "express";

const firebaseAuthController = require("../controllers/firebase-auth");
const salesInfoController = require("../controllers/sales-info");
const authMiddleware = require("../middleware/auth");

const salesRoute = express.Router();

salesRoute.get(
  "/api/sales/get-info/",
  authMiddleware,
  salesInfoController.getAllInformation
);
salesRoute.get(
  "/api/sales/get-info/:uid",
  authMiddleware,
  salesInfoController.getInformation
);
salesRoute.post(
  "/api/sales/create-info/:uid",
  authMiddleware,
  salesInfoController.createInformation
);
salesRoute.post(
  "/api/sales/update-info/:uid",
  authMiddleware,
  salesInfoController.updateInformation
);
salesRoute.delete(
  "/api/sales/delete-info/:uid",
  authMiddleware,
  salesInfoController.deleteInformation
);

export { salesRoute };
