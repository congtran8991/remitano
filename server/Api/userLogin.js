const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = require('../Model/user');
const checkToken = require('./checkToken');
const auth = checkToken.checkToken;
const { JWT_SECRET } = process.env;

const router = express.Router();

router.post('/regis', async (req, res) => {
  const { email, passWord } = req.body;

  try {
    const user = await login.findOne({ email });

    if (user) {
      const payload = { email, id: user.id };
      const token = jwt.sign(payload, "SECRET");

      const isPasswordMatch = await bcrypt.compare(passWord, user.passWord);

      if (isPasswordMatch) {
        return res.status(200).json({
          success: true,
          token,
          message: 'Login thành công',
          data: { email: user.email, id: user.id },
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Login không thành công. Email hoặc mật khẩu chưa chính sác',
        });
      }
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(passWord, salt);

      const newUser = new login({ email, passWord: hashedPassword });
      const savedUser = await newUser.save();

      const payload = { email, id: savedUser.id };
      const token = jwt.sign(payload, "SECRET");

      return res.status(200).json({
        success: true,
        token,
        message: 'Đăng kí thành công',
        data: { email, id: savedUser.id },
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

router.post('/checkToken', auth, (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Login thành công',
    data: { email: req.user.email, id: req.user.id },
  });
});

module.exports = router;
