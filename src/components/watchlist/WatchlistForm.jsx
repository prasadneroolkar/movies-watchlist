import React from "react";

const WatchlistForm = ({ children, onSubmit }) => {
  return (
    <>
      <div className="simpleForm">
        <form onSubmit={onSubmit}>{children}</form>
      </div>
    </>
  );
};

export default WatchlistForm;
