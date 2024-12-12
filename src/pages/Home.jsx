import React, { useEffect, useState } from "react";
import ribbon from "/images/ribbon.png";
import tick from "/images/tick.png";
import Searchbar from "../components/Searchbar";
import Button from "../components/Button";
import { api } from "../services/api";

const Home = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const fetchMovies = await api();
      setMovies(fetchMovies);
    };
    // fetchApi();
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

        {/* {movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          movies.map((movie) => ( */}
        <div className="card">
          <img src="" className="card-img-top" alt="Movie poster" />
          <h5 className="card-title">Title</h5>
        </div>
        {/* ))
        )} */}
      </section>
    </>
  );
};

export default Home;
