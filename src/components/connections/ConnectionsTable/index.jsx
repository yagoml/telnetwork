import React, { useState } from 'react'
import { deleteConnection } from '../../../store/ducks/connections/fetch-actions'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Spinner } from 'react-bootstrap'
import { Trash, PencilSquare } from 'react-bootstrap-icons'
import './style.scss'
import { PropTypes } from 'prop-types'
import Pagination from '../../Pagination'

export default function ConnectionsTable({ openEditModal }) {
  const connections = useSelector(state => state.connections.items)
  const loading = useSelector(state => state.connections.loading)
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const perPage = 8
  const totalPages = Math.ceil(connections.length / perPage)

  const tryDelete = id => {
    const confirmation = window.confirm(
      `Deseja realmente remover a ligação ${id}?`
    )
    if (!confirmation) return
    dispatch(deleteConnection(id))
    if (filteredItems().length === 1 && page > 1) setPage(page - 1)
  }

  const filteredItems = () => {
    const startIndex = (page - 1) * perPage
    let items = [...connections]
    items = items.splice(startIndex, perPage)
    return items
  }

  return (
    <div className="connections-table">
      {loading ? (
        <div className="connections-table__loading">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Table hover responsive size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Origem</th>
                <th>Destino</th>
                <th>Distância (m)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems().map(connection => (
                <tr key={connection.id}>
                  <td>{connection.id}</td>
                  <td>{connection.origem}</td>
                  <td>{connection.destino}</td>
                  <td>{connection.distancia.toLocaleString('pt-BR')}</td>
                  <td>
                    <Button
                      onClick={() => openEditModal(connection)}
                      className="mr-2"
                      title="Editar"
                    >
                      <PencilSquare color="white" size={20} />
                    </Button>
                    <Button
                      onClick={() => tryDelete(connection.id)}
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

ConnectionsTable.propTypes = {
  openEditModal: PropTypes.func
}
