import express from "express";
import verifyToken from "../middleware/auth";
const salesInfoController = require("../controllers/sales");

const salesRoute = express.Router();

// Get all sales
salesRoute.get(
  "/sales",
  // verifyToken,
  salesInfoController.getAllInformation
);

// Get a specific sale by ID
salesRoute.get(
  "/sales/:id",
  // verifyToken,
  salesInfoController.getInformation
);

// Create a new sale
salesRoute.post(
  "/sales",
  // verifyToken,
  salesInfoController.createInformation
);

// Update a sale
salesRoute.put(
  "/sales/:id",
  // verifyToken,
  salesInfoController.updateInformation
);

// Delete a sale
salesRoute.delete(
  "/sales/:id",
  // verifyToken,
  salesInfoController.deleteInformation
);

export { salesRoute };
