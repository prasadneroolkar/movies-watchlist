import React from "react";

const FormInput = ({ Labelname, type = "text", onChange, value, InputRef }) => {
  return (
    <>
      <div className="label_input">
        <label htmlFor="">{Labelname}</label>
        <input
          type={type}
          placeholder=""
          value={value}
          onChange={onChange}
          ref={InputRef}
        />
      </div>
    </>
  );
};

export default FormInput;
