<script setup lang="ts">
import type { SelectOption } from '@/types'

withDefaults(
  defineProps<{
    label: string
    type?: 'text' | 'number' | 'textarea' | 'select'
    placeholder?: string
    options?: SelectOption[] // used when type === 'select'
  }>(),
  {
    type: 'text',
    placeholder: '',
    options: () => [],
  },
)

const model = defineModel<string | number>({ default: '' })
</script>

<template>
  <label class="block">
    <span class="mb-1.5 block text-sm font-semibold text-amber-300">{{ label }}</span>

    <textarea
      v-if="type === 'textarea'"
      v-model="model"
      :placeholder="placeholder"
      rows="6"
      class="w-full resize-y rounded-lg border-2 border-sky-400 bg-slate-800 px-3 py-2 font-mono text-sm font-medium text-white placeholder-slate-400 outline-none transition-all focus:border-amber-300 focus:ring-4 focus:ring-amber-300/30"
    />

    <select
      v-else-if="type === 'select'"
      v-model="model"
      class="w-full rounded-lg border-2 border-sky-400 bg-slate-800 px-3 py-2 text-sm font-medium text-white outline-none transition-all focus:border-amber-300 focus:ring-4 focus:ring-amber-300/30"
    >
      <option value="" disabled>Select</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>

    <input
      v-else
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      class="w-full rounded-lg border-2 border-sky-400 bg-slate-800 px-3 py-2 text-sm font-medium text-white placeholder-slate-400 outline-none transition-all focus:border-amber-300 focus:ring-4 focus:ring-amber-300/30"
    />
  </label>
</template>
