import React, { forwardRef } from "react";
import search from "/images/search.png";

const Searchbar = forwardRef(
  ({ placeholder, onChange, onKeyDown, value }, ref) => {
    return (
      <div
        className="search_box d-flex justify-content-center align-items-center"
        ref={ref}
      >
        <img src={search} alt="" />
        <input
          type="text"
          placeholder={placeholder}
          maxLength="100"
          onChange={onChange}
          value={value}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  }
);

export default Searchbar;
