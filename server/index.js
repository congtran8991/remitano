const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const apiUser = require("./Api/userLogin");
const apiMovie = require("./Api/movie");
const app = express();
const port = "https://remitano-eta.vercel.app/";

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

app.use("/api/loginUser", apiUser);
app.use("/api/movie", apiMovie);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose
  .connect(
    "mongodb+srv://congtran8991:PYdZxei8ERjKwqXF@cluster0.xyento7.mongodb.net/DbRemi",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connectedd"))
  .catch((err) => console.log(err));
