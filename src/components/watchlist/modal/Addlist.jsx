import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import React from "react";

const Addlist = React.memo(
  ({ children, menuPosition, menuVisible, onToggleMenu }) => {
    console.log("ChildComponent re-rendered");
    const { currentUser } = useContext(AuthContext);

    const menuRef = useRef(null);
    const handleContext = (e) => {
      e.stopPropagation();
      onToggleMenu(e.pageX, e.pageY);
    };
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          onToggleMenu(null, null, null);
        }
      };

      if (menuVisible) {
        document.addEventListener("click", handleClickOutside);
      }
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [menuVisible, onToggleMenu]);

    return (
      <>
        <div className="contextClass" onClick={handleContext}>
          {children}
          {menuVisible && (
            <ul ref={menuRef}>
              <li style={!currentUser ? { paddingBottom: "10px" } : {}}>
                <Link to={!currentUser ? "/login" : "/createwatchlist"}>
                  <AddSharpIcon />
                  new playlist
                </Link>
              </li>

              {currentUser && (
                <li>
                  <ul>
                    <li>
                      <Link>my playlist</Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          )}
        </div>
      </>
    );
  }
);

export default Addlist;
