import axios from "axios";
const url = "https://www.omdbapi.com/";
const apiKey = "8db4a6db";

export const api = async (searchQry) => {
  try {
    const response = await axios.get(
      `${url}?apikey=${apiKey}&s=${searchQry || "top"}`
    );
    const res = response.data.Search;

    const detailedMovies = await Promise.all(
      res.map(async (movie) => {
        const details = await apiMdb(movie.imdbID);
        return { ...movie, ...details }; // Ensure proper merging
      })
    );
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
    return response.data;
  } catch (error) {
    console.error("imdb error", error.message);
    return [];
  }
};
