import { RedisLogic } from "@app/core/domain/redis.logic";
import { RedisFacade } from "@app/core/services/redis.service";
import { iDefaultInput } from "@app/shared/interfaces";

export class RedisController {
  private redisFacade: RedisFacade
  
  constructor() {
    const redisLogic = new RedisLogic()
    this.redisFacade = new RedisFacade(redisLogic)
  }

  public execute(input: iDefaultInput){
    const { command } = input

    if(!this.redisFacade[command]) {
      throw new Error('invalid command');
    }

    return this.redisFacade[command](input)
  }
}