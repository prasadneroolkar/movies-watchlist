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
      // console.log("app", JSON.parse(JSON.stringify(state.watchlists)));
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
      const { watchId, liked, listId } = action.payload;

      // Retrieve watchlists from localStorage or fallback to Redux state
      let watchlists =
        JSON.parse(localStorage.getItem("watchlists")) || state.watchlists;

      // Create a new array to maintain immutability
      const updatedWatchlists = watchlists.map((list) => {
        if (list.id === listId) {
          // Ensure watchedMov is an array
          const watchedMov = Array.isArray(list.watchedMov)
            ? [...list.watchedMov]
            : [];

          // Check if the movie is already watched
          const isWatched = watchedMov.some(
            (m) => m.moveId === watchId.toString()
          );

          // Update watchedMov list
          const updatedWatchedMov = isWatched
            ? watchedMov.filter((m) => m.moveId !== watchId.toString()) // Remove movie
            : [...watchedMov, { moveId: watchId.toString(), liked }]; // Add movie

          return { ...list, watchedMov: updatedWatchedMov };
        }
        return list;
      });

      // Save to localStorage
      localStorage.setItem("watchlists", JSON.stringify(updatedWatchlists));

      // Return new state
      return {
        ...state,
        watchlists: updatedWatchlists, // Ensure Redux state is updated
      };
    },

    updateWatchlistdetails(state, action) {
      const id = action.payload.id;
      const name = action.payload.name;
      const description = action.payload.description;

      const loadDetails = JSON.parse(localStorage.getItem("watchlists")) || [];
      console.log("loadDetails", loadDetails);

      const index = loadDetails.findIndex((item) => item.id === id);
      if (index !== -1) {
        loadDetails[index] = { ...loadDetails[index], name, description };
        localStorage.setItem("watchlists", JSON.stringify(loadDetails));

        // Update Redux state
        state.watchlists = loadDetails;
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
  updateWatchlistdetails,
} = localwatchlistSlice.actions;
export default localwatchlistSlice.reducer;
