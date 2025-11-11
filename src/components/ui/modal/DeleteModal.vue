<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
    <!-- overlay -->
    <div class="absolute inset-0 bg-black opacity-50" @click="close"></div>

    <!-- modal content -->
    <div class="relative bg-white rounded-2xl shadow-lg p-6 w-[400px] z-10">
      <header class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">
          <slot name="title" />
        </h2>
        <button @click="close" class="text-gray-500 hover:text-gray-800">✕</button>
      </header>

      <section>
        <slot />
      </section>

      <footer class="mt-6 flex justify-end gap-2">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
})
const emits = defineEmits(['close'])

function close() {
  emits('close')
}
</script>
