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

      const localList = state.find((lw) => lw.id === localListid);

      if (localList) {
        console.log("localList movies", localList.movies);

        if (!Array.isArray(localList.movies)) {
          localList.movies = [];
        }

        const movieExists = localList.movies.some(
          (m) => m.imdbID === localMovie.imdbID
        );

        if (!movieExists) {
          localList.movies.push(localMovie);
          localStorage.setItem("watchlists", JSON.stringify(state));
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
