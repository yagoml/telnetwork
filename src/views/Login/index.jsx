import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import './style.scss'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLogin } from './../../store/ducks/login/fetch-actions'
import { useHistory } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const loading = useSelector(state => state.login.loading)
  const tokens = useSelector(state => state.login.tokens)
  const dispatch = useDispatch()
  const history = useHistory()

  const tryLogin = e => {
    e.preventDefault()
    dispatch(fetchLogin(form))
  }

  useEffect(() => {
    if (!tokens.access) return
    localStorage.setItem('telnetwork_tokens', JSON.stringify(tokens))
    history.push('/')
  }, [tokens, history])

  return (
    <div className="login">
      <div className="d-flex justify-content-center ">
        <div className="login__container">
          <Form onSubmit={tryLogin}>
            <Form.Group>
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="text"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </Form.Group>
            <div className="mt-3 text-center">
              <Button variant="primary" type="submit" disabled={loading}>
                Entrar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
