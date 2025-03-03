import React, { useContext } from "react";
import PageTitle from "../components/watchlist/PageTitle";
import editBtn from "/images/editBtn.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { contextWatchlist } from "../context/WatchlistContext";
import better from "/images/better.png";
import good from "/images/good.png";
import awful from "/images/awful.png";
import { Value } from "sass";

const WatchlistPage = () => {
  const { listID } = useContext(contextWatchlist);

  const currentLocalid = JSON.parse(localStorage.getItem("currentID"));

  const watchlistDetails = useSelector(
    (state) => state.localWatchlist.watchlists
  );
  console.log("watchlistDetails", watchlistDetails);

  let getDetails;
  if (currentLocalid != undefined) {
    getDetails = watchlistDetails?.find((data) => data.id === currentLocalid);
  } else {
    getDetails = null;
  }
  console.log("getDetails", getDetails);

  // let res = Array.isArray(getDetails);
  const getAVg = () => {
    const getMov = getDetails?.movies;
    const getRatings = getMov.map((rate) => rate.Ratings);
    console.log("Before Flat getRatings", getRatings);
    const getRatings2 = getMov.map((rate) => rate.Ratings).flat();
    console.log("afer Flat getRatings", getRatings2);

    let res = Array.isArray(getRatings2);
    console.log(res);
    const getSource = getRatings2.map((src) => src);
    console.log("getSource", getSource.Source);

    if (getSource.Source === "Metacritic") {
      console.log("getSource Vallue", getSource.Value);
    }

    console.log("getMov", getMov);
    console.log("getRatings", getRatings);
  };
  getAVg();

  return (
    <>
      <section className="watchlist_page">
        {/* <div>
          {getDetails?.movies?.map((val, index) => (
            <p key={index}>
              {val.Ratings?.map((rate, rIndex) => (
                <span key={rIndex}>
                  {rate.Source === "Metacritic" &&
                    parseInt(rate.Value.slice(0, 2))}
                </span>
              ))}
            </p>
          ))}
          <pre>getdetails:{res.toString()}</pre>
        </div> */}
        <div className="editbtn">
          <PageTitle className="mb-0" Title={getDetails?.name} />
          <Link to="/editlist">
            <img src={editBtn} alt="edit btn" />
          </Link>
        </div>
        {getDetails?.description && (
          <div className="description">
            <h3>About this watchlist</h3>
            <p>{getDetails.description}</p>
          </div>
        )}

        <section className="stats_details">
          <div>
            <p>ITEMS ON LIST</p>
            <span>{getDetails?.movies.length}</span>
          </div>
          <div>
            <p>UNWATCHED RUNTIME</p>
            <span>14h 30m</span>
          </div>
          <div>
            <p>AVERAGE SCORE</p>

            <span>73</span>
          </div>
        </section>

        <section className="movies_section">
          <div className="slider-container card-main ">
            {getDetails?.movies?.length === 0 ? (
              <p>No movies found.</p>
            ) : (
              getDetails?.movies?.map((val) => (
                <>
                  <div className="mov_card" key={val.imdbID}>
                    <span>
                      <img src="/images/Checkmark.png" alt="ribbon" />
                    </span>
                    <img
                      src={val.Poster}
                      className="card-img-top"
                      alt={val.Title}
                    />

                    {val.Ratings?.map((rate, index) =>
                      rate.Source === "Metacritic" ? (
                        <p className="ratings" key={index}>
                          {(() => {
                            const ratingValue = parseInt(
                              rate.Value.slice(0, 2),
                              10
                            );
                            return (
                              <>
                                <img
                                  src={
                                    ratingValue > 50
                                      ? better
                                      : ratingValue < 35
                                      ? awful
                                      : good
                                  }
                                  alt="rating-icon"
                                />
                                <span>{ratingValue}</span>
                                <sup>/100</sup>
                              </>
                            );
                          })()}
                        </p>
                      ) : null
                    )}
                    <h5 className="card-title">
                      {val.Title}
                      <span>({val.Year})</span>
                    </h5>
                  </div>
                </>
              ))
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default WatchlistPage;
