import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Breadcrumb } from 'react-bootstrap'
import PolesModal from '../../components/poles/PolesModal'
import PolesTable from '../../components/poles/PolesTable'
import { fetchPoles } from '../../store/ducks/poles/fetch-actions'
import { fetchConnections } from './../../store/ducks/connections/fetch-actions'
import { Link } from 'react-router-dom'

export default function Poles() {
  const dispatch = useDispatch()
  const poles = useSelector(state => state.poles.items)
  const loading = useSelector(state => state.poles.loading)
  const [show, setShow] = useState(false)
  const [edition, setEdition] = useState(null)

  const close = () => setShow(false)

  const openAddModal = () => {
    setEdition(null)
    setShow(true)
  }

  const openEditModal = pole => {
    setEdition(pole)
    setShow(true)
  }

  const renderControls = () => {
    return (
      <div className="d-flex align-items-center justify-content-between poles__controls mb-3">
        {!loading ? (
          <p>
            <strong>{poles.length}</strong> postes cadastrados
          </p>
        ) : (
          <p>Carregando Postes...</p>
        )}
        <Button variant="primary" onClick={openAddModal}>
          Adicionar
        </Button>
      </div>
    )
  }

  const renderBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="#">
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Postes</Breadcrumb.Item>
      </Breadcrumb>
    )
  }

  useEffect(() => {
    dispatch(fetchPoles())
    dispatch(fetchConnections())
  }, [dispatch])

  return (
    <div className="poles">
      <h2>Postes</h2>
      {renderBreadcrumb()}
      {renderControls()}
      <PolesTable openEditModal={openEditModal} />
      <PolesModal show={show} close={close} pole={edition} />
    </div>
  )
}
