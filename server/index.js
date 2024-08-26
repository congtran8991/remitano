const express = require("express");
const path = require('path')

require("dotenv").config();
const { cache } = require("./Utils");
const bodyParser = require("body-parser");
const redis = require("redis");

const apiUsers = require("./Api/user");
const apiProduct = require("./Api/product");
const apiCategory = require("./Api/category")

const app = express();
const db = require("./Config/db")

//const { MONGO_URI } = process.env;
const port = "4000";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

(async () => {
   cache.init();
})()

app.get(express.static( "./upload"));
// app.use(express.static('../public'))

app.use("/users", apiUsers);
app.use("/product", apiProduct)
app.use("/category", apiCategory)

app.use((err, req, res, next) => {
  res.status(400).json({
    isSuccess: false,
    message: err.message,
    code: err.code,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// db.connect(function (err) {
//   console.log("hvhshvhs")
//   if (err) throw err;
//   console.log("Connected Db!!!");
// })

// cache.quit();
// cache.testLog();
