<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold text-gray-900">Transactions</h1>
        <p class="mt-2 text-sm text-gray-700">
          Liste des transactions (crypto, actions, immobilier)
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
            type="button"
            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
    </div>

    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="relative min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th
                  scope="col"
                  class="px-2 py-3.5 text-left text-sm font-semibold whitespace-nowrap text-gray-900"
              >
                Asset
              </th>
              <th
                  scope="col"
                  class="px-2 py-3.5 text-left text-sm font-semibold whitespace-nowrap text-gray-900"
              >
                Operation
              </th>
              <th
                  scope="col"
                  class="px-2 py-3.5 text-left text-sm font-semibold whitespace-nowrap text-gray-900"
              >
                Amount
              </th>
              <th
                  scope="col"
                  class="px-2 py-3.5 text-left text-sm font-semibold whitespace-nowrap text-gray-900"
              >
                Quantity
              </th>
              <th
                  scope="col"
                  class="px-2 py-3.5 text-left text-sm font-semibold whitespace-nowrap text-gray-900"
              >
                Unit Price
              </th>
              <th
                  scope="col"
                  class="px-2 py-3.5 text-left text-sm font-semibold whitespace-nowrap text-gray-900"
              >
                Currency
              </th>
              <th
                  scope="col"
                  class="px-2 py-3.5 text-left text-sm font-semibold whitespace-nowrap text-gray-900"
              >
                Date
              </th>
              <th
                  scope="col"
                  class="px-2 py-3.5 text-left text-sm font-semibold whitespace-nowrap text-gray-900"
              >
                Comment
              </th>
              <th
                  scope="col"
                  class="py-3.5 pr-4 pl-3 whitespace-nowrap sm:pr-0"
              >
                <span class="sr-only">Edit</span>
              </th>
            </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 bg-white">
            <tr
                v-if="transactions.length === 0"
                class="hover:bg-gray-50"
            >
              <td
                  colspan="9"
                  class="py-8 text-center text-sm text-gray-500 italic"
              >
                No transactions
              </td>
            </tr>
            <tr
                v-for="(transaction) in transactions"
                :key="transaction.id"
                v-else
                class="hover:bg-gray-50"
            >
              <td
                  class="px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-900"
              >
                {{ transaction.asset }}
              </td>
              <td
                  class="px-2 py-2 text-sm whitespace-nowrap text-gray-500 capitalize"
              >
                {{ transaction.operation }}
              </td>
              <td class="px-2 py-2 text-sm whitespace-nowrap text-gray-500">
                {{ formatCurrency(transaction.amount, transaction.currency) }}
              </td>
              <td class="px-2 py-2 text-sm whitespace-nowrap text-gray-500">
                {{ transaction.quantity }}
              </td>
              <td class="px-2 py-2 text-sm whitespace-nowrap text-gray-500">
                {{ formatCurrency(transaction.unit_price, transaction.currency) }}
              </td>
              <td class="px-2 py-2 text-sm whitespace-nowrap text-gray-500">
                {{ transaction.currency }}
              </td>
              <td class="px-2 py-2 text-sm whitespace-nowrap text-gray-500">
                {{ formatDate(transaction.date) }}
              </td>
              <td class="px-2 py-2 text-sm whitespace-nowrap text-gray-500">
                {{ transaction.comment }}
              </td>
              <td
                  class="py-2 pr-4 pl-3 space-x-2 text-right text-sm font-medium whitespace-nowrap sm:pr-0"
              >
                <a
                    href="#"
                    class="text-indigo-600 hover:text-indigo-900"
                >Edit<span class="sr-only">, {{ transaction.asset }}</span></a>
                <a
                    @click="deleteTransaction(transaction.id)"
                    href="#"
                    class="text-red-600 hover:text-red-900"
                >Delete<span class="sr-only">, {{ transaction.asset }}</span></a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transaction.store'
const store = useTransactionStore()
defineProps({
  transactions: {
    type: Array,
    required: true
  }
})

function formatCurrency(value, currency = "EUR") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(value);
}

function deleteTransaction(transactionId) {
  store.deleteTransaction(transactionId)
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

</script>
