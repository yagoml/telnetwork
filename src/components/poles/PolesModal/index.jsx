import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { addPole, editPole } from '../../../store/ducks/poles/fetch-actions'
import { useDispatch, useSelector } from 'react-redux'

const emptyForm = {
  id: '',
  tipo: ''
}

export default function PolesModal({ show, close, pole }) {
  const poleTypes = ['madeira', 'concreto']
  const [form, setForm] = useState(emptyForm)
  const dispatch = useDispatch()
  const poles = useSelector(state => state.poles.items)

  useEffect(() => {
    setForm(pole ? pole : emptyForm)
  }, [setForm, pole])

  const save = () => {
    let action
    if (!form.id.length || !form.tipo.length)
      return window.alert('Por favor, preencha todos os dados obrigatórios.')
    if (!pole) {
      const exists = poles.find(
        p => p.id.toUpperCase() === form.id.toUpperCase()
      )
      if (exists) return window.alert('Já existe um poste com esse ID.')
      action = addPole(form)
    } else action = editPole(pole.id, form)
    dispatch(action)
    setForm(emptyForm)
    close()
  }

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{!pole ? 'Adicionar' : 'Editar'} Poste</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>ID *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex.: P10"
              value={form.id}
              onChange={e => setForm({ ...form, id: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo *</Form.Label>
            <Form.Control
              as="select"
              value={form.tipo}
              onChange={e => setForm({ ...form, tipo: e.target.value })}
            >
              <option>Selecione</option>
              {poleTypes.map(type => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
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

PolesModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  pole: PropTypes.object
}
