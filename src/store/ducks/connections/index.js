import {createAction, createReducer} from '@reduxjs/toolkit'

const initialState = {
  items: [],
  loading: false,
  error: false
}

export const loadingConnections = createAction('LOAD_CONNECTIONS')
export const fetchConnectionsSuccess = createAction('FETCH_CONNECTIONS_SUCCESS')
export const fetchConnectionsFail = createAction('FETCH_CONNECTIONS_FAIL')
export const connectionAdded = createAction('POLE_ADDED')
export const connectionEdited = createAction('POLE_EDITED')
export const connectionRemoved = createAction('POLE_REMOVED')

export default createReducer(initialState, {
  [loadingConnections.type]: (state) => ({...state, loading: true, error: false }),

  [fetchConnectionsSuccess.type]: (state, action) =>
    ({...state, items: action.payload, loading: false, error: false }),

  [fetchConnectionsFail.type]: (state) => ({...state, loading: false, error: true }),

  [connectionAdded.type]: (state, action) =>{
    const items = [...state.items]
    items.unshift(action.payload)
    return { ...state, items: items }
  },

  [connectionEdited.type]: (state, action) => {
    const item = action.payload.data
    const items = [...state.items]
    const index = items.findIndex(i => i.id === action.payload.id)
    items[index] = item
    return { ...state, items: items }
  },

  [connectionRemoved.type]: (state, action) => {
    const items = [...state.items]
    const index = items.findIndex(i => i.id === action.payload.id)
    items.splice(index, 1)
    return { ...state, items: items }
  }
})
