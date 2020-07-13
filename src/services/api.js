import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://volare-teste-front.herokuapp.com/api'
})

export const tokenAuth = () => {
  const storedTokens = JSON.parse(localStorage.getItem('telnetwork_tokens'))
  return storedTokens.access || null
}

export const request = async ({type, requestData, headers = {}, path}) => {
  const accessToken = tokenAuth()
  const config = { 'Content-Type': 'application/json' }
  let requestHeaders = {...config, ...headers}
  if (accessToken) requestHeaders.Authorization = `Bearer ${accessToken}`
  try {
    let response
    if (requestData) {
      const { data } = await axiosInstance[type](path, requestData, {
        headers: requestHeaders
      })
      response = data
    } else {
      const { data } = await axiosInstance[type](path, {
        headers: requestHeaders
      })
      response = data
    }
    return response
  } catch(e) {
    if (e.response.status === 401) {
      if (path === '/token/') return e
      const response = await refreshToken()
      if (!response.token) return window.location.pathname = '/login'
      else {
        const storedTokens = JSON.parse(localStorage.getItem('telnetwork_tokens'))
        storedTokens.access = response.token
        localStorage.setItem('telnetwork_tokens', JSON.stringify(storedTokens))
        request({type, requestData, headers, path})
      }
    }
    return e
  }
}

const refreshToken = async () => {
  const storedTokens = JSON.parse(localStorage.getItem('telnetwork_tokens'))
  const refreshToken = storedTokens.refresh
  try {
    const data = await request({
      type: 'post',
      path: '/token/refresh/',
      requestData: {
        refresh: refreshToken
      }
    })
    return { token: data.access}
  } catch(e) {
    return e
  }
}

export default axiosInstance