import { configureStore } from '@reduxjs/toolkit'
import polesReducer from './ducks/poles'

export default configureStore({
  reducer: {
    poles: polesReducer
  }
})