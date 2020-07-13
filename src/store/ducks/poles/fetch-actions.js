import {request} from '../../../services/api'
import {
  loadingPoles, fetchPolesSuccess, fetchPolesFail,
  poleAdded, poleEdited, poleRemoved } from './index'

export const fetchPoles = () => {
  return async dispatch => {
    try {
      dispatch(loadingPoles())
      const data = await request({type: 'get', path: '/postes'})
      dispatch(fetchPolesSuccess(data))
    } catch(e) {
      dispatch(fetchPolesFail(e))
    }
  }
}

export const addPole = (pole) => {
  return async dispatch => {
    try {
      const data = await request({type: 'post', path: '/postes/', requestData: pole})
      dispatch(poleAdded(data))
    } catch(e) {
      console.error(e)
    }
  }
}

export const editPole = (oldId, pole) => {
  return async dispatch => {
    try {
      const data = await request({type: 'patch', path: `/postes/${oldId}/`, requestData: pole})
      dispatch(poleEdited({
        id: oldId,
        data
      }))
    } catch(e) {
      console.error(e)
    }
  }
}

export const deletePole = (id) => {
  return async dispatch => {
    try {
      await request({type: 'delete', path: `/postes/${id}/`})
      dispatch(poleRemoved(id))
    } catch(e) {
      console.error(e)
    }
  }
}