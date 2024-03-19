// storage.ts
export interface ProxyStorage {
  setItem<T = string>(k: string, v: T): void

  getItem<T = string>(k: string): T

  removeItem(k: string): void

  clear(): void
}
