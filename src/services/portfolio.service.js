import apiClient from './apiClient'

export const portfolioService = {
    async getValue () {
        const {data} = await apiClient.get(`/portfolio/value`)
        return data
    },
    async getAllocation () {
        const {data} = await apiClient.get(`/portfolio/allocation`)
        return data
    }
}