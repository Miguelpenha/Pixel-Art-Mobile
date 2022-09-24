import axios from 'axios'

const base = axios.create({
    baseURL: 'https://pixel-arte.vercel.app/api'
})

export default base