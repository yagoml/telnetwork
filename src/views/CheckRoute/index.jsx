import React, { useEffect } from 'react'
import CheckRouteForm from '../../components/check-route/CheckRouteForm'
import RouteWaypoints from '../../components/check-route/RouteWaypoints'
import Breadcrumb from '../../components/BreadCrumb'
import { useDispatch } from 'react-redux'
import { resetRoute } from '../../store/ducks/route'

export default function CheckRoute() {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => dispatch(resetRoute())
  }, [])

  return (
    <div className="check-route">
      <h2 className="mt-3">Consulta de Conectividade</h2>
      <Breadcrumb current="Consulta de Conectividade" />
      <CheckRouteForm />
      <RouteWaypoints />
    </div>
  )
}
