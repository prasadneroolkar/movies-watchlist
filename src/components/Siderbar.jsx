import React, { useContext } from "react";
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
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <>
      <aside className="sidebar">
        <h1>watchlist</h1>
        <Searchbar />
        <Menu />
        <Button
          btnName={
            <>
              <AddSharpIcon sx={{ fontSize: 16 }} /> create watchlist
            </>
          }
        />
        <hr />
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
