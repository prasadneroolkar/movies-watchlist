import React, { useContext } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../context/AuthContext";

const MobileHeader = () => {
  const { handleHam, open } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <div
          className="hamburger"
          onClick={handleHam}
          style={{ cursor: "pointer" }}
        >
          {!open ? (
            <MenuOpenIcon sx={{ fontSize: 24 }} />
          ) : (
            <CloseIcon sx={{ fontSize: 24 }} />
          )}
        </div>
        <h1>watchlist</h1>
      </nav>
    </header>
  );
};

export default MobileHeader;
