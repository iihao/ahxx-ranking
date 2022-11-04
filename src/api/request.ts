import axios from 'axios'
const server = axios.create({
  baseURL: 'http://jisuye.com/ahxx/',
  timeout: 5000,
})

export const getInfo = () => {
  return server({
    url: '/list',
    method: 'get',
  })
}
