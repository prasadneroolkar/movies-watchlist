import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchlists: [], // Store the watchlists
  statusMessage: null, // Store success/error message
  statusType: null, // Store success/error type
  watchMovies: [],
};

const localwatchlistSlice = createSlice({
  name: "localwatchlist",
  initialState,
  reducers: {
    addWatchlistToLocalStorage(state, action) {
      const newWatchlist = action.payload;
      state.watchlists.push(newWatchlist);

      localStorage.setItem("watchlists", JSON.stringify(state.watchlists));
    },

    getWatchlistFromLocalStorage(state) {
      const storedWatchlist =
        JSON.parse(localStorage.getItem("watchlists")) || [];
      state.watchlists.length = 0; // Clear the existing state
      state.watchlists.push(...storedWatchlist); // Populate it with the new data
    },

    updatelocalliststorage(state, action) {
      const { localListid, localMovie } = action.payload;

      const localList = state.watchlists.find((lw) => lw.id === localListid);

      if (!localList) {
        state.statusMessage = "Watchlist not found";
        state.statusType = "error";
        return;
      }
      if (!Array.isArray(localList.movies)) {
        localList.movies = [];
      }

      const movieExists = localList.movies.some(
        (m) => m.imdbID === localMovie.imdbID
      );

      // Reset statusMessage first (ensures Redux sees it as a state change)
      state.statusMessage = null;
      state.statusType = null;

      if (movieExists) {
        state.statusMessage = "Movie already exists";
        state.statusType = "error";
      } else {
        localList.movies.push(localMovie);
        localStorage.setItem("watchlists", JSON.stringify(state.watchlists));
        console.log("Added Successfully!");
        state.statusMessage = "Added Successfully!";
        state.statusType = "success";
      }
    },
    resetStatusMessage(state) {
      state.statusMessage = null;
      state.statusType = null;
    },
    watchedMovie(state, action) {
      const watchId = action.payload.watchId;
      const liked = action.payload.liked;
      console.log("watchId", watchId);
      console.log("liked", liked);

      const isWatched = state.watchMovies.some((mId) => mId.moveId === watchId);

      if (isWatched) {
        return state.watchMovies.filter(
          (mId) => mId.moveId.toString() !== watchId
        );
      } else {
        state.watchMovies.push({ moveId: watchId.toString(), liked });
      }
    },
  },
});

export const {
  addWatchlistToLocalStorage,
  resetStatusMessage,
  getWatchlistFromLocalStorage,
  updatelocalliststorage,
  watchedMovie,
} = localwatchlistSlice.actions;
export default localwatchlistSlice.reducer;
