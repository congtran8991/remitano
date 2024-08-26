const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = require("../Models/user");
const checkToken = require("./checkToken");
const { validateEmail } = require("../Utils");
const auth = checkToken.checkToken;
const { JWT_SECRET, JWT_REFRESH } = process.env;
const router = express.Router();

router.post("/regis", async (req, res) => {
  const { email, passWord } = req.body;
  if (
    !validateEmail(email) ||
    passWord.length === 0 ||
    passWord.includes(" ")
  ) {
    return res.status(401).json({
      isSuccess: false,
      message: "Login không thành công. Email hoặc mật khẩu chưa chính sácw",
    });
  }

  try {
    const user = await login.findOne({ email });

    if (user) {
      const payloadAccessToken = {
        email,
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 1 * 60,
      };
      const payloadRefreshToken = {
        email,
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      };
      const accessToken = jwt.sign(payloadAccessToken, JWT_SECRET);
      const refreshToken = jwt.sign(payloadRefreshToken, JWT_REFRESH);
      const isPasswordMatch = await bcrypt.compare(passWord, user.passWord);

      if (isPasswordMatch) {
        return res.status(200).json({
          isSuccess: true,
          accessToken,
          refreshToken,
          message: "Login thành công",
          data: { email: user.email, id: user.id },
        });
      } else {
        return res.status(401).json({
          isSuccess: false,
          message: "Login không thành công. Email hoặc mật khẩu chưa chính sác",
        });
      }
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(passWord, salt);

      const newUser = new login({ email, passWord: hashedPassword });
      const savedUser = await newUser.save();

      const payloadAccessToken = {
        email,
        id: savedUser.id,
        exp: Math.floor(Date.now() / 1000) + 1 * 60,
      };
      const payloadRefreshToken = {
        email,
        id: savedUser.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      };
      const accessToken = jwt.sign(payloadAccessToken, JWT_SECRET);
      const refreshToken = jwt.sign(payloadRefreshToken, JWT_REFRESH);
      return res.status(200).json({
        isSuccess: true,
        accessToken,
        message: "login thành công",
        data: { email, id: savedUser.id },
      });
    }
  } catch (err) {
    return res.status(500).json({ isSuccess: false, message: "Lỗi server" });
  }
});

router.post("/checkToken", auth, (req, res) => {
  const { email, id } = req.user;
  const payloadAccessToken = {
    email,
    id,
    exp: Math.floor(Date.now() / 1000) + 1 * 60,
  };
  const accessToken = jwt.sign(payloadAccessToken, JWT_SECRET);
  return res.status(200).json({
    isSuccess: true,
    accessToken,
    message: "Login thành công",
    data: { email: req.user.email, id: req.user.id },
  });
});

module.exports = router;
