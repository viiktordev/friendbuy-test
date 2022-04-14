import { RedisController } from "@app/controller/redis.controller"

const controller = new RedisController()


process.stdin.on('data', msg => {
  try {
    const [command, key, value] =
      msg.toString('utf-8').trim().replace('\n', '').split(' ')
  
    if(command.toLowerCase() === 'end'){
      process.exit()
    }
  
    const response = controller.execute([
      command.toLowerCase().trim(),
      key,
      value
    ])
  
    if (response !== undefined) {
      console.log(response)
    }
  } catch (error) {
    console.log(error.message);
  }
})