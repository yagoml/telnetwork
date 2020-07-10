import React, { useEffect } from 'react'
import './style.scss'
import Widget from './../../components/Widget/index'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPoles } from '../../store/ducks/poles/fetch-actions'
import { fetchConnections } from './../../store/ducks/connections/fetch-actions'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Home() {
  const dispatch = useDispatch()
  const poles = useSelector(state => state.poles.items)
  const loadingPoles = useSelector(state => state.poles.loading)
  const connections = useSelector(state => state.connections.items)
  const loadingConnections = useSelector(state => state.connections.loading)

  useEffect(() => {
    dispatch(fetchPoles())
    dispatch(fetchConnections())
  }, [dispatch])

  return (
    <div className="home">
      <h3 className="mt-4">
        Bem vindo <strong>admin</strong>!
      </h3>
      <p>Selecione abaixo o que deseja visualizar</p>
      <div className="d-flex mt-4 mb-3">
        <Widget
          value={poles.length}
          title={'Postes'}
          uri={'/poles'}
          loading={loadingPoles}
          className="mr-3"
        />
        <Widget
          value={connections.length}
          title={'Ligações'}
          uri={'/connections'}
          loading={loadingConnections}
        />
      </div>
      <Link to="/routes">
        <Button>Consultar conectividade</Button>
      </Link>
    </div>
  )
}
