import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mwatchlist from "/images/mwatchlist.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

const Watchlist = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [listDetails, setlistDetails] = useState("");

  const localWatchlistName = useSelector((state) => state.localWatchlist);

  const userWatchlists = localWatchlistName?.filter(
    (watchlist) => watchlist.user === currentUser?.email
  );

  const handleId = (id) => {
    setlistDetails(id);
    // console.log("watchlist id is", id);
    // console.log("watchlist id details is", details);
    // navigate("/watchlist", { state: details });
  };

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
                  <li key={id} onClick={() => handleId(id)}>
                    <Link to="/watchlist" target="_blank">
                      <img src={mwatchlist} alt="movie.logo" />
                      {val.name}/{val.id}
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
