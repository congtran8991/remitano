import React from "react";

const InputCpn = (props) => {
  const { value = "", placeholder = "" } = props;
  return (
    <input className="input-cpn" value={value} placeholder={placeholder} />
  );
};

export default InputCpn;
