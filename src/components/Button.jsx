import React from "react";
import AddSharpIcon from "@mui/icons-material/AddSharp";

const Button = ({ btnName, className }) => {
  return (
    <>
      <button
        className={`btn_create d-flex justify-content-center align-items-center column-gap-1 ${className}`}
      >
        {btnName}
      </button>
    </>
  );
};

export default Button;
