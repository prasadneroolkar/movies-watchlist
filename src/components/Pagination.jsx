import React, { useState, useEffect, useMemo } from "react";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";

const Pagination = ({ dataArray, onPageDataChange }) => {
  const [resizeMob, setResizemob] = useState(window.innerWidth > 991);

  useEffect(() => {
    const handleResize = () => {
      setResizemob(window.innerWidth > 991);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getLength = dataArray.length || 0;

  const [currentPage, setCurentpage] = useState(1);
  const itemsPerpage = 5;

  const total = Math.ceil(getLength / itemsPerpage);

  const page = Array.from({ length: total }, (_, i) => i + 1);

  const startIndex = (currentPage - 1) * itemsPerpage;
  const endIndex = startIndex + itemsPerpage;

  const movslice = useMemo(
    () => dataArray.slice(startIndex, endIndex),
    [dataArray, startIndex, endIndex]
  );

  useEffect(() => {
    onPageDataChange(movslice);
  }, [movslice, onPageDataChange]);

  const onNext = () => {
    if (currentPage < total) {
      setCurentpage((prev) => prev + 1);
    }
  };

  const onPrev = () => {
    if (currentPage > 1) {
      setCurentpage((prev) => prev - 1);
    }
  };

  const handlePage = (i) => {
    setCurentpage(i);
  };
  if (!resizeMob) return null;
  return (
    <div className="paginations">
      <button onClick={onPrev} className={`${startIndex === 0 && "disabled"}`}>
        <FirstPageIcon />
      </button>
      <div>
        {page?.length &&
          page.map((val, index) => (
            <button
              key={index}
              onClick={() => handlePage(val)}
              className={`${currentPage === val && "active"}`}
            >
              {val}
            </button>
          ))}
      </div>
      <button
        onClick={onNext}
        className={`${endIndex >= getLength && "disabled"}`}
      >
        <LastPageIcon />
      </button>
    </div>
  );
};

export default Pagination;
