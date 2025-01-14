import React from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";

const MovieDetails = () => {
  const location = useLocation();
  const { movDetail } = location.state;
  console.log(movDetail);

  return (
    <>
      {movDetail && (
        <div className="container">
          <div className="row">
            <div className="col col-lg-4">
              <div className="poster">
                <img src={movDetail.Poster} alt="" />
              </div>
            </div>
            <div className="col col-lg-8">
              <div className="poster-details">
                <h1>
                  {movDetail.Title}
                  <span>({movDetail.Year})</span>
                </h1>
                <p className="category">
                  <ul>
                    <li>{movDetail.Genre}</li>
                    <li>{movDetail.Runtime}</li>
                  </ul>
                </p>
                <h2>Overview</h2>
                <p className="overview">{movDetail.Plot}</p>
                <p className="cast">
                  <span>Cast:</span>
                  {movDetail.Actors}
                </p>
                <div className="rating_box">
                  <p>
                    <span>Score</span>
                    {movDetail.Metascore}
                  </p>
                  <Button btnName="Add to Watchlist" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
