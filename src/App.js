import React from 'react'
import './App.scss'
import Poles from './components/Poles'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      <Container>
        <Poles />
      </Container>
    </div>
  )
}

export default App
