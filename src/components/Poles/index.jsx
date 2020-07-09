import React, { useEffect } from 'react'
import './style.scss'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPoles } from '../../store/fetch-actions'

export default function Poles() {
  const dispatch = useDispatch()
  const poles = useSelector(state => state.poles)

  useEffect(() => {
    dispatch(fetchPoles())
  }, [dispatch])

  return (
    <div className="poles">
      <h1>Postes</h1>
      {poles.length > 0 && (
        <Table hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Conexões</th>
            </tr>
          </thead>
          <tbody>
            {poles.map(pole => (
              <tr key={pole.id}>
                <td>{pole.id}</td>
                <td>{pole.tipo}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}
