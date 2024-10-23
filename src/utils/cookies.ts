import Cookies from "js-cookie"

export interface ProxyStorage {
  setItem<T = string>(k: string, v: T): void

  getItem<T = string>(k: string): T

  removeItem(k: string): void

  clear(): void
}

const { hostname } = window.location

class CookieProxy implements ProxyStorage {
  protected prefix: string

  constructor() {
    this.prefix = hostname
  }

  getAll(): any {
    return Cookies.get()
  }

  setItem<T = string>(k: string, v: T): void {
    const value = JSON.stringify(v)
    Cookies.set(k, value)
  }

  getItem<T = string>(k: string): T {
    const value = Cookies.get(k)
    if (value) {
      return JSON.parse(value)
    }

    return null
  }

  removeItem(k: string): void {
    Cookies.remove(k)
  }

  clear(): void {
    const keys = Object.keys(this.getAll())
    keys.forEach((key) => {
      this.removeItem(key)
    })
  }
}

const cookies = new CookieProxy()

export default cookies
