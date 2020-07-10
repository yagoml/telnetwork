import { configureStore } from '@reduxjs/toolkit'
import polesReducer from './ducks/poles'
import connectionsReducer from './ducks/connections'
import routeReducer from './ducks/route'

export default configureStore({
  reducer: {
    poles: polesReducer,
    connections: connectionsReducer,
    route: routeReducer
  }
})