import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/main.scss";
import { lazy } from "react";

const Layout = lazy(() => import("./components/Layout"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const CreateWatchlist = lazy(() => import("./pages/CreateWatchlist"));
const WatchlistPage = lazy(() => import("./pages/WatchlistPage"));
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/createwatchlist" element={<CreateWatchlist />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
