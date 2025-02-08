import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    createWatchlist(state, action) {
      state.push({
        // id: Date.now(),
        name: action.payload.name,
        description: action.payload.description,
        user: action.payload.user,
        movi: action.payload.movies || [],
      });
    },

    addMovieToWatchlist(state, action) {
      const watchlistId = action.payload.watchlistId;
      const movie = action.payload.movie;

      const watchlist = state.find((w) => w.id === watchlistId);
      console.log("watchlist id", watchlistId);

      if (!watchlist) {
        // const movieExists = watchlist.movi.some(
        //   (m) => m.imdbID === movie.imdbID
        // );

        // if (!movieExists) {
        state.push(movie);
        // }
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
