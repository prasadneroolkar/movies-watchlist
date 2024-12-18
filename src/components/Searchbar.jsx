import React from "react";
import search from "/images/search.png";

const Searchbar = ({ placeholder, onChange }) => {
  return (
    <div className="search_box d-flex justify-content-center align-items-center">
      <img src={search} alt="" />
      <input
        type="text"
        placeholder={placeholder}
        maxLength="100"
        onChange={onChange}
      />
    </div>
  );
};

export default Searchbar;
