import React from 'react'
import CheckRouteForm from '../../components/check-route/CheckRouteForm'
import RouteWaypoints from '../../components/check-route/RouteWaypoints'

export default function CheckRoute() {
  return (
    <div className="check-route">
      <h2 className="mt-3">Consulta de Conectividade</h2>
      <CheckRouteForm />
      <RouteWaypoints />
    </div>
  )
}
