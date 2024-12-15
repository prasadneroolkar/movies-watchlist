import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { api } from "../services/api";

const Slider = () => {
  const { boxRef } = useOutletContext();
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

  console.log("movies array", movies);
  const newMovies = movies.slice(prev, next);
  // console.log(newMovies);

  const onPrev = () => {
    console.log("prev buttn");

    if (prev !== 0 || prev < -1) {
      setPrev((prev) => prev - 5);
      setNext((next) => next - 5);
    }
  };

  const onNext = () => {
    console.log("next buttn");

    if (next < movies.length) {
      setNext((next) => next + 5);
      setPrev((prev) => prev + 5);
    }
  };
  return (
    <>
      <section className="movies_section">
        <h2>Popular movies right now</h2>
        <button className="carousel-btn prev" onClick={onPrev}>
          &#8249;
        </button>
        <div className="card-main">
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
        </div>
        <button className="carousel-btn next" onClick={onNext}>
          &#8250;
        </button>
      </section>
    </>
  );
};

export default Slider;
