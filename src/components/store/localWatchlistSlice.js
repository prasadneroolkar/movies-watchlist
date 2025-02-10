import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const localwatchlistSlice = createSlice({
  name: "localwatchlist",
  initialState,
  reducers: {
    addWatchlistToLocalStorage(state, action) {
      const newWatchlist = action.payload;
      const updatedWatchlist = [...state, newWatchlist];

      localStorage.setItem("watchlists", JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    },

    getWatchlistFromLocalStorage(state) {
      const storedWatchlist =
        JSON.parse(localStorage.getItem("watchlists")) || [];
      state.length = 0; // Clear the existing state
      state.push(...storedWatchlist); // Populate it with the new data
    },

    updatelocalliststorage(state, action) {
      const { localListid, localMovie } = action.payload;
      const localList = state.find((LocalId) => LocalId.id === localListid);

      if (localList) {
        if (!Array.isArray(localStorage.movies)) {
          localStorage.movies = [];
        }

        const movieExists = localStorage.movies.some(
          (m) => m.imdbID === localMovie.imdbID
        );

        if (!movieExists) {
          localStorage.movies.push(localMovie);
          // console.log(
          //   "Movie added to watchlist:",
          //   JSON.stringify(watchlist, null, 2)
          // );
        } else {
          console.log("Movie already exists in the Localwatchlist");
        }
      } else {
        console.error("LocalWatchlist not found!");
      }
    },
  },
});

export const {
  addWatchlistToLocalStorage,
  getWatchlistFromLocalStorage,
  updatelocalliststorage,
} = localwatchlistSlice.actions;
export default localwatchlistSlice.reducer;
