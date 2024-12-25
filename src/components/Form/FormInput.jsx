import React from "react";

const FormInput = ({ Labelname, type = "text", onChange, value, InputRef }) => {
  return (
    <>
      <div className="label_input">
        <input
          type={type}
          placeholder=""
          value={value}
          onChange={onChange}
          ref={InputRef}
          autoComplete
        />
        <label htmlFor="">{Labelname}</label>
      </div>
    </>
  );
};

export default FormInput;
