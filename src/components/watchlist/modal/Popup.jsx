import { React, memo } from "react";
import Button from "../../../components/Button";

const Popup = ({ status, delteList, closeList, message, popname }) => {
  console.log(" Popup triggered");
  return (
    <div className={`modalup ${status && " opacityModal"}`}>
      {popname === "delwatchlist" ? (
        <div id="myPopover" className={`${status && " opacitypopup"}`}>
          <h2>Delete from Your Library?</h2>
          <p>
            This will delete <b>{message}</b> from <b>Your Watchlists.</b>
          </p>
          <div>
            <button onClick={closeList}>Cancel</button>
            <button className="del_btn" onClick={delteList}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div id="myPopover2" className={`${status && " opacitypopup"}`}>
          <h1>2</h1>
        </div>
      )}
    </div>
  );
};

export default memo(Popup);
