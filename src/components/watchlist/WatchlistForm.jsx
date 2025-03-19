import React from "react";

const WatchlistForm = React.memo(({ children, onSubmit, className }) => {
  // console.log("WatchlistForm rendered");
  return (
    <>
      <div className="simpleForm" className={className}>
        <form onSubmit={onSubmit}>{children}</form>
      </div>
    </>
  );
});

export default WatchlistForm;
