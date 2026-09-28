<script setup lang="ts">
import type { KeyValueRow } from '@/types'

const props = withDefaults(
  defineProps<{
    title: string
    duplicates?: string[]
  }>(),
  {
    duplicates: () => [],
  },
)

const rows = defineModel<KeyValueRow[]>({ default: () => [] })

function addRow() {
  rows.value.push({ _key: crypto.randomUUID(), key: '', value: '' })
}

function removeRow(rowKey: string) {
  rows.value = rows.value.filter((r) => r._key !== rowKey)
}

function isDuplicate(key: string) {
  return !!key && props.duplicates.includes(key.trim())
}
</script>

<template>
  <div>
    <h2 class="mb-2 text-sm font-medium text-zinc-300">{{ title }}</h2>

    <div class="overflow-x-auto rounded-md border border-ink-600">
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="border-b border-ink-600 text-left text-zinc-400">
            <th class="w-14 px-3 py-2 font-normal">SL</th>
            <th class="px-3 py-2 font-normal">Key</th>
            <th class="px-3 py-2 font-normal">Value</th>
            <th class="w-20 px-3 py-2 font-normal">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!rows.length">
            <td colspan="4" class="px-3 py-4 text-center text-zinc-600">No entries yet.</td>
          </tr>
          <tr
            v-for="(row, i) in rows"
            :key="row._key"
            class="border-b border-ink-700 last:border-0"
          >
            <td class="px-3 py-2 text-zinc-500">{{ i + 1 }}</td>
            <td class="px-3 py-2">
              <input
                v-model="row.key"
                type="text"
                placeholder="key"
                class="w-full rounded-md border bg-transparent px-2 py-1.5 text-zinc-100 outline-none focus:border-accent-500"
                :class="isDuplicate(row.key) ? 'border-red-400' : 'border-ink-600'"
              />
            </td>
            <td class="px-3 py-2">
              <input
                v-model="row.value"
                type="text"
                placeholder="value"
                class="w-full rounded-md border border-ink-600 bg-transparent px-2 py-1.5 text-zinc-100 outline-none focus:border-accent-500"
              />
            </td>
            <td class="px-3 py-2">
              <button
                type="button"
                @click="removeRow(row._key)"
                class="w-full rounded-md border border-red-400/60 px-2 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-400/10"
              >
                Del
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-end">
      <button
        type="button"
        @click="addRow"
        class="mt-3 rounded-md border border-accent-500/60 px-3 py-1.5 text-xs text-accent-400 transition-colors hover:bg-accent-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400/60"
      >
        + Add Row
      </button>
    </div>

    <p v-if="duplicates.length" class="mt-2 text-xs text-red-400">
      Duplicate Key(s): {{ duplicates.join(', ') }}
    </p>
  </div>
</template>
