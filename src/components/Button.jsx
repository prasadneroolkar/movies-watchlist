import React from "react";
import AddSharpIcon from "@mui/icons-material/AddSharp";

const Button = React.memo(({ btnName, className, type, onClick }) => {
  // console.log("Button rendered");

  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`btn_create  ${className}`}
      >
        {btnName}
      </button>
    </>
  );
});

export default Button;
