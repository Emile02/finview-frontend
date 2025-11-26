<!--<script setup>
import {computed, onMounted} from 'vue'
import { useTransactionStore } from '@/stores/transaction.store'
import { usePortfolioStore } from '@/stores/portfolio.store'

import TransactionTable from '@/components/business/TransactionTable.vue'
import UserDashboard from "@/views/UserDashboard.vue"

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
  <UserDashboard :transactions="transactions"/>
&lt;!&ndash;  <div class="p-4">
    <TransactionTable :transactions="transactions" />
  </div>
  Total = {{ portfolio.value }}&ndash;&gt;

</template>-->

<template>
  <router-view />
</template>

<script setup>
</script>

<style>
/* global styles if needed */
</style>

