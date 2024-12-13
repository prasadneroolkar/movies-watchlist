import React, { useEffect, useState } from "react";
import ribbon from "/images/ribbon.png";
import tick from "/images/tick.png";
import Searchbar from "../components/Searchbar";
import Button from "../components/Button";
import { api } from "../services/api";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [prev, setPrev] = useState(0);
  const [next, setNext] = useState(5);

  useEffect(() => {
    const fetchApi = async () => {
      console.log("useeffect called");
      const fetchMovies = await api();
      setMovies(fetchMovies);
    };
    fetchApi();
  }, []);

  // console.log("movies array", movies);
  const newMovies = movies.slice(prev, next);
  // console.log(newMovies);

  const onPrev = () => {
    console.log("prev buttn");
    if (prev !== 0 || prev < -1) {
      setPrev((prev) => prev - 5);
      setNext((next) => next - 5);
      // console.log(prev);
      // console.log(next);
    }
  };

  const onNext = () => {
    console.log("next buttn");

    if (next < movies.length) {
      setNext((next) => next + 5);
      setPrev((prev) => prev + 5);
      // console.log(next);
      // console.log(prev);
    }
  };

  return (
    <>
      <section className="home-message">
        <h1>
          Welcome to <span>Watchlists</span>
        </h1>
        <p>
          Browse movies, add them to watchlists and share them with friends.
        </p>
        <p>
          Just click the
          <img src={ribbon} /> to add a movie, the poster to see more details or{" "}
          <img src={tick} /> to mark the movie as watched.
        </p>
      </section>
      <section className="search_box_2">
        <Searchbar placeholder="Search for movies by title" />
        <Button btnName="search"></Button>
      </section>
      <section className="movies_section">
        <h2>Popular movies right now</h2>
        <div className="d-flex card-main">
          <button
            className="carousel-btn prev"
            onClick={onPrev}
            disabled={prev === 0}
          >
            &#8249;
          </button>
          {movies.length === 0 ? (
            <p>No movies found.</p>
          ) : (
            newMovies.map((movie) => (
              <div className="mov_card" key={movie.imdbID}>
                <span>
                  <img src="/images/ribbon2.png" alt="ribbon" />
                </span>
                <img
                  src={movie.Poster}
                  className="card-img-top"
                  alt={movie.Tite}
                />

                <h5 className="card-title">
                  {movie.Title}
                  <span>({movie.Year})</span>
                </h5>
              </div>
            ))
          )}
          <button
            className="carousel-btn next"
            onClick={onNext}
            disabled={next >= movies.length}
          >
            &#8250;
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
