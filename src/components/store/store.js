import { configureStore } from "@reduxjs/toolkit";
import watchlistSlice from "./watchlistSlice";
import localwatchlistSlice from "./localWatchlistSlice";
import snackbarSlice from "./snackbar";

export const store = configureStore({
  reducer: {
    watchlist: watchlistSlice,
    localWatchlist: localwatchlistSlice,
    snackbarMsg: snackbarSlice,
  },
});
