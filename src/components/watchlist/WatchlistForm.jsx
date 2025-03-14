import React from "react";

const WatchlistForm = React.memo(({ children, onSubmit }) => {
  // console.log("WatchlistForm rendered");
  return (
    <>
      <div className="simpleForm">
        <form onSubmit={onSubmit}>{children}</form>
      </div>
    </>
  );
});

export default WatchlistForm;
