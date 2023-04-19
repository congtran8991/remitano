import React from "react";

const ButtonCpn = (props) => {
  const { title = "", onClick = () => {}, style = {} } = props;
  return (
    <button style={style} onClick={onClick} className="btn">
      {title}
    </button>
  );
};

export default ButtonCpn;
