import React from "react";
import Button from "../../../components/Button";

const Popup = ({ status }) => {
  return (
    <div className={`modalup ${status && " opacityModal"}`}>
      <div id="myPopover" className={`${status && " opacitypopup"}`}>
        <h2>Delete from Your Library?</h2>
        <p>
          This will delete <b>Tune Jo Na Kaha</b> from <b>Your Library.</b>
        </p>
        <div>
          <button>Cancel</button>
          <Button btnName="Delete" />
        </div>
      </div>
    </div>
  );
};

export default Popup;
