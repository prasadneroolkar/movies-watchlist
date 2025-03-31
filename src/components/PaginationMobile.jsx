import React, { useState, useEffect, useMemo } from "react";
import Button from "../components/Button";

const PaginationMobile = ({ dataArray, onPageDataChangeMob }) => {
  const getLength = dataArray.length || 0;

  const [currentPage, setCurentpage] = useState(1);
  const itemsPerpage = 5;
  const [countMov, setCountmov] = useState(itemsPerpage);

  // const total = Math.ceil(getLength / itemsPerpage);
  const startIndex = (currentPage - 1) * itemsPerpage;
  // const endIndex = startIndex + itemsPerpage;

  const movMobie = useMemo(
    () => dataArray.slice(startIndex, countMov),
    [dataArray, startIndex, countMov]
  );

  useEffect(() => {
    onPageDataChangeMob(movMobie);
  }, [movMobie, onPageDataChangeMob]);

  const onhandleClick = () => {
    if (getLength <= countMov) {
      setCountmov((prev) => prev + 5);
    }
  };

  return (
    <div className="page_btn">
      <Button btnName="See more" onClick={onhandleClick} />
    </div>
  );
};

export default PaginationMobile;
