import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { recentlyWatched } from "../components/store/localWatchlistSlice";
import PageTitle from "../components/watchlist/PageTitle";
import MoviesContainer from "../components/watchlist/moviescomponent/MoviesContainer";
import MoviesPoster from "../components/watchlist/moviescomponent/MoviesPoster";
import MoviesCard from "../components/watchlist/moviescomponent/MoviesCard";
import MoviesRating from "../components/watchlist/moviescomponent/MoviesRating";
import MoviesTitle from "../components/watchlist/moviescomponent/MoviesTitle";
import { useSelector, useDispatch } from "react-redux";

const History = () => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);

  try {
    dispatch(
      recentlyWatched({
        user: currentUser?.email,
      })
    );
  } catch (error) {
    console.log(error);
  }

  const historyList = JSON.parse(localStorage.getItem("historylist")) || null;

  console.log("historyList", historyList);

  return (
    <section className="watchlist_page">
      <PageTitle className="create_watchlist" Title="Recently watched" />
      <section className="movies_section movies_history">
        <MoviesContainer>
          {historyList?.length === 0 ? (
            <p>No movies found.</p>
          ) : (
            historyList?.map((val) => (
              <MoviesCard key={val.imdbID}>
                <MoviesPoster
                  moviearray={historyList}
                  mapval={val}
                  flag={true}
                />
                {val.Ratings?.map((rate, index) =>
                  rate.Source === "Metacritic" ? (
                    <MoviesRating key={index} mapval={rate} />
                  ) : null
                )}
                <MoviesTitle mapval={val} />
              </MoviesCard>
            ))
          )}
        </MoviesContainer>
      </section>
    </section>
  );
};

export default History;
