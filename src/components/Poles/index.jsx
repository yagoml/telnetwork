import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPoles, deletePole } from '../../store/fetch-actions'
import { Button } from 'react-bootstrap'
import PolesModal from '../PolesModal'

export default function Poles() {
  const dispatch = useDispatch()
  const poles = useSelector(state => state.poles.items)
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

  return (
    <div className="poles">
      <h1>Postes</h1>
      <div className="poles__controls mb-3">
        <Button variant="primary" onClick={openAddModal}>
          Adicionar
        </Button>
      </div>
      {poles.length > 0 && (
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
                  >
                    Excluir
                  </Button>
                  <Button onClick={() => openEditModal(pole)}>Editar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <PolesModal show={show} close={close} pole={edition} />
    </div>
  )
}
