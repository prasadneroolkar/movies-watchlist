import Button from "../components/Button";
import PageTitle from "../components/watchlist/PageTitle";
import WatchlistForm from "../components/watchlist/WatchlistForm";
import InputField from "../components/watchlist/InputField";
import Textarea from "../components/watchlist/Textarea";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createWatchlist } from "../components/store/watchlistSlice";

const CreateWatchlist = () => {
  const dispatch = useDispatch();
  const [watchlistName, setWatchlistName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(createWatchlist({ name: watchlistName, description }));
    setWatchlistName("");
    setDescription("");
  };
  return (
    <>
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
