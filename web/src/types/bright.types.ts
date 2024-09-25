export type { Tables as BrightTable } from './database.types.ts'

export interface RealtimeEvents {
  [event: string]: { [key: string]: unknown }
}

export type EventCallback<K extends RealtimeEvents, T extends keyof K> = (payload: K[T]) => void
