import React from 'react'
import { deletePole } from '../../../store/ducks/poles/fetch-actions'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Spinner } from 'react-bootstrap'
import { Trash, PencilSquare } from 'react-bootstrap-icons'
import { PropTypes } from 'prop-types'
import './style.scss'

export default function PolesTable({ openEditModal }) {
  const poles = useSelector(state => state.poles.items)
  const loading = useSelector(state => state.poles.loading)
  const dispatch = useDispatch()

  const tryDelete = id => {
    const confirmation = window.confirm(
      `Deseja realmente remover o poste ${id}?`
    )
    if (!confirmation) return
    dispatch(deletePole(id))
  }

  return (
    <div className="poles-table">
      {loading ? (
        <div className="poles-table__loading">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
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
      )}
    </div>
  )
}

PolesTable.propTypes = {
  openEditModal: PropTypes.func
}
