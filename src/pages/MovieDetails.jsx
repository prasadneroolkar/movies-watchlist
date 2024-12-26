import React from "react";
import { useLocation } from "react-router-dom";

const MovieDetails = () => {
  const location = useLocation();
  const { movDetail } = location.state || {};

  return (
    <div>
      {movDetail ? (
        <p>{JSON.stringify(movDetail)}</p>
      ) : (
        <p>No movie details available</p>
      )}
    </div>
  );
};

export default MovieDetails;
