<script setup>
import {computed, onMounted} from 'vue'
import { useTransactionStore } from '@/stores/transaction.store'
import TransactionTable from '@/components/ui/TransactionTable.vue'

const store = useTransactionStore()

const transactions = computed(() => {
  return store.transactions
})

onMounted(() => {
  store.fetchTransactions()
})
</script>

<template>
  <div class="p-4">
    <TransactionTable :transactions="transactions" />
  </div>
</template>
