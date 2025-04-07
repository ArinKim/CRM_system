import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRoute } from "./routers/user";
// import {customerRoute} from "./routers/customer";
import cors from "cors";
import helmet from "helmet";
const app = express();
import session from "express-session";
import { salesRoute } from "./routers/sales";

dotenv.config();

const PORT = 3300;

app.use(helmet());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", ["*"]);
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());
app.use(userRoute);
app.use(salesRoute);
// app.use("/api/customers", customerRoute);
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
