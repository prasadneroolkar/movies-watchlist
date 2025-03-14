import React, { useState, useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
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
  removeMovies,
} from "../components/store/localWatchlistSlice";
import { showMsg } from "../components/store/snackbar";

const Editwatchlist = () => {
  const locate = useLocation();
  const recDetails = locate.state?.getDetails || [];
  // console.log("recDetails", recDetails)
  const { handleErrormsg, error, setError } = useContext(AuthContext);

  const dispatch = useDispatch();
  const [editDetails, seteditDetails] = useState({
    id: recDetails?.id,
    watchlistName: recDetails?.name || "",
    watchlistDes: recDetails?.description || "",
  });

  const getLocalId = useSelector((state) => state.localWatchlist.watchlists);
  // console.log("getlocalid", getLocalId);

  const updatedWatchlist = getLocalId?.find((val) => val.id === recDetails.id);
  console.log("updatedWatchlist", updatedWatchlist);

  const validateForm = (data) => {
    const errorData = {};
    if (data !== undefined && !data.trim()) {
      errorData.data = "Please enter watchlist name";
    }
    setError(errorData);
    return errorData;
  };

  const onhandleInput = useCallback((e) => {
    seteditDetails((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    handleErrormsg("watchlistName");
  }, []);

  const removeMovie = (id) => {
    dispatch(
      removeMovies({
        id: id,
      })
    );
  };

  const onUpdate = (event) => {
    event.preventDefault();
    const { watchlistName } = editDetails;
    let formValidate = validateForm(watchlistName);
    const val = Object.keys(formValidate).length;
    if (val === 0) {
      try {
        dispatch(
          updateWatchlistdetails({
            id: editDetails.id,
            name: editDetails.watchlistName,
            description: editDetails.watchlistDes,
            movies: updatedWatchlist?.movies,
          })
        );

        dispatch(showMsg({ message: "Saved Succesfully !", type: "success" }));
      } catch (error) {
        console.error(error.message);
      }
    } else {
      dispatch(showMsg({ message: "Somthing went wrong !", type: "error" }));
    }
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
          errorMsg={error.data && error.data}
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
        {updatedWatchlist?.movies.length > 0 && (
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
              {updatedWatchlist?.movies.map((details) => (
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
