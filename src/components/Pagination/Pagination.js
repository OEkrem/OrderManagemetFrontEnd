import React from 'react';
import './Pagination.css';

const Pagination = ({ page, setPage, totalPages }) => {
  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={page === 0} className="btn btn-secondary">
        Previous
      </button>
      <span className="mx-2">Page {page + 1} of {totalPages}</span>
      <button onClick={handleNext} disabled={page === totalPages - 1} className="btn btn-secondary">
        Next
      </button>
    </div>
  );
};

export default Pagination;