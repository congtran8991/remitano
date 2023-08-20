let jwt = require("jsonwebtoken");
const { JWT_REFRESH } = process.env;

const checkToken = (req, res, next) => {
  const refreshToken = req.headers["authorization"];
  if (!refreshToken)
    return res.status(401).send({
      data: {},
      error: -200,
      message: "No token provided.",
    });
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send({ data: {}, error: -100, msg: "Token is not valid" });
  }
};

module.exports = checkToken
