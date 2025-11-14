import {defineStore} from 'pinia'
import {portfolioService} from '@/services/portfolio.service'

export const usePortfolioStore = defineStore('portfolio', {
    state: () => ({
        /** @type {{ value: string, allocation: [asset: string, value: number, percent: number] }} */
        portfolio: {}
    }),
    actions: {
        async getPortfolioValue() {
            const data = await portfolioService.getValue()
            this.portfolio.value = data.value
        },
        async getPortfolioAllocation() {
            const data = await portfolioService.getAllocation()
            console.log('data', data)
            this.portfolio.allocation = data.allocation
            this.portfolio.total_value = data.total_value
        }
    }
})