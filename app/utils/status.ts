export type BadgeTone = 'alerte' | 'attention' | 'info' | 'succes' | 'neutre'

export type OrderStatus = 'En cours' | 'Livré' | 'Annulé'

export const ORDER_STATUS_TONE: Record<OrderStatus, BadgeTone> = {
  'En cours': 'info',
  'Livré': 'succes',
  'Annulé': 'neutre',
}
