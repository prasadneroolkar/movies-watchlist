import { configureStore } from "@reduxjs/toolkit";
import watchlistSlice from "./watchlistSlice";

export const store = configureStore({
  reducer: { watchlist: watchlistSlice },
});
