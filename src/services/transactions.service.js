import apiClient from './apiClient'

export const transactionsService = {
    async connection() {
        const {data} = await apiClient.get('/')
        return data
    },

    async getAll() {
        const { data } = await apiClient.get('/transactions')
        return data
    },

    async getById(id) {
        const { data } = await apiClient.get('/transactions/' + id)
        return data
    }
}