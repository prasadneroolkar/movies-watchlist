import React from "react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { api } from "../../services/api";
import SliderArrow from "./SliderArrow";
import MoviesSkimmer from "../MoviesSkimmer";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchApi = async () => {
      console.log("useeffect called");
      setLoading(true);
      const fetchMovies = await api();
      setMovies(fetchMovies);
      setLoading(false);
    };
    fetchApi();
  }, []);
  console.log("movies", movies);

  let settings = {
    dots: false,
    infinite: false,
    lazyLoad: true,

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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container card-main">
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <Slider {...settings}>
          {movies.map((movie) => (
            <div className="mov_card" key={movie.imdbID}>
              <span>
                <img src="/images/ribbon2.png" alt="ribbon" />
              </span>
              <img
                src={movie.Poster}
                className="card-img-top"
                alt={movie.Title}
              />

              <h5 className="card-title">
                {movie.Title}
                <span>({movie.Year})</span>
              </h5>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Movies;