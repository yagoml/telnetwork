import {request} from '../../../services/api'
import { fetchRouteSuccess, loadingRoute, fetchRouteFail } from './index'

export const fetchRoute = ({source, destination}) => {
  return async dispatch => {
    try {
      dispatch(loadingRoute())
      const data = await request({type: 'get', path: `/conectividade/${source}/${destination}`})
      dispatch(fetchRouteSuccess(data.caminho))
    } catch(e) {
      dispatch(fetchRouteFail(e))
    }
  }
}