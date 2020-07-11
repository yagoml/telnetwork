import React, { useState, useEffect } from 'react'
import { fetchRoute } from '../../../store/ducks/route/fetch-actions'
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPoles } from '../../../store/ducks/poles/fetch-actions'
import './style.scss'

export default function CheckRouteForm() {
  const dispatch = useDispatch()
  const [sourceOptions, setSourceOptions] = useState([])
  const [destinationOptions, setDestinationOptions] = useState([])
  const [origem, setSource] = useState('')
  const [destino, setDestination] = useState('')
  const poles = useSelector(state => state.poles.items)
  const loading = useSelector(state => state.route.loading)

  const searchRoute = e => {
    e.preventDefault()
    dispatch(fetchRoute({ source: origem, destination: destino }))
  }

  useEffect(() => {
    dispatch(fetchPoles())
  }, [dispatch])

  useEffect(() => {
    const sourceOptions = () => {
      if (!poles.length) return
      const items = []
      let filtered = poles
      if (destino.length) filtered = poles.filter(p => p.id !== destino)
      for (const pole of filtered) {
        items.push(
          <option value={pole.id} key={pole.id}>
            {pole.id}
          </option>
        )
      }
      return items
    }
    setSourceOptions(sourceOptions())
  }, [destino, poles])

  useEffect(() => {
    const destinationOptions = () => {
      if (!poles.length) return
      const items = []
      let filtered = poles
      if (origem.length) filtered = poles.filter(p => p.id !== origem)
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
  }, [origem, poles])

  return (
    <Form className="check-route-form mt-3 mb-3" onSubmit={e => searchRoute(e)}>
      <Row>
        <Col xs={6} md={3} lg={2}>
          <Form.Group>
            <Form.Label>Origem</Form.Label>
            <Form.Control
              as="select"
              value={origem}
              onChange={e => setSource(e.target.value)}
              disabled={!sourceOptions}
            >
              <option>Selecione</option>
              {sourceOptions}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={6} md={3} lg={2}>
          <Form.Group>
            <Form.Label>Destino</Form.Label>
            <Form.Control
              as="select"
              value={destino}
              onChange={e => setDestination(e.target.value)}
              disabled={!destinationOptions}
            >
              <option>Selecione</option>
              {destinationOptions}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={6} md={3} lg={2}>
          <Button
            type="submit"
            className="check-route-form__btn-search"
            disabled={loading}
          >
            Consultar
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
