import { UserIdentityProvider } from '/@/interfaces/user'
import API_CONFIG from '/@/configs/app.api'
import { APP_CONFIG } from '/@/configs/app.config'
import nodepress, { NodePressResponseStatus } from '/@/services/nodepress'
import { getMessageFromNormalError } from '/@/transforms/error'
import { openPopupWindow } from './opener'
import logger from './logger'

const LOADING_HTML = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Connecting...</title>
    <style>
      :root {
        --bg-color: #ffffff;
        --text-color: #333333;
        --spinner-border: #f3f3f3;
        --spinner-top: ${APP_CONFIG.primary_color};
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --bg-color: #1a1a1a;
          --text-color: #eeeeee;
          --spinner-border: #333333;
        }
      }
      body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-family: -apple-system, system-ui, sans-serif;
        background-color: var(--bg-color);
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid var(--spinner-border);
        border-top: 4px solid var(--spinner-top);
        border-radius: 50%;
        animation: spin 2s linear infinite;
        margin-bottom: 32px;
      }
      .text { color: var(--text-color); }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div class="spinner"></div>
    <div class="text">Connecting to OAuth Service...</div>
  </body>
</html>
`

// https://github.com/surmon-china/nodepress/blob/main/src/modules/account/auth/auth.helper.ts
const POST_MESSAGE_SOURCE = 'nodepress-oauth'

type OAuthSuccessMessage = {
  source: typeof POST_MESSAGE_SOURCE
  status: NodePressResponseStatus.Success
  type: 'login' | 'link'
  token?: string
}

type OAuthErrorMessage = {
  source: typeof POST_MESSAGE_SOURCE
  status: NodePressResponseStatus.Error
  error: string
}

export interface OAuthPopupOptions {
  provider: UserIdentityProvider
  nodepressApi: string
  nodepressToken?: string | null
  onSuccess?: (message: OAuthSuccessMessage) => void
  onError?: (message: OAuthErrorMessage) => void
  onClose?: () => void
}

export const openOAuthPopup = async (options: OAuthPopupOptions) => {
  const { provider, nodepressApi, nodepressToken, onSuccess, onError, onClose } = options

  const handleMessage = (event: MessageEvent<OAuthSuccessMessage | OAuthErrorMessage>) => {
    if (event.origin !== API_CONFIG.NODEPRESS) return
    if (event.data?.source !== POST_MESSAGE_SOURCE) return
    window.removeEventListener('message', handleMessage)
    if (event.data.status === NodePressResponseStatus.Success) {
      onSuccess?.(event.data)
    } else {
      logger.warn(`Received OAuth error message for ${provider}`, event.data)
      onError?.(event.data)
    }
  }

  const windowSize =
    provider === UserIdentityProvider.GitHub
      ? { width: 700, height: 840 }
      : provider === UserIdentityProvider.Google
        ? { width: 540, height: 620 }
        : {}

  const popup = openPopupWindow('', {
    width: windowSize.width,
    height: windowSize.height,
    target: `${provider}_oauth`,
    onClose: () => {
      window.removeEventListener('message', handleMessage)
      onClose?.()
    }
  })

  if (popup) {
    popup.document.write(LOADING_HTML)
    popup.document.close()
  }

  try {
    window.addEventListener('message', handleMessage)
    const { result } = await nodepress.get(nodepressApi, { token: nodepressToken })
    if (popup && !popup.closed) {
      popup.location.href = result.url
      popup.focus()
    }
  } catch (error) {
    window.removeEventListener('message', handleMessage)
    popup?.close()

    logger.error(`Failed to fetch OAuth URL for ${provider}`, error)
    alert(getMessageFromNormalError(error))
  }

  return popup
}
