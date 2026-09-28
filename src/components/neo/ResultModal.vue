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
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-2xl rounded-lg border border-ink-600 bg-ink-800 shadow-xl">
      <div class="flex items-center justify-between border-b border-ink-600 px-4 py-3">
        <h3 class="text-sm font-medium text-zinc-200">Payload sent to server (demo)</h3>
        <button
          type="button"
          @click="emit('close')"
          class="text-zinc-500 transition-colors hover:text-zinc-200"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <pre
        class="max-h-[60vh] overflow-auto px-4 py-3 font-mono text-xs leading-relaxed text-accent-300"
        >{{ json }}</pre>

      <div class="flex items-center justify-end gap-2 border-t border-ink-600 px-4 py-3">
        <span v-if="copied" class="text-xs text-accent-400">Copied</span>
        <button
          type="button"
          @click="copy"
          class="rounded-md border border-accent-500/60 px-3 py-1.5 text-xs text-accent-400 transition-colors hover:bg-accent-500/10"
        >
          Copy JSON
        </button>
        <button
          type="button"
          @click="emit('close')"
          class="rounded-md border border-ink-600 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-ink-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
