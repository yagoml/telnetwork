import React from 'react'
import { PropTypes } from 'prop-types'
import { Pagination } from 'react-bootstrap'

export default function PaginationCustom({ page, totalPages, setPage }) {
  const paginationItems = () => {
    let items = []
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => setPage(number)}
        >
          {number}
        </Pagination.Item>
      )
    }
    return items
  }

  return (
    <div className="d-flex justify-content-center mt-3">
      <Pagination>
        <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
        <Pagination.Prev
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        />
        {paginationItems()}
        <Pagination.Next
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        />
        <Pagination.Last
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        />
      </Pagination>
    </div>
  )
}

PaginationCustom.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired
}
