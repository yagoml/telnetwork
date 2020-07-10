import axios from 'axios'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk0NDkwNzI3LCJqdGkiOiJhYTE3NDUyMzE3Zjk0NGM1YjljNTA5ZjczYjJhZWZiZiIsInVzZXJfaWQiOjF9.a6ngMbcc3VHuS-aC7mqzz7R3ksx5bReBOk6MV96udjk'

export default axios.create({
  baseURL: 'http://volare-teste-front.herokuapp.com/api',
  headers: {
    Authorization: `Bearer ${token}`
  }
})