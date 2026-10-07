// Utilitários de data compartilhados pelas listas e modais da Delegação.

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/

/**
 * Converte string da API em Date.
 * Strings "YYYY-MM-DD" (sem hora) são interpretadas no fuso LOCAL.
 * Com `new Date('2025-04-03')` o JS usa UTC e, no Brasil (UTC-3),
 * a data aparece como 02/04 — por isso o tratamento especial.
 */
export function parseDate(value) {
  if (!value) return null
  const m = DATE_ONLY.exec(value)
  const date = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

/** 03/04 */
export function formatShortDate(value) {
  const d = parseDate(value)
  if (!d) return ''
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  return `${day}/${month}`
}

/** 21 de Outubro */
export function formatLongDate(value) {
  const d = parseDate(value)
  if (!d) return ''
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long' })
    .format(d)
    .replace(/ de (.)/, (_, c) => ` de ${c.toUpperCase()}`)
}

/** 13:45 */
export function formatTime(value) {
  const d = parseDate(value)
  if (!d) return ''
  return new Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' }).format(d)
}