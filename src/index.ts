import { RedisController } from "@app/controller/redis.controller"
import { iDefaultInput } from "@app/shared/interfaces"

const controller = new RedisController()


process.stdin.on('data', msg => {
  try {
    const [command, key, value] = msg.toString('utf-8').replace('\n', '').split(' ')
  
    if(command.toLowerCase() === 'end'){
      process.exit()
    }
  
    const response = controller.execute({
      command: command.toLowerCase(),
      key,
      value,
    } as iDefaultInput)
  
    if (response !== undefined) {
      console.log(response)
    }
  } catch (error) {
    console.log(error.message);
  }
})