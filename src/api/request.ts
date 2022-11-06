import axios from 'axios'
const server = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

export const getInfo = () => {
  return server({
    url: '/list',
    method: 'get',
  })
}
