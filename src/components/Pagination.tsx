import React, { useState } from 'react';
import {ReactComponent as PrevArrow } from '../assets/PrevArrow.svg';
import {ReactComponent as NextArrow } from '../assets/NextArrow.svg';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  setPagination: React.Dispatch<React.SetStateAction<{ currentPage: number; itemsPerPage: number }>>;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, setPagination }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
	setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <div className="pagination">
	  <PrevArrow onClick={() => handlePageChange(currentPage - 1)} />
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}
	  <NextArrow onClick={() => handlePageChange(currentPage + 1)} />
    </div>
  );
};

export default Pagination;
