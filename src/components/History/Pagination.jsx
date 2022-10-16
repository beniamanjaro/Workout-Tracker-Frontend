import React from "react";
import HistoryRoutineCard from "../Routine/HistoryRoutineCard";

const Pagination = ({
  currentPage,
  maxPageLimit,
  minPageLimit,
  response,
  onPrevClick,
  onNextClick,
  onPageChange,
}) => {
  const totalPages = response.totalPages - 1;
  const data = response.data;
  const handlePrevClick = () => {
    onPrevClick();
  };
  const handleNextClick = () => {
    onNextClick();
  };
  const handlePageClick = (e) => {
    onPageChange(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const pageNumbers = pages?.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li
          key={page}
          id={page}
          onClick={handlePageClick}
          className={
            currentPage === page
              ? "z-10 py-2 px-3 cursor-pointer leading-tight text-blue-600 bg-blue-50 border border-blue-600 hover:bg-blue-100 hover:text-blue-700"
              : "py-2 px-3 cursor-pointer leading-tight text-gray-500 bg-white border border-black hover:bg-gray-100 hover:text-gray-700"
          }
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  let pageIncrementEllipses = null;
  if (pages.length > maxPageLimit) {
    pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>;
  }
  let pageDecremenEllipses = null;
  if (minPageLimit >= 1) {
    pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>;
  }
  const renderData = (data) => {
    return (
      <ul>
        {data?.map((d) => (
          <li key={d.completedRoutineId} className="m-2">
            <HistoryRoutineCard completedRoutineData={d} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="m-4">
      <div className="">{renderData(data)}</div>
      <ul className="flex items-center justify-center gap-1 -space-x-px">
        <li>
          <button
            className="py-2 px-3 leading-tight text-gray-500 bg-white border border-black hover:bg-gray-100 hover:text-gray-700"
            onClick={handlePrevClick}
            disabled={currentPage === pages[0]}
          >
            Prev
          </button>
        </li>
        {pageDecremenEllipses}
        {pageNumbers}
        {pageIncrementEllipses}
        <li>
          <button
            className="py-2 px-3 leading-tight text-gray-500 bg-white border border-black hover:bg-gray-100 hover:text-gray-700"
            onClick={handleNextClick}
            disabled={currentPage === pages[pages.length - 1]}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
