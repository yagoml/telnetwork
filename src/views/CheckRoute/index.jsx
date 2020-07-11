import React from 'react'
import CheckRouteForm from '../../components/check-route/CheckRouteForm'
import RouteWaypoints from '../../components/check-route/RouteWaypoints'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CheckRoute() {
  const renderBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="#">
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Consulta de Conectividade</Breadcrumb.Item>
      </Breadcrumb>
    )
  }

  return (
    <div className="check-route">
      <h2 className="mt-3">Consulta de Conectividade</h2>
      {renderBreadcrumb()}
      <CheckRouteForm />
      <RouteWaypoints />
    </div>
  )
}
