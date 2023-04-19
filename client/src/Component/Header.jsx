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
import { removeCookie } from "../Utils/client";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataUserLogin = useSelector(userLoginSlice);
  console.log(dataUserLogin);
  const [infoLogin, setInfoLogin] = useState({ email: "", passWord: "" });
  const handleUserLogin = (e) => {
    const { name, value } = e.target;
    setInfoLogin({ ...infoLogin, [name]: value });
  };
  return (
    <div className="wrapper-header">
      <div className="header">
        <div className="left-header">Funny Movies</div>
        {!dataUserLogin.isLogin && (
          <div className="right-header">
            <InputCpn
              type="password"
              value={infoLogin.passWord}
              name="passWord"
              placeholder="Password"
              onChange={handleUserLogin}
            />
            <InputCpn
              type="email"
              value={infoLogin.email}
              name="email"
              placeholder="Email"
              onChange={handleUserLogin}
            />
            <ButtonCpn
              onClick={() => {
                const { email, passWord } = infoLogin;
                dispatch(userLogin({ email, passWord }));
              }}
              title="Login/Register"
            />
          </div>
        )}
        {dataUserLogin.isLogin && (
          <div className="right-header">
            <div>Welcome {dataUserLogin?.data?.data?.email}</div>
            <ButtonCpn
              onClick={() => {
                navigate("/share");
              }}
              title="Share a movie"
            />
            <ButtonCpn
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
