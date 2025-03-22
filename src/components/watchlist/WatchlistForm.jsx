import React from "react";

const WatchlistForm = React.memo(
  ({ children, onSubmit, className = "simpleForm" }) => {
    // console.log("WatchlistForm rendered");
    return (
      <>
        <div className={className}>
          <form onSubmit={onSubmit}>{children}</form>
        </div>
      </>
    );
  }
);

export default WatchlistForm;
