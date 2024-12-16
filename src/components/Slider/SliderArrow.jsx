import React from "react";

const SliderArrow = ({ arrowBtn, onClick, className }) => {
  return (
    <>
      <button className={className} onClick={onClick}>
        {arrowBtn}
      </button>
    </>
  );
};

export default SliderArrow;
