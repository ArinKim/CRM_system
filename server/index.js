// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import userRoute from "./routers/user.js";
// import customerRoute from "./routers/customer.js";
// import cors from "cors";

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routers/user.js");
const customerRoute = require("./routers/customer.js");
const cors = require("cors");

const app = express();
dotenv.config();

const PORT = 3300;

// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO);
//     console.log("Connected to mongoDB.");
//   } catch (error) {
//     throw error;
//   }
// };

// mongoose.connection.on("disconnected", () => {
//   console.log("mongoDB disconnected!");
// });

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});
app.use(express.json());
app.use(userRoute);
app.use("/api/customers", customerRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
