import React from "react";

const InputFields = ({ onChange, value, errorMsg, name }) => {
  return (
    <>
      <div className="fields">
        <label htmlFor="">Name</label>
        <input type="text" name={name} onChange={onChange} value={value} />
        <p className="errorMsg">{errorMsg}</p>
      </div>
    </>
  );
};

export default InputFields;
