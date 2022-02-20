import { App } from 'vue'

declare global {
  interface Window {
    $app: App
  }
}
