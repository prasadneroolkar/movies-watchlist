import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/main.scss";
import { lazy, useEffect } from "react";
import { getWatchlistFromLocalStorage } from "./components/store/localWatchlistSlice";
import { useSelector, useDispatch } from "react-redux";

const Layout = lazy(() => import("./components/Layout"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const CreateWatchlist = lazy(() => import("./pages/CreateWatchlist"));
const WatchlistPage = lazy(() => import("./pages/WatchlistPage"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Editwatchlist = lazy(() => import("./pages/Editwatchlist"));

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

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/createwatchlist" element={<CreateWatchlist />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/details" element={<MovieDetails />} />
          <Route path="/editlist" element={<Editwatchlist />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
