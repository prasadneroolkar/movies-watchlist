import { configureStore } from "@reduxjs/toolkit";
import watchlistSlice from "./watchlistSlice";
import localwatchlistSlice from "./localWatchlistSlice";

export const store = configureStore({
  reducer: { watchlist: watchlistSlice, localStorage: localwatchlistSlice },
});
