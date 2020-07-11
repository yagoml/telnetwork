import React from 'react'
import './App.scss'
import Poles from './views/Poles'
import Home from './views/Home'
import Connections from './views/Connections'
import CheckRoute from './views/CheckRoute'
import Login from './views/Login'
import { Container } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

export default function App() {
  const isAuthenticated = () => {
    const storedTokens = JSON.parse(localStorage.getItem('telnetwork_tokens'))
    if (!storedTokens) return false
    const accessToken = storedTokens.access
    return accessToken !== null
  }

  return (
    <div className="App">
      <Container>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute authed={isAuthenticated()} path='/' component={Home} exact />
            <PrivateRoute authed={isAuthenticated()} path='/poles' component={Poles} />
            <PrivateRoute authed={isAuthenticated()} path='/connections' component={Connections} />
            <PrivateRoute authed={isAuthenticated()} path='/check-route' component={CheckRoute} />
          </Switch>
        </Router>
      </Container>
    </div>
  )
}

const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
