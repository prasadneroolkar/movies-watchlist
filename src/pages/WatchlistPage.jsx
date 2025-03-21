import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PageTitle from "../components/watchlist/PageTitle";
import editBtn from "/images/editBtn.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { contextWatchlist } from "../context/WatchlistContext";
import better from "/images/better.png";
import good from "/images/good.png";
import awful from "/images/awful.png";
import unCheck from "/images/tick.png";
import Check from "/images/Checkmark.png";
import {
  watchedMovie,
  getWatchlistFromLocalStorage,
} from "../components/store/localWatchlistSlice.js";

const WatchlistPage = () => {
  const { listID } = useContext(contextWatchlist);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentLocalid = JSON.parse(localStorage.getItem("currentID")) || null;

  const watchlistDetails = useSelector(
    (state) => state.localWatchlist.watchlists || []
  );

  const resUnwatched = watchlistDetails.find((m) => m.id === currentLocalid);

  useEffect(() => {}, []);

  let getDetails;
  if (currentLocalid != undefined) {
    getDetails = watchlistDetails?.find((data) => data.id === currentLocalid);
  } else {
    getDetails = null;
  }

  // console.log("Get details", getDetails);

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

    // console.log("findId", findId);
    // console.log("getDetails", getDetails);

    // console.log("findId", findId?.length);

    function getMovieTimes(findId) {
      if (findId?.length === 0) {
        // const allmov = getDetails?.movies.map((time) => {
        //   return parseInt(time.Runtime.split(" ")[0]);
        // });

        // return allmov;
        // }
        return 0;
      } else {
        const unwatMov = findId?.map((time) => {
          return parseInt(time.Runtime.split(" ")[0]);
        });
        return unwatMov;
      }
    }

    const returnesVal = getMovieTimes(findId);
    // console.log("returnesVal", returnesVal);
    // console.log("getDetails", getDetails?.movies.length);

    const totalTime =
      returnesVal !== 0 ? returnesVal?.reduce((acc, curr) => acc + curr, 0) : 0;
    // console.log("Total Time", totalTime);

    const convertMin = (totalTime) => {
      const Hour = Math.floor(totalTime / 60);
      const mins = totalTime % 60;
      return `${Hour}h ${mins}m`;
    };
    return convertMin(totalTime);
  };

  const unWatchtime = runTime();

  const handleCheck = (id) => {
    dispatch(
      watchedMovie({
        listId: currentLocalid,
        watchId: id.toString(),
        liked: true,
      })
    );
  };

  const sendTo = () => {
    if (getDetails) {
      navigate("/editlist", { state: { getDetails } });
    }
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
          <div className="slider-container card-main ">
            {getDetails?.movies?.length === 0 ? (
              <p>No movies found.</p>
            ) : (
              getDetails?.movies?.map((val) => (
                <div className="mov_card" key={val.imdbID}>
                  <span onClick={() => handleCheck(val.imdbID)}>
                    <img
                      src={
                        resUnwatched?.watchedMov.some(
                          (m) => m.moveId === val.imdbID?.toString() && m.liked
                        )
                          ? Check
                          : unCheck
                      }
                      alt="ribbon"
                    />
                  </span>
                  <img
                    src={val.Poster}
                    className="card-img-top"
                    alt={val.Title}
                  />

                  {val.Ratings?.map((rate, index) =>
                    rate.Source === "Metacritic" ? (
                      <p className="ratings" key={index}>
                        {(() => {
                          const ratingValue = parseInt(
                            rate.Value.slice(0, 2),
                            10
                          );
                          return (
                            <>
                              <img
                                src={
                                  ratingValue > 50
                                    ? better
                                    : ratingValue < 35
                                    ? awful
                                    : good
                                }
                                alt="rating-icon"
                              />
                              <span>{ratingValue}</span>
                              <sup>/100</sup>
                            </>
                          );
                        })()}
                      </p>
                    ) : null
                  )}
                  <h5 className="card-title">
                    {val.Title}
                    <span>({val.Year})</span>
                  </h5>
                </div>
              ))
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default WatchlistPage;
