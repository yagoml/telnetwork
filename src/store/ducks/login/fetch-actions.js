import {request} from '../../../services/api'
import { loadingLogin, fetchLoginSuccess, fetchLoginFail } from './index'

export const fetchLogin = (credentials) => {
  return async dispatch => {
    try {
      dispatch(loadingLogin())
      const data = await request({type: 'post', path: '/token/', requestData: credentials})
      dispatch(fetchLoginSuccess(data))
    } catch(e) {
      dispatch(fetchLoginFail(e))
    }
  }
}