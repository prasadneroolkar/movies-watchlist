import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const localwatchlistSlice = createSlice({
  name: "localwatchlist",
  initialState,
  reducers: {
    addWatchlistToLocalStorage(state, action) {
      const newWatchlist = action.payload;
      const updatedWatchlist = [...state, newWatchlist];

      localStorage.setItem("watchlists", JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    },

    getWatchlistFromLocalStorage(state) {
      const storedWatchlist =
        JSON.parse(localStorage.getItem("watchlists")) || [];
      state.length = 0; // Clear the existing state
      state.push(...storedWatchlist); // Populate it with the new data
    },

    // updatelocalliststorage(state, action) {
    //   const { localListid, localMovie } = action.payload;

    //   const localList = state.find((lw) => lw.id === localListid);

    //   if (localList) {
    //     if (!Array.isArray(localList.movies)) {
    //       localList.movies = [];
    //     }

    //     const movieExists = localList.movies.some(
    //       (m) => m.imdbID === localMovie.imdbID
    //     );

    //     if (!movieExists) {
    //       localList.movies.push(localMovie);
    //       localStorage.setItem("watchlists", JSON.stringify(state));
    //       state.statusMessage = "Added Successfully!";
    //       state.statusType = "success";
    //     } else {
    //       state.statusMessage = "Movie already exists";
    //       state.statusType = "error";
    //     }
    //   } else {
    //     state.statusMessage = "Watchlist not found";
    //     state.statusType = "error";
    //   }
    // },
    updatelocalliststorage(state, action) {
      const { localListid, localMovie } = action.payload;

      const updatedState = state.map((watchlist) => {
        if (watchlist.id === localListid) {
          if (!Array.isArray(watchlist.movies)) {
            watchlist.movies = [];
          }

          const movieExists = watchlist.movies.some(
            (m) => m.imdbID === localMovie.imdbID
          );

          if (!movieExists) {
            watchlist.movies.push(localMovie);
            localStorage.setItem("watchlists", JSON.stringify(state));

            return {
              ...state,
              statusMessage: "Added Successfully!",
              statusType: "success",
            };
          } else {
            return {
              ...state,
              statusMessage: "Movie already exists",
              statusType: "error",
            };
          }
        }
        return watchlist;
      });

      return updatedState;
    },
  },
});

export const {
  addWatchlistToLocalStorage,
  getWatchlistFromLocalStorage,
  updatelocalliststorage,
} = localwatchlistSlice.actions;
export default localwatchlistSlice.reducer;
