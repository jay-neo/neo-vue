<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import FormField from '@/components/neo/FormField.vue'
import ParametersTable from '@/components/neo/ParametersTable.vue'
import KeyValueTable from '@/components/neo/KeyValueTable.vue'
import ResultModal from '@/components/neo/ResultModal.vue'

import { fetchOptions } from '@/utils/mockData'
import { findDuplicateValues, rowsToObject } from '@/utils/validators'
import type { ParameterRow, KeyValueRow, SelectOption, SqlConfigPayload } from '@/types'

// --- top-level fields ---
const id = ref('')
const appCode = ref('')
const dataSource = ref('')
const statement = ref('')

// --- table state ---
const parameters = ref<ParameterRow[]>([])
const paramMapping = ref<KeyValueRow[]>([])
const columnMapping = ref<KeyValueRow[]>([])
const validationRegex = ref<KeyValueRow[]>([])

// --- select options, loaded like they would be from a server ---
const paramTypeOptions = ref<SelectOption[]>([])
const dataTypeOptions = ref<SelectOption[]>([])

onMounted(async () => {
  const opts = await fetchOptions()
  paramTypeOptions.value = opts.paramTypes
  dataTypeOptions.value = opts.dataTypes
})

// --- duplicate-key validation, per table ---
const duplicateParamNames = computed(() => findDuplicateValues(parameters.value, 'name'))
const duplicateParamMappingKeys = computed(() => findDuplicateValues(paramMapping.value, 'key'))
const duplicateColumnMappingKeys = computed(() => findDuplicateValues(columnMapping.value, 'key'))
const duplicateValidationRegexKeys = computed(() =>
  findDuplicateValues(validationRegex.value, 'key'),
)

const validationErrors = computed(() => {
  const errors: string[] = []
  if (duplicateParamNames.value.length)
    errors.push(`Parameters: duplicate Payload Key — ${duplicateParamNames.value.join(', ')}`)
  if (duplicateParamMappingKeys.value.length)
    errors.push(`Param Mapping: duplicate Key — ${duplicateParamMappingKeys.value.join(', ')}`)
  if (duplicateColumnMappingKeys.value.length)
    errors.push(`Column Mapping: duplicate Key — ${duplicateColumnMappingKeys.value.join(', ')}`)
  if (duplicateValidationRegexKeys.value.length)
    errors.push(
      `Validation Regex: duplicate Key — ${duplicateValidationRegexKeys.value.join(', ')}`,
    )
  return errors
})

// --- submit ---
const submitAttempted = ref(false)
const showModal = ref(false)
const resultJson = ref('')

function handleSubmit() {
  submitAttempted.value = true
  if (validationErrors.value.length) return

  const payload: SqlConfigPayload[] = [
    {
      id: id.value,
      appCode: appCode.value,
      dataSource: dataSource.value,
      statement: statement.value,
      parameters: parameters.value.map((p) => ({
        type: p.type,
        position: p.position === '' || p.position === null ? null : Number(p.position),
        dataType: p.dataType,
        name: p.name,
      })),
      paramMapping: rowsToObject(paramMapping.value),
      columnMapping: rowsToObject(columnMapping.value),
      validationRegex: rowsToObject(validationRegex.value),
    },
  ]

  // Demo stand-in for the real API call, e.g.:
  // await fetch('/api/sql-config', { method: 'POST', body: JSON.stringify(payload) })
  console.log('Submitting payload:', payload)
  resultJson.value = JSON.stringify(payload, null, 2)
  showModal.value = true
}
</script>

<template>
  <div class="min-h-screen bg-slate-950 px-4 py-10">
    <div class="mx-auto max-w-3xl">
      <header class="mb-8">
        <h1
          class="bg-gradient-to-r from-amber-300 via-pink-400 to-violet-400 bg-clip-text text-2xl font-extrabold text-transparent"
        >
          SQL Config Mapper
        </h1>
        <p class="mt-1 text-sm font-medium text-slate-300">
          Define a statement, its bind parameters, and its mappings.
        </p>
      </header>

      <div class="space-y-8">
        <section class="grid gap-5 sm:grid-cols-2">
          <FormField v-model="id" label="Id" placeholder="e.g. SQL_001" />
          <FormField v-model="appCode" label="Application Code" placeholder="e.g. BILLING" />
          <FormField
            v-model="dataSource"
            label="Data Source"
            placeholder="e.g. ORCL_PROD"
            class="sm:col-span-2"
          />
        </section>

        <section>
          <FormField
            v-model="statement"
            label="SQL Statement"
            type="textarea"
            placeholder="SELECT * FROM ..."
          />
        </section>

        <section>
          <h2 class="mb-2 text-sm font-bold text-sky-300">Parameters</h2>
          <ParametersTable
            v-model="parameters"
            :type-options="paramTypeOptions"
            :data-type-options="dataTypeOptions"
            :duplicates="duplicateParamNames"
          />
        </section>

        <section>
          <KeyValueTable
            v-model="paramMapping"
            title="Param Mapping"
            :duplicates="duplicateParamMappingKeys"
          />
        </section>

        <section>
          <KeyValueTable
            v-model="columnMapping"
            title="Column Mapping"
            :duplicates="duplicateColumnMappingKeys"
          />
        </section>

        <section>
          <KeyValueTable
            v-model="validationRegex"
            title="Validation Regex"
            :duplicates="duplicateValidationRegexKeys"
          />
        </section>

        <div
          v-if="submitAttempted && validationErrors.length"
          class="rounded-xl border-2 border-rose-300 bg-rose-600 px-4 py-3 text-sm text-white"
        >
          <p class="mb-1 font-bold">Fix the following before submitting:</p>
          <ul class="list-inside list-disc space-y-0.5 font-medium">
            <li v-for="err in validationErrors" :key="err">{{ err }}</li>
          </ul>
        </div>

        <div class="flex items-center justify-center my-3">
          <button
            type="button"
            @click="handleSubmit"
            class="rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-orange-500/30 transition hover:brightness-110"
          >
            Submit
          </button>
        </div>
      </div>
    </div>

    <ResultModal v-if="showModal" :json="resultJson" @close="showModal = false" />
  </div>
</template>
