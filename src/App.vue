<script setup>
import {computed, onMounted} from 'vue'
import { useTransactionStore } from '@/stores/transaction.store'
import { usePortfolioStore } from '@/stores/portfolio.store'

import TransactionTable from '@/components/business/TransactionTable.vue'

const transactionStore = useTransactionStore()
const portfolioStore = usePortfolioStore()
const transactions = computed(() => {
  return transactionStore.transactions
})

const portfolio = computed(() => {
  return portfolioStore.portfolio
})

onMounted(() => {
  transactionStore.fetchTransactions()
  portfolioStore.getPortfolioValue()
  portfolioStore.getPortfolioAllocation()
})
</script>

<template>
  <div class="p-4">
    <TransactionTable :transactions="transactions" />
  </div>
  Total = {{ portfolio.value }}

</template>
