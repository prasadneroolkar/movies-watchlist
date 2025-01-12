import { configureStore } from "@reduxjs/toolkit";
import watchlistSlice from "./watchlistSlice";

const store = configureStore({
  reducer: { watchlist: watchlistSlice },
});

export default store;
