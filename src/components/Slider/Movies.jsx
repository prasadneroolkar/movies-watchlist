import React from "react";
import { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { api } from "../../services/api";
import SliderArrow from "./SliderArrow";
import MoviesSkimmer from "../MoviesSkimmer";
import Addlist from "../watchlist/modal/Addlist";
import { apiMdb } from "../../services/api";
import { useNavigate } from "react-router-dom";
import better from "/images/better.png";
import good from "/images/good.png";
import awful from "/images/awful.png";

const Movies = ({ movSrch }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To track errors (e.g., too many results)
  const [menuVisible, setMenuvisible] = useState(false);
  const [menuPosition, setMenuposition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(null);
  const [movDetail, setMovdetail] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async (query) => {
      setLoading(true);
      setError(null); // Reset error state before fetching

      const fetchMovies = await api(query);
      if (!fetchMovies) {
        setError(
          "No movies found or too many results. Try refining your search."
        );
      } else {
        setMovies(fetchMovies);
      }
      setLoading(false);
    };
    fetchApi(movSrch);
    // fetchImdb()
  }, [movSrch]);

  const fetchDetails = useCallback(
    async (mId) => {
      // console.log("fetchDetails recreated");
      try {
        const ImdbRes = await apiMdb(mId);
        setMovdetail(ImdbRes);
        navigate("/details", { state: { movDetail: ImdbRes } });
      } catch (error) {
        console.error(error.message);
      }
    },
    [navigate]
  );

  let settings = {
    dots: false,
    infinite: false,
    lazyLoad: "ondemand",
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 5,
    nextArrow: (
      <SliderArrow arrowBtn={<KeyboardArrowRightIcon fontSize="small" />} />
    ),

    prevArrow: (
      <SliderArrow arrowBtn={<KeyboardArrowLeftIcon fontSize="small" />} />
    ),

    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          swipe: true,
          touchMove: true,
          draggable: true,
        },
      },

      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          swipe: true,
          touchMove: true,
          draggable: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 2,
          swipe: true,
          touchMove: true,
          draggable: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          swipe: true,
          touchMove: true,
          draggable: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          swipe: true,
          touchMove: true,
          draggable: true,
        },
      },

      {
        breakpoint: 376,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          swipe: true,
          touchMove: true,
          draggable: true,
        },
      },
    ],
  };

  const handleClose = () => {
    setMenuvisible(false);
    setActiveCard(null);
  };

  const handleToggleMenu = useCallback(
    (id, x, y) => {
      if (activeCard === id) {
        setMenuvisible(false);
        setActiveCard(null);
      } else {
        setMenuposition({ x, y });
        setMenuvisible(true);
        setActiveCard(id);
      }
    },
    [activeCard]
  );
  // console.log("Movies component rendered");
  return (
    <div className="slider-container card-main" onClick={handleClose}>
      {loading ? (
        <MoviesSkimmer />
      ) : error ? (
        <p>{error}</p>
      ) : movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <>
          <Slider {...settings}>
            {movies.map((movie) => (
              <div
                className="mov_card"
                key={movie.imdbID}
                onClick={() => fetchDetails(movie.imdbID)}
              >
                <Addlist
                  menuPosition={menuPosition}
                  menuVisible={menuVisible && activeCard === movie.imdbID}
                  onToggleMenu={(x, y) => handleToggleMenu(movie.imdbID, x, y)}
                  movieDetails={movie}
                >
                  <span>
                    <img src="/images/ribbon2.png" alt="ribbon" />
                  </span>
                </Addlist>

                <img
                  src={movie.Poster}
                  className="card-img-top"
                  alt={movie.Title}
                />
                {movie.Ratings.map((val, ind) => {
                  if (val.Source === "Metacritic") {
                    return (
                      <p key={ind} className="ratings">
                        <img
                          src={
                            parseInt(val.Value.slice(0, 2)) > 50
                              ? better
                              : parseInt(val.Value.slice(0, 2)) < 35
                              ? awful
                              : good
                          }
                          alt=""
                        />
                        <span>{parseInt(val.Value.slice(0, 2))}</span>
                        <sup>/100</sup>
                      </p>
                    );
                  }
                })}

                <h5 className="card-title">
                  {movie.Title}
                  <span>({movie.Year})</span>
                </h5>
              </div>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
};

export default Movies;
