import React, { useState } from "react";
import ribbon from "/images/ribbon.png";
import tick from "/images/tick.png";
import Searchbar from "../components/Searchbar";
import Button from "../components/Button";
import SliderComp from "../components/SliderComp";

const Home = () => {
  const [srchMov, setSrchmov] = useState("");

  const handleSearch = (e) => {
    setSrchmov(e.target.value.trim());
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
        <Searchbar
          placeholder="Search for movies by title"
          onChange={handleSearch}
        />
        <Button btnName="search"></Button>
      </section>

      <SliderComp search={srchMov} />
    </>
  );
};

export default Home;
