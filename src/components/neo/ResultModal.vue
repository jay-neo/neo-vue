<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  json: string
}>()

const emit = defineEmits<{
  close: []
}>()

const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.json)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    // Clipboard permission unavailable in this context — fail silently.
  }
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <div
      class="w-full max-w-2xl overflow-hidden rounded-2xl border-2 border-violet-500 bg-slate-900 shadow-2xl shadow-violet-900/50"
    >
      <div class="flex items-center justify-between bg-violet-600 px-4 py-3">
        <h3 class="text-sm font-bold text-white">Payload sent to server (demo)</h3>
        <button
          type="button"
          @click="emit('close')"
          class="rounded-lg px-2 py-1 font-bold text-white transition-colors hover:bg-violet-500"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <pre
        class="max-h-[60vh] overflow-auto bg-slate-950 px-4 py-3 font-mono text-xs leading-relaxed text-emerald-300"
        >{{ json }}</pre>

      <div class="flex items-center justify-end gap-2 bg-slate-800 px-4 py-3">
        <span v-if="copied" class="text-xs font-bold text-emerald-300">Copied!</span>
        <button
          type="button"
          @click="copy"
          class="rounded-lg bg-emerald-400 px-4 py-1.5 text-xs font-bold text-slate-950 transition-colors hover:bg-emerald-300"
        >
          Copy JSON
        </button>
        <button
          type="button"
          @click="emit('close')"
          class="rounded-lg bg-slate-600 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-slate-500"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
