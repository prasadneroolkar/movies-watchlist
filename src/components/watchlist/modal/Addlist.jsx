import React from "react";
import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addMovieToWatchlist } from "../../store/watchlistSlice";
import CustomSnackbar from "../../Messages/CustomSnackbar";

import {
  updatelocalliststorage,
  resetStatusMessage,
} from "../../store/localWatchlistSlice";
import { showMsg } from "../../store/snackbar";

const Addlist = ({
  children,
  menuPosition,
  menuVisible,
  onToggleMenu,
  movieDetails,
}) => {
  const [selectedLocalId, setSelectedLocId] = useState("");

  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);

  const displayLocalList = useSelector(
    (state) => state.localWatchlist.watchlists
  );

  const { statusMessage, statusType } = useSelector(
    (state) => state.localWatchlist
  );

  const userWatchlists = displayLocalList?.filter(
    (watchlist) => watchlist.user === currentUser?.email
  );

  const mergeList = [[...userWatchlists]];

  const navigate = useNavigate();

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
    try {
      dispatch(
        updatelocalliststorage({
          localListid: locID,
          localMovie: movieDetails,
        })
      );
    } catch (error) {
      console.error(error.message);
    }

    setSelectedLocId(locID);
  };

  useEffect(() => {
    if (statusMessage) {
      dispatch(showMsg({ message: statusMessage, type: statusType }));

      // Reset status after a delay to prevent stale updates
      setTimeout(() => {
        dispatch(resetStatusMessage());
      }, 2000);
    }
  }, [statusMessage, statusType, dispatch]);

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
          {currentUser && (
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
          )}
        </ul>
      )}
    </div>
  );
};

export default Addlist;
