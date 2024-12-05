import React from "react";

const FormInput = ({ placeholder, type = "text", onChange, value }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default FormInput;
