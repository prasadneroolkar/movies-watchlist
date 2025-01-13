import axios from "axios";
const url = "http://www.omdbapi.com/";
const apiKey = "8db4a6db";

export const api = async (searchQry) => {
  try {
    const response = await axios.get(
      `${url}?apikey=${apiKey}&s=${searchQry || "top"}`
    );
    // console.log("response", response);
    const res = response.data.Search;
    console.log("Full Response:", res);

    const detailedMovies = await Promise.all(
      res.map(async (movie) => {
        const details = await apiMdb(movie.imdbID);
        return { ...movie, ...details }; // Ensure proper merging
      })
    );
    console.log("map imdb", detailedMovies);
    return detailedMovies;
  } catch (error) {
    console.log("api errors:", error.message);
    return [];
  }
};

export const apiMdb = async (imdb) => {
  try {
    const fetch = axios.get(`${url}?apikey=${apiKey}&i=${imdb}&plot=full`);
    const response = await fetch;
    // console.log("imdbi =", response.data);
    return response.data;
  } catch (error) {
    console.error("imdb error", error.message);
    return [];
  }
};
