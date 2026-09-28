// Stand-in for a backend endpoint (e.g. GET /api/options) that would normally
// supply these lists. Swap fetchOptions() for a real HTTP call when wiring
// this up to an actual server.
import type { SelectOption } from '@/types'

export const paramTypeOptions: SelectOption[] = [
  { value: 'IN', label: 'IN' },
  { value: 'OUT', label: 'OUT' },
]

const ORACLE_DATA_TYPES = [
  'VARCHAR2',
  'NVARCHAR2',
  'CHAR',
  'NCHAR',
  'NUMBER',
  'FLOAT',
  'LONG',
  'DATE',
  'TIMESTAMP',
  'INTERVAL YEAR TO MONTH',
  'INTERVAL DAY TO SECOND',
  'RAW',
  'LONG RAW',
  'ROWID',
  'UROWID',
  'CLOB',
  'NCLOB',
  'BLOB',
  'BFILE',
  'XMLTYPE',
  'BINARY_FLOAT',
  'BINARY_DOUBLE',
] as const

export const oracleDataTypeOptions: SelectOption[] = ORACLE_DATA_TYPES.map((value) => ({
  value,
  label: value,
}))

export interface ServerOptions {
  paramTypes: SelectOption[]
  dataTypes: SelectOption[]
}

export function fetchOptions(): Promise<ServerOptions> {
  return Promise.resolve({
    paramTypes: paramTypeOptions,
    dataTypes: oracleDataTypeOptions,
  })
}
