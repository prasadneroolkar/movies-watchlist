import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Slider from "react-slick";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { api } from "../services/api";

const SliderComp = () => {
  const [movies, setMovies] = useState([]);
  // const [prev, setPrev] = useState(0);
  // const [next, setNext] = useState(5);

  useEffect(() => {
    const fetchApi = async () => {
      console.log("useeffect called");
      const fetchMovies = await api();
      setMovies(fetchMovies);
    };
    fetchApi();
  }, []);
  let settings = {
    // className: "center",
    dots: false,
    infinite: false,
    lazyLoad: true,
    // centerPadding: "60px",
    // centerMode: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <KeyboardArrowRightIcon />,
    prevArrow: <KeyboardArrowLeftIcon />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // const newMovies = movies.slice(prev, next);
  // console.log(newMovies);

  // const onPrev = () => {
  //   console.log("prev buttn");

  //   if (prev !== 0 || prev < -1) {
  //     setPrev((prev) => prev - 5);
  //     setNext((next) => next - 5);
  //   }
  // };

  // const onNext = () => {
  //   console.log("next buttn");

  //   if (next < movies.length) {
  //     setNext((next) => next + 5);
  //     setPrev((prev) => prev + 5);
  //   }
  // };
  return (
    <>
      <section className="movies_section">
        <h2>Popular movies right now</h2>

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
                    alt={movie.Tite}
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
      </section>
    </>
  );
};

export default SliderComp;
