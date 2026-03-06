export interface AuthTokenResult {
  token_type: 'Bearer'
  access_token: string
  expires_in: number
  refresh_token: string
}
