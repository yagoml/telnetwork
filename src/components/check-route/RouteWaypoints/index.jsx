import React, { useState, useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { ArrowRightShort } from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux'
import './style.scss'
import { fetchConnections } from './../../../store/ducks/connections/fetch-actions'

export default function RouteWaypoints() {
  const [waypoints, setWaypoints] = useState(null)
  const [distance, setDistance] = useState(null)
  const routePath = useSelector(state => state.route.path)
  const loading = useSelector(state => state.route.loading)
  const connections = useSelector(state => state.connections.items)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchConnections())
  }, [dispatch])

  useEffect(() => {
    const getDistance = () => {
      if (!routePath) return null
      let distance = 0
      for (const p of routePath) {
        const [source, destination] = p.split('-')
        const connection = connections.find(
          c =>
            (c.origem === source && c.destino === destination) ||
            (c.destino === source && c.origem === destination)
        )
        if (!connection) return
        distance += connection.distancia
      }
      return distance.toLocaleString('pt-BR')
    }

    const buildRoute = () => {
      if (!routePath) return null
      const route = []
      for (const p of routePath) {
        const [start, finish] = p.split('-')
        if (!route.includes(start)) route.push(start)
        if (!route.includes(finish)) route.push(finish)
      }
      return route
    }
    setDistance(getDistance())
    setWaypoints(buildRoute())
    return () => {
      setWaypoints(null)
      setDistance(null)
    }
  }, [routePath, connections])

  return (
    <div className="route-waypoints">
      {loading && (
        <div className="d-flex align-items-center route-waypoints__loading">
          <span className="mr-3">Buscando rotas...</span>
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!loading && waypoints !== null && (
        <>
          {waypoints.length > 0 ? (
            <>
              <Alert variant="success">Conexão disponível</Alert>
              <div>
                Distância total: <strong>{distance}m</strong>
              </div>
              <div className="d-flex mt-4">
                {waypoints.map((p, idx) => (
                  <div key={idx}>
                    <span className="route-waypoints__pole-tag">{p}</span>
                    {idx < waypoints.length - 1 && (
                      <ArrowRightShort size={24} className="mr-2 ml-2" />
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Alert variant="danger">Conexão indisponível</Alert>
          )}
        </>
      )}
    </div>
  )
}
