import React, { useState, useEffect } from "react";
import ribbon from "/images/ribbon.png";
import tick from "/images/tick.png";
import Searchbar from "../components/Searchbar";
import Button from "../components/Button";
import SliderComp from "../components/SliderComp";
import { api } from "../services/api";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  const [srchMov, setSrchmov] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [btnImg, setbtnImg] = useState(
    window.matchMedia("(max-width: 991px)").matches
  );

  useEffect(() => {
    const handleResize = () => {
      setbtnImg(window.matchMedia("(max-width:991px)").matches);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setSrchmov("top");
    }
    setInputValue(e.target.value);
  };
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      setSrchmov(e.target.value);
    }
  };
  const onhandleClick = () => {
    setSrchmov(inputValue);
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
          value={inputValue}
          placeholder="Search for movies by title"
          onChange={handleSearch}
          onKeyDown={handleKeypress}
        />
        <Button
          btnName={!btnImg ? "search" : <SearchIcon />}
          className={!btnImg ? "" : "srcBtn"}
          onClick={onhandleClick}
        ></Button>
      </section>

      <SliderComp search={srchMov} />
    </>
  );
};

export default React.memo(Home);
