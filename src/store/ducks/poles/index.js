import {createAction, createReducer} from '@reduxjs/toolkit'

const initialState = {
  items: [],
  loading: false,
  error: false
}

export const loadingPoles = createAction('LOAD_POLES')
export const fetchPolesSuccess = createAction('FETCH_POLES_SUCCESS')
export const fetchPolesFail = createAction('FETCH_POLES_FAIL')
export const poleAdded = createAction('POLE_ADDED')
export const poleEdited = createAction('POLE_EDITED')
export const poleRemoved = createAction('POLE_REMOVED')

export default createReducer(initialState, {
  [loadingPoles.type]: (state) => ({...state, loading: true, error: false }),

  [fetchPolesSuccess.type]: (state, action) =>
    ({...state, items: action.payload, loading: false, error: false }),

  [fetchPolesFail.type]: (state) => ({...state, loading: false, error: true }),

  [poleAdded.type]: (state, action) =>{
    const items = [...state.items]
    items.unshift(action.payload)
    return { ...state, items: items }
  },

  [poleEdited.type]: (state, action) => {
    const item = action.payload.data
    const items = [...state.items]
    const index = items.findIndex(i => i.id === action.payload.id)
    items[index] = item
    return { ...state, items: items }
  },

  [poleRemoved.type]: (state, action) => {
    const items = [...state.items]
    const index = items.findIndex(i => i.id === action.payload)
    items.splice(index, 1)
    return { ...state, items: items }
  }
})
