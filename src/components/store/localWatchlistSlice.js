import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchlists: [], // Store the watchlists
  statusMessage: null, // Store success/error message
  statusType: null, // Store success/error type
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
      console.log("localList", JSON.parse(JSON.stringify(localList)));

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
      const listId = action.payload.listId;

      console.log("watchId", typeof watchId);
      console.log("liked", liked);
      console.log("listId", listId);

      // Retrieve watchlists from localStorage
      let watchlists =
        JSON.parse(localStorage.getItem("watchlists")) || state.watchlists;

      // Find the watchlist by id
      const localList = watchlists.find((lw) => lw.id === listId);

      if (!localList) {
        console.log("Watchlist not found!");
        return;
      }

      console.log("Found Watchlist", JSON.parse(JSON.stringify(localList)));

      // Ensure watchedMov is an array
      if (!Array.isArray(localList.watchedMov)) {
        localList.watchedMov = [];
      }

      // Check if the movie is already watched
      const isWatched = localList.watchedMov.some((m) => m.moveId === watchId);
      console.log("isWatched", isWatched);

      if (isWatched) {
        // Remove from watchedMov
        localList.watchedMov = localList.watchedMov.filter(
          (m) => m.moveId.toString() !== watchId
        );
        console.log(
          "watchMovies after deleting:",
          JSON.parse(JSON.stringify(localList))
        );
      } else {
        // Add new movie to watchedMov
        localList.watchedMov.push({
          moveId: watchId.toString(),
          liked,
        });
        console.log(
          "watchMovies after adding:",
          JSON.parse(JSON.stringify(localList))
        );
      }

      // Save the updated watchlists back to localStorage
      localStorage.setItem("watchlists", JSON.stringify(watchlists));
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
