import React from "react";

const Textarea = ({ onChange, value }) => {
  return (
    <>
      <div className="fields">
        <label htmlFor="">
          Description <span>(optional)</span>
        </label>
        <textarea name="" id="" onChange={onChange} value={value} />
      </div>
    </>
  );
};

export default Textarea;
