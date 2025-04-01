import { Title } from "@mui/icons-material";
import React from "react";

const PageTitle = ({ Title, className }) => {
  return (
    <>
      <section className={className}>
        <h2>{Title}</h2>
      </section>
    </>
  );
};

export default React.memo(PageTitle);
