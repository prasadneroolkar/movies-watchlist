import React from "react";

const FormInput = ({ placeholder, type = "text" }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        // onChange={(e) => setEmail(e.target.value)}
      />
    </>
  );
};

export default FormInput;
