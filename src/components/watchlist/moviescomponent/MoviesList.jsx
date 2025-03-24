import React from "react";
import MoviesContainer from "../components/watchlist/moviescomponent/MoviesContainer";
import MoviesPoster from "../components/watchlist/moviescomponent/MoviesPoster";
import MoviesCard from "../components/watchlist/moviescomponent/MoviesCard";
import MoviesRating from "../components/watchlist/moviescomponent/MoviesRating";
import MoviesTitle from "../components/watchlist/moviescomponent/MoviesTitle";

const MoviesList = () => {
  return (
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
  );
};

export default MoviesList;
