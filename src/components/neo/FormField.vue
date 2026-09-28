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
    <span class="mb-1.5 block text-sm text-zinc-400">{{ label }}</span>

    <textarea
      v-if="type === 'textarea'"
      v-model="model"
      :placeholder="placeholder"
      rows="6"
      class="w-full resize-y rounded-md border border-ink-600 bg-transparent px-3 py-2 font-mono text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-accent-500"
    />

    <select
      v-else-if="type === 'select'"
      v-model="model"
      class="w-full rounded-md border border-ink-600 bg-ink-900 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-accent-500"
    >
      <option value="" disabled>Select</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>

    <input
      v-else
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      class="w-full rounded-md border border-ink-600 bg-transparent px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-accent-500"
    />
  </label>
</template>
