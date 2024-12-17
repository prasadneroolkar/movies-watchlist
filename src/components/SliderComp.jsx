import React, { lazy, Suspense } from "react";
import MoviesSkimmer from "./MoviesSkimmer";

const Movies = lazy(() => import("./Slider/Movies"));

const SliderComp = () => {
  return (
    <>
      <section className="movies_section">
        <h2>Popular movies right now</h2>
        <Suspense
          fallback={
            <div className="card-main">
              <MoviesSkimmer />
            </div>
          }
        >
          <Movies />
        </Suspense>
      </section>
    </>
  );
};

export default SliderComp;
