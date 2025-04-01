import React, { useState, useEffect, useRef } from "react";

const InfiniteScrollList = ({ dataArrayMb, onPageDataChange }) => {
  const [countMov, setCountMov] = useState(2);
  const observerRef = useRef(null);

  const movMobile = dataArrayMb.slice(0, countMov);

  useEffect(() => {
    onPageDataChange(movMobile);
  }, [movMobile, onPageDataChange]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCountMov((prev) => prev + 2);
        }
      },
      { threshold: 1.0 }
    );

    const target = document.querySelector("#loadMoreTrigger");
    if (target) observerRef.current.observe(target);

    return () => {
      if (target) observerRef.current.unobserve(target);
    };
  }, [countMov]);

  return <div id="loadMoreTrigger" style={{ height: "10px" }}></div>; // Empty div to detect scrolling
};

export default InfiniteScrollList;
