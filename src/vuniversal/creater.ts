
import { CreateAppFunction } from 'vue'
import { Router } from 'vue-router'
// import { Helme } from './helmet'

export type AppCreater = () => {
  app: ReturnType<CreateAppFunction<Element>>
  router: Router
  meta: any
  [key: string]: any
}
