import { ResolvedConfig } from 'vite'

export enum BuildTarget {
  Client = 'client',
  Server = 'server'
}

export enum BuildMode {
  Production = 'production',
  Development = 'development'
}

export interface VuniversalConfig {
  clientEntry: string
  serverEntry: string
  vite(target: BuildTarget, mode: BuildMode): Promise<ResolvedConfig>
}
