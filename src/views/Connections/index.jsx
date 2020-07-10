import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchConnections,
  deleteConnection
} from '../../store/ducks/connections/fetch-actions'
import { Button, Spinner } from 'react-bootstrap'
import ConnectionsModal from '../../components/ConnectionsModal'
import './style.scss'
import { Trash, PencilSquare } from 'react-bootstrap-icons'

export default function Connections() {
  const dispatch = useDispatch()
  const connections = useSelector(state => state.connections.items)
  const loading = useSelector(state => state.connections.loading)
  const [show, setShow] = useState(false)
  const [edition, setEdition] = useState(null)

  const close = () => setShow(false)

  const openAddModal = () => {
    setEdition(null)
    setShow(true)
  }

  const openEditModal = connection => {
    setEdition(connection)
    setShow(true)
  }

  const tryDelete = id => {
    const confirmation = window.confirm(
      `Deseja realmente remover o poste ${id}?`
    )
    if (!confirmation) return
    dispatch(deleteConnection(id))
  }

  useEffect(() => {
    dispatch(fetchConnections())
  }, [dispatch])

  const renderControls = () => {
    return (
      <div className="d-flex align-items-center justify-content-between connections__controls mb-3">
        {!loading ? (
          <div>
            <strong>{connections.length}</strong> ligações cadastradas
          </div>
        ) : (
          <p>Carregando Ligações...</p>
        )}
        <Button variant="primary" onClick={openAddModal}>
          Adicionar
        </Button>
      </div>
    )
  }

  const renderTable = () => {
    if (loading || !connections.length) return
    return (
      <Table hover responsive size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Origem</th>
            <th>Destino</th>
            <th>Distância</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {connections.map(connection => (
            <tr key={connection.id}>
              <td>{connection.id}</td>
              <td>{connection.origem}</td>
              <td>{connection.destino}</td>
              <td>{connection.distancia}</td>
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
    )
  }

  const renderLoading = () => {
    if (!loading) return
    return (
      <div className="connections__loading">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  return (
    <div className="connections">
      <h1>Ligações</h1>
      {renderControls()}
      {renderTable()}
      {renderLoading()}
      <ConnectionsModal show={show} close={close} connection={edition} />
    </div>
  )
}
