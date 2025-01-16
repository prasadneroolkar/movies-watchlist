import React from "react";

const InputFields = ({ onChange, value, errorMsg }) => {
  return (
    <>
      <div className="fields">
        <label htmlFor="">Name</label>
        <input type="text" onChange={onChange} value={value} />
        <p className="errorMsg">{errorMsg}</p>
      </div>
    </>
  );
};

export default InputFields;
