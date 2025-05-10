import express from "express";
import verifyToken from "../middleware/auth";
import customerInfoController from "../controllers/customer";

const customerRoute = express.Router();

// Get all customers
customerRoute.get(
  "/customers",
  // verifyToken,
  customerInfoController.getAllCustomer
);

// Get a specific customer by ID
customerRoute.get(
  "/customers/:id",
  // verifyToken,
  customerInfoController.getCustomer
);

// Create a new customer
customerRoute.post(
  "/customers",
  // verifyToken,
  customerInfoController.createCustomer
);

// Update a customer
customerRoute.put(
  "/customers/:id",
  // verifyToken,
  customerInfoController.updateCustomer
);

// Delete a customer
customerRoute.delete(
  "/customers/:id",
  // verifyToken,
  customerInfoController.deleteCustomer
);

export { customerRoute };
