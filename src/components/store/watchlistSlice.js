import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    createWatchlist(state, action) {
      state.push({
        id: Date.now(),
        name: action.payload.name,
        description: action.payload.description,
        user: action.payload.user,
        movi: action.payload.movies || [],
      });
    },

    addMovieToWatchlist(state, action) {
      const { watchlistId, movieDetails } = action.payload;

      // Find the watchlist
      const watchlist = state.find((w) => w.id === watchlistId);

      console.log("Watchlist found:", JSON.stringify(watchlist, null, 2));

      if (watchlist) {
        // Ensure the movie is not duplicated in the watchlist
        const movieExists = watchlist.movi.some(
          (m) => m.imdbID === movieDetails.imdbID
        );
        console.log("Movie exists?", movieExists);

        if (!movieExists) {
          watchlist.movi.push(movieDetails);
          console.log(
            "Movie added to watchlist:",
            JSON.stringify(watchlist, null, 2)
          );
        } else {
          console.log("Movie already exists in the watchlist");
        }
      } else {
        console.error("Watchlist not found!");
      }
    },

    // addFrommodalList(state, action) {
    //   state.push({
    //     addMovie: action.payload.movies || [],
    //   });
    // },
  },
});

export const { createWatchlist, addMovieToWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
