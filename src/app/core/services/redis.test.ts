import { iDefaultInput } from "@app/shared/interfaces";
import { RedisLogic } from "../domain/redis.logic"
import { RedisFacade } from "./redis.service"

describe('services - redis test suite', () => {
  let redisLogic: RedisLogic;
  let redisFacade: RedisFacade;

  beforeAll(() => {
    redisLogic = new RedisLogic()
    redisFacade = new RedisFacade(redisLogic)
  })

  describe('data commands', () => {
    
    test('should store a new item', () => {
      const input = [ 'command', 'a', '10' ]
      redisFacade.set(input)
  
      expect(redisLogic.get('a')).toBe('10')
    })

    test('should replace a stored item', () => {
      const input = [ 'command', 'a', '20' ]
      redisFacade.set(input)
  
      expect(redisLogic.get('a')).toBe('20')
    })
    
    test('should get a stored item', () => {
      const input = [ 'command', 'a' ]
      const result = redisFacade.get(input)
      
      expect(result).toBe('20')
    })
    
    test('should count the variables that have this value', () => {
      const input = ['command', '20']
      const count = redisFacade.numequalto(input)
  
      expect(count).toBe(1)
    })
  
    test('should unset a stored item', () => {
      const input = [ 'command', 'a' ]
      redisFacade.unset(input)
  
      expect(redisLogic.get('a')).toBe(null)
    })    

    test('should throw and error when key not found', () => {
      const input = [ 'command', 'x' ]
  
      expect(() => redisFacade.unset(input)).toThrow('not found')
    })    
  })

  describe('transaction commands', () => {

    beforeEach(() => {
      redisLogic = new RedisLogic()
      redisFacade = new RedisFacade(redisLogic)
    })

    test('should begin a trasaction', () => {
      const input = [ 'command', 'a', '10' ]
      redisFacade.begin(input)

      expect(redisLogic.transactionActive).toBe(true)
    })

    test('should commit a trasaction', () => {
      const input = [ 'command', 'a', '10' ]
      redisFacade.begin(input)
      redisFacade.commit(input)

      expect(redisLogic.transactionActive).toBe(false)
    })

    test('should rollback a set trasaction', () => {
      const input = [ 'command', 'a', '10' ]
      redisFacade.begin(input)
      redisFacade.set(input)

      expect(redisLogic.get('a')).toBe('10')

      redisFacade.rollback(input)

      expect(redisLogic.get('a')).toBe(null)
    })

    test('should rollback a replace trasaction', () => {
      const input = [ 'command', 'a', '10' ]
      const input2 = [ 'command', 'a', '20' ]
      redisFacade.set(input)
      redisFacade.begin(input)

      expect(redisLogic.get('a')).toBe('10')

      redisFacade.set(input2)
      
      expect(redisLogic.get('a')).toBe('20')
      
      redisFacade.rollback(input)
      
      expect(redisLogic.get('a')).toBe('10')
    })

    test('should rollback a replace trasaction', () => {
      const input = [ 'command', 'a', '10' ]
      redisFacade.set(input)
      redisFacade.begin(input)

      expect(redisLogic.get('a')).toBe('10')

      redisFacade.unset(input)
      
      expect(redisLogic.get('a')).toBe(null)
      
      redisFacade.rollback(input)
      
      expect(redisLogic.get('a')).toBe('10')
    })

    test('should throw error when try to rollback a transaction before init it ', () => {
      const input = [ 'command', 'a', '10' ]
      
      expect(() => redisFacade.rollback(input)).toThrow('NO TRANSACTION')
    })
  })
})