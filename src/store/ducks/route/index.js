import {createAction, createReducer} from '@reduxjs/toolkit'

const initialState = {
  path: '',
  loading: false,
  error: false
}

export const loadingRoute = createAction('LOADING_ROUTE')
export const fetchRouteSuccess = createAction('FETCH_ROUTE_SUCCESS')
export const fetchRouteFail = createAction('FETCH_ROUTE_FAIL')

export default createReducer(initialState, {
  [loadingRoute.type]: (state) => ({...state, loading: true }),
  [fetchRouteSuccess.type]: (state, action) =>
    ({...state, path: action.payload, loading: false, error: false }),
  [fetchRouteFail.type]: (state) => ({...state, loading: false, error: true }),
})
