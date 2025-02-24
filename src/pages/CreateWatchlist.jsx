import Button from "../components/Button";
import PageTitle from "../components/watchlist/PageTitle";
import WatchlistForm from "../components/watchlist/WatchlistForm";
import InputField from "../components/watchlist/InputField";
import Textarea from "../components/watchlist/Textarea";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWatchlist } from "../components/store/watchlistSlice";
import {
  addWatchlistToLocalStorage,
  getWatchlistFromLocalStorage,
} from "../components/store/localWatchlistSlice";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CustomSnackbar from "../components/Messages/CustomSnackbar";
import { showMsg, closeMsg } from "../components/store/snackbar";

const CreateWatchlist = () => {
  const { handleErrormsg, error, setError } = useContext(AuthContext);
  const location = useLocation();
  const movies = location.state?.movieDetails;
  // console.log("from state", movies);

  const dispatch = useDispatch();
  const snackbarState = useSelector((state) => state.snackbarMsg);

  const users = JSON.parse(localStorage.getItem("currentUser")) || [];

  const [watchlistData, setwatchlistData] = useState({
    watchlistName: "",
    description: "",
    user: users.email,
  });

  // console.log("watchlist email", watchlistData.user);

  const validateForm = (data) => {
    const errorData = {};
    if (data !== undefined && !data.trim()) {
      errorData.data = "Please enter watchlist name";
    }
    setError(errorData);
    return errorData;
  };

  const onhandleinput = (e) => {
    setwatchlistData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    handleErrormsg("watchlistName");
  };

  const handleClick = () => {
    dispatch(showMsg("Saved Succesfully!"));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    dispatch(closeMsg());
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const { watchlistName } = watchlistData;
    const watchlistId = Date.now();

    let formValidate = validateForm(watchlistName);
    const val = Object.keys(formValidate).length;
    if (val === 0) {
      dispatch(
        createWatchlist({
          id: watchlistId,
          name: watchlistData.watchlistName,
          description: watchlistData.description,
          user: watchlistData.user,
          movies,
        })
      );

      const newWatchlist = {
        id: watchlistId,
        name: watchlistData.watchlistName,
        description: watchlistData.description,
        user: watchlistData.user,
        movies: movies ? [movies] : [],
      };

      // dispatch(createWatchlist(newWatchlist));
      dispatch(addWatchlistToLocalStorage(newWatchlist));
    }
    handleClick();
    setwatchlistData({
      watchlistName: "",
      description: "",
      user: users.email,
    });
  };

  return (
    <>
      {/* {movies && <pre>{JSON.stringify(movies, null, 2)}</pre>} */}
      <PageTitle className="create_watchlist" Title="Create a new Watchlist" />
      <WatchlistForm onSubmit={onSubmit}>
        <InputField
          name="watchlistName"
          value={watchlistData.watchlistName}
          onChange={onhandleinput}
          errorMsg={error.data && error.data}
        />
        <Textarea
          name="description"
          value={watchlistData.description}
          onChange={onhandleinput}
        />
        <Button btnName="Create watchlist" type="submit" />
      </WatchlistForm>
      <CustomSnackbar
        open={snackbarState.value}
        handleClose={handleClose}
        message={snackbarState.message}
      />
    </>
  );
};

export default CreateWatchlist;
