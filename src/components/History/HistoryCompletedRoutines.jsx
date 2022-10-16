import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Pagination from "./Pagination";
import usersService from "../../services/users";
import { AuthContext } from "../../context/AuthContext";

const HistoryCompletedRoutines = () => {
  const pageNumberLimit = 5;
  const [passengersData, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const {
    user: { userId, token },
  } = useContext(AuthContext);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const onPrevClick = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    setCurrentPage((prev) => prev - 1);
  };

  const onNextClick = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    setCurrentPage((prev) => prev + 1);
  };
  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    response: passengersData,
  };

  useEffect(() => {
    const handleGetCompletedRoutines = async () => {
      const data = await usersService.getHistoryByTimeframe(
        userId,
        3,
        token,
        currentPage,
        5
      );
      setData(data);
    };
    handleGetCompletedRoutines();
  }, [currentPage]);

  return (
    <div>
      <Pagination
        {...paginationAttributes}
        onNextClick={onNextClick}
        onPageChange={onPageChange}
        onPrevClick={onPrevClick}
      />
    </div>
  );
};

export default HistoryCompletedRoutines;
