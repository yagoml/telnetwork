import React from 'react'
import './App.scss'
import Poles from './views/Poles'
import Home from './views/Home'
import Connections from './views/Connections'
import CheckRoute from './views/CheckRoute'
import { Container } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Container>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/poles">
              <Poles />
            </Route>
            <Route path="/connections">
              <Connections />
            </Route>
            <Route path="/check-route">
              <CheckRoute />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  )
}

export default App
