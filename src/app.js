'use strict'

// require("dotenv").config();
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());    

module.exports = app;