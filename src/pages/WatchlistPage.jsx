import React, { useContext } from "react";
import PageTitle from "../components/watchlist/PageTitle";
import editBtn from "/images/editBtn.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { contextWatchlist } from "../context/WatchlistContext";
import better from "/images/better.png";
import good from "/images/good.png";
import awful from "/images/awful.png";

const WatchlistPage = () => {
  const { listID } = useContext(contextWatchlist);

  // const currentLocalid = JSON.parse(localStorage.getItem("currentID"));

  // const watchlistDetails = useSelector((state) => state.localWatchlist);

  // let getDetails;
  // if (currentLocalid != undefined) {
  //   getDetails = watchlistDetails?.find((data) => data.id === currentLocalid);
  // } else {
  //   getDetails = null;
  // }
  console.log("getDetails", listID);

  return (
    <section className="watchlist_page">
      <div className="editbtn">
        <PageTitle className="mb-0" Title={listID?.name} />
        <Link to="/editlist">
          <img src={editBtn} alt="edit btn" />
        </Link>
      </div>
      <div className="description">
        <h3>About this watchlist</h3>
        <p>"listID.description"</p>
      </div>

      <section className="stats_details">
        <div>
          <p>ITEMS ON LIST</p>
          <span>10</span>
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
          {listID?.movies?.length === 0 ? (
            <p>No movies found.</p>
          ) : (
            listID.movies?.map((val) => (
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
                  {/* 
                  {val.Ratings?.map(
                    (rate, index) => {
                      if (rate.Source === "Metacritic") {
                        return (
                          <p className="ratings" key={index}>
                            <img
                              src={
                                parseInt(val.Value.slice(0, 2)) > 50
                                  ? better
                                  : parseInt(val.Value.slice(0, 2)) < 35
                                  ? awful
                                  : good
                              }
                              alt=""
                            />
                            <span>{rate.Value.slice(0, 2)}</span>
                            <sup>/100</sup>
                          </p>
                        );
                      }
                    }
                    //  if(rate.Source==="Metacritic")
                  )} */}
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
  );
};

export default WatchlistPage;
