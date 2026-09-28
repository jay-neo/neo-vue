<script setup lang="ts">
import type { ParameterRow, SelectOption } from '@/types'

const props = withDefaults(
  defineProps<{
    typeOptions?: SelectOption[]
    dataTypeOptions?: SelectOption[]
    duplicates?: string[] // duplicate Payload Key names
  }>(),
  {
    typeOptions: () => [],
    dataTypeOptions: () => [],
    duplicates: () => [],
  },
)

const rows = defineModel<ParameterRow[]>({ default: () => [] })

function addRow() {
  rows.value.push({
    _key: crypto.randomUUID(),
    type: '',
    position: rows.value.length + 1,
    dataType: '',
    name: '',
  })
}

function removeRow(rowKey: string) {
  rows.value = rows.value.filter((r) => r._key !== rowKey)
}

function isDuplicate(name: string) {
  return !!name && props.duplicates.includes(name.trim())
}
</script>

<template>
  <div>
    <div class="overflow-hidden rounded-xl border-2 border-violet-500 bg-slate-900">
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-violet-600/80 text-left text-white">
            <th class="w-14 px-3 py-2.5 font-bold">SL</th>
            <th class="px-3 py-2.5 font-bold">Type</th>
            <th class="w-24 px-3 py-2.5 font-bold">Index</th>
            <th class="px-3 py-2.5 font-bold">Data Type</th>
            <th class="px-3 py-2.5 font-bold">Payload Key</th>
            <th class="w-20 px-3 py-2.5 font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!rows.length">
            <td colspan="6" class="px-3 py-4 text-center font-medium text-slate-300">
              No parameters added yet.
            </td>
          </tr>
          <tr
            v-for="(row, i) in rows"
            :key="row._key"
            class="border-t border-violet-500/40 even:bg-slate-800/60"
          >
            <td class="px-3 py-2 font-semibold text-sky-300">{{ i + 1 }}</td>
            <td class="px-3 py-2">
              <select
                v-model="row.type"
                class="w-full rounded-lg border-2 border-sky-400 bg-slate-800 px-2 py-1.5 font-medium text-white outline-none transition-all focus:border-amber-300 focus:ring-4 focus:ring-amber-300/30"
              >
                <option value="" disabled>Select</option>
                <option v-for="opt in typeOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </td>
            <td class="px-3 py-2">
              <input
                v-model.number="row.position"
                type="number"
                class="w-full rounded-lg border-2 border-sky-400 bg-slate-800 px-2 py-1.5 font-medium text-white outline-none transition-all focus:border-amber-300 focus:ring-4 focus:ring-amber-300/30"
              />
            </td>
            <td class="px-3 py-2">
              <select
                v-model="row.dataType"
                class="w-full rounded-lg border-2 border-sky-400 bg-slate-800 px-2 py-1.5 font-medium text-white outline-none transition-all focus:border-amber-300 focus:ring-4 focus:ring-amber-300/30"
              >
                <option value="" disabled>Select</option>
                <option v-for="opt in dataTypeOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </td>
            <td class="px-3 py-2">
              <input
                v-model="row.name"
                type="text"
                placeholder="e.g. customerId"
                class="w-full rounded-lg border-2 px-2 py-1.5 font-medium text-white placeholder-slate-400 outline-none transition-all"
                :class="
                  isDuplicate(row.name)
                    ? 'border-rose-500 bg-rose-500/20 focus:ring-4 focus:ring-rose-400/30'
                    : 'border-sky-400 bg-slate-800 focus:border-amber-300 focus:ring-4 focus:ring-amber-300/30'
                "
              />
            </td>
            <td class="px-3 py-2">
              <button
                type="button"
                @click="removeRow(row._key)"
                class="w-full rounded-lg bg-rose-500 px-2 py-1.5 text-xs font-bold text-white transition-colors hover:bg-rose-400"
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
        class="mt-3 rounded-lg bg-emerald-400 px-4 py-1.5 text-xs font-bold text-slate-950 transition-colors hover:bg-emerald-300"
      >
        + Add Row
      </button>
    </div>

    <p v-if="duplicates.length" class="mt-2 text-xs font-bold text-rose-400">
      Duplicate Payload Key(s): {{ duplicates.join(', ') }}
    </p>
  </div>
</template>
