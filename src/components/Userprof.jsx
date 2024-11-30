import React from "react";

const Userprof = () => {
  return (
    <div className="profile_status d-flex justify-content-between align-items-center">
      <p className="d-flex column-gap-2 justify-content-start align-items-center">
        <img src="/images/avatar.png" alt="profile" />
        <span>Guest</span>
      </p>
      <img src="/images/dot.png" alt="" />
    </div>
  );
};

export default Userprof;
