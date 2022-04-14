export interface iDefaultInput {
  command: iValidCommands,
  key: string,
  value: string
}

export interface iTrasactions {
  command: iValidTransactions,
  key: string,
  value?: string
}

export interface iStorage {
  key: string,
  value: string
}

export type iValidCommands = 'set' | 'get' | 'unset' | 'numequalto' | 'begin' | 'commit' | 'rollback'
export type iValidTransactions = 'set' | 'unset' | 'replace'
