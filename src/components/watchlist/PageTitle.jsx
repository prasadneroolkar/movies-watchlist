import { Title } from "@mui/icons-material";
import React from "react";

const PageTitle = ({ Title, className }) => {
  return (
    <>
      <div className={className}>
        <h2>{Title}</h2>
      </div>
    </>
  );
};

export default PageTitle;
