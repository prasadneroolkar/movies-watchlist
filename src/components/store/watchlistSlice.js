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
        user: action.payload.user,
        movi: action.payload.movies || [],
      });
    },

    addFrommodalList(state, action) {
      state.push({
        addMovie: action.payload.moviies,
      });
    },
  },
});

export const { createWatchlist, addMovieToWatchlist, addFrommodalList } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;
