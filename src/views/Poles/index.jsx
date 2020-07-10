import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPoles, deletePole } from '../../store/ducks/poles/fetch-actions'
import { Button, Spinner } from 'react-bootstrap'
import PolesModal from '../../components/PolesModal'
import './style.scss'
import { Trash, PencilSquare } from 'react-bootstrap-icons'

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

  const tryDelete = id => {
    const confirmation = window.confirm(
      `Deseja realmente remover o poste ${id}?`
    )
    if (!confirmation) return
    dispatch(deletePole(id))
  }

  useEffect(() => {
    dispatch(fetchPoles())
  }, [dispatch])

  const renderTable = () => {
    if (loading || !poles.length) return
    return (
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
          {poles.map(pole => (
            <tr key={pole.id}>
              <td>{pole.id}</td>
              <td>{pole.tipo}</td>
              <td></td>
              <td>
                <Button
                  onClick={() => tryDelete(pole.id)}
                  className="mr-2"
                  variant="danger"
                  title="Remover"
                >
                  <Trash color="white" size={20} />
                </Button>
                <Button onClick={() => openEditModal(pole)} title="Editar">
                  <PencilSquare color="white" size={20} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
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

  const renderLoading = () => {
    return (
      <div className="poles__loading">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  return (
    <div className="poles">
      <h1>Postes</h1>
      {renderControls()}
      {renderTable()}
      {renderLoading()}
      <PolesModal show={show} close={close} pole={edition} />
    </div>
  )
}
