import React from "react";
import PageTitle from "../components/watchlist/PageTitle";
import editBtn from "/images/editBtn.png";
import { Link } from "react-router-dom";

const WatchlistPage = () => {
  return (
    <section className="watchlist_page">
      <div className="editbtn">
        <PageTitle className="mb-0" Title="Movies by Tom Cruise" />
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
