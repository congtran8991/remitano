import express from "express";
require("dotenv").config();
import { cache } from "./Utils";
import { urlencoded, json } from "body-parser";
import redis from "redis";

import apiUsers from "./Api/user";
const app = express();
// const db = require("./Config/db")

//const { MONGO_URI } = process.env;
const port = "4000";
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/users", apiUsers);

app.use((err, req, res, next) => {
  res.status(400).json({
    success: false,
    message: err.message,
    code: err.code,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected Db!!!");
// })
cache.init();
cache.quit();
cache.testLog();
