import React from "react";
import { Link } from "react-router-dom";
import mwatchlist from "/images/mwatchlist.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

const Watchlist = () => {
  const { currentUser } = useContext(AuthContext);
  const watchlistName = useSelector((state) => state.watchlist);
  console.log(watchlistName?.name);
  return (
    currentUser && (
      <>
        <hr />
        <div className="watchlist">
          <p>My lists</p>
          <ul>
            <li>
              <Link to="watchlist" target="_blank">
                <img src={mwatchlist} alt="" />
                {watchlistName?.name}
              </Link>
            </li>
          </ul>
        </div>
      </>
    )
  );
};

export default Watchlist;
