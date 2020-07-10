import api from '../../../services/api'
import {
  loadingPoles, fetchPolesSuccess, fetchPolesFail,
  poleAdded, poleEdited, poleRemoved } from './index'

export const fetchPoles = () => {
  return async dispatch => {
    try {
      dispatch(loadingPoles())
      const {data} = await api.get('/postes')
      dispatch(fetchPolesSuccess(data))
    } catch(e) {
      dispatch(fetchPolesFail(e))
    }
  }
}

export const addPole = (pole) => {
  return async dispatch => {
    try {
      const {data} = await api.post('/postes/', pole)
      dispatch(poleAdded(data))
    } catch(e) {
      console.error(e)
    }
  }
}

export const editPole = (oldId, pole) => {
  return async dispatch => {
    try {
      const {data} = await api.patch(`/postes/${oldId}/`, pole)
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
      await api.delete(`/postes/${id}/`)
      dispatch(poleRemoved(id))
    } catch(e) {
      console.error(e)
    }
  }
}