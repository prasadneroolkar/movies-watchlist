import React, { lazy, Suspense } from "react";
import MoviesSkimmer from "./MoviesSkimmer";

const Movies = lazy(() => import("./Slider/Movies"));

const SliderComp = ({ search }) => {
  return (
    <>
      <section className="movies_section">
        <h2>Popular movies</h2>
        <Suspense
          fallback={
            <div className="card-main">
              <MoviesSkimmer />
            </div>
          }
        >
          <Movies movSrch={search} />
        </Suspense>
      </section>
    </>
  );
};

export default React.memo(SliderComp);
