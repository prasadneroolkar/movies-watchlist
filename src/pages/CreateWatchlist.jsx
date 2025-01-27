import Button from "../components/Button";
import PageTitle from "../components/watchlist/PageTitle";
import WatchlistForm from "../components/watchlist/WatchlistForm";
import InputField from "../components/watchlist/InputField";
import Textarea from "../components/watchlist/Textarea";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createWatchlist,
  addMovieToWatchlist,
} from "../components/store/watchlistSlice";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CreateWatchlist = () => {
  const { handleErrormsg, error, setError } = useContext(AuthContext);
  const location = useLocation();
  const movies = location.state?.movieDetails;

  const dispatch = useDispatch();
  // const [watchlistName, setWatchlistName] = useState("");
  // const [description, setDescription] = useState("");
  const [watchlistData, setwatchlistData] = useState({
    watchlistName: "",
    description: "",
  });

  const validateForm = (data) => {
    const errorData = {};
    if (data !== undefined && !data.trim()) {
      errorData.data = "Please enter watchlist name";
    }
    setError(errorData);
    return errorData;
  };

  const onhandleinput = (e) => {
    // setwatchlistData({
    //   ...watchlistData,
    //   [e.target.name]: e.target.value,
    // });

    setwatchlistData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    // console.log(watchlistData);
    handleErrormsg("watchlistName");
  };
  const users = JSON.parse(localStorage.getItem("currentUser")) || [];
  // console.log(users.email);

  const onSubmit = (event) => {
    event.preventDefault();
    const { watchlistName } = watchlistData;

    let formValidate = validateForm(watchlistName);
    console.log(formValidate);
    const val = Object.keys(formValidate).length;
    console.log(val);
    if (val === 0) {
      if (movies) {
        dispatch(
          addMovieToWatchlist({
            name: watchlistData.watchlistName,
            description: watchlistData.description,
            movies,
          })
        );
      } else {
        dispatch(
          createWatchlist({
            name: watchlistData.watchlistName,
            description: watchlistData.description,
            // user,
          })
        );
      }
    }

    setwatchlistData({
      watchlistName: "",
      description: "",
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
