import React from "react";
import { useLocation } from "react-router-dom";

const MovieDetails = () => {
  const location = useLocation();
  const { movDetail } = location.state;

  return (
    <div>
      {movDetail ? <p>{movDetail.Title}</p> : <p>No movie details available</p>}
    </div>
  );
};

export default MovieDetails;
