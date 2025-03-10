import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mwatchlist from "/images/mwatchlist.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { contextWatchlist } from "../context/WatchlistContext";

const Watchlist = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleId } = useContext(contextWatchlist);

  const localWatchlistName = useSelector(
    (state) => state.localWatchlist.watchlists
  );

  const userWatchlists = localWatchlistName?.filter(
    (watchlist) => watchlist.user === currentUser?.email
  );

  return (
    currentUser && (
      <>
        <hr />
        <div className="watchlist">
          <p>My lists</p>
          <ul>
            {userWatchlists?.length ? (
              userWatchlists.map((val) => {
                return (
                  <li key={val.id} onClick={() => handleId && handleId(val.id)}>
                    <Link to="/watchlist">
                      <img src={mwatchlist} alt="movie.logo" />
                      {val.name}
                    </Link>
                  </li>
                );
              })
            ) : (
              <li>No watchlists available.</li>
            )}
          </ul>
        </div>
      </>
    )
  );
};

export default Watchlist;
