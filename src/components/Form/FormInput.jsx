import React from "react";

const FormInput = ({
  placeholder,
  type = "text",
  onChange,
  value,
  InputRef,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={InputRef}
      />
    </>
  );
};

export default FormInput;
