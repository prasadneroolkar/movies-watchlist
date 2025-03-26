import React, { useContext, useEffect } from "react";
import mwatchlist from "/images/mwatchlist.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import addBtn from "/images/addBtn.png";
import close from "/images/close.png";
import { AuthContext } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import {
  updatelocalliststorage,
  resetStatusMessage,
} from "../../store/localWatchlistSlice";
import { showMsg } from "../../store/snackbar";

const AddwatchlistModal = ({
  status,
  delteList,
  closeList,
  message,
  list,
  movieDetails,
}) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { statusMessage, statusType } = useSelector(
    (state) => state.localWatchlist
  );

  useEffect(() => {
    if (statusMessage) {
      dispatch(showMsg({ message: statusMessage, type: statusType }));

      // Reset status after a delay to prevent stale updates
      setTimeout(() => {
        dispatch(resetStatusMessage());
      }, 2000);
    }
  }, [statusMessage, statusType, dispatch]);

  useEffect(() => {}, []);

  const addNewMovie = () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      navigate("/createwatchlist", { state: { movieDetails } });
    }
  };

  const addTolist = (locID) => {
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
  };
  return (
    <div className={`modalup   ${status && " opacityModal"}`}>
      <div id="myPopover2" className={`${status && " opacitypopup"}`}>
        <p>
          Add movie:{" "}
          <span>{`${movieDetails.Title}(${movieDetails.Year})`}</span>
        </p>
        <p>To watchlist:</p>
        <div className="popupList d-flex flex-column">
          <ul>
            {list?.length ? (
              list.map((val) => {
                return (
                  <li key={val.id} onClick={() => addTolist(val.id || null)}>
                    <img src={mwatchlist} alt="movie.logo" />
                    {val.name}
                  </li>
                );
              })
            ) : (
              <li>No watchlists available.</li>
            )}
          </ul>

          <Button
            className={"customBtn"}
            btnName={
              <>
                <img src={addBtn} />
                <span>New watchlist </span>
              </>
            }
            onClick={addNewMovie}
          />
        </div>
        <div>
          <button className="close_btn" onClick={closeList}>
            <img src={close} alt="close" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AddwatchlistModal);
