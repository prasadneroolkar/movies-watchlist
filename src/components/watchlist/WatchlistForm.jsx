import React from "react";

const WatchlistForm = React.memo(
  ({ children, onSubmit, className = "simpleForm" }) => {
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
