import React from "react";
import { Link } from "react-router-dom";
import mwatchlist from "/images/mwatchlist.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Watchlist = () => {
  const { currentUser } = useContext(AuthContext);
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
                Movies by Tom Cruise
              </Link>
            </li>
          </ul>
        </div>
      </>
    )
  );
};

export default Watchlist;
