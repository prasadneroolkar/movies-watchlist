import React, { useContext, useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router";
import PageTitle from "../components/watchlist/PageTitle";
import editBtn from "/images/editBtn.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { contextWatchlist } from "../context/WatchlistContext";
import {
  watchedMovie,
  getWatchlistFromLocalStorage,
} from "../components/store/localWatchlistSlice.js";

import MoviesContainer from "../components/watchlist/moviescomponent/MoviesContainer";
import MoviesPoster from "../components/watchlist/moviescomponent/MoviesPoster";
import MoviesCard from "../components/watchlist/moviescomponent/MoviesCard";
import MoviesRating from "../components/watchlist/moviescomponent/MoviesRating";
import MoviesTitle from "../components/watchlist/moviescomponent/MoviesTitle";
import Pagination from "../components/Pagination";
import MoviesSkimmer from "../components/MoviesSkimmer";

const WatchlistPage = () => {
  const { listID } = useContext(contextWatchlist);
  const navigate = useNavigate();
  const [paginatedMovies, setPaginatedMovies] = useState([]);
  const dispatch = useDispatch();

  const currentLocalid = JSON.parse(localStorage.getItem("currentID")) || null;

  const watchlistDetails = useSelector(
    (state) => state.localWatchlist.watchlists || []
  );

  const resUnwatched = watchlistDetails.find((m) => m.id === currentLocalid);

  let getDetails;
  if (currentLocalid != undefined) {
    getDetails = watchlistDetails?.find((data) => data.id === currentLocalid);
  } else {
    getDetails = null;
  }

  const getAVg = () => {
    const getMov = getDetails?.movies || [];
    const getRatings = getMov.map((rate) => rate.Ratings).flat();
    const getSource = getRatings.map((src) => src);
    const getRes = getSource.filter((fil) => fil.Source === "Metacritic");
    const getSourceLen = getRes.length;
    const getLen = getMov.length;
    const remainLen = getLen - getSourceLen;
    const SrcVal = getRes?.map((val) => {
      return parseInt(val.Value.slice(0, 2));
    });

    const fillArray = SrcVal.concat(Array(remainLen).fill(0));

    const totalRate = fillArray.reduce((cur, next) => cur + next, 0);
    const avgrate = parseInt(totalRate / getLen);

    return avgrate;
  };
  const avgRate = getAVg();

  const runTime = () => {
    const findId = getDetails?.movies.filter((idmov) =>
      getDetails?.watchedMov.every((item2) => item2.moveId !== idmov.imdbID)
    );

    function getMovieTimes(findId) {
      if (findId?.length === 0) {
        return 0;
      } else {
        const unwatMov = findId?.map((time) => {
          return parseInt(time.Runtime.split(" ")[0]);
        });
        return unwatMov;
      }
    }

    const returnesVal = getMovieTimes(findId);

    const totalTime =
      returnesVal !== 0 ? returnesVal?.reduce((acc, curr) => acc + curr, 0) : 0;

    const convertMin = (totalTime) => {
      const Hour = Math.floor(totalTime / 60);
      const mins = totalTime % 60;
      return `${Hour}h ${mins}m`;
    };
    return convertMin(totalTime);
  };

  const unWatchtime = runTime();

  const now = new Date();
  const formattedDate = `${
    now.toISOString().split("T")[0]
  } ${now.getHours()}:${now.getMinutes()}`;

  const handleCheck = (id) => {
    dispatch(
      watchedMovie({
        listId: currentLocalid,
        watchId: id.toString(),
        liked: true,
        date: formattedDate,
      })
    );
  };

  const sendTo = () => {
    if (getDetails) {
      navigate("/editlist", { state: { getDetails } });
    }
  };

  const shareData = getDetails?.movies || [];

  const handlePageDataChange = (mov) => {
    setPaginatedMovies(mov);
  };

  return (
    <>
      <section className="watchlist_page">
        <div className="editbtn">
          <PageTitle className="mb-0" Title={getDetails?.name} />
          <button onClick={sendTo}>
            <img src={editBtn} alt="edit btn" />
          </button>
        </div>
        {getDetails?.description && (
          <div className="description">
            <h3>About this watchlist</h3>
            <p>{getDetails.description}</p>
          </div>
        )}

        <section className="stats_details">
          <div>
            <p>ITEMS ON LIST</p>
            <span>{getDetails?.movies.length}</span>
          </div>
          <div>
            <p>UNWATCHED RUNTIME</p>
            <span>{unWatchtime && unWatchtime}</span>
          </div>
          <div>
            <p>AVERAGE SCORE</p>

            <span>{avgRate ? avgRate : "0"}</span>
          </div>
        </section>

        <section className="movies_section">
          <MoviesContainer>
            {getDetails?.movies?.length === 0 ? (
              <p>No movies found.</p>
            ) : (
              <Suspense fallback={<MoviesSkimmer />}>
                {paginatedMovies?.map((val) => (
                  <MoviesCard key={val.imdbID}>
                    <MoviesPoster
                      onClick={() => handleCheck(val.imdbID)}
                      moviearray={resUnwatched}
                      // subarray={watchedMov}
                      mapval={val}
                    />
                    <div>
                      {val.Ratings?.map((rate, index) =>
                        rate.Source === "Metacritic" ? (
                          <MoviesRating key={index} mapval={rate} />
                        ) : null
                      )}
                      <MoviesTitle mapval={val} />
                    </div>
                  </MoviesCard>
                ))}
              </Suspense>
            )}
          </MoviesContainer>
        </section>
        {getDetails?.movies?.length !== 0 && (
          <Pagination
            dataArray={shareData}
            onPageDataChange={handlePageDataChange}
          />
        )}
      </section>
    </>
  );
};

export default WatchlistPage;
