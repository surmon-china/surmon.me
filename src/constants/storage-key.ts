export const APP_DB_NAME = 'Blog'

export enum DatabaseStoreName {
  AiChatHistory = 'ai-chat-history'
}

export enum LocalStorageKey {
  // MARK: Coupled with variable names in the script of `index.html`
  Theme = 'theme',
  TokenState = 'token-state',
  IdentityState = 'identity-state',
  HistoryState = 'history-state',
  AiAgentState = 'ai-agent-state'
}
