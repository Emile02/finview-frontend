import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_FINVIEW_BACKEND  || 'https://finview-backend.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default apiClient