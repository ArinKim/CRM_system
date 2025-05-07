import express from "express";
import verifyToken from "../middleware/auth";
const customerInfoController = require("../controllers/customer");

const customerRoute = express.Router();

// Get all customers
customerRoute.get(
  "/api/customers",
  // verifyToken,
  customerInfoController.getAllInformation
);

// Get a specific customer by ID
customerRoute.get(
  "/api/customers/:id",
  // verifyToken,
  customerInfoController.getInformation
);

// Create a new customer
customerRoute.post(
  "/api/customers",
  // verifyToken,
  customerInfoController.createInformation
);

// Update a customer
customerRoute.put(
  "/api/customers/:id",
  // verifyToken,
  customerInfoController.updateInformation
);

// Delete a customer
customerRoute.delete(
  "/api/customers/:id",
  // verifyToken,
  customerInfoController.deleteInformation
);

export { customerRoute };
