import { iDefaultInput } from "@app/shared/interfaces";
import { RedisLogic } from "../domain/redis.logic";

export class RedisFacade {
  private redisLogic: RedisLogic

  constructor(redisLogic: RedisLogic) {
    this.redisLogic = redisLogic
  }

  set(input: iDefaultInput): void {
    const { key, value } = input

    const keyAlreadyExists = this.redisLogic.get(key)

    if(keyAlreadyExists) {
      this.redisLogic.replace({ key, value })
      return
    }

    this.redisLogic.create({ key, value })
  }

  get(input: iDefaultInput): string {
    const { key } = input

    const value = this.redisLogic.get(key)

    return value
  }

  unset(input: iDefaultInput): void {
    const { key } = input

    const keyExists = this.redisLogic.get(key)

    if(!keyExists) {
      throw new Error('register does not exists')
    }

    this.redisLogic.remove(key)
  }

  numequalto(input: iDefaultInput): number {
    const { key: value } = input

    const countValues = this.redisLogic.count(value)

    return countValues
  }
}