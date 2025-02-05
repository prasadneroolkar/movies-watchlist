import React from "react";
import { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addFrommodalList } from "../../store/watchlistSlice";

const Addlist = React.memo(
  ({ children, menuPosition, menuVisible, onToggleMenu, movieDetails }) => {
    // console.log("ChildComponent re-rendered");
    const dispatch = useDispatch();
    const displayList = useSelector((state) => state.watchlist);
    console.log("displaylist", displayList);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(movieDetails);
    const addtoList = () => {
      if (!currentUser) {
        navigate("/login");
      } else {
        navigate("/createwatchlist", { state: { movieDetails } });
      }
    };
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

    const addMovie = () => {
      console.log("added");
      dispatch(
        addFrommodalList({
          addMovie: movieDetails,
        })
      );
    };

    return (
      <div className="contextClass" onClick={handleContext}>
        {children}
        {menuVisible && (
          <ul ref={menuRef}>
            <li
              style={!currentUser ? { paddingBottom: "10px" } : {}}
              onClick={addtoList}
            >
              <Link>
                <AddSharpIcon />
                new playlist
              </Link>
            </li>
            <li>
              <ul>
                {currentUser &&
                  displayList?.length > 0 &&
                  displayList.map((list, index) => (
                    <li key={index}>
                      <Link onClick={addMovie}>{list.name}</Link>
                    </li>
                  ))}
              </ul>
            </li>
          </ul>
        )}
      </div>
    );
  }
);

export default Addlist;
