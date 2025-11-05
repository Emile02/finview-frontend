import apiClient from './apiClient'

export const transactionsService = {
    async connection() {
        const {data} = await apiClient.get('/')
        return data
    },

    async create() {
        const data = {
            "asset": "BTC",
            "operation": "buy",
            "amount": 500,
            "quantity": 0.01,
            "unit_price": 50000,
            "currency": "EUR",
            "date": "2025-10-24T12:00:00",
            "comment": "Test transaction"
        }
        await apiClient.post('/transactions', data)
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