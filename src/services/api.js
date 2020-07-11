import axios from 'axios'

export const tokenAuth = () => {
  const storedTokens = JSON.parse(localStorage.getItem('telnetwork_tokens'))
  const accessToken = storedTokens.access
  if (!accessToken) return null
  return {
    Authorization: `Bearer ${accessToken}`
  }
}

export default axios.create({
  baseURL: 'http://volare-teste-front.herokuapp.com/api'
})