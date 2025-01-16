import React from "react";

const Textarea = ({ onChange, value, name }) => {
  return (
    <>
      <div className="fields">
        <label htmlFor="">
          Description <span>(optional)</span>
        </label>
        <textarea name={name} id="" onChange={onChange} value={value} />
      </div>
    </>
  );
};

export default Textarea;
