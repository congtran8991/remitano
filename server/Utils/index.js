const jwt = require("jsonwebtoken");

const authenticateJWT = require("./authenticateJWT");
const cache = require("./cache");
const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_REFRESH } = process.env;

const validateYouTubeUrl = (url) => {
  var p =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  var matches = url.match(p);
  if (matches) {
    return matches[1];
  }
  return false;
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return [hashed];
};

const generalAccessToken = (payLoad) => {
  const accessToken = jwt.sign(payLoad, JWT_SECRET);
  return accessToken
}

const generalRefreshToken = (payLoad) => {
  const refreshToken = jwt.sign(payLoad, JWT_REFRESH);
  return refreshToken
}

module.exports = {
  validateYouTubeUrl,
  validateEmail,
  authenticateJWT,
  hashedPassword,
  generalAccessToken,
  generalRefreshToken,
  cache
};
