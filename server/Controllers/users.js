const jwt = require("jsonwebtoken");
const usersModel = require("../Models/users");
const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_REFRESH } = process.env;
const { hashedPassword, cache, generalAccessToken, generalRefreshToken } = require("../Utils");

const createNewUser = async (req, res, next) => {
  try {
    let { username, name, password, role, phone, email } = req.body;

    const [encryptPassword] = await hashedPassword(password);

    let user = new usersModel(
      username,
      name,
      encryptPassword,
      role,
      phone,
      email
    );
    user = await user.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

const loginAccount = async (req, res, next) => {
  const { email: bodyEmail, password: bodyPassword } = req.body;

  console.log(req.body, "hhshhh");

  try {
    const [result] = await usersModel.findOneUser(bodyEmail);

    if (!result[0]) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }

    const { id, email, password } = result[0];

    const [encryptPassword] = await hashedPassword(password);

    const isPasswordMatch = await bcrypt.compare(password, encryptPassword);

    console.log(isPasswordMatch, "isPasswordMatch");

    if (isPasswordMatch) {
      const payloadAccessToken = {
        email,
        id,
        exp: Math.floor(Date.now() / 1000) + 1 * 60,
      };

      const payloadRefreshToken = {
        email,
        id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      };

      const accessToken = generalAccessToken(payloadAccessToken);
      const refreshToken = generalRefreshToken(payloadRefreshToken)
      console.log(accessToken, refreshToken, "hhhhhhh")
      cache.setCache(email, refreshToken);

      return res
        .status(200)
        .json({ message: "login thành công", accessToken, refreshToken, data: result[0] });
    }
  } catch (error) {
    next(error);
  }
};

const refreshTokenService = async (req, res, next) => {
  try {
    const refreshToken = req.headers["authorization"];
    jwt.verify(refreshToken, JWT_REFRESH, (refreshError, refreshDecoded) => {
      if (refreshError) {
        // if (refreshError.name === "TokenExpiredError") {
          return res
            .status(404)
            .json({
              isSuccess: false,
              message: "The User is not authentication",
            });
        // }
      } else {
        const payloadAccessToken = {
          email: refreshDecoded?.email,
          id: refreshDecoded?.id,
          exp: Math.floor(Date.now() / 1000) + 1 * 60,
        };
        const newAccessToken = generalAccessToken(payloadAccessToken);
        return res
          .status(200)
          .json({ isSuccess: true, message: "success", accessToken: newAccessToken });
      }
    });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const [result] = await usersModel.finalAllUser();
    return res
      .status(200)
      .json({ isSuccess: true, message: "success", data: result[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewUser,
  getAllUser,
  loginAccount,
  refreshTokenService,
};
