import apiClient from './apiClient'

export const transactionsService = {
    async connection() {
        const {data} = await apiClient.get('/')
        return data
    },

    async create(data) {
        await apiClient.post('/transactions', data)
    },

    async edit(id, data) {
        await apiClient.put('/transactions/' + id, data)
    },

    async delete(id) {
        await apiClient.delete('/transactions/' + id)
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