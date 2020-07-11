import React, { useState } from 'react'
import { deletePole } from '../../../store/ducks/poles/fetch-actions'
import { Table, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Spinner } from 'react-bootstrap'
import { Trash, PencilSquare } from 'react-bootstrap-icons'
import { PropTypes } from 'prop-types'
import './style.scss'

export default function PolesTable({ openEditModal }) {
  const poles = useSelector(state => state.poles.items)
  const [page, setPage] = useState(1)
  const loading = useSelector(state => state.poles.loading)
  const dispatch = useDispatch()
  const perPage = 5

  const tryDelete = id => {
    const confirmation = window.confirm(
      `Deseja realmente remover o poste ${id}?`
    )
    if (!confirmation) return
    dispatch(deletePole(id))
    if (filteredItems().length === 1 && page > 1) setPage(page - 1)
  }

  const filteredItems = () => {
    const startIndex = (page - 1) * perPage
    let items = [...poles]
    items = items.splice(startIndex, perPage)
    return items
  }

  const totalPages = Math.ceil(poles.length / perPage)

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
    <div className="poles-table">
      {loading ? (
        <div className="poles-table__loading">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Table hover responsive size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Conexões</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems().map(pole => (
                <tr key={pole.id}>
                  <td>{pole.id}</td>
                  <td>{pole.tipo}</td>
                  <td></td>
                  <td>
                    <Button
                      onClick={() => openEditModal(pole)}
                      className="mr-2"
                      title="Editar"
                    >
                      <PencilSquare color="white" size={20} />
                    </Button>
                    <Button
                      onClick={() => tryDelete(pole.id)}
                      variant="danger"
                      title="Remover"
                    >
                      <Trash color="white" size={20} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                <Pagination.First
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                />
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
          )}
        </>
      )}
    </div>
  )
}

PolesTable.propTypes = {
  openEditModal: PropTypes.func
}
