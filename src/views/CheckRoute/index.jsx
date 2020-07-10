import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Alert } from 'react-bootstrap'
import { ArrowRightShort } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPoles } from '../../store/ducks/poles/fetch-actions'
import './style.scss'
import { fetchRoute } from '../../store/ducks/route/fetch-actions'

export default function Routes() {
  const dispatch = useDispatch()
  const [origem, setSource] = useState('')
  const [destino, setDestination] = useState('')
  const [waypoints, setWaypoints] = useState([])
  const [sourceOptions, setSourceOptions] = useState([])
  const [destinationOptions, setDestinationOptions] = useState([])
  const poles = useSelector(state => state.poles.items)
  const routePath = useSelector(state => state.route.path)

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

  useEffect(() => {
    buildRoute()
  }, [routePath])

  const searchRoute = e => {
    e.preventDefault()
    dispatch(fetchRoute({ source: origem, destination: destino }))
  }

  const buildRoute = () => {
    const route = []
    for (const p of routePath) {
      const [start, finish] = p.split('-')
      if (!route.includes(start)) route.push(start)
      if (!route.includes(finish)) route.push(finish)
    }
    setWaypoints(route)
  }

  return (
    <div className="check-route">
      <h2 className="mt-3">Consulta de Conectividade</h2>
      <Form className="mt-3 mb-3" onSubmit={e => searchRoute(e)}>
        <Row>
          <Col xs={6} md={3} lg={2}>
            <Form.Group>
              <Form.Label>Origem</Form.Label>
              <Form.Control
                as="select"
                value={origem}
                onChange={e => setSource(e.target.value)}
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
              >
                <option>Selecione</option>
                {destinationOptions}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={6} md={3} lg={2}>
            <Button type="submit" className="check-route__btn-search">
              Consultar
            </Button>
          </Col>
        </Row>
      </Form>
      {waypoints.length > 0 && (
        <div>
          <Alert variant="success">Conexão disponível!</Alert>
          <div className="d-flex mt-4">
            {waypoints.map((p, idx) => (
              <div key={idx}>
                <span className="check-route__pole-tag">{p}</span>
                {idx < waypoints.length - 1 && (
                  <ArrowRightShort size={24} className="mr-2 ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
