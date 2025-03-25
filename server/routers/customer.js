const express = require("express");
const {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} = require("../controllers/customer.js");

const customerRoute = express.Router();

customerRoute.post("/", createCustomer);
customerRoute.put("/:id", updateCustomer);
customerRoute.delete("/:id", deleteCustomer);
customerRoute.get("/:userId", getCustomers);

module.exports = customerRoute;
