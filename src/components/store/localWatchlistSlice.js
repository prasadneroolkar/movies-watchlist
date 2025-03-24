import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchlists: [], // Store the watchlists
  statusMessage: null, // Store success/error message
  statusType: null, // Store success/error type
};

const localwatchlistSlice = createSlice({
  name: "localwatchlist",
  initialState,
  reducers: {
    addWatchlistToLocalStorage(state, action) {
      const newWatchlist = action.payload;
      state.watchlists.push(newWatchlist);

      localStorage.setItem("watchlists", JSON.stringify(state.watchlists));
    },

    getWatchlistFromLocalStorage(state) {
      const storedWatchlist =
        JSON.parse(localStorage.getItem("watchlists")) || [];
      state.watchlists.length = 0; // Clear the existing state
      state.watchlists.push(...storedWatchlist); // Populate it with the new data
      // console.log("app", JSON.parse(JSON.stringify(state.watchlists)));
    },

    updatelocalliststorage(state, action) {
      const { localListid, localMovie } = action.payload;

      const localList = state.watchlists.find((lw) => lw.id === localListid);
      console.log("localList", JSON.parse(JSON.stringify(localList)));

      if (!localList) {
        state.statusMessage = "Watchlist not found";
        state.statusType = "error";
        return;
      }
      if (!Array.isArray(localList.movies)) {
        localList.movies = [];
      }

      const movieExists = localList.movies.some(
        (m) => m.imdbID === localMovie.imdbID
      );

      // Reset statusMessage first (ensures Redux sees it as a state change)
      state.statusMessage = null;
      state.statusType = null;

      if (movieExists) {
        state.statusMessage = "Movie already exists";
        state.statusType = "error";
      } else {
        localList.movies.push(localMovie);
        localStorage.setItem("watchlists", JSON.stringify(state.watchlists));
        console.log("Added Successfully!");
        state.statusMessage = "Added Successfully!";
        state.statusType = "success";
      }
    },
    resetStatusMessage(state) {
      state.statusMessage = null;
      state.statusType = null;
    },

    watchedMovie(state, action) {
      const { watchId, liked, listId, date } = action.payload;

      // Retrieve watchlists from localStorage or fallback to Redux state
      let watchlists =
        JSON.parse(localStorage.getItem("watchlists")) || state.watchlists;

      // Create a new array to maintain immutability
      const updatedWatchlists = watchlists.map((list) => {
        if (list.id === listId) {
          // Ensure watchedMov is an array
          const watchedMov = Array.isArray(list.watchedMov)
            ? [...list.watchedMov]
            : [];

          // Check if the movie is already watched
          const isWatched = watchedMov.some(
            (m) => m.moveId === watchId.toString()
          );

          // Update watchedMov list
          const updatedWatchedMov = isWatched
            ? watchedMov.filter((m) => m.moveId !== watchId.toString()) // Remove movie
            : [...watchedMov, { moveId: watchId.toString(), liked, date }]; // Add movie
          console.log("updatedWatchedMov", {
            ...list,
            watchedMov: updatedWatchedMov,
          });

          return { ...list, watchedMov: updatedWatchedMov };
        }
        return list;
      });

      // Save to localStorage
      localStorage.setItem("watchlists", JSON.stringify(updatedWatchlists));

      // Return new state
      return {
        ...state,
        watchlists: updatedWatchlists, // Ensure Redux state is updated
      };
    },

    updateWatchlistdetails(state, action) {
      const id = action.payload.id;
      const name = action.payload.name;
      const description = action.payload.description;
      const delMov = action.payload.movies;

      console.log("delMov", delMov);

      const loadDetails = JSON.parse(localStorage.getItem("watchlists")) || [];
      console.log("loadDetails", loadDetails);

      const index = loadDetails.findIndex((item) => item.id === id);

      if (index !== -1) {
        loadDetails[index] = {
          ...loadDetails[index],
          name,
          description,
          movies: delMov,
        };

        console.log("new arrayslice", loadDetails[index]);

        localStorage.setItem("watchlists", JSON.stringify(loadDetails));

        // Update Redux state
        state.watchlists = loadDetails;
      }
    },

    removeMovies(state, action) {
      const removeId = action.payload.id;
      const updatedWatchlists = state.watchlists.map((watchlist) => ({
        ...watchlist,
        movies: watchlist.movies.filter((mov) => mov.imdbID !== removeId),
      }));

      state.watchlists = updatedWatchlists;
    },

    deleteWatchlist(state, action) {
      const watchlistId = action.payload.watchlistId;
      console.log("watchlistId", watchlistId);

      const getWatchlist = state.watchlists.filter(
        (list) => list.id !== watchlistId
      );
      localStorage.setItem("watchlists", JSON.stringify(getWatchlist));
      state.watchlists = getWatchlist;
    },

    recentlyWatched(state, action) {
      const currentUser = action.payload.user;

      const currentList = JSON.parse(localStorage.getItem("watchlists")) || [];

      const listMovies = currentList
        ?.filter((u) => u.user === currentUser)
        .map((m) => m.watchedMov?.filter((l) => l.liked === true) || []);
      console.log("listMovies", listMovies);

      const sortDate = listMovies.flat();
      console.log("sortDate", sortDate);

      const latestList = sortDate.sort((a, b) => {
        const dateA = new Date(
          a.date ? a.date.replace(" ", "T") : "1970-01-01T00:00"
        );
        const dateB = new Date(
          b.date ? b.date.replace(" ", "T") : "1970-01-01T00:00"
        );

        return dateB - dateA;
      });

      console.log(latestList);

      const notEmpty =
        latestList?.flat().map(
          (m) => m.moveId
          // { moveid: m.moveId, date: m.date }
        ) || [];

      console.log("notEmpty", notEmpty);

      const sortMovies = currentList
        ?.filter((u) => u.user === currentUser)
        .map((m) => m.movies?.map((l) => l))
        .flat();
      console.log("sortMovies", sortMovies);

      const finalMov = sortMovies?.filter((s) => notEmpty.includes(s.imdbID));
      console.log("finalMov", finalMov);

      const nonDupicateArray = [...new Set(finalMov)];

      localStorage.setItem("historylist", JSON.stringify(nonDupicateArray));
    },
  },
});

export const {
  addWatchlistToLocalStorage,
  resetStatusMessage,
  getWatchlistFromLocalStorage,
  updatelocalliststorage,
  watchedMovie,
  updateWatchlistdetails,
  deleteWatchlist,
  removeMovies,
  recentlyWatched,
} = localwatchlistSlice.actions;
export default localwatchlistSlice.reducer;
