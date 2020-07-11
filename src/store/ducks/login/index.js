import {createAction, createReducer} from '@reduxjs/toolkit'

const initialState = {
  success: false,
  loading: false,
  error: false,
  tokens: {
    access: null,
    refresh: null
  }
}

export const loadingLogin = createAction('LOAD_LOGIN')
export const fetchLoginSuccess = createAction('FETCH_LOGIN_SUCCESS')
export const fetchLoginFail = createAction('FETCH_LOGIN_FAIL')

export default createReducer(initialState, {
  [loadingLogin.type]: (state) => ({...state, loading: true, error: false }),

  [fetchLoginSuccess.type]: (state, action) => {
    return ({...state, tokens: action.payload, success: true, loading: false, error: false })
  },
    
  [fetchLoginFail.type]: (state) => ({...state, loading: false, success: false, error: true })
})