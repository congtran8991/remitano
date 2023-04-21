import React from "react";

const ButtonCpn = (props) => {
  const { title = "", onClick = () => {}, style = {}, dataTestId = "defaultTestId" } = props;
  return (
    <button
      data-testid={dataTestId}
      style={style}
      onClick={onClick}
      className="btn"
    >
      {title}
    </button>
  );
};

export default ButtonCpn;
