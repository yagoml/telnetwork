import {request} from '../../../services/api'
import {
  loadingConnections, fetchConnectionsSuccess, fetchConnectionsFail,
  connectionAdded, connectionEdited, connectionRemoved } from './index'

export const fetchConnections = () => {
  return async dispatch => {
    try {
      dispatch(loadingConnections())
      const data = await request({type:'get', path: '/ligacoes'})
      dispatch(fetchConnectionsSuccess(data))
    } catch(e) {
      dispatch(fetchConnectionsFail(e))
    }
  }
}

export const addConnection = (connection) => {
  return async dispatch => {
    const data = await request({type:'post', path: '/ligacoes/', requestData: connection})
    dispatch(connectionAdded(data))
  }
}

export const editConnection = (oldId, connection) => {
  return async dispatch => {
    const data = await request({type: 'patch', path: `/ligacoes/${oldId}/`, requestData: connection})
    dispatch(connectionEdited({
      id: oldId,
      data
    }))
  }
}

export const deleteConnection = (id) => {
  return async dispatch => {
    await request({type: 'delete', path: `/ligacoes/${id}/`})
    dispatch(connectionRemoved(id))
  }
}