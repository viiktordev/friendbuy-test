export interface iDefaultInput {
  command: iValidCommands,
  key: string,
  value: string
}

export interface iStorage {
  key: string,
  value: string
}

export type iValidCommands = 'set' | 'get' | 'unset' | 'numequalto'
