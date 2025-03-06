import Button from "../components/Button";
import PageTitle from "../components/watchlist/PageTitle";
import WatchlistForm from "../components/watchlist/WatchlistForm";
import InputField from "../components/watchlist/InputField";
import Textarea from "../components/watchlist/Textarea";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWatchlist } from "../components/store/watchlistSlice";
import { addWatchlistToLocalStorage } from "../components/store/localWatchlistSlice";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { showMsg } from "../components/store/snackbar";

const CreateWatchlist = () => {
  const { handleErrormsg, error, setError } = useContext(AuthContext);
  const location = useLocation();
  const movies = location.state?.movieDetails;
  // console.log("from state", movies);

  const dispatch = useDispatch();

  const users = JSON.parse(localStorage.getItem("currentUser")) || [];

  const [watchlistData, setwatchlistData] = useState({
    watchlistName: "",
    description: "",
    user: users.email,
    watchedmovlist: null,
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

  const onSubmit = (event) => {
    event.preventDefault();

    const { watchlistName } = watchlistData;
    const watchlistId = Date.now();

    let formValidate = validateForm(watchlistName);
    const val = Object.keys(formValidate).length;
    if (val === 0) {
      try {
        dispatch(
          createWatchlist({
            id: watchlistId,
            name: watchlistData.watchlistName,
            description: watchlistData.description,
            user: watchlistData.user,
            movies,
            watchedmovlist: watchlistData.watchedmovlist,
          })
        );

        const newWatchlist = {
          id: watchlistId,
          name: watchlistData.watchlistName,
          description: watchlistData.description,
          user: watchlistData.user,
          movies: movies ? [movies] : [],
          watchedmovlist: watchlistData.watchedmovlist
            ? [watchlistData.watchedmovlist]
            : [],
        };

        console.log("newWatchlist", newWatchlist);
        dispatch(addWatchlistToLocalStorage(newWatchlist));
      } catch (error) {
        console.error(error.message);
      }
      dispatch(showMsg({ message: "Saved Succesfully !", type: "success" }));
    }
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
    </>
  );
};

export default CreateWatchlist;
