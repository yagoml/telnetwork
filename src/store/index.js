import { configureStore } from '@reduxjs/toolkit'
import polesReducer from './ducks/poles'
import connectionsReducer from './ducks/connections'

export default configureStore({
  reducer: {
    poles: polesReducer,
    connections: connectionsReducer
  }
})