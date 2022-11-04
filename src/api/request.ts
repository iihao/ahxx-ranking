import axios from 'axios'
const server = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

export const getInfo = () => {
  return server({
    url: '/list',
    method: 'get',
  })
}
