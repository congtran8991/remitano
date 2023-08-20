const authenticateJWT = require("./authenticateJWT");
const cache = require("./cache");
const bcrypt = require("bcrypt");

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

module.exports = {
  validateYouTubeUrl,
  validateEmail,
  authenticateJWT,
  hashedPassword,
  cache
};
