import Vue from 'vue'
import lozad from 'lozad'

declare module 'vue/types/vue' {
  interface Vue {
    $i18n: $TODO
    $API: $TODO
  }
}

declare global {
  interface Window {
    // lozad: lozad.Selector
  }
}
