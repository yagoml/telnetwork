import React, { useState } from 'react'
import { deletePole } from '../../../store/ducks/poles/fetch-actions'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Spinner } from 'react-bootstrap'
import { Trash, PencilSquare } from 'react-bootstrap-icons'
import { PropTypes } from 'prop-types'
import './style.scss'
import Pagination from '../../Pagination'

export default function PolesTable({ openEditModal }) {
  const poles = useSelector(state => state.poles.items)
  const [page, setPage] = useState(1)
  const loading = useSelector(state => state.poles.loading)
  const dispatch = useDispatch()
  const perPage = 8
  const totalPages = Math.ceil(poles.length / perPage)

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
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems().map(pole => (
                <tr key={pole.id}>
                  <td>{pole.id}</td>
                  <td>{pole.tipo}</td>
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
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          )}
        </>
      )}
    </div>
  )
}

PolesTable.propTypes = {
  openEditModal: PropTypes.func
}
