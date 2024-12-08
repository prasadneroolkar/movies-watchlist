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
      <div className="label_input">
        <label htmlFor="">{placeholder}</label>
        <input
          type={type}
          // placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={InputRef}
        />
      </div>
    </>
  );
};

export default FormInput;
