import { RedisLogic } from "@app/core/domain/redis.logic";
import { RedisFacade } from "@app/core/services/redis.service";
import { iDefaultInput, iValidCommands } from "@app/shared/interfaces";

export class RedisController {
  private redisFacade: RedisFacade
  
  constructor() {
    const redisLogic = new RedisLogic()
    this.redisFacade = new RedisFacade(redisLogic)
  }

  public execute(input: string[]){
    const [command]  = input

    if(!this.redisFacade[command as iValidCommands]) {
      throw new Error('invalid command');
    }

    return this.redisFacade[command as iValidCommands](input)
  }
}