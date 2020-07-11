import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchConnections } from '../../store/ducks/connections/fetch-actions'
import { fetchPoles } from '../../store/ducks/poles/fetch-actions'
import { Button, Breadcrumb } from 'react-bootstrap'
import ConnectionsModal from '../../components/connections/ConnectionsModal'
import ConnectionsTable from '../../components/connections/ConnectionsTable'
import { Link } from 'react-router-dom'

export default function Connections() {
  const dispatch = useDispatch()
  const connections = useSelector(state => state.connections.items)
  const [show, setShow] = useState(false)
  const [edition, setEdition] = useState(null)
  const loading = useSelector(state => state.connections.loading)

  const close = () => setShow(false)

  const openAddModal = () => {
    setEdition(null)
    setShow(true)
  }

  const openEditModal = connection => {
    setEdition(connection)
    setShow(true)
  }

  const renderBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="#">
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Ligações</Breadcrumb.Item>
      </Breadcrumb>
    )
  }

  useEffect(() => {
    dispatch(fetchConnections())
    dispatch(fetchPoles())
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

  return (
    <div className="connections">
      <h2>Ligações</h2>
      {renderBreadcrumb()}
      {renderControls()}
      <ConnectionsTable openEditModal={openEditModal} />
      <ConnectionsModal show={show} close={close} connection={edition} />
    </div>
  )
}
