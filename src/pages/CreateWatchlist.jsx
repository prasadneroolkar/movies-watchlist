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
  console.log(movies);

  const onSubmit = (event) => {
    event.preventDefault();
    if (movies) {
      dispatch(
        addMovieToWatchlist({ name: watchlistName, description, movies })
      );
    } else {
      dispatch(createWatchlist({ name: watchlistName, description }));
    }

    setWatchlistName("");
    setDescription("");
  };
  return (
    <>
      {movies && <pre>{JSON.stringify(movies, null, 2)}</pre>}
      <PageTitle className="create_watchlist" Title="Create a new Watchlist" />

      <WatchlistForm onSubmit={onSubmit}>
        <InputField
          value={watchlistName}
          onChange={(e) => setWatchlistName(e.target.value)}
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
