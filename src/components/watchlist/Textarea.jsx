import React from "react";

const Textarea = React.memo(({ onChange, value, name }) => {
  // console.log("Textarea rendered");

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
});

export default Textarea;
