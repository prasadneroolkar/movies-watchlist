import React, { useState, useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
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
  deleteWatchlist,
} from "../components/store/localWatchlistSlice";
import { showMsg } from "../components/store/snackbar";
import Popup from "../components/watchlist/modal/Popup";
import DeleteIcon from "@mui/icons-material/Delete";

const Editwatchlist = () => {
  const locate = useLocation();
  const navigate = useNavigate();
  const recDetails = locate.state?.getDetails || [];
  const { handleErrormsg, error, setError, currentUser, setPopup, popup } =
    useContext(AuthContext);

  const [btnremove, setbtnremove] = useState(
    window.matchMedia("(max-width: 991px)").matches
  );

  useEffect(() => {
    const handleResize = () => {
      setbtnremove(window.matchMedia("(max-width:991px)").matches);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dispatch = useDispatch();
  const [editDetails, seteditDetails] = useState({
    id: recDetails?.id,
    watchlistName: recDetails?.name || "",
    watchlistDes: recDetails?.description || "",
  });

  const getLocalId = useSelector((state) => state.localWatchlist.watchlists);
  const getUsermail = getLocalId?.find(
    (list) => list.user === currentUser?.email
  );

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

  const handleRedirect = () => {
    navigate("/");
  };

  const onUpdate = (event, callback) => {
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

        dispatch(
          showMsg({ message: "Updated Succesfully !", type: "success" })
        );
        setTimeout(() => {
          callback();
        }, 1000);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      dispatch(showMsg({ message: "Somthing went wrong !", type: "error" }));
    }
  };
  console.log(
    `current:${currentUser?.email} and watclist:${getUsermail?.user}`
  );

  const openModal = () => {
    setPopup(!popup);
  };

  const onhandleClose = () => {
    setPopup(false);
  };
  const onhandleDelete = (event) => {
    event.preventDefault();

    if (currentUser?.email === getUsermail?.user) {
      console.log("recDetails", recDetails?.id);
      try {
        dispatch(
          deleteWatchlist({
            watchlistId: recDetails.id,
          })
        );
        setPopup(false);
        dispatch(
          showMsg({ message: "Removed from watchlists !", type: "success" })
        );
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="editpage_title d-flex justify-content-between align-items-center">
        <PageTitle
          className="create_watchlist mt-0"
          Title="Edit your Watchlist"
        />
        <button className="delete_link" onClick={openModal}>
          Delete Watchlist
        </button>
        {popup && (
          <Popup
            status={popup}
            delteList={onhandleDelete}
            closeList={onhandleClose}
            message={editDetails.watchlistName}
          />
        )}
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
                    className={`remove_btn ${!btnremove ? "" : "rmBtn"}`}
                    btnName={
                      !btnremove ? (
                        "remove"
                      ) : (
                        <DeleteIcon sx={{ color: "#F33F3F" }} />
                      )
                    }
                    onClick={() => removeMovie(details.imdbID)}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
        <Button
          btnName="save"
          type="submit"
          onClick={() => onUpdate(event, handleRedirect)}
        />
      </section>
    </>
  );
};

export default Editwatchlist;
