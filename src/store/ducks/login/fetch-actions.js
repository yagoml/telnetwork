import api from '../../../services/api'
import { loadingLogin, fetchLoginSuccess, fetchLoginFail } from './index'

export const fetchLogin = (credentials) => {
  return async dispatch => {
    try {
      dispatch(loadingLogin())
      const {data} = await api.post('/token/', credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch(fetchLoginSuccess(data))
    } catch(e) {
      dispatch(fetchLoginFail(e))
    }
  }
}