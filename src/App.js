import React from 'react'
import './App.scss'
import Poles from './components/Poles'
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
          </Switch>
        </Router>
        
      </Container>
    </div>
  )
}

export default App
