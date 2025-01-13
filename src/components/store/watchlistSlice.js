import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    createWatchlist(state, action) {
      state.push(action.payload);
    },
  },
});

export const { createWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
