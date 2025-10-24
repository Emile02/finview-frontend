import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_FINVIEW_BACKEND || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default apiClient