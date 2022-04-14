import { iStorage, iTrasactions } from "@app/shared/interfaces";

export class RedisLogic {
  private storage: iStorage[]
  private transactions: iTrasactions[][]
  private transactionActive: boolean

  constructor() {
    this.storage = []
    this.transactions = []
    this.transactionActive = false
  }

  private saveTrasaction(transaction: iTrasactions) {
    this.transactions[0].unshift(transaction)
  }

  private replace(newItem: iStorage): void {
    const index = this.storage.findIndex(item => item.key === newItem.key)

    const { key, value } = this.storage[index]

    if(this.transactionActive){ 
      this.saveTrasaction({ command: 'replace', key, value})
    }

    this.storage[index] = newItem
  }

  private transctionHandler = {
    set: (item: iTrasactions) => {
      const { key } = item      
      this.remove(key)
    },

    replace: (item: iTrasactions) => {
      const { key, value } = item      
      this.replace({ key, value })
    },

    unset: (item: iTrasactions) => {
      const { key, value } = item
      this.set({ key, value })
    },
  }

  get(key: string): string | null {
    const item = this.storage.find(item => item.key === key)

    return item?.value || null
  }

  set(newItem: iStorage): void {
    const { key, value } = newItem

    const itemExists = this.storage.find(item => item.key === key)

    if(itemExists) {
      this.replace(newItem)
      return
    }

    if(this.transactionActive){
      this.saveTrasaction({ command: 'set', key, value })
    }

    this.storage.push(newItem)
  }

  remove(key: string):void {
    const index = this.storage.findIndex(item => item.key === key)
    
    if(index === -1){
      throw new Error('not found')
    }

    const { key: storedKey, value } = this.storage[index]

    if(this.transactionActive){
      this.saveTrasaction({ command: 'unset', key: storedKey, value})
    }

    this.storage.splice(index, 1)
  }

  count(value: string): number {
    const values = this.storage.filter(item => item.value === value)

    return values.length
  }

  initTrasnsaction(): void {
    this.transactionActive = true
    this.transactions.unshift([])
  }

  commitTrasnsaction(): void {
    this.transactions = []
    this.transactionActive = false
  }

  rollback(): void {
    if(!this.transactionActive) {
      throw new Error('NO TRANSACTION')
    }
    
    this.transactionActive = false

    const currentTransaction = this.transactions.shift()

    currentTransaction.forEach(item => {
      const { command } = item

      this.transctionHandler[command](item)
    })

    this.transactionActive = true
  }
}