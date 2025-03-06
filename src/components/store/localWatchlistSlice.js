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
      const listId = action.payload.listId;
      const liked = action.payload.liked;
      // console.log("watchId", watchId);
      console.log("liked", liked);
      console.log("listId", listId);

      const localList = state.watchlists.find((lw) => lw.id === listId);
      console.log(
        "watchMovies after adding:",
        JSON.parse(JSON.stringify(localList))
      );

      // const isWatched = state.watchlists.some(
      //   (m) => m.watchedmovlist.moveId === watchId
      // );
      // console.log("isWatched", isWatched);

      // if (isWatched) {
      //   state.watchlists = state.watchlists.filter(
      //     (m) => m.watchedmovlist.moveId.toString() !== watchId
      //   );
      //   console.log(
      //     "watchMovies after deleting:",
      //     JSON.parse(JSON.stringify(state.watchlists))
      //   );
      // } else {
      //   // Add new movie directly
      //   state.watchlists.push({
      //     moveId: watchId.toString(),
      //     liked,
      //   });
      //   // state.watchlists.push([{ moveId: watchId.toString(), liked }]);

      //   console.log(
      //     "watchMovies after adding:",
      //     JSON.parse(JSON.stringify(state.watchlists))
      //   );
      // }
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
