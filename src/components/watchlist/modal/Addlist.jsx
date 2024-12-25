import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AddSharpIcon from "@mui/icons-material/AddSharp";

const Addlist = ({ children, menuPosition, menuVisible, onToggleMenu }) => {
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
            <li>
              <AddSharpIcon />
              new playlist
            </li>
            <li>
              <Link>my playlist</Link>
            </li>
            <li>
              <Link>my playlist</Link>
            </li>
            <li>
              <Link>my playlist</Link>
            </li>
            <li>
              <Link>my playlist</Link>
            </li>
            <li>
              <Link>my playlist</Link>
            </li>
            <li>
              <Link>my playlist</Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Addlist;
