import Button from "../components/Button";
import PageTitle from "../components/watchlist/PageTitle";
import WatchlistForm from "../components/watchlist/WatchlistForm";
import InputField from "../components/watchlist/InputField";
import Textarea from "../components/watchlist/Textarea";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createWatchlist,
  addMovieToWatchlist,
} from "../components/store/watchlistSlice";
import { useLocation } from "react-router-dom";

const CreateWatchlist = () => {
  const location = useLocation();
  const movies = location.state?.movieDetails;

  const dispatch = useDispatch();
  const [watchlistName, setWatchlistName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({});

  const validateForm = (data) => {
    const errorData = {};
    if (data.watchlistName !== undefined && !data.watchlistName.trim()) {
      errorData.watchlistName = "Please enter watchlist name";
    }
    setError(errorData);
    return errorData;
  };

  const onhandleName = (e) => {
    setWatchlistName(e.target.value);
    handleErr("watchlistName");
  };

  const handleErr = (field) => {
    setError((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let formValidate = validateForm({ watchlistName });
    const val = Object.keys(formValidate).length;
    if (val === 0) {
      if (movies) {
        dispatch(
          addMovieToWatchlist({ name: watchlistName, description, movies })
        );
      } else {
        dispatch(createWatchlist({ name: watchlistName, description }));
      }

      setWatchlistName("");
      setDescription("");
    }
  };
  return (
    <>
      {movies && <pre>{JSON.stringify(movies, null, 2)}</pre>}
      <PageTitle className="create_watchlist" Title="Create a new Watchlist" />

      <WatchlistForm onSubmit={onSubmit}>
        <InputField
          value={watchlistName}
          onChange={onhandleName}
          errorMsg={error.watchlistName && error.watchlistName}
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button btnName="Create watchlist" type="submit" />
      </WatchlistForm>
    </>
  );
};

export default CreateWatchlist;
