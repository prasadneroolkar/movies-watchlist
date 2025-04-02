import React, { useState } from "react";

const FormInput = ({
  Labelname,
  type = "text",
  onChange,
  value,
  InputRef,
  name,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <div className={`label_input ${isFocused || value ? "active" : ""}`}>
        <input
          name={name}
          type={type}
          placeholder=""
          value={value}
          onChange={onChange}
          ref={InputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== "")}
        />
        <label htmlFor="">{Labelname}</label>
      </div>
    </>
  );
};

export default FormInput;
