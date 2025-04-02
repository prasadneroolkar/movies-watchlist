import React, { useState, useEffect, useRef } from "react";

const InfiniteScrollList = ({ dataArrayMb = [], onPageDataChange }) => {
  const [countMov, setCountMov] = useState(5); // Start with 5 movies
  const observerRef = useRef(null);

  // Ensure we have a valid array
  const visibleMovies = Array.isArray(dataArrayMb)
    ? dataArrayMb.slice(0, countMov)
    : [];

  useEffect(() => {
    if (visibleMovies.length > 0) {
      onPageDataChange(visibleMovies); // Update only when movies change
    }
  }, [visibleMovies, onPageDataChange]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCountMov((prev) => prev + 5); // Load 5 more movies when scrolled
        }
      },
      { threshold: 1.0 }
    );

    const target = document.querySelector("#loadMoreTrigger");
    if (target) observerRef.current.observe(target);

    return () => {
      if (target) observerRef.current.unobserve(target);
    };
  }, []);

  return <div id="loadMoreTrigger" className="infinite-scroll-trigger"></div>;
};

export default React.memo(InfiniteScrollList);
