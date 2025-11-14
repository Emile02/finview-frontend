<template>
  <BaseModal :show="show" @close="close">
    <template #title>Nouvelle transaction</template>

    <form @submit.prevent="submit" class="flex flex-col gap-3">
      <div>
        <label class="block text-sm font-medium">Asset</label>
        <input
            v-model="form.asset"
            type="text"
            class="w-full border rounded-md p-2"
            placeholder="Ex: AAPL, BTC..."
            required
        />
      </div>

      <div>
        <label class="block text-sm font-medium">Operation</label>
        <select v-model="form.operation" class="w-full border rounded-md p-2" required>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>

      <div class="flex gap-2">
        <div class="flex-1">
          <label class="block text-sm font-medium">Amount</label>
          <input v-model.number="form.amount" type="number" min="0" class="w-full border rounded-md p-2" />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium">Quantity</label>
          <input v-model.number="form.quantity" type="number" min="0" class="w-full border rounded-md p-2" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium">Unit Price</label>
        <input v-model.number="form.unit_price" type="number" min="0" class="w-full border rounded-md p-2" />
      </div>

      <div>
        <label class="block text-sm font-medium">Currency</label>
        <input v-model="form.currency" type="text" class="w-full border rounded-md p-2" placeholder="Ex: USD" />
      </div>

      <div>
        <label class="block text-sm font-medium">Date</label>
        <input v-model="form.date" type="datetime-local" class="w-full border rounded-md p-2" />
      </div>

      <div>
        <label class="block text-sm font-medium">Commentaire</label>
        <textarea v-model="form.comment" class="w-full border rounded-md p-2" placeholder="Notes..."></textarea>
      </div>
    </form>

    <template #footer>
      <button
          class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          @click="close"
          type="button"
      >
        Cancel
      </button>

      <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          @click="submit"
          type="button"
      >
        {{transactionId ? 'Update' : 'Create'}}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import {ref, watch} from 'vue'
import BaseModal from '@/components/ui/modal/BaseModal.vue'
import { transactionsService } from '@/services/transactions.service'

import { useTransactionStore } from '@/stores/transaction.store.js'
const store = useTransactionStore()

const props = defineProps({
  show: Boolean,
  transactionId: {
    type: String,
    default: null,
  },
})
const emits = defineEmits(['close', 'created'])

const emptyForm = () => ({
  asset: '',
  operation: 'buy',
  amount: 0,
  quantity: 0,
  unit_price: 0,
  currency: 'USD',
  date: new Date().toISOString().slice(0, 16),
  comment: '',
})

const form = ref(emptyForm())

watch(
    () => props.transactionId,
    async (id) => {
      if (!id) {
        form.value = emptyForm()
        return
      }

      const transaction = await store.getById(id)

      if (transaction) {
        form.value = {
          asset: transaction.asset,
          operation: transaction.operation,
          amount: transaction.amount,
          quantity: transaction.quantity,
          unit_price: transaction.unit_price,
          currency: transaction.currency,
          date: transaction.date?.slice(0, 16),
          comment: transaction.comment,
        }
      }
    },
    { immediate: true }
)

function close() {
  emits('close')
}

async function submit() {
  try {
    let res
    if (!props.transactionId) {
      res = await transactionsService.create(form.value)
    } else {
      res = await transactionsService.edit(props.transactionId, form.value)
    }
    emits(props.transactionId ? 'updated' : 'created', res)

    close()
  } catch (err) {
    console.error('Erreur création transaction', err)
    alert('Erreur lors de la création de la transaction.')
  }
}
</script>
