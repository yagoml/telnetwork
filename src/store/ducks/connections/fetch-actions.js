import api, {tokenAuth} from '../../../services/api'
import {
  loadingConnections, fetchConnectionsSuccess, fetchConnectionsFail,
  connectionAdded, connectionEdited, connectionRemoved } from './index'

export const fetchConnections = () => {
  return async dispatch => {
    try {
      dispatch(loadingConnections())
      const {data} = await api.get('/ligacoes', {
        headers: tokenAuth()
      })
      dispatch(fetchConnectionsSuccess(data))
    } catch(e) {
      dispatch(fetchConnectionsFail(e))
    }
  }
}

export const addConnection = (connection) => {
  return async dispatch => {
    try {
      const {data} = await api.post('/ligacoes/', connection, {
        headers: tokenAuth()
      })
      dispatch(connectionAdded(data))
    } catch(e) {
      console.error(e)
    }
  }
}

export const editConnection = (oldId, connection) => {
  return async dispatch => {
    try {
      const {data} = await api.patch(`/ligacoes/${oldId}/`, connection, {
        headers: tokenAuth()
      })
      dispatch(connectionEdited({
        id: oldId,
        data
      }))
    } catch(e) {
      console.error(e)
    }
  }
}

export const deleteConnection = (id) => {
  return async dispatch => {
    try {
      await api.delete(`/ligacoes/${id}/`, {
        headers: tokenAuth()
      })
      dispatch(connectionRemoved(id))
    } catch(e) {
      console.error(e)
    }
  }
}