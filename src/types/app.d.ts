import Vue from 'vue'
import lozad from 'lozad'

declare global {
  interface Window {
    luanchEmojiRain(options: any): void
    // lozad: lozad.Selector
  }
}
