import createLogger from 'vuex/logger'

export default process.env.NODE_ENV !== 'production'
  ? [createLogger()]
  : []