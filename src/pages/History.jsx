import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { recentlyWatched } from "../components/store/localWatchlistSlice";
import PageTitle from "../components/watchlist/PageTitle";
import MoviesContainer from "../components/watchlist/moviescomponent/MoviesContainer";
import MoviesPoster from "../components/watchlist/moviescomponent/MoviesPoster";
import MoviesCard from "../components/watchlist/moviescomponent/MoviesCard";
import MoviesRating from "../components/watchlist/moviescomponent/MoviesRating";
import MoviesTitle from "../components/watchlist/moviescomponent/MoviesTitle";
import { useDispatch } from "react-redux";
import Pagination from "../components/Pagination";
import InfiniteScrollList from "../components/PaginationMobile";

const History = () => {
  const [paginatedMovies, setPaginatedMovies] = useState([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 991);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 991);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handlePageDataChange = useCallback((mov) => {
    setPaginatedMovies(mov);
  }, []);

  return (
    <section className="watchlist_page">
      <PageTitle className="create_watchlist" Title="Recently watched" />
      <section className="movies_section movies_history">
        <MoviesContainer>
          {historyList?.length === 0 ? (
            <p>No movies found.</p>
          ) : (
            paginatedMovies?.map((val) => (
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
      {/* Desktop Pagination (991px and above) */}
      {isDesktop && historyList?.movies?.length !== 0 && (
        <Pagination
          dataArray={historyList}
          onPageDataChange={handlePageDataChange}
        />
      )}
      {!isDesktop && (
        <InfiniteScrollList
          dataArrayMb={historyList}
          onPageDataChange={handlePageDataChange}
        />
      )}
    </section>
  );
};

export default History;
