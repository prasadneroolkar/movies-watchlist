import React from "react";
import PageTitle from "../components/watchlist/PageTitle";
import MoviesContainer from "../components/watchlist/moviescomponent/MoviesContainer";
import MoviesPoster from "../components/watchlist/moviescomponent/MoviesPoster";
import MoviesCard from "../components/watchlist/moviescomponent/MoviesCard";
import MoviesRating from "../components/watchlist/moviescomponent/MoviesRating";
import MoviesTitle from "../components/watchlist/moviescomponent/MoviesTitle";
import { useSelector, useDispatch } from "react-redux";

const History = () => {
  const dispatch = useDispatch();

  const currentLocalid = JSON.parse(localStorage.getItem("currentID")) || null;

  const watchlistDetails = useSelector(
    (state) => state.localWatchlist.watchlists || []
  );

  const resUnwatched = watchlistDetails.find((m) => m.id === currentLocalid);
  let getDetails;
  if (currentLocalid != undefined) {
    getDetails = watchlistDetails?.find((data) => data.id === currentLocalid);
  } else {
    getDetails = null;
  }
  return (
    <>
      <PageTitle className="create_watchlist" Title="Recently watched" />
      <section className="movies_section">
        <MoviesContainer>
          {getDetails?.movies?.length === 0 ? (
            <p>No movies found.</p>
          ) : (
            getDetails?.movies?.map((val) => (
              <MoviesCard key={val.imdbID}>
                <MoviesPoster
                  onClick={() => handleCheck(val.imdbID)}
                  moviearray={resUnwatched}
                  mapval={val}
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
    </>
  );
};

export default History;
