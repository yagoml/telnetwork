import api, {tokenAuth} from '../../../services/api'
import { fetchRouteSuccess, loadingRoute, fetchRouteFail } from './index'

export const fetchRoute = ({source, destination}) => {
  return async dispatch => {
    try {
      dispatch(loadingRoute())
      const {data} = await api.get(`/conectividade/${source}/${destination}`, {
        headers: tokenAuth()
      })
      dispatch(fetchRouteSuccess(data.caminho))
    } catch(e) {
      dispatch(fetchRouteFail(e))
    }
  }
}