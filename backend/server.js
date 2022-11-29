const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const transactionRoute = require("./route/transactionRoute");

app.use(cors());
dotenv.config();
app.use(express());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Database connected");
});

app.use("/api/v1", transactionRoute);

app.listen(8000, () => {
  console.log("Server is running at 8000");
});
