import React from 'react'
import './App.scss'
import Poles from './views/Poles'
import Connections from './views/Connections'
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
            <Route path="/poles">
              <Poles />
            </Route>
            <Route path="/connections">
              <Connections />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  )
}

export default App
