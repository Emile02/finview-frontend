import apiClient from './apiClient'

export const transactionsService = {
    async getAll() {
        const { data } = await apiClient.get('/transactions')
        return data
    },

    async getById(id) {
        const { data } = await apiClient.get('/transactions/' + id)
        return data
    }
}