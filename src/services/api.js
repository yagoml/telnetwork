import axios from 'axios'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk0NDA0MDcwLCJqdGkiOiI3ODA0YmU2Y2VhNjM0MjY4YTY5NGRmMGQ5YTFmZTgyYiIsInVzZXJfaWQiOjF9.YQMeh5dKf9zNRKSMfBWXhoNKMWIKgJzmL8ImZa19NOs'

const proxy = 'https://cors-anywhere.herokuapp.com/'
const url = 'http://volare-teste-front.herokuapp.com/api'

export default axios.create({
  baseURL: proxy + url,
  headers: {
    Authorization: `Bearer ${token}`
  }
})