import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.scss'
import { Container } from 'react-bootstrap'

export default function AppHeader() {
  return (
    <div className="d-flex align-items-center app-header">
      <Container>
        <NavLink
          exact
          activeClassName="is-active"
          to="/"
          className="app-header__link"
        >
          Dashboard
        </NavLink>
        <NavLink
          activeClassName="is-active"
          to="/poles"
          className="app-header__link"
        >
          Postes
        </NavLink>
        <NavLink
          activeClassName="is-active"
          to="/connections"
          className="app-header__link"
        >
          Ligações
        </NavLink>
        <NavLink
          activeClassName="is-active"
          to="/check-route"
          className="app-header__link"
        >
          Conectividade
        </NavLink>
      </Container>
    </div>
  )
}
