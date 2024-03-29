import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import {
  addConnection,
  editConnection
} from '../../../store/ducks/connections/fetch-actions'
import { useDispatch } from 'react-redux'

const emptyForm = {
  id: '',
  origem: '',
  destino: '',
  distancia: ''
}

export default function ConnectionsModal({ show, close, connection }) {
  const [form, setForm] = useState(emptyForm)
  const [sourceOptions, setSourceOptions] = useState([])
  const [destinationOptions, setDestinationOptions] = useState([])
  const dispatch = useDispatch()
  const poles = useSelector(state => state.poles.items)
  const connections = useSelector(state => state.connections.items)

  useEffect(() => {
    setForm(connection ? connection : emptyForm)
  }, [connection])

  useEffect(() => {
    const sourceOptions = () => {
      if (!poles.length) return
      const items = []
      for (const pole of poles) {
        items.push(
          <option value={pole.id} key={pole.id}>
            {pole.id}
          </option>
        )
      }
      return items
    }
    setSourceOptions(sourceOptions())
  }, [poles])

  useEffect(() => {
    const destinationOptions = () => {
      if (!poles.length) return
      const items = []
      let filtered = poles
      if (form.origem.length) filtered = poles.filter(p => p.id !== form.origem)
      for (const pole of filtered) {
        items.push(
          <option value={pole.id} key={pole.id}>
            {pole.id}
          </option>
        )
      }
      return items
    }
    setDestinationOptions(destinationOptions())
  }, [form.origem, poles])

  const save = () => {
    let action
    if (!checkValidity())
      return window.alert('Por favor, preencha todos os dados obrigatórios.')
    if (!connection) {
      const exists = connections.find(
        p => p.id.toUpperCase() === form.id.toUpperCase()
      )
      if (exists) return window.alert('Já existe uma ligação com esse ID.')
      action = addConnection(form)
    } else action = editConnection(connection.id, form)
    dispatch(action)
    setForm(emptyForm)
    close()
  }

  const checkValidity = () => {
    if (
      !form.id.length ||
      !form.origem.length ||
      !form.distancia.length ||
      !form.destino.length
    )
      return false
    return true
  }

  return (
    <Modal show={show} onHide={close} className="connections-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          {!connection ? 'Adicionar' : 'Editar'} Ligação
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>ID *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex.: LE5"
                  value={form.id}
                  onChange={e => setForm({ ...form, id: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Origem *</Form.Label>
                <Form.Control
                  as="select"
                  value={form.origem}
                  onChange={e => setForm({ ...form, origem: e.target.value })}
                >
                  <option>Selecione</option>
                  {sourceOptions}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>Distância *</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ex.: 10,5"
                  value={form.distancia}
                  step=".1"
                  onChange={e =>
                    setForm({ ...form, distancia: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Destino *</Form.Label>
                <Form.Control
                  as="select"
                  value={form.destino}
                  onChange={e => setForm({ ...form, destino: e.target.value })}
                >
                  <option>Selecione</option>
                  {destinationOptions}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={save}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ConnectionsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  connection: PropTypes.object
}
