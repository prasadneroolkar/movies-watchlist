import React from "react";
import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addMovieToWatchlist } from "../../store/watchlistSlice";
import {
  updatelocalliststorage,
  getWatchlistFromLocalStorage,
} from "../../store/localWatchlistSlice";

const Addlist = ({
  children,
  menuPosition,
  menuVisible,
  onToggleMenu,
  movieDetails,
}) => {
  // const [selectedMovId, setSelectedmovId] = useState("");
  const [selectedLocalId, setSelectedLocId] = useState("");

  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);

  // const displayList = useSelector((state) => state.watchlist);
  const displayLocalList = useSelector((state) => state.localWatchlist);

  const userWatchlists = displayLocalList?.filter(
    (watchlist) => watchlist.user === currentUser?.email
  );

  // console.log("displaylist", displayList);
  // console.log("displayLocalList", userWatchlists);

  const mergeList = [[...userWatchlists]];
  console.log("merged list", mergeList);

  const navigate = useNavigate();
  // console.log("The movieList", movieDetails);

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

  const addMovie = (locID) => {
    // console.log("id in local ", locID);
    try {
      // dispatch(
      //   addMovieToWatchlist({
      //     watchlistId,
      //     movieDetails,
      //   })
      // );
      dispatch(
        updatelocalliststorage({
          localListid: locID,
          localMovie: movieDetails,
        })
      );
    } catch (error) {
      console.error(error.message);
    }

    // setSelectedmovId(watchlistId);
    // console.log("added");

    setSelectedLocId(locID);

    // console.log("localListID in addlist jsx", locID);
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
                mergeList[0]?.length > 0 &&
                mergeList[0].map((list, ind) => (
                  <li key={ind} onClick={() => addMovie(list.id || null)}>
                    <Link>{list.name}</Link>
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Addlist;
