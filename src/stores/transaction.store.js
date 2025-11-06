import {defineStore} from 'pinia'
import {transactionsService} from '@/services/transactions.service'

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
            } catch (err) {
                console.error('Erreur suppression:', err)
            }
        },
        async fetchTransactions() {
            this.transactions = await transactionsService.getAll()
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
        async createTransaction() {
            try {
                const res = await transactionsService.create()
                console.log('Connection response:', res)

            } catch (error) {
                console.error('Erreur de création au backend', error)
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