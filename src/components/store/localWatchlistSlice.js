import { createSlice } from "@reduxjs/toolkit";
import { showMsg } from "./snackbar";

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
        if (!Array.isArray(localList.movies)) {
          localList.movies = [];
        }

        const movieExists = localList.movies.some(
          (m) => m.imdbID === localMovie.imdbID
        );

        if (!movieExists) {
          localList.movies.push(localMovie);
          localStorage.setItem("watchlists", JSON.stringify(state));
          return showMsg({ message: "Added Succesfully !", type: "success" });
        } else {
          return showMsg({ message: "Movie already exists", type: "error" });
        }
      } else {
        return showMsg({ message: "Watchlist not found", type: "error" });
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
