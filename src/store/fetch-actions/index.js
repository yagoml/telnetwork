import api from '../../services/api'
import { setPoles } from '../ducks/poles'

export const fetchPoles = () => {
  return async dispatch => {
    const {data} = await api.get('/postes')
    dispatch(setPoles(data))
  }
}