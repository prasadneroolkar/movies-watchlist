import React from "react";
import Searchbar from "../components/Searchbar";
import Menu from "../components/Menu";
import Button from "../components/Button";
import Watchlist from "../components/Watchlist";
import Userprof from "../components/Userprof";
const Siderbar = () => {
  return (
    <>
      <aside className="sidebar">
        <h1>watchlist</h1>
        <Searchbar />
        <Menu />
        <Button />
        <hr />
        <Watchlist />
        <Userprof />
      </aside>
    </>
  );
};

export default Siderbar;
