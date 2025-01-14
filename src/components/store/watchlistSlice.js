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
        movies: [],
      });
    },
  },
});

export const { createWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
