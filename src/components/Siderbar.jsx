import React, { useContext, useEffect, useRef } from "react";
import Searchbar from "../components/Searchbar";
import Menu from "../components/Menu";
import Button from "../components/Button";
import Watchlist from "../components/Watchlist";
import Userprof from "../components/Userprof";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { AuthContext } from "../context/AuthContext";
import Logout from "./Form/Logout";
import { Link } from "react-router-dom";

const Siderbar = () => {
  const { currentUser, searchList, handleSearch, open, handleHam } =
    useContext(AuthContext);

  const closeRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const clickEvent = (event) => {
      if (searchRef.current && searchRef.current.contains(event.target)) {
        return;
      }
      if (closeRef.current && closeRef.current.contains(event.target)) {
        handleHam();
      }
    };
    if (open) {
      document.addEventListener("click", clickEvent);
    }
    return () => {
      document.removeEventListener("click", clickEvent);
    };
  }, [open, handleHam]);

  return (
    <>
      <aside className={`sidebar ${open ? "open" : "closed"}`} ref={closeRef}>
        <h1>watchlist</h1>
        <Searchbar
          placeholder="Search watchlists"
          onChange={handleSearch}
          value={searchList}
          ref={searchRef}
        />
        <Menu />

        <Button
          btnName={
            <>
              <AddSharpIcon sx={{ fontSize: 16 }} />
              <Link to={!currentUser ? "/login" : "/createwatchlist"}>
                create watchlist
              </Link>
            </>
          }
        />

        <Watchlist />

        <Userprof />
      </aside>
    </>
  );
};

export default Siderbar;
