<template>
  <div
      v-if="show"
      class="fixed inset-0 flex items-center justify-center z-50"
  >
    <!-- Overlay léger et transparent -->
    <div
        class="absolute inset-0 bg-gray-800/20 backdrop-blur-[1px]"
        @click="close"
    ></div>

    <!-- Contenu de la modale -->
    <div
        class="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md z-10 border border-gray-200"
    >
      <!-- Header -->
      <header class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-800">
          <slot name="title" />
        </h2>
        <button
            @click="close"
            class="text-gray-400 hover:text-gray-700 text-xl leading-none font-bold"
        >
          ×
        </button>
      </header>

      <!-- Contenu -->
      <section>
        <slot />
      </section>

      <!-- Footer -->
      <footer
          v-if="$slots.footer"
          class="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-3"
      >
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
})
const emit = defineEmits(['close'])
function close() {
  emit('close')
}
</script>
