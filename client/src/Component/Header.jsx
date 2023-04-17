import React from "react";
import ButtonCpn from "../BasicComponent/ButtonCpn";
import InputCpn from "../BasicComponent/InputCpn";

const Header = () => {
  return (
    <div>
      <div className="header">
        <div className="left-header">Funny Movies</div>
        <div className="right-header">
          <InputCpn placeholder="Password" />
          <InputCpn placeholder="Email" />
          <ButtonCpn title="Login/Register" />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
