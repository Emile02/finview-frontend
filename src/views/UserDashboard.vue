<script setup>
import { computed, onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transaction.store'
import { usePortfolioStore } from '@/stores/portfolio.store'

import TransactionTable from '@/components/business/TransactionTable.vue'
import OverviewCharts from '@/components/business/OverviewCharts.vue'

const transactionStore = useTransactionStore()
const portfolioStore = usePortfolioStore()

const transactions = computed(() => transactionStore.transactions)
const portfolio = computed(() => portfolioStore.portfolio)

onMounted(() => {
  transactionStore.fetchTransactions()
  portfolioStore.getPortfolioValue()
  portfolioStore.getPortfolioAllocation()
})
</script>

<template>
  <div class="bg-gray-50 py-24 sm:py-32">
    <div class="mx-auto w-full px-10 lg:px-20">
      <h2 class="text-base/7 font-semibold text-indigo-600">FinView</h2>
      <p class="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
        Your all in one solution for your wealth
      </p>
      <div class="mt-10 grid grid-cols-2 gap-3 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <div class="flex p-px lg:col-span-6 space-x-4">
          <div class="w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-tl-4xl">
            <TransactionTable :transactions="transactions" />
          </div>

          <div class="w-7/12 overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl">
            <span class="text-xl px-4">Overview</span>
            <OverviewCharts :portfolio="portfolio" class="place-self-start" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
