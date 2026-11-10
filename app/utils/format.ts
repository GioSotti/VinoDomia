const euro = new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'})

export function formatEuro(value: number): string {
  return euro.format(value)
}

export function formatDate(value: Date | string): string {
  const date = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleDateString('fr-FR')
}

function normalize(value: unknown): string {
  return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export function filterRows<T>(rows: T[], query: string, keys: (keyof T)[]): T[] {
  const q = normalize(query.trim())
  if (!q) return rows
  return rows.filter(row => keys.some(key => normalize(row[key]).includes(q)))
}
