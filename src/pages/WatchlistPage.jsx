import React, { useContext } from "react";
import PageTitle from "../components/watchlist/PageTitle";
import editBtn from "/images/editBtn.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { contextWatchlist } from "../context/WatchlistContext";

const WatchlistPage = () => {
  const { listID } = useContext(contextWatchlist);

  const currentLocalid = JSON.parse(localStorage.getItem("currentID"));

  const watchlistDetails = useSelector((state) => state.localWatchlist);

  let getDetails;
  if (currentLocalid != undefined) {
    getDetails = watchlistDetails?.find((data) => data.id === currentLocalid);
  } else {
    getDetails = null;
  }
  console.log("getDetails", getDetails);

  return (
    <section className="watchlist_page">
      <div className="editbtn">
        <PageTitle className="mb-0" Title={getDetails?.name} />
        <Link to="/editlist">
          <img src={editBtn} alt="edit btn" />
        </Link>
      </div>
      <div className="description">
        <h3>About this watchlist</h3>
        <p>This list lorem ipsum dolor et blah blah blah</p>
      </div>

      <div className="movie_list"></div>
    </section>
  );
};

export default WatchlistPage;
