"use strict";

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const express = require("express");
const mongoClient = require("mongoose");
const cors = require("cors");
const app = express();

global.SALT_KEY = process.env.SALT_KEY;

const uri = process.env.MONGO_URL;

const connectDB = async () => {
  await mongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("DB connected.");
};
connectDB();

const users = require("./models/user");
const classModule = require("./models/classModule");
const videoLeassons = require("./models/videoLeasson");

const userRoute = require("./routes/user-routes");
const classModuleRoute = require("./routes/classModule-route");
const videoLeassonRoute = require("./routes/videoLeasson-route");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use("/user", userRoute);
app.use("/module", classModuleRoute);
app.use("/leasson", videoLeassonRoute);

module.exports = app;
