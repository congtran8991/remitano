import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonCpn from "../BasicComponent/ButtonCpn";
import InputCpn from "../BasicComponent/InputCpn";
import { useNavigate } from "react-router-dom";
import {
  userLogin,
  userLoginSlice,
  logoutUser,
} from "../Redux/reducer/userLoginSlice";
import { toast } from "react-toastify";
import { removeCookie, validateEmail } from "../Utils/client";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataUserLogin = useSelector(userLoginSlice);
  const [infoLogin, setInfoLogin] = useState({ email: "", passWord: "" });
  const handleUserLogin = (e) => {
    const { name, value } = e.target;
    setInfoLogin({ ...infoLogin, [name]: value });
  };
  const handleLoginRegister = () => {
    const { email, passWord } = infoLogin;
    if (!validateEmail(email) || passWord.length === 0) {
      return toast.warn("Email hoặc Password đăng nhập không hợp lệ", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
    dispatch(userLogin({ email, passWord }));
  };
  return (
    <div className="wrapper-header">
      <div className="header">
        <div className="left-header">Funny Movies</div>
        {!dataUserLogin.isLogin && (
          <div className="right-header">
            <InputCpn
              dataTestId="input-password"
              type="password"
              value={infoLogin.passWord.trim()}
              name="passWord"
              placeholder="Password"
              onChange={handleUserLogin}
            />
            <InputCpn
              dataTestId="input-email"
              type="email"
              value={infoLogin.email}
              name="email"
              placeholder="Email"
              onChange={handleUserLogin}
            />
            <ButtonCpn
              dataTestId="btn-login"
              onClick={handleLoginRegister}
              title="Login/Register"
            />
          </div>
        )}
        {dataUserLogin.isLogin && (
          <div className="right-header">
            <div>Welcome {dataUserLogin?.data?.data?.email}</div>
            <ButtonCpn
              dataTestId="btn-share"
              onClick={() => {
                navigate("/share");
              }}
              title="Share a movie"
            />
            <ButtonCpn
              dataTestId="btn-logout"
              onClick={() => {
                removeCookie("token");
                dispatch(logoutUser());
              }}
              title="Logout"
            />
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Header;
