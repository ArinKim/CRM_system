import express from "express";
import verifyToken from "../middleware/auth";
const salesInfoController = require("../controllers/sales");

const salesRoute = express.Router();

// Get all sales
salesRoute.get(
  "/sales",
  // verifyToken,
  salesInfoController.getAllSales
);

// Get a specific sale by ID
salesRoute.get(
  "/sales/:id",
  // verifyToken,
  salesInfoController.getSales
);

// Create a new sale
salesRoute.post(
  "/sales",
  // verifyToken,
  salesInfoController.createSales
);

// Update a sale
salesRoute.put(
  "/sales/:id",
  // verifyToken,
  salesInfoController.updateSales
);

// Delete a sale
salesRoute.delete(
  "/sales/:id",
  // verifyToken,
  salesInfoController.deleteSales
);

export { salesRoute };
