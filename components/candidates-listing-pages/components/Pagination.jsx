'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPerPage } from "../../../features/filter/candidateFilterSlice";

const Pagination = ({ itemsPerPage = 6, totalItems = 0 }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3; // Show max 3 page numbers at a time

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Update Redux store with new page range
  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, totalItems);
    dispatch(addPerPage({ start, end }));
  }, [currentPage, itemsPerPage, totalItems, dispatch]);

  if (totalPages <= 1) return null;

  return (
    <nav className="ls-pagination">
      <ul>
        {/* Previous Button */}
        <li className={`prev ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fa fa-arrow-left"></i>
          </button>
        </li>

        {/* Page Numbers */}
        {getPageNumbers().map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? "current-page" : ""}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li className={`next ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="fa fa-arrow-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
