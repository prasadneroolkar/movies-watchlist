import React from "react";

const FormInput = ({
  Labelname,
  type = "text",
  onChange,
  value,
  InputRef,
  name,
}) => {
  return (
    <>
      <div className="label_input">
        <input
          name={name}
          type={type}
          placeholder=""
          value={value}
          onChange={onChange}
          ref={InputRef}
        />
        <label htmlFor="">{Labelname}</label>
      </div>
    </>
  );
};

export default FormInput;
