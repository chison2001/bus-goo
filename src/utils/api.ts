import axios from 'axios'

const $api = axios.create({
  baseURL: 'http://47.129.32.63:5000' || '/api',

})

$api.interceptors.request.use(
  async config => {
    const accessToken = useCookie('accessToken').value
    if (accessToken)
      config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
)

export default $api
