import axios from 'axios'

const $api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',

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
