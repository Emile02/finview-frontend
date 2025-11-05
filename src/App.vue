<script setup>
import { onMounted } from 'vue'
import { transactionStore } from '@/stores/transaction.store'

const store = transactionStore()

onMounted(() => {
  store.checkConnection()
  store.createTransaction()
})
</script>

<template>
  <div class="p-4">
    <h1>Statut de la connexion</h1>

    <p>
      Connecté :
      <strong :style="{ color: store.connected ? 'green' : 'red' }">
        {{ store.connected ? '✅ Oui' : '❌ Non' }}
      </strong>
    </p>

    <p v-if="store.backendMessage">
      Message du backend : <code>{{ store.backendMessage }}</code>
    </p>
  </div>
</template>
