import React from "react";
import better from "/images/better.png";
import good from "/images/good.png";
import awful from "/images/awful.png";

const MoviesRating = ({ mapval }) => {
  return (
    <p className="ratings">
      {(() => {
        const ratingValue = parseInt(mapval.Value.slice(0, 2), 10);
        return (
          <>
            <img
              src={ratingValue > 50 ? better : ratingValue < 35 ? awful : good}
              alt="rating-icon"
            />
            <span>{ratingValue}</span>
            <sup>/100</sup>
          </>
        );
      })()}
    </p>
  );
};

export default MoviesRating;
