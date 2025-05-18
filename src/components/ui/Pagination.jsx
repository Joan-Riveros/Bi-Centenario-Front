import React from 'react';
import Button from '../Button'; 

function Pagination({ currentPage, onPageChange, hasMoreNext, itemsPerPage }) {


  return (
    <div className="flex justify-center items-center space-x-2 my-6">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        variant="secondary"
        size="sm"
      >
        Anterior
      </Button>
      <span className="text-sm text-gray-700 dark:text-gray-300">
        Página {currentPage + 1}
      </span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMoreNext}
        variant="secondary"
        size="sm"
      >
        Siguiente
      </Button>
    </div>
  );
}

export default Pagination;