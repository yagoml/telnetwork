import React from 'react'
import CheckRouteForm from '../../components/check-route/CheckRouteForm'
import RouteWaypoints from '../../components/check-route/RouteWaypoints'
import Breadcrumb from '../../components/BreadCrumb'

export default function CheckRoute() {
  return (
    <div className="check-route">
      <h2 className="mt-3">Consulta de Conectividade</h2>
      <Breadcrumb current="Consulta de Conectividade" />
      <CheckRouteForm />
      <RouteWaypoints />
    </div>
  )
}
