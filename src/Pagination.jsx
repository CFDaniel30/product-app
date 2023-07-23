import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Pagination({currentPage, itemPerPage, totalItems, paginate, previous, next}){
  const pageNumbers = []
  for(let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++){
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className='container-fliud align-items-center justify-content-center m-auto pagination'>
          <button onClick={() => previous()} disabled={currentPage === 1} className='btn btn-primary page-item page-link'><i className="bi bi-arrow-left"></i></button>
            {
              pageNumbers.map(number => {
                const isActive = number === currentPage;
                return (
                  <li key={number} className={`page-item ${isActive? 'active' : ''}`}>
                    <button onClick={() => paginate(number)} className={`btn btn-primary page-link ${isActive? 'active' : ''}`}>
                      {number}
                    </button>
                  </li>
                );
              })
            }
        <button onClick={() => next()} disabled={currentPage === Math.ceil(totalItems / itemPerPage)} className='btn btn-primary page-item page-link'><i className="bi bi-arrow-right"></i></button>
      </ul>
    </nav>
  )
}
