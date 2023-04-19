const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const login = require("../Model/user");
const jwt = require("jsonwebtoken");
const checkToken = require("./checkToken");
const auth = checkToken.checkToken;

router.post("/regis", (req, res) => {
  let { email, passWord } = req.body;
  login
    .findOne({ email })
    .then((result) => {
      const payload = {
        email,
        id: result.id,
      };
      const token = jwt.sign(payload, "SECRET");
      if (result) {
        bcrypt
          .compare(passWord, result?.passWord)
          .then((resultBcrypt) => {
            if (resultBcrypt) {
              return res.status(200).json({
                success: true,
                token,
                message: "Login thành công",
                data: {
                  email: result.email,
                  id: result.id,
                },
              });
            }
            return res.status(401).json({
              success: false,
              message:
                "Login không thành công. Email hoặc mật khẩu chưa chính sác",
            });
          })
          .catch((err) => {
            res.send({
              success: false,
              message: "Đăng nhập không thành công",
              err,
            });
          });
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(passWord, salt, function (err, hash) {
            let dataRegis = new login({
              email,
              passWord: hash,
            });
            payload = {
              email,
              id: result.id
            }
            token = jwt.sign(payload, "SECRET")
            dataRegis
              .save()
              .then((result) => {
                return res.status(200).json({
                  success: true,
                  token,
                  message: "Đăng kí thành công",
                  data: {
                    email,
                    id: result.id,
                  },
                });
              })
              .catch((err) =>
                res.send({
                  message: "Đăng kí không thành công",
                  success: false,
                  err,
                })
              );
          });
        });
      }
    })
    .catch((err) => {
      res.send({ success: false, err });
    });
});
router.post("/checkToken", auth, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Login thành công",
    data: {
      email: req.user.email,
      id: req.user.id
    },
  });
});
module.exports = router;
