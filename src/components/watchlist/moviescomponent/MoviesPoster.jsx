import React from "react";
import unCheck from "/images/tick.png";
import Check from "/images/Checkmark.png";

const MoviesPoster = ({ onClick, moviearray, mapval }) => {
  return (
    <>
      <span onClick={onClick}>
        <img
          src={
            moviearray?.watchedMov.some(
              (m) => m.moveId === mapval.imdbID?.toString() && m.liked
            )
              ? Check
              : unCheck
          }
          alt="ribbon"
        />
      </span>
      <img src={mapval.Poster} className="card-img-top" alt={mapval.Title} />
    </>
  );
};

export default MoviesPoster;
