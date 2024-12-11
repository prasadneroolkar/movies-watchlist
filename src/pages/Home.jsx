import React, { useEffect, useState } from "react";
import ribbon from "/images/ribbon.png";
import tick from "/images/tick.png";
import Searchbar from "../components/Searchbar";
import Button from "../components/Button";
import { api } from "../services/api";

const Home = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = await api();
      setMovies(movieData);
      console.log(movieData); // Set movies or empty array if no data
    };

    fetchMovies();
  }, []);
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
        <div>
          {movies.map((movie) => (
            <div className="card" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
              />
              <h5 className="card-title">{movie.title}</h5>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
