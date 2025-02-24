import React from "react";
import PageTitle from "../components/watchlist/PageTitle";
import editBtn from "/images/editBtn.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const WatchlistPage = ({ listDetails }) => {
  const watchlistDetails = useSelector((state) => state.localWatchlist);
  // const location = useLocation();
  // const { details } = location.state;
  console.log("details", listDetails);

  return (
    <section className="watchlist_page">
      <div className="editbtn">
        <PageTitle className="mb-0" Title="ittl" />
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
