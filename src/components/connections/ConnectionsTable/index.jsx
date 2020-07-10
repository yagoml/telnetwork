import React from 'react'
import { deleteConnection } from '../../../store/ducks/connections/fetch-actions'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Spinner } from 'react-bootstrap'
import { Trash, PencilSquare } from 'react-bootstrap-icons'
import './style.scss'
import { PropTypes } from 'prop-types'

export default function ConnectionsTable({ openEditModal }) {
  const connections = useSelector(state => state.connections.items)
  const loading = useSelector(state => state.connections.loading)
  const dispatch = useDispatch()

  const tryDelete = id => {
    const confirmation = window.confirm(
      `Deseja realmente remover a ligação ${id}?`
    )
    if (!confirmation) return
    dispatch(deleteConnection(id))
  }

  return (
    <div className="connections-table">
      {loading ? (
        <div className="connections-table__loading">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
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
            {connections.map(connection => (
              <tr key={connection.id}>
                <td>{connection.id}</td>
                <td>{connection.origem}</td>
                <td>{connection.destino}</td>
                <td>{connection.distancia.toLocaleString('pt-BR')}</td>
                <td>
                  <Button
                    onClick={() => tryDelete(connection.id)}
                    className="mr-2"
                    variant="danger"
                    title="Remover"
                  >
                    <Trash color="white" size={20} />
                  </Button>
                  <Button
                    onClick={() => openEditModal(connection)}
                    title="Editar"
                  >
                    <PencilSquare color="white" size={20} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

ConnectionsTable.propTypes = {
  openEditModal: PropTypes.func
}
