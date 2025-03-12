import React from "react";
import AddSharpIcon from "@mui/icons-material/AddSharp";

const Button = React.memo(({ btnName, className, type, onClick }) => {
  console.log("Button rendered");

  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`btn_create d-flex justify-content-center align-items-center column-gap-1 ${className}`}
      >
        {btnName}
      </button>
    </>
  );
});

export default Button;
