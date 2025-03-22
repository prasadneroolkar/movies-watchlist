import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/main.scss";
import { lazy, useEffect } from "react";
import { getWatchlistFromLocalStorage } from "./components/store/localWatchlistSlice";
import { useDispatch } from "react-redux";
import CustomSnackbar from "./components/Messages/CustomSnackbar";
import { loggedinUsers } from "./components/store/userSlice.js";

const Layout = lazy(() => import("./components/Layout"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const CreateWatchlist = lazy(() => import("./pages/CreateWatchlist"));
const WatchlistPage = lazy(() => import("./pages/WatchlistPage"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Editwatchlist = lazy(() => import("./pages/Editwatchlist"));
const UserDetails = lazy(() => import("./pages/UserDetails"));

function App() {
  const dispatchLocal = useDispatch();
  useEffect(() => {
    try {
      dispatchLocal(getWatchlistFromLocalStorage());
      console.log("dispatched in app");
    } catch (error) {
      console.error("error msg", error);
    }
  }, [dispatchLocal]);

  useEffect(() => {
    try {
      dispatchLocal(loggedinUsers());
    } catch (error) {
      console.error("error msg", error);
    }
  }, [dispatchLocal]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/createwatchlist" element={<CreateWatchlist />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/details" element={<MovieDetails />} />
          <Route path="/editlist" element={<Editwatchlist />} />
          <Route path="/userdetail" element={<UserDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <CustomSnackbar />
    </>
  );
}

export default App;
