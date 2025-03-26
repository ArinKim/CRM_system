// const express = require("express");
import express from "express";
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from "../controllers/customer.js";

const customerRoute = express.Router();

customerRoute.post("/", createCustomer);
customerRoute.put("/:id", updateCustomer);
customerRoute.delete("/:id", deleteCustomer);
customerRoute.get("/:userId", getCustomers);

export {customerRoute};
