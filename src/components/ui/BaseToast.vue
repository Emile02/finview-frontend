<script setup>
import { computed } from "vue";

const props = defineProps({
  id: { type: String, default: null },
  message: { type: String, default: null },
  title: { type: String, default: null },
  description: { type: String, default: null },
  variant: {
    type: String,
    default: "default",
    validator: val => ["default", "simple", "alert"].includes(val),
  },
  type: {
    type: String,
    default: "default",
    validator: val => ["default", "success", "danger", "warning"].includes(val),
  },
  actions: { type: Array, default: () => [] },
  closable: { type: Boolean, default: true },
  icon: { type: String, default: null },
});

/* -----------------------------------------------
   Styles dynamiques compatibles Tailwind 4
------------------------------------------------- */
const wrapperClasses = computed(() => {
  if (props.variant === "alert") {
    const variants = {
      danger:
          "w-full max-w-sm p-4 mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg",
      warning:
          "w-full max-w-sm p-4 mb-4 text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-lg",
    };
    return variants[props.type];
  }

  // Toast normal
  return "flex items-center w-full max-w-sm p-4 text-gray-700 bg-gray-50 rounded-lg shadow border border-gray-200";
});

/* Buttons : versions Tailwind v4 */
const primaryActionClass = {
  danger:
      "inline-flex items-center text-white bg-red-600 hover:bg-red-700 border border-transparent font-medium rounded-md text-xs px-3 py-1.5 shadow-sm",
  warning:
      "inline-flex items-center text-white bg-yellow-600 hover:bg-yellow-700 border border-transparent font-medium rounded-md text-xs px-3 py-1.5 shadow-sm",
};

const secondaryActionClass = {
  danger:
      "inline-flex items-center text-red-700 border border-red-300 hover:bg-red-600 hover:text-white hover:border-red-600 font-medium rounded-md text-xs px-3 py-1.5 shadow-sm",
  warning:
      "inline-flex items-center text-yellow-700 border border-yellow-300 hover:bg-yellow-600 hover:text-white hover:border-yellow-600 font-medium rounded-md text-xs px-3 py-1.5 shadow-sm",
};

/* Icons (inchangés) */
const defaultIcons = {
  default: `<svg class="w-6 h-6 text-blue-600" ...></svg>`,
  success: `<svg class="w-5 h-5 text-green-600" ...></svg>`,
  danger: `<svg class="w-5 h-5 text-red-600" ...></svg>`,
  warning: `<svg class="w-5 h-5 text-yellow-600" ...></svg>`,
  simple: `<svg class="w-5 h-5 text-blue-600" ...></svg>`,
  alertWarning: `<svg class="w-4 h-4 shrink-0 me-2 text-yellow-600" ...></svg>`,
};

const closeIcon = `
  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
  </svg>`;
</script>

<template>
  <div :id="id" :class="wrapperClasses" role="alert">

    <!-- ALERT -->
    <template v-if="variant === 'alert'">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <span
              v-if="type === 'warning'"
              v-html="defaultIcons.alertWarning"
              class="inline-flex items-center justify-center w-7 h-7 rounded-full"
          ></span>
          <h3 class="font-semibold ml-3">{{ title }}</h3>
        </div>

        <button
            v-if="closable"
            type="button"
            @click="$emit('close')"
            class="ml-auto bg-transparent text-gray-600 rounded p-1.5 h-8 w-8 flex items-center justify-center hover:bg-gray-200"
        >
          <span v-html="closeIcon" />
        </button>
      </div>

      <div class="mt-2 mb-4">
        <span v-html="description" />
      </div>

      <div class="flex items-center gap-3">
        <template v-for="(a, i) in actions" :key="i">
          <button
              @click="a.onClick && a.onClick()"
              :class="a.primary ? primaryActionClass[type] : secondaryActionClass[type]"
              type="button"
          >
            {{ a.label }}
          </button>
        </template>
      </div>
    </template>

    <!-- NORMAL / SIMPLE -->
    <template v-else>
      <span
          v-if="variant !== 'simple'"
          :class="type !== 'default' ? 'inline-flex items-center justify-center w-7 h-7 rounded-full' : ''"
          v-html="icon || defaultIcons[type]"
      />

      <div class="ml-3 text-sm border-l border-gray-300 pl-3.5">
        {{ message }}
      </div>

      <div v-if="actions.length" class="flex items-center ml-auto gap-2">
        <template v-for="(a, i) in actions" :key="i">
          <button
              class="text-sm font-medium text-blue-600 hover:underline"
              @click="a.onClick && a.onClick()"
          >
            {{ a.label }}
          </button>
        </template>
      </div>

      <button
          v-if="closable"
          type="button"
          @click="$emit('close')"
          class="ml-auto flex items-center justify-center text-gray-600 text-sm h-8 w-8 rounded hover:bg-gray-200"
      >
        <span class="sr-only">Close</span>
        <span v-html="closeIcon" />
      </button>
    </template>

  </div>
</template>
