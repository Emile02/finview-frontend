import apiClient from './apiClient'

export const assetsService = {
    async getAll () {
        const {data} = await apiClient.get(`/assets`)
        return data
    },
}