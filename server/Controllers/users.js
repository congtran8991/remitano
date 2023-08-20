import { sign } from "jsonwebtoken";
import usersModel, { findOneUser, finalAllUser } from "../Models/users";
import { compare } from "bcrypt";
import { hashedPassword } from "../Utils";

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
      success: true,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

const loginAccount = async (req, res, next) => {
  const { username: bodyUsername, password: bodyPassword } = req.body;

  console.log(req.body, "hhshhh");

  try {
    const [result] = await findOneUser(bodyUsername);

    if (!result[0]) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }

    const { id, username, password } = result[0];

    const [encryptPassword] = await hashedPassword(password);

    const isPasswordMatch = await compare(password, encryptPassword);

    console.log(isPasswordMatch, "isPasswordMatch");

    if (isPasswordMatch) {
      const payloadAccessToken = {
        username,
        id,
        exp: Math.floor(Date.now() / 1000) + 1 * 60,
      };

      const payloadRefreshToken = {
        username,
        id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      };

      const accessToken = sign(payloadAccessToken, JWT_SECRET);
      const refreshToken = sign(payloadRefreshToken, JWT_REFRESH);

      return res
        .status(200)
        .json({ message: "login thành công", accessToken, data: result[0] });
    }
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const [result] = await finalAllUser();
    return res.status(200).json({ message: "success", data: result[0] });
  } catch (error) {
    next(error);
  }
};

export default { createNewUser, getAllUser, loginAccount };
