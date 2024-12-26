import Button from "../components/Button";
import PageTitle from "../components/watchlist/PageTitle";
import WatchlistForm from "../components/watchlist/WatchlistForm";
import InputField from "../components/watchlist/InputField";
import Textarea from "../components/watchlist/Textarea";
import { useContext, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

const CreateWatchlist = () => {
  // const { currentUser } = useContext(AuthContext);
  // const navigate = useNavigate();
  // console.log(currentUser);

  // useEffect(() => {
  //   if (currentUser === null) {
  //     navigate("/login");
  //   }
  // }, [currentUser]);

  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <PageTitle className="create_watchlist" Title="Create a new Watchlist" />

      <WatchlistForm onSubmit={onSubmit}>
        <InputField />
        <Textarea />
        <Button btnName="Create watchlist" type="submit" />
      </WatchlistForm>
    </>
  );
};

export default CreateWatchlist;