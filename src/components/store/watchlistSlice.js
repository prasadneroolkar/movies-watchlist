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
      });
    },

    addMovieToWatchlist(state, action) {
      state.push({
        id: Date.now(),
        name: action.payload.name,
        description: action.payload.description,
        movi: action.payload.movies || [],
      });
    },
  },
});

export const { createWatchlist, addMovieToWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
