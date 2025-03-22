import React, { useContext, useState, useCallback } from "react";
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
  const { currentUser, searchList, handleSearch } = useContext(AuthContext);

  return (
    <>
      <aside className="sidebar">
        <h1>watchlist</h1>
        <Searchbar
          placeholder="Search"
          onChange={handleSearch}
          value={searchList}
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
        <p className="mt-4">
          {currentUser ? <Logout /> : <Link to="/login">Sign in</Link>}
        </p>
        <Userprof />
      </aside>
    </>
  );
};

export default Siderbar;
