import React from "react";
import { Link } from "react-router-dom";
import mwatchlist from "/images/mwatchlist.png";

const Watchlist = () => {
  return (
    <div className="watchlist">
      <p>My lists</p>
      <ul>
        <li>
          <Link to="watchlist" target="_blank">
            <img src={mwatchlist} alt="" />
            Movies by Tom Cruise
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Watchlist;
