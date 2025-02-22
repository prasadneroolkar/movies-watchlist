import React from "react";
import { Link } from "react-router-dom";
import mwatchlist from "/images/mwatchlist.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

const Watchlist = () => {
  const { currentUser } = useContext(AuthContext);
  const localWatchlistName = useSelector((state) => state.localWatchlist);

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
              userWatchlists.map((val, id) => {
                return (
                  <li key={id}>
                    <Link to="watchlist" target="_blank">
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
