import React from "react";
import Skeleton from "@mui/material/Skeleton";

const MoviesSkimmer = () => {
  const SkimArray = Array.from({ length: 5 });
  console.log(SkimArray);

  return (
    <div className="skimmer_cls">
      {SkimArray.map((_, ind) => (
        <div className="mov_card" key={ind}>
          <Skeleton
            variant="rectangular"
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.13)" }}
            width={"100%"}
            height={225}
          />
          <h5>
            <Skeleton sx={{ backgroundColor: "rgba(255, 255, 255, 0.13)" }} />
            <span>
              <Skeleton sx={{ backgroundColor: "rgba(255, 255, 255, 0.13)" }} />
            </span>
          </h5>
        </div>
      ))}
    </div>
  );
};

export default MoviesSkimmer;
