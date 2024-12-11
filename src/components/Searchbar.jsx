import React from "react";
import search from "/images/search.png";

const Searchbar = ({ placeholder }) => {
  return (
    <div className="search_box d-flex justify-content-center align-items-center">
      <img src={search} alt="" />
      <input type="text" placeholder={placeholder} maxLength="100" />
    </div>
  );
};

export default Searchbar;
