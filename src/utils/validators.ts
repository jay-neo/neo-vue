import type { KeyValueRow } from '@/types'

// Returns the list of distinct values that appear more than once for the
// given field across a set of rows (blank values are ignored).
export function findDuplicateValues<T extends Record<string, unknown>>(
  rows: T[],
  field: keyof T,
): string[] {
  const counts = new Map<string, number>()
  rows.forEach((row) => {
    const value = String(row[field] ?? '').trim()
    if (!value) return
    counts.set(value, (counts.get(value) || 0) + 1)
  })
  return [...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value)
}

// Collapses an array of { key, value } rows into a plain object,
// dropping rows with a blank key.
export function rowsToObject(rows: KeyValueRow[]): Record<string, string> {
  return rows.reduce<Record<string, string>>((acc, row) => {
    const key = row.key.trim()
    if (key) acc[key] = row.value
    return acc
  }, {})
}
