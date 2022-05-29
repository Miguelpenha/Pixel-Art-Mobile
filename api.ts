import axios from 'axios'

const api = axios.create({
    baseURL: 'https://pixel-arte.vercel.app/api'
})

export default api