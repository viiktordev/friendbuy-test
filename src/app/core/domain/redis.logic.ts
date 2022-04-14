import { iStorage } from "@app/shared/interfaces";

export class RedisLogic {
  private storage: iStorage[]

  constructor() {
    this.storage = []
  }

  create(item: iStorage): void {
    this.storage.push(item)
  }

  get(key: string): string | null {
    const item = this.storage.find(item => item.key === key) 

    return item?.value || null
  }

  replace(newItem: iStorage): void {
    const index = this.storage.findIndex(item => item.key === newItem.key)

    this.storage[index] = newItem
  }

  remove(key: string):void {
    const index = this.storage.findIndex(item => item.key === key)

    this.storage.splice(index, 1)
  }

  count(value: string): number {
    const values = this.storage.filter(item => item.value === value)

    return values.length
  }
}