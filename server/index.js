const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routers/user.js");
const customerRoute = require("./routers/customer.js");
const cors = require("cors");

const app = express();
dotenv.config();

const PORT = 3300;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});
app.use(express.json());
app.use(userRoute);
app.use("/api/customers", customerRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
