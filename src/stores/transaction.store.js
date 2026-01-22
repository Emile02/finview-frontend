import {defineStore} from 'pinia'
import {transactionsService} from '@/services/transactions.service'
import { usePortfolioStore } from '@/stores/portfolio.store'
export const useTransactionStore = defineStore('transactions', {
    state: () => ({
        /** @type {{ id: string, asset: string, operation: string, amount: number, quantity: number, unit_price: number, currency: string, date: string }[]} */
        transactions: [],
        connected: false,
        backendMessage: ''
    }),
    actions: {
        async deleteTransaction(transactionId) {
            try {
                await transactionsService.delete(transactionId)
                const index = this.transactions.findIndex(t => t.id === transactionId)
                if (index !== -1) this.transactions.splice(index, 1)
                await this.reloadPortfolio()
                await this.fetchTransactions()
            } catch (err) {
                console.error('Erreur suppression:', err)
            }
        },
        async getById(id) {
            return await transactionsService.getById(id)
        },
        async reloadPortfolio() {
            const portfolioStore = usePortfolioStore()
            await portfolioStore.getPortfolioValue()
            await portfolioStore.getPortfolioAllocation()
        },
        async fetchTransactions() {
            const res = await transactionsService.getAll()

            if (Array.isArray(res)) {
                this.transactions = res
            } else if (Array.isArray(res?.data)) {
                this.transactions = res.data
            } else {
                this.transactions = []
            }
        },
        async checkConnection() {
            try {
                const res = await transactionsService.connection()
                console.log('Connection response:', res)
                this.connected = true
                this.backendMessage = res.message || ''
            } catch (error) {
                console.error('Erreur de connexion au backend', error)
                this.connected = false
                this.backendMessage = 'Erreur de connexion'
            }
        },
        async createTransaction(formValues) {
            const {data} = await transactionsService.create(formValues)
            if (!Array.isArray(this.transactions)) {
                this.transactions = []
            }
            if (data) {
                this.transactions.push(data)
                await this.reloadPortfolio()
            }
        },
        async edit(id, formValues) {
            const {data} = await transactionsService.edit(id, formValues)
            const index = this.transactions.findIndex(t => t.id === id)
            if (index !== -1) {
                this.transactions[index] = data
                this.reloadPortfolio()
            }
        }
    },

    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                paths: ['transactions']
            }
        ]
    }

})