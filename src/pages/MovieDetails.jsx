import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import AddwatchlistModal from "../components/watchlist/modal/AddwatchlistModal";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

const MovieDetails = () => {
  const location = useLocation();
  const { movDetail } = location.state;
  const { setPopup, popup, currentUser } = useContext(AuthContext);

  const localWatchlistName = useSelector(
    (state) => state.localWatchlist.watchlists
  );

  const userWatchlists = localWatchlistName?.filter(
    (watchlist) => watchlist.user === currentUser?.email
  );

  const runTime = () => {
    const moviTime = parseInt(movDetail.Runtime.split(" ")[0]);
    const convertMin = (moviTime) => {
      const Hour = Math.floor(moviTime / 60);
      const mins = moviTime % 60;
      return `${Hour}h ${mins}m`;
    };

    return convertMin(moviTime);
  };
  const movieTime = runTime();

  const openModal = () => {
    setPopup(!popup);
  };

  const onhandleClose = () => {
    setPopup(false);
  };

  return (
    <>
      {movDetail && (
        <section>
          <div className="container ">
            <div className="row">
              <div className="col-12 col-lg-4">
                <div className="poster">
                  <img src={movDetail.Poster} alt="" />
                </div>
              </div>
              <div className="col-12 col-lg-8">
                <div className="poster-details">
                  <h1>
                    {movDetail.Title}
                    <span>({movDetail.Year})</span>
                  </h1>
                  <p className="category">
                    <ul>
                      <li>{movDetail.Genre}</li>
                      <li>{movieTime && movieTime}</li>
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
                    <Button btnName="Add to Watchlist" onClick={openModal} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {popup && (
        <AddwatchlistModal
          movieDetails={movDetail}
          status={popup}
          closeList={onhandleClose}
          list={userWatchlists}
        />
      )}
    </>
  );
};

export default MovieDetails;
