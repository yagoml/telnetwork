import {createAction, createReducer} from '@reduxjs/toolkit'

const initialState = []

export const setPoles = createAction('SET_POLES')

export default createReducer(initialState, {
  [setPoles.type]: (state, action) => [...action.payload]
})
