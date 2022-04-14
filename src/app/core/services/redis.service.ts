import { iDefaultInput } from "@app/shared/interfaces";
import { RedisLogic } from "../domain/redis.logic";

export class RedisFacade {
  private redisLogic: RedisLogic

  constructor(redisLogic: RedisLogic) {
    this.redisLogic = redisLogic
  }

  set(input: iDefaultInput): void {
    const { key, value } = input

    this.redisLogic.set({ key, value })
  }

  get(input: iDefaultInput): string {
    const { key } = input

    const value = this.redisLogic.get(key)

    return value
  }

  unset(input: iDefaultInput): void {
    const { key } = input

    this.redisLogic.remove(key)
  }

  numequalto(input: iDefaultInput): number {
    const { key: value } = input

    const countValues = this.redisLogic.count(value)

    return countValues
  }

  begin(input: iDefaultInput): void {
    this.redisLogic.initTrasnsaction()
  }

  commit(input: iDefaultInput): void {
    this.redisLogic.commitTrasnsaction()
  }

  rollback(input: iDefaultInput): void {
    this.redisLogic.rollback()
  }
}