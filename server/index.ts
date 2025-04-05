import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRoute } from "./routers/user";
import { customerRoute } from "./routers/customer";
import cors from "cors";
import helmet from "helmet";
const app = express();
import session from "express-session";

dotenv.config();

const PORT = 3300;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "s3Cur3",
    name: "sessionId",
    cookie: {
      secure: true, // Ensures the browser only sends the cookie over HTTPS
      httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not client JavaScript
      sameSite: "Strict", // Ensures the cookie is sent only to the same site
    },
  })
);

app.use(helmet());
app.use(cors());
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  res.append("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());

app.use(userRoute);
app.use(customerRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
