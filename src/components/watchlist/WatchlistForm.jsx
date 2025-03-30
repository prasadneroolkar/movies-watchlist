import React from "react";

const WatchlistForm = React.memo(
  ({ children, onSubmit, className = "simpleForm" }) => {
    // console.log("WatchlistForm rendered");
    return (
      <>
        <section className={className}>
          <form onSubmit={onSubmit}>{children}</form>
        </section>
      </>
    );
  }
);

export default WatchlistForm;
