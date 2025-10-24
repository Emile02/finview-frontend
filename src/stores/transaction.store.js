import { defineStore } from 'pinia'
import { transactionsService } from '@/services/transactions.service'

export const transactionStore = defineStore('transactions', {
    state: () => ({
        /** @type {{ id: string, asset: string, operation: string, amount: number, quantity: number, unit_price: number, currency: string, date: string }[]} */
        transactions: [],
    }),
    actions: {
        async fetchTransactions() {
            this.transactions = await transactionsService.getAll()
        },
    },
})