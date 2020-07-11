import React, { useState, useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { ArrowRightShort } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import './style.scss'

export default function RouteWaypoints() {
  const [waypoints, setWaypoints] = useState(null)
  const routePath = useSelector(state => state.route.path)
  const loading = useSelector(state => state.route.loading)

  useEffect(() => {
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
    setWaypoints(buildRoute())
  }, [routePath])

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
