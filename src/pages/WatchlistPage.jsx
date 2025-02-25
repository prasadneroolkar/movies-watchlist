import React, { useContext } from "react";
import PageTitle from "../components/watchlist/PageTitle";
import editBtn from "/images/editBtn.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { contextWatchlist } from "../context/WatchlistContext";

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
  // console.log("getDetails", getDetails);

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
          <div className="mov_card">
            <span>
              <img src="/images/Checkmark.png" alt="ribbon" />
            </span>
            <img
              src="https://m.media-amazon.com/images/M/MV5BMDBkZDNjMWEtOTdmMi00NmExLTg5MmMtNTFlYTJlNWY5YTdmXkEyXkFqcGc@._V1_SX300.jpg"
              className="card-img-top"
              alt="Top Gun: Maverick"
            />
            <p className="ratings">
              <img src="/images/better.png" alt="" />
              <span>78</span>
              <sup>/100</sup>
            </p>
            <h5 className="card-title">
              Top Gun: Maverick<span>(2022)</span>
            </h5>
          </div>
        </div>
      </section>
    </section>
  );
};

export default WatchlistPage;
