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
        movi: action.payload.movies ? [action.payload.movies] : [],
      });
    },

    addMovieToWatchlist(state, action) {
      const { watchlistId, movieDetails } = action.payload;

      // Find the watchlist
      const watchlist = state.find((w) => w.id === watchlistId);

      if (watchlist) {
        if (!Array.isArray(watchlist.movi)) {
          watchlist.movi = [];
        }

        const movieExists = watchlist.movi.some(
          (m) => m.imdbID === movieDetails.imdbID
        );

        if (!movieExists) {
          watchlist.movi.push(movieDetails);
        }
      }
    },
  },
});

export const { createWatchlist, addMovieToWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
