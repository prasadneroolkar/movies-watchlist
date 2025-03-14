import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageTitle from "../components/watchlist/PageTitle";
import Button from "../components/Button";
import WatchlistForm from "../components/watchlist/WatchlistForm";
import InputField from "../components/watchlist/InputField";
import Textarea from "../components/watchlist/Textarea";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateWatchlistdetails,
  getWatchlistFromLocalStorage,
  removeMovies,
} from "../components/store/localWatchlistSlice";

const Editwatchlist = () => {
  const locate = useLocation();
  const recDetails = locate.state?.getDetails || [];
  // console.log("recDetails", recDetails);

  const dispatch = useDispatch();

  const getLocalId = useSelector((state) => state.localWatchlist.watchlists);

  const [editDetails, seteditDetails] = useState({
    id: recDetails?.id,
    watchlistName: recDetails?.name || "",
    watchlistDes: recDetails?.description || "",
  });

  const onhandleInput = useCallback((e) => {
    seteditDetails((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onUpdate = (event) => {
    event.preventDefault();
    // console.log("inside submit");

    try {
      dispatch(
        updateWatchlistdetails({
          id: editDetails.id,
          name: editDetails.watchlistName,
          description: editDetails.watchlistDes,
        })
      );

      console.log("update successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeMovie = (id) => {
    dispatch(
      removeMovies({
        id: id,
      })
    );
  };
  return (
    <>
      <div className="editpage_title d-flex justify-content-between align-items-center">
        <PageTitle
          className="create_watchlist mt-0"
          Title="Edit your Watchlist"
        />
        <Link to="/">Delete Watchlist</Link>
      </div>
      <WatchlistForm>
        <InputField
          value={editDetails.watchlistName}
          name="watchlistName"
          onChange={onhandleInput}
        />
        <Textarea
          value={editDetails.watchlistDes}
          name="watchlistDes"
          onChange={onhandleInput}
        />
      </WatchlistForm>

      <section
        className="editmovie_list
      "
      >
        {recDetails?.movies.length > 0 && (
          <>
            <p
              className="mb-1"
              style={{
                fontSize: "18px",
                lineHeight: "22px",
                fontWeight: "bold",
              }}
            >
              Movies
            </p>
            <ul>
              {recDetails.movies.map((details) => (
                <li key={details.imdbID} className="">
                  <span>
                    <img
                      src={details.Poster}
                      className="posterround"
                      alt={details.Title}
                    />
                    {details.Title}
                  </span>
                  <Button
                    className="remove_btn"
                    btnName="remove"
                    onClick={() => removeMovie(details.imdbID)}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
        <Button btnName="save" type="submit" onClick={onUpdate} />
      </section>
    </>
  );
};

export default Editwatchlist;
