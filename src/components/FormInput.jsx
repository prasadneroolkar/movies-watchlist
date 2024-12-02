import React from "react";

const FormInput = ({ placeholder }) => {
  return (
    <>
      <input
        type="email"
        id="email"
        placeholder={placeholder}
        // onChange={(e) => setEmail(e.target.value)}
      />
    </>
  );
};

export default FormInput;
