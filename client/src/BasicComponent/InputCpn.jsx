import React from "react";

const InputCpn = (props) => {
  const {
    value = "",
    placeholder = "",
    onChange = () => {},
    name = "",
    type = "text",
    style = {},
  } = props;
  return (
    <input
      type={type}
      name={name}
      className="input-cpn"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={style}
    />
  );
};

export default InputCpn;
