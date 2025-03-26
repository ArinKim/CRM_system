const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routers/user.js");
const customerRoute = require("./routers/customer.js");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const session = require("express-session");

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
app.use("/api/customers", customerRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
