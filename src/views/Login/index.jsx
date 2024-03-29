import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import './style.scss'
import { useHistory } from 'react-router-dom'
import { request } from '../../services/api'
import { fetchLoginSuccess, fetchLoginFail } from '../../store/ducks/login'
import { useDispatch } from 'react-redux'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  const tryLogin = async e => {
    e.preventDefault()
    setLoading(true)
    const data = await request({
      type: 'post',
      path: '/token/',
      requestData: form
    })
    if (data && data.access) {
      localStorage.setItem('telnetwork_tokens', JSON.stringify(data))
      localStorage.setItem('telnetwork_username', form.username)
      dispatch(fetchLoginSuccess(data))
      setLoading(false)
      history.push('/')
    } else {
      dispatch(fetchLoginFail())
      setLoading(false)
      window.alert('Credenciais inválidas')
    }
  }

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
                {!loading ? <span>Entrar</span> : <span>Verificando...</span>}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
