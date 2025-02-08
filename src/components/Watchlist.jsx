import React from "react";
import { Link } from "react-router-dom";
import mwatchlist from "/images/mwatchlist.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

const Watchlist = () => {
  const { currentUser } = useContext(AuthContext);
  const watchlistName = useSelector((state) => state.watchlist);
  return (
    currentUser && (
      <>
        <hr />
        <div className="watchlist">
          <p>My lists</p>
          <ul>
            {watchlistName?.length ? (
              watchlistName.map((val, id) => {
                return (
                  <li key={id}>
                    <Link to="watchlist" target="_blank">
                      <img src={mwatchlist} alt="movie.logo" />
                      {/* {val.name} */}
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
