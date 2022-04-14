import { inputHandler } from "@app/shared/helpers";
import { iDefaultInput } from "@app/shared/interfaces";
import { RedisLogic } from "../domain/redis.logic";


export class RedisFacade {
  private redisLogic: RedisLogic

  constructor(redisLogic: RedisLogic) {
    this.redisLogic = redisLogic
  }

  set(input: string[]): void {
    const { key, value } = inputHandler(input).set()

    this.redisLogic.set({ key, value })
  }

  get(input: string[]): string {
    const { key } = inputHandler(input).get()

    const value = this.redisLogic.get(key)

    return value
  }

  unset(input: string[]): void {
    const { key } = inputHandler(input).unset()

    this.redisLogic.remove(key)
  }

  numequalto(input: string[]): number {
    const { value } = inputHandler(input).numequalto()
    
    const countValues = this.redisLogic.count(value)

    return countValues
  }

  begin(input: string[]): void {
    this.redisLogic.initTrasnsaction()
  }

  commit(input: string[]): void {
    this.redisLogic.commitTrasnsaction()
  }

  rollback(input: string[]): void {
    this.redisLogic.rollback()
  }
}