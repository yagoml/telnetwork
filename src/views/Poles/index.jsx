import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPoles } from '../../store/ducks/poles/fetch-actions'
import { Button } from 'react-bootstrap'
import PolesModal from '../../components/poles/PolesModal'
import PolesTable from '../../components/poles/PolesTable'

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

  useEffect(() => {
    dispatch(fetchPoles())
  }, [dispatch])

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

  return (
    <div className="poles">
      <h1>Postes</h1>
      {renderControls()}
      <PolesTable openEditModal={openEditModal} />
      <PolesModal show={show} close={close} pole={edition} />
    </div>
  )
}
