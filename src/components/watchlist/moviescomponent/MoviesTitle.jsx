import React from "react";

const MoviesTitle = ({ mapval }) => {
  return (
    <h5 className="card-title">
      {mapval.Title}
      <span>({mapval.Year})</span>
    </h5>
  );
};

export default MoviesTitle;
