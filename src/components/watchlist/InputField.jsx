import React from "react";

const InputFields = ({ onChange, value }) => {
  return (
    <>
      <div className="fields">
        <label htmlFor="">Name</label>
        <input type="text" onChange={onChange} value={value} />
        <p>required</p>
      </div>
    </>
  );
};

export default InputFields;
