let jwt = require("jsonwebtoken");
const cache  = require("./cache");
const { JWT_REFRESH, JWT_SECRET } = process.env;

const checkToken = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  
  if (!accessToken)
    return res.status(401).send({
      data: {},
      error: -200,
      message: "No token provided.",
    }); 

  jwt.verify(accessToken, JWT_SECRET, (accessError, accessDecoded) => {
    console.log(accessError?.name,"accessError")
    if (accessError) {
      // if (accessError.name === "TokenExpiredError") {
        return res
        .status(404)
        .json({ isSuccess: false, message: "The User is not authentication"});
      // }
    } else {
      req.user = accessDecoded;
      next();
    }
  });
};

module.exports = checkToken;
