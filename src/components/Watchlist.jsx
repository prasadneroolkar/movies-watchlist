import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import mwatchlist from "/images/mwatchlist.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { contextWatchlist } from "../context/WatchlistContext";

const Watchlist = () => {
  const { currentUser, searchList, handleSearch } = useContext(AuthContext);
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const { handleId } = useContext(contextWatchlist);

  const localWatchlistName = useSelector(
    (state) => state.localWatchlist.watchlists
  );
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchList);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchList]);

  const userWatchlists = localWatchlistName?.filter(
    (watchlist) => watchlist.user === currentUser?.email
  );
  console.log("userWatchlists", userWatchlists);

  const searchListArray = userWatchlists?.findIndex((item) =>
    item.name.toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  console.log("searchListArray", searchListArray);
  const resultFn = () => {
    if (searchListArray !== -1) {
      userWatchlists[searchListArray] = [userWatchlists[searchListArray]];
      return userWatchlists[searchListArray];
    }
  };

  const finalarray = searchList !== "" ? resultFn() : userWatchlists;

  console.log("finalarray", finalarray);

  return (
    currentUser && (
      <>
        <hr />
        <div className="watchlist">
          <p>My lists</p>
          <ul>
            {finalarray?.length ? (
              finalarray.map((val) => {
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

export default React.memo(Watchlist);
