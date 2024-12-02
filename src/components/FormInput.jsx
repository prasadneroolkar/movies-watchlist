import React from "react";

const FormInput = ({ placeholder, type }) => {
  return (
    <>
      <input
        type={type}
        id="email"
        placeholder={placeholder}
        // onChange={(e) => setEmail(e.target.value)}
      />
    </>
  );
};

export default FormInput;
