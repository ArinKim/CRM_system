import express from "express";
import dotenv from "dotenv";
import { userRoute } from "./routers/user";
import cors from "cors";
import helmet from "helmet";
const app = express();
import { salesRoute } from "./routers/sales";
import { customerRoute } from "./routers/customer";

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

// API Version 1
app.use("/api/v1", userRoute);
app.use("/api/v1", salesRoute);
app.use("/api/v1", customerRoute);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
