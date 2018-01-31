import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://192.168.241.128:8082/`
  })
}
