export interface SelectOption {
  value: string
  label: string
}

// Row shape used while editing the Parameters table (position kept loose
// since a number input can hold '' before the user types a value).
export interface ParameterRow {
  _key: string
  type: string
  position: number | string
  dataType: string
  name: string
}

// Row shape used while editing any Key/Value table (Param Mapping,
// Column Mapping, Validation Regex).
export interface KeyValueRow {
  _key: string
  key: string
  value: string
}

export interface ParameterPayload {
  type: string
  position: number | null
  dataType: string
  name: string
}

export interface SqlConfigPayload {
  id: string
  appCode: string
  dataSource: string
  statement: string
  parameters: ParameterPayload[]
  paramMapping: Record<string, string>
  columnMapping: Record<string, string>
  validationRegex: Record<string, string>
}
